var main = function(){
    var board = new Board(5, 5);
    var renderer = new BoardRenderer(board, {
        width: 500,
        height: 500,
        thickness: 3,
        bgColor: '#fff',
        wallColor: '#c00'
    });

    renderer.render();
};
