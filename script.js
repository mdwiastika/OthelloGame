let tr,
  td,
  div,
  square,
  othello_table,
  player_pawn,
  turn,
  arr_pawn_step = [];
let color_othello_board = [
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', 'pawn-white', 'pawn-black', '', '', ''],
  ['', '', '', 'pawn-black', 'pawn-white', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
];
othello_table = document.getElementsByTagName('table')[0];
function set_pawn(e) {
  const modalStart = document.querySelector('.modal');
  const getClassStart = e.children[0].className;
  if (getClassStart == 'pawn-black') {
    modalStart.style.display = 'none';
    player_pawn = 'black';
    turn = 'pawn-black';
  } else if (getClassStart == 'pawn-white') {
    modalStart.style.display = 'none';
    player_pawn = 'white';
    turn = 'pawn-white';
  }
  create_board();
}
function pawn_position_color() {
  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      square = document.getElementById(`square${x}${y}`);
      square.children[0].className = color_othello_board[y][x];
    }
  }
}

function draw_pawn_step() {
  for (let iter_step = 0; iter_step < arr_pawn_step.length; iter_step++) {
    square = document.getElementById(`square${arr_pawn_step[iter_step].x}${arr_pawn_step[iter_step].y}`);
    square.children[0].removeAttribute('style');
  }
  arr_pawn_step = [];
  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      if (color_othello_board[y][x] == '' && check_valid(turn, x, y)) {
        arr_pawn_step.push({x: x, y: y});
        square = document.getElementById(`square${x}${y}`);
        square.children[0].style.width = '70px';
        square.children[0].style.height = '70px';
        square.children[0].style.margin = 'auto';
        // square.children[0].style.backgroundImage = "url('Assets/ui/pawn-step.png')";
        if (turn == 'pawn-black') {
          square.children[0].style.border = '2px solid black';
        } else {
          square.children[0].style.border = '2px solid white';
        }
        square.children[0].style.borderRadius = '50%';
        square.children[0].style.backgroundSize = '100% 100%';
      }
    }
  }
}

function game_score() {
  let black = 0;
  let white = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let value_pawn = color_othello_board[y][x];
      if (value_pawn == 'pawn-white') {
        white++;
      } else if (value_pawn == 'pawn-black') {
        black++;
      }
    }
  }
  let black_score = document.querySelector('.left').children[0];
  let white_score = document.querySelector('.right').children[0];
  black_score.innerHTML = black;
  white_score.innerHTML = white;
}

function click_pawn(x, y) {
  if (check_valid(turn, x, y)) {
    let affected_pawn = get_affected_pawn(turn, x, y);
    flip_pawn(affected_pawn);
    color_othello_board[y][x] = turn;
    if (turn == 'pawn-white' && step_move('pawn-black')) {
      turn = 'pawn-black';
    } else if (turn == 'pawn-black' && step_move('pawn-white')) {
      turn = 'pawn-white';
    }
    if (step_move('pawn-white') == false && step_move('pawn-black') == false) {
      alert('Game Over');
      create_board();
    }
    draw_pawn_step();
    pawn_position_color();
    game_score();
  } else {
    return;
  }
}

function step_move(step_color) {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (check_valid(step_color, x, y)) {
        return true;
      }
    }
  }
}

