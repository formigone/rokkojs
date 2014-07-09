/**
 * Copyright (c) 2014 Rodrigo Silveira. All rights reserved.
 * http://www.rodrigo-silveira.com
 */
var main = function(){
    var board = new Board(32, 32);
    board.generate();

    var ctrl = new Controller();
    var points = board.seed();
    var target = new Player(points.start.x, points.start.y, window.innerWidth / board.width, window.innerHeight / board.height, '#ff0');
    var hero = new Player(points.end.x, points.end.y, window.innerWidth / board.width * 0.5, window.innerHeight / board.height * 0.5, '#c00');


    document.body.addEventListener('keydown', function(e){
        ctrl.keys[e.keyCode] = true;
    });

    document.body.addEventListener('keyup', function(e){
        ctrl.keys[e.keyCode] = false;
    });

    var renderer = new BoardRenderer(board, {
        width: window.innerWidth,
        height: window.innerHeight,
        thickness: 1,
        bgColor: '#000',
        wallColor: '#0c0',
        fps: 2,

        target: target,
        hero: hero
    });

    var move = 0.005;
    var lastUpdate = 0;

    var update = function(time){
        var delta = time - lastUpdate;
        var toMove = move * delta;
        lastUpdate = time;

        if (ctrl.keys[Controller.Keys.UP]) {
            if (board.canMove(hero, 0, -toMove, Cell.walls.UP, Cell.walls.DOWN)) {
                hero.y -= toMove;
            } else {
                hero.y = parseInt(hero.y + toMove, 10);
            }
        } else if (ctrl.keys[Controller.Keys.DOWN]) {
            if (board.canMove(hero, 0, toMove, Cell.walls.DOWN, Cell.walls.UP)) {
                hero.y += toMove;
            } else {
                hero.y = parseInt(hero.y - toMove, 10);
            }
        }

        if (ctrl.keys[Controller.Keys.LEFT]) {
            if (board.canMove(hero, -toMove, 0, Cell.walls.LEFT, Cell.walls.RIGHT)) {
                hero.x -= toMove;
            } else {
                hero.x = parseInt(hero.x + toMove, 10);
            }
        } else if (ctrl.keys[Controller.Keys.RIGHT]) {
            if (board.canMove(hero, toMove, 0, Cell.walls.RIGHT, Cell.walls.LEFT)) {
                hero.x += toMove;
            } else {
                hero.x = parseInt(hero.x - toMove, 10);
            }
        }
    };

    var gameLoop = function(time) {
        update(time);
        renderer.render(time);

        requestAnimationFrame(gameLoop);
    };

    gameLoop(0);
};
