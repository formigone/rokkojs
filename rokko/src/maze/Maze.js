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
 * @param {Board} board
 * @param {Object.<string|number>} options
 * @constructor
 */
var BoardRenderer = function(board, options) {
    this.board = board;

    this.width = options.width;
    this.height = options.height;
    this.thickness = options.thickness;

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

};
