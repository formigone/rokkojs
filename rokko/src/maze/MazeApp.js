var main = function(){
    var board = new Board(10, 10);
    board.generate();
    var renderer = new BoardRenderer(board, {
        width: window.innerWidth,
        height: window.innerHeight,
        thickness: 1,
        bgColor: '#333',
        wallColor: '#fff'
    });

    renderer.render();
};
