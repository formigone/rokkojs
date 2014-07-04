var main = function(){
    var board = new Board(32, 32);
    board.generate();

    var ctrl = new Controller();
    var points = board.seed();
    var target = new Player(points.start.x, points.start.y, window.innerWidth / board.width * 0.8, window.innerHeight / board.height * 0.8, '#cc0');
    var hero = new Player(points.end.x, points.end.y, window.innerWidth / board.width * 0.8, window.innerHeight / board.height * 0.8, '#c00');


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
        lastUpdate = time;

        if (ctrl.keys[Controller.Keys.UP] && board.canMove(hero.x, hero.y - 1, Cell.walls.UP)) {
            hero.y -= move * delta;
        }

        if (ctrl.keys[Controller.Keys.DOWN] && board.canMove(hero.x, hero.y + 1, Cell.walls.DOWN)) {
            hero.y += move * delta;
        }

        if (ctrl.keys[Controller.Keys.LEFT] && board.canMove(hero.x - 1, hero.y, Cell.walls.LEFT)) {
            hero.x -= move * delta;
        }

        if (ctrl.keys[Controller.Keys.RIGHT] && board.canMove(hero.x + 1, hero.y, Cell.walls.RIGHT)) {
            hero.x += move * delta;
        }
    };

    var gameLoop = function(time) {
        update(time);
        renderer.render(time);

        requestAnimationFrame(gameLoop);
    };

    gameLoop(0);
};
