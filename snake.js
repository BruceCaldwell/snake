$(document).ready(function () {
    // First we'll initialize some variables

    var moves = [
        ['left', 0],
        ['up', 1]
    ]; // This is the array of moves that are initialized every loop.

    var pieces = [
        [0, 0],
        [0, 1],
        [0, 2]
    ]; // Array of snake pieces and their positions, starts with one.

    function renderSnake() {
        var c = document.getElementById('snake'), canvas = c.getContext('2d');

        canvas.clearRect(0, 0, c.width, c.height);
        canvas.fillStyle = '#F4F4F4';
        canvas.fillRect(8, 8, 284, 284);

        for (var i = 0; i < pieces.length; i++) {
            var posx, posy, piece = pieces[i];

            canvas.fillStyle = '#333333';

            posx = 140 + (piece[0] * 7);
            posy = 140 + (piece[1] * 7);

            canvas.fillRect(posx, posy, 5, 5);
        }
    }

    function loop() {
        var p = 0 , move, m;

        for (var i = 0; i < moves.length; i++) {
            move = moves[i];
            var direction = move[0], times = move[1];

            if (moves[i + 1] === undefined)
                times = pieces.length;

            for (var t = 0; t < times && pieces[p]; t++, p++) {

                if (direction === 'left')
                    pieces[p][0] -= 1;
                else if (direction === 'right')
                    pieces[p][0] += 1;
                else if (direction === 'up')
                    pieces[p][1] -= 1;
                else if (direction === 'down')
                    pieces[p][1] += 1;
            }

            move[1] += 1;
        }

        renderSnake();

        if ((pieces[0][0] < 20 && pieces[0][0] > -19) && (pieces[0][1] < 20 && pieces[0][1] > -20))
            setTimeout(loop, 120);
    }

    loop();
});

//280