function check_valid(step_color, x, y) {
  if (color_othello_board[y][x] == '') {
    let affected_pawn = get_affected_pawn(step_color, x, y);
    if (affected_pawn.length == 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function get_affected_pawn(step_color, x, y) {
  let affected_pawn = [];

  //right check
  let could_be_affected = [];
  for (let i = x + 1; i <= 7; i++) {
    let value_pawn_position = color_othello_board[y][i];
    if (value_pawn_position == '' || value_pawn_position == step_color) {
      if (value_pawn_position == step_color) {
        affected_pawn = affected_pawn.concat(could_be_affected);
      }
      break;
    } else {
      let arr_pawn = {y: y, x: i};
      could_be_affected.push(arr_pawn);
    }
  }

  //left check
  could_be_affected = [];
  for (let i = x - 1; i >= 0; i--) {
    let value_pawn_position = color_othello_board[y][i];
    if (value_pawn_position == '' || value_pawn_position == step_color) {
      if (value_pawn_position == step_color) {
        affected_pawn = affected_pawn.concat(could_be_affected);
      }
      break;
    } else {
      let arr_pawn = {y: y, x: i};
      could_be_affected.push(arr_pawn);
    }
  }

  //top check
  could_be_affected = [];
  for (let i = y - 1; i >= 0; i--) {
    let value_pawn_position = color_othello_board[i][x];
    if (value_pawn_position == '' || value_pawn_position == step_color) {
      if (value_pawn_position == step_color) {
        affected_pawn = affected_pawn.concat(could_be_affected);
      }
      break;
    } else {
      let arr_pawn = {y: i, x: x};
      could_be_affected.push(arr_pawn);
    }
  }

  //bottom check
  could_be_affected = [];
  for (let i = y + 1; i <= 7; i++) {
    let value_pawn_position = color_othello_board[i][x];
    if (value_pawn_position == '' || value_pawn_position == step_color) {
      if (value_pawn_position == step_color) {
        affected_pawn = affected_pawn.concat(could_be_affected);
      }
      break;
    } else {
      let arr_pawn = {y: i, x: x};
      could_be_affected.push(arr_pawn);
    }
  }

  // bottom right check
  could_be_affected = [];
  for (i = x + 1, j = y + 1; i <= 7 && j <= 7; i++, j++) {
    let value_pawn_position = color_othello_board[j][i];
    if (value_pawn_position == '' || value_pawn_position == step_color) {
      if (value_pawn_position == step_color) {
        affected_pawn = affected_pawn.concat(could_be_affected);
      }
      break;
    } else {
      let arr_pawn = {y: j, x: i};
      could_be_affected.push(arr_pawn);
    }
  }

  // bottom left check
  could_be_affected = [];
  for (i = x - 1, j = y + 1; i >= 0 && j <= 7; i--, j++) {
    let value_pawn_position = color_othello_board[j][i];
    if (value_pawn_position == '' || value_pawn_position == step_color) {
      if (value_pawn_position == step_color) {
        affected_pawn = affected_pawn.concat(could_be_affected);
      }
      break;
    } else {
      let arr_pawn = {y: j, x: i};
      could_be_affected.push(arr_pawn);
    }
  }

  // top left check
  could_be_affected = [];
  for (i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
    let value_pawn_position = color_othello_board[j][i];
    if (value_pawn_position == '' || value_pawn_position == step_color) {
      if (value_pawn_position == step_color) {
        affected_pawn = affected_pawn.concat(could_be_affected);
      }
      break;
    } else {
      let arr_pawn = {y: j, x: i};
      could_be_affected.push(arr_pawn);
    }
  }

  //top right check
  could_be_affected = [];
  for (i = x + 1, j = y - 1; i <= 7 && j >= 0; i++, j--) {
    let value_pawn_position = color_othello_board[j][i];
    if (value_pawn_position == '' || value_pawn_position == step_color) {
      if (value_pawn_position == step_color) {
        affected_pawn = affected_pawn.concat(could_be_affected);
      }
      break;
    } else {
      let arr_pawn = {y: j, x: i};
      could_be_affected.push(arr_pawn);
    }
  }
  return affected_pawn;
}

function flip_pawn(affected_pawn) {
  for (let i = 0; i < affected_pawn.length; i++) {
    let pawn_position = affected_pawn[i];
    color_othello_board[pawn_position.y][pawn_position.x] == 'pawn-black' ? (color_othello_board[pawn_position.y][pawn_position.x] = 'pawn-white') : (color_othello_board[pawn_position.y][pawn_position.x] = 'pawn-black');
  }
}

function create_board() {
  for (let y = 0; y <= 7; y++) {
    tr = document.createElement('tr');
    for (let x = 0; x <= 7; x++) {
      td = document.createElement('td');
      div = document.createElement('div');
      td.appendChild(div);
      td.id = `square${x}${y}`;
      tr.appendChild(td);
      td.addEventListener('click', function () {
        click_pawn(x, y);
      });
    }
    othello_table.appendChild(tr);
  }
  draw_pawn_step();
  pawn_position_color();
  game_score();
}
