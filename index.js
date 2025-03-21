let circle = '<img src="./imgs/circle.svg" alt="o" class="placed">';
let cross = '<img src="./imgs/x-lg.svg" alt="x" class="placed">';
let player1Score = 0;
let player2Score = 0;
let isCircle = true;
let gameEnd = false;
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

$(".box").click(function() {
    let index = $(".box").index(this);
    let row =  Math.floor(index / 3);
    let col = index % 3;

    if (gameEnd) {
        return;
    }

    if ($(this).find("img").length > 0) {
        return;
    }

    if (isCircle) {
        $(this).append(circle);
        board[row][col] = "O";
        $("h2").text("It's X's turn.");
    } else {
        $(this).append(cross);
        board[row][col] = "X";
        $("h2").text("It's O's turn.");
    }

    if (checkWinner(isCircle ? "O" : "X")) {
        $("h2").text((isCircle ? "O" : "X") + " WIN!");
        getPoint();
        $(".scoreO").text(player1Score);
        $(".scoreX").text(player2Score);
        gameEnd = true;
        return;
    }

    if (checkDraw()) {
        $("h2").text("DRAW!");
        gameEnd = true;
        return;
    }
    isCircle = !isCircle;
});

$("#newGame").click(function() {
    restartGame();
});

$("#reset").click(function() {
    reset();
});



function checkWinner(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true; //check row
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true; //check col
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true; //check cross
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;

    return false;
}

function checkDraw() {
    return board.flat().every(cell => cell !== "");
}

function restartGame() {
    gameEnd = false;
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    isCircle = true;
    $(".box").empty();
    $("h2").text("Who can be the winner?");
}

function reset() {
    restartGame();
    player1Score = 0;
    player2Score = 0;
    $(".scoreO").text(player1Score);
    $(".scoreX").text(player2Score);
    $("h2").text("Who can be the winner?");
}

function getPoint() {
    if (isCircle) {
        player1Score += 1;
    } else {
        player2Score += 1;
    }
}