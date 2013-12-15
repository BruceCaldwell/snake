$(document).ready(function () {
    // First we'll initialize some variables

    var snakedir = 'left';

    var pieces = [
        [0, 0],
        [0, 1],
        [0, 2]
    ]; // Array of snake pieces and their positions, starts with one.

    $(document).keydown(function (e) {
        if (e.keyCode == 37 && snakedir != 'right')
            snakedir = 'left';
        else if (e.keyCode == 39 && snakedir != 'left')
            snakedir = 'right';
        else if (e.keyCode == 38 && snakedir != 'down')
            snakedir = 'up';
        else if (e.keyCode == 40 && snakedir != 'up')
            snakedir = 'down';
    });

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
        // Add a new piece in the direction it should be.

        var newpiece = [];

        if (snakedir === 'left') {
            newpiece.push(pieces[0][0] - 1);
            newpiece.push(pieces[0][1]);
        }
        if (snakedir === 'right') {
            newpiece.push(pieces[0][0] + 1);
            newpiece.push(pieces[0][1]);
        }
        if (snakedir === 'up') {
            newpiece.push(pieces[0][0]);
            newpiece.push(pieces[0][1] - 1);
        }
        if (snakedir === 'down') {
            newpiece.push(pieces[0][0]);
            newpiece.push(pieces[0][1] + 1);
        }

        pieces.unshift(newpiece);
        pieces.pop(); // Get rid of last piece

        //console.log(newpiece);
        //console.log(pieces);

        renderSnake();

        setTimeout(loop, 120);
    }

    loop();
});

//280