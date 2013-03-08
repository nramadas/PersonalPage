var last = function(array) {
  return array[array.length-1];
};

var randInt = function(range) {
  return (Math.floor(Math.random() * range))
};

var makeSegment = function(leader, row, col) {
  return {
    leader: leader,
    row: row,
    col: col,
    move: function() {
      this.row = this.leader.row;
      this.col = this.leader.col;
    }
  };
};

var makeHead = function(row, col) {
  return {
    row: row,
    col: col,
    direction: [-1,0],
    move: function(board_size) {
      this.row = (this.row + this.direction[0] + board_size) % board_size;
      this.col = (this.col + this.direction[1] + board_size) % board_size;
    },
    changeDirection: function(direc) {
      directions = [[-1,0],[0,1],[1,0],[0,-1]];

      if ((this.direction[0] + directions[direc][0] != 0) ||
          (this.direction[1] + directions[direc][1] != 0)) {
        this.direction = directions[direc];
      }
    }
  };
};

var makeApple = function(row, col) {
  return {
    row: row,
    col: col
  };
};

var makeGame = function() {
  return {
    board_size: undefined,
    snake: [],
    head: undefined,
    apple: undefined,
    checkApple: function() {
      return ((this.apple.row == this.head.row) && (this.apple.col == this.head.col));
    },
    inSnake: function(row, col, head) {
      var i = 0;

      if (head) {
        i += 1;
      }

      for (i; i < this.snake.length; i++) {
        if ((this.snake[i].row == row) && (this.snake[i].col == col)) {
          return true;
        }
      };

      return false;
    },
    resetApple: function() {
      while (true) {
        var row = randInt(this.board_size);
        var col = randInt(this.board_size);
        if (!(this.inSnake(row, col))) {
          this.apple = makeApple(row, col);
          break;
        }
      }
    },
    eat: function(row, col) {
      var last_segment = last(this.snake);
      this.snake.push(makeSegment(last_segment, row, col));
      this.resetApple();
    },
    changeDirection: function(direc) {
      this.head.changeDirection(direc);
    },
    move: function() {
      var end_segment = last(this.snake);
      var last_pos = [end_segment.row, end_segment.col];

      for (var i = this.snake.length - 1; i >= 0; i--) {
        this.snake[i].move(this.board_size);
      }

      if (this.checkApple()) {
        this.eat(last_pos[0], last_pos[1]);
      }
    },
    initialize: function(size) {
      this.board_size = size;
      this.head = makeHead(Math.floor(size/2), Math.floor(size/2));
      this.snake.push(this.head);
      this.resetApple();
    },
    lose: function() {
      return this.inSnake(this.head.row, this.head.col, true);
    }
  }
};