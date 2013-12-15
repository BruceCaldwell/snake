$(document).ready(function () {
    // First we'll initialize some variables

    var snakedir = 'none', cherry = [], addAnother = 0;

    var pieces = [
        [0, 0],
        [0, 1],
        [0, 2]
    ]; // Array of snake pieces and their positions, starts with one.

    $(document).keydown(function (e) {
        if (e.keyCode === 37 && snakedir !== 'right')
            snakedir = 'left';
        else if (e.keyCode === 39 && snakedir !== 'left')
            snakedir = 'right';
        else if (e.keyCode === 38 && snakedir !== 'down')
            snakedir = 'up';
        else if (e.keyCode === 40 && snakedir !== 'up')
            snakedir = 'down';
    });

    function renderSnake() {
        var c = document.getElementById('snake'), canvas = c.getContext('2d');

        canvas.clearRect(0, 0, c.width, c.height);
        canvas.fillStyle = '#F4F4F4';
        canvas.fillRect(8, 8, 144, 144);

        canvas.fillStyle = '#BC2827';
        canvas.fillRect(70 + (cherry[0] * 7), 70 + (cherry[1] * 7), 5, 5);

        if (pieces[0][0] === cherry[0] && pieces[0][1] === cherry[1]) {
            addAnother = 1;
            addCherry();
        }

        if(hasCollisions(pieces, true)) {
            pieces = [
                [0, 0],
                [0, 1],
                [0, 2]
            ];
            snakedir = 'none';
        }

        for (var i = 0; i < pieces.length; i++) {
            var posx, posy, piece = pieces[i];

            canvas.fillStyle = '#333333';

            if ((piece[0] > 10 || piece[0] < -9) || (piece[1] > 10 || piece[1] < -9)) { // Reset
                pieces = [
                    [0, 0],
                    [0, 1],
                    [0, 2]
                ];
                snakedir = 'none';
            }

            posx = 70 + (piece[0] * 7);
            posy = 70 + (piece[1] * 7);

            canvas.fillRect(posx, posy, 5, 5);
        }
    }

    var addCherry = function () {
        var r1 = Math.floor(Math.random() * (20)) - 9;
        var r2 = Math.floor(Math.random() * (20)) - 9;

        cherry = [r1, r2];
    };

    function hasCollisions(arr, justCheck) { // This was stolen. My function didn't work.
        var len = arr.length, tmp = {}, arrtmp = arr.slice(), dupes = [];
        arrtmp.sort();
        while (len--) {
            var val = arrtmp[len];
            if (/nul|nan|infini/i.test(String(val))) {
                val = String(val);
            }
            if (tmp[JSON.stringify(val)]) {
                if (justCheck) {
                    return true;
                }
                dupes.push(val);
            }
            tmp[JSON.stringify(val)] = true;
        }
        return justCheck ? false : dupes.length ? dupes : null;
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

        if (snakedir !== 'none') {
            pieces.unshift(newpiece); // Add new piece in the right direction
            if (!addAnother)
                pieces.pop(); // Get rid of last piece
            else
                addAnother = 0;

        }

        renderSnake();

        setTimeout(loop, 120);
    }

    addCherry();
    loop();
});