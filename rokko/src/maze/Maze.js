/**
 *
 * @constructor
 */
var Cell = function() {
    this.init = false;

    this.walls = 0x1111;
};

Cell.walls = {
    UP: 0x1000,
    DOWN: 0x0100,
    LEFT: 0x0010,
    RIGHT: 0x0001
};


/**
 *
 * @param {number} width
 * @param {number} height
 * @constructor
 */
var Board = function(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];

    this.init();
};

Board.prototype.init = function() {
    for (var i = 0, len = this.width * this.height; i < len; i++) {
        this.cells.push(new Cell());
    }
};

Board.prototype.generate = function(){
    var stack = [];

    var carveTo = function(x, y) {
        if (this.cells.visited) {
            return;
        }
    };

    this.cells[0].init = true;
    this.cells[0].walls = 0x1011;

    this.cells[1].init = true;
    this.cells[1].walls = 0x1011;

    this.cells[2].init = true;
    this.cells[2].walls = 0x0110;

    this.cells[3].init = true;
    this.cells[3].walls = 0x0101;
};

/**
 *
 * @param {number} i
 * @return {Object.<number, number>}
 */
Board.prototype.getPos = function(i) {
    return {
        x: i % this.width,
        y: parseInt(i / this.height, 10)
    };
};

Board.prototype.getNeighbors = function(i) {
    var pos = this.getPos(i);

    return {
    };
};

/**
 *
 * @param {Board} board
 * @param {Object.<string|number>} options
 * @constructor
 */
var BoardRenderer = function(board, options) {
    this.board = board;

    this.width = options.width;
    this.height = options.height;

    this.wallThickness = options.thickness;
    this.cellWidth = this.width / this.board.width;// - this.wallThickness * (this.board.width + 1);
    this.cellHeight = this.height / this.board.height;// - this.wallThickness * (this.board.height + 1);

    this.colors = {
        bg: options.bgColor,
        wall: options.wallColor
    };

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext('2d');

    var container = options.container || document.body;
    container.appendChild(this.canvas);
};

BoardRenderer.prototype.render = function() {
    var cells = this.board.cells;
    var pos = {};

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.colors.wall;

    for (var i = 0, len = cells.length; i < len; i++) {
        pos = this.board.getPos(i);
console.log(pos, cells[i], i);
        if (cells[i].walls & Cell.walls.LEFT) {
            this.ctx.fillStyle = '#00c';
            this.ctx.fillRect(pos.x * this.cellWidth, pos.y * this.cellHeight, this.wallThickness, this.height);
            this.ctx.fillStyle = this.colors.wall;
        }

        if (cells[i].walls & Cell.walls.UP) {
            this.ctx.fillRect(pos.x * this.cellWidth, pos.y * this.cellHeight, this.width, this.wallThickness);
        }

        if (cells[i].walls & Cell.walls.RIGHT) {
            this.ctx.fillStyle = '#0c0';
            this.ctx.fillRect((pos.x + 1) * this.cellWidth - this.wallThickness, pos.y * this.cellHeight, this.wallThickness, this.height);
            this.ctx.fillStyle = this.colors.wall;
        }

        if (cells[i].walls & Cell.walls.DOWN) {
            this.ctx.fillRect(pos.x * this.cellWidth, (pos.y + 1) * this.cellHeight - this.wallThickness, this.width, this.wallThickness);
        }
    }
};
