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

Cell.dummy = new Cell();
Cell.dummy.init = true;

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string} color
 * @constructor
 */
var Player = function(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
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

/**
 *
 * @param {number} x
 * @param {number} y
 * @return Cell
 */
Board.prototype.getCell = function(x, y) {
    var i = y * this.width + x;

    return this.cells[i];
};

Board.prototype.seed = function() {
    var start = parseInt(Math.random() * this.cells.length, 10);
    var end = -1;
    var min = this.cells.length * 0.25;

    do {
        end = parseInt(Math.random() * this.cells.length, 10);
    } while (Math.abs(start - end) < min);

    return {
        start: this.getPos(start),
        end: this.getPos(end)
    };
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} wall
 */
Board.prototype.setWall = function(x, y, wall) {
    var i = y * this.width + x;
    this.cells[i].walls = wall;
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} wall
 */
Board.prototype.clearWall = function(x, y, wall) {
    var i = y * this.width + x;
    this.cells[i].walls ^= wall;
};

Board.prototype.generate = function() {
    var stack = [];
    var self = this;
    var keys = ['up', 'down', 'left', 'right'];

    function shuffle(arr) {
        for (var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    };

    var carveTo = function(x, y) {
        var cell = self.getCell(x, y);

        if (cell.init) {
            stack.pop();
            var next = stack.pop();
            self.getCell(next.x, next.y).init = false;

            if (stack.length > 0) {
                carveTo(next.x, next.y);
            }

            return true;
        }

        cell.init = true;
        stack.push({x: x, y: y});

        var neig = self.getNeighbors(x, y);
        keys = shuffle(keys);
        var check = 0;
        var rand = 0;

        while (check++ < keys.length) {
            rand = keys[check - 1];

            switch (rand) {
                case 'up':
                    if (!neig.up.init) {
                        self.clearWall(x, y, Cell.walls.UP);
                        self.clearWall(x, y - 1, Cell.walls.DOWN);
                        y--;
                        check = keys.length;
                    }
                    break;

                case 'down':
                    if (!neig.down.init) {
                        self.clearWall(x, y, Cell.walls.DOWN);
                        self.clearWall(x, y + 1, Cell.walls.UP);
                        y++;
                        check = keys.length;
                    }
                    break;
                case 'left':
                    if (!neig.left.init) {
                        self.clearWall(x, y, Cell.walls.LEFT);
                        self.clearWall(x - 1, y, Cell.walls.RIGHT);
                        x--;
                        check = keys.length;
                    }
                    break;
                case 'right':
                    if (!neig.right.init) {
                        self.clearWall(x, y, Cell.walls.RIGHT);
                        self.clearWall(x + 1, y, Cell.walls.LEFT);
                        x++;
                        check = keys.length;
                    }
                    break;
            }
        }

        carveTo(x, y);
    };

    return carveTo(0, 0);
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

/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {Array.<Cell>}
 */
Board.prototype.getNeighbors = function(x, y) {
    return {
        up: (y > 0 ? this.getCell(x, y - 1) : Cell.dummy),
        down: (y < this.height - 1 ? this.getCell(x, y + 1) : Cell.dummy),
        left: (x > 0 ? this.getCell(x - 1, y) : Cell.dummy),
        right: (x < this.width - 1 ? this.getCell(x + 1, y) : Cell.dummy)
    };
};

/**
 *
 * @param {Player} hero
 * @param {number} dir
 * @param {number} back
 * @return bool
 */
Board.prototype.canMove = function(hero, dx, dy, dir, back) {
    var x = parseInt(hero.x + dx, 10);
    var y = parseInt(hero.y + dy, 10);

    if (hero.x < -Math.abs(dx) || hero.y < -Math.abs(dy)) {
        return false;
    }

    if (hero.x + 1 > this.width + Math.abs(dx) || hero.y + 1 > this.height + Math.abs(dy)) {
        return false;
    }

    var cell = this.getCell(x, y) || Cell.dummy;

    if (cell.walls & dir) {
//        return false;
    }

    return true;
};

var Controller = function() {
    this.keys = {};
};

Controller.Keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
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
    this.cellWidth = this.width / this.board.width;
    this.cellHeight = this.height / this.board.height;

    this.colors = {
        bg: options.bgColor,
        wall: options.wallColor
    };

    this.fps = options.fps || 32;
    this.delay = 1000 / this.fps;
    this.lastTime = 0;

    this.target = options.target;
    this.hero = options.hero;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext('2d');

    var container = options.container || document.body;
    container.appendChild(this.canvas);
};

BoardRenderer.prototype.render = function(time) {
    var now = time - this.lastTime;

    if (now > this.delay) {
        var cells = this.board.cells;
        var pos = {};

        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.fillStyle = this.target.color;
        this.ctx.fillRect(this.target.x * this.cellWidth, this.target.y * this.cellHeight, this.target.width, this.target.height);
        this.ctx.fillStyle = this.colors.wall;

        for (var i = 0, len = cells.length; i < len; i++) {
            pos = this.board.getPos(i);

            if (cells[i].walls & Cell.walls.LEFT) {
                this.ctx.fillRect(pos.x * this.cellWidth, pos.y * this.cellHeight, this.wallThickness, this.cellHeight);
            }

            if (cells[i].walls & Cell.walls.UP) {
                this.ctx.fillRect(pos.x * this.cellWidth, pos.y * this.cellHeight, this.cellWidth, this.wallThickness);
            }

            if (cells[i].walls & Cell.walls.RIGHT) {
                this.ctx.fillRect((pos.x + 1) * this.cellWidth - this.wallThickness, pos.y * this.cellHeight, this.wallThickness, this.cellHeight);
            }

            if (cells[i].walls & Cell.walls.DOWN) {
                this.ctx.fillRect(pos.x * this.cellWidth, (pos.y + 1) * this.cellHeight - this.wallThickness, this.cellWidth, this.wallThickness);
            }
        }

        this.ctx.fillStyle = this.hero.color;
        this.ctx.fillRect(this.hero.x * this.cellWidth + (this.cellWidth * 0.25), this.hero.y * this.cellHeight + (this.cellHeight * 0.25), this.hero.width, this.hero.height);
        this.ctx.fillStyle = this.colors.wall;

        this.lastTime = now;
    }
};
