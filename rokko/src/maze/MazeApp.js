var main = function(){
    var board = new Board(2, 2);
    board.generate();
    var renderer = new BoardRenderer(board, {
        width: 500,
        height: 500,
        thickness: 3,
        bgColor: '#fff',
        wallColor: '#c00'
    });

    renderer.render();
};
