$(document).ready(function () {
    // First we'll initialize some variables

    var moves = [
        {x: 0, y: -1, hit: 1},
        {x: 1, y: 0, hit: 0}
    ]; // This is the array of moves that are initialized every loop.

    var pieces = [
        [0, 0],
        [0, 1],
        [0, 2]
    ]; // Array of snake pieces and their positions, starts with one.

    function renderSnake() {
        var c = document.getElementById('snake'), canvas = c.getContext('2d');

        canvas.clearRect(0, 0, c.width, c.height);

        for (var i = 0; i < pieces.length; i++) {
            var posx, posy, piece = pieces[i];

            canvas.fillStyle = '#FFFFFF';

            posx = 150 + (piece[0] * 7);
            posy = 150 + (piece[1] * 7);

            canvas.fillRect(posx, posy, 5, 5);
        }
    }

    function loop() {
        var p = pieces.length - 1, move, m;

        for (var i = 0; i < moves.length; i++) {
            move = moves[i];
            m = 0;

            for (p; pieces[p] && (m <= move.hit || moves[i + 1] === undefined); m++, p--) {
                pieces[p][0] += move.x;
                pieces[p][1] += move.y;
            }
        }

        renderSnake();

        setTimeout(loop, 120);
    }

    loop();
});