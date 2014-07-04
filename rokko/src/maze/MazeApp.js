var main = function(){
    var board = new Board(30, 30);
    board.generate();
    board.seed();
    var renderer = new BoardRenderer(board, {
        width: window.innerWidth,
        height: window.innerHeight,
        thickness: 1,
        bgColor: '#000',
        wallColor: '#0c0'
    });

    renderer.render();
};
