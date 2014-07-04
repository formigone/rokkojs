/**
 *
 * @constructor
 */
var Cell = function() {
    this.walls = {
        up: true,
        down: true,
        left: true,
        right: true
    };
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

Board.prototype.init = function(){
    for (var i = 0, len = this.width * this.height; i < len; i++) {
        this.cells.push(new Cell());
    }
};

/**
 *
 * @param {number} i
 * @return {Object.<number, number>}
 */
Board.prototype.getPos = function(i) {
    return {
        x: i % this.width,
        y: parseInt(i / this.height)
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

BoardRenderer.prototype.render = function(){
    var cells = this.board.cells;
    var pos = {};

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.colors.wall;

    for (var i = 0, len = cells.length; i < len; i++) {
        pos = this.board.getPos(i);

        this.ctx.fillRect(pos.x * this.cellWidth, pos.y * this.cellHeight, this.wallThickness, this.height);
        this.ctx.fillRect(pos.x * this.cellWidth, pos.y * this.cellHeight, this.width, this.wallThickness);
    }
};
