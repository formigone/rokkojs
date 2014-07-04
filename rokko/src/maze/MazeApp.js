var main = function(){
    var board = new Board(25, 25);
    board.generate();

    var ctrl = new Controller();
    var points = board.seed();
    console.log(points);
    var target = new Player(points.start.x, points.start.y, window.innerWidth / board.width * 0.5, window.innerHeight / board.height * 0.5, '#cc0');
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

        target: target,
        hero: hero
    });

    var move = 0.0015;
    var lastUpdate = 0;

    var update = function(time){
        var delta = time - lastUpdate;
        lastUpdate = time;

        if (ctrl.keys[Controller.Keys.UP]) {
            console.log(hero.x, hero.y);
            hero.y -= move * delta;
        }

        if (ctrl.keys[Controller.Keys.DOWN]) {
            hero.y += move * delta;
        }

        if (ctrl.keys[Controller.Keys.LEFT]) {
            hero.x -= move * delta;
        }

        if (ctrl.keys[Controller.Keys.RIGHT]) {
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
