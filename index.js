const action = document.getElementById("gameboard");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

const gameboard = (function () {
    const boardState = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    const checkWin = function () {

        if (boardState[0] === boardState[1] && boardState[1] === boardState[2] && boardState[0] !== " ") {
            winner = boardState[0];
            return true;
        } else if (boardState[0] === boardState[3] && boardState[3] === boardState[6] && boardState[0] !== " ") {
            winner = boardState[0];
            return true;
        } else if (boardState[0] === boardState[4] && boardState[4] === boardState[8] && boardState[0] !== " ") {
            winner = boardState[0];
            return true;
        } else if (boardState[6] === boardState[7] && boardState[7] === boardState[8] && boardState[6] !== " ") {
            winner = boardState[6];
            return true;
        } else if (boardState[8] === boardState[5] && boardState[5] === boardState[2] && boardState[8] !== " ") {
            winner = boardState[8];
            return true;
        } else if (boardState[2] === boardState[4] && boardState[4] === boardState[6] && boardState[2] !== " ") {
            winner = boardState[2];
            return true;
        } else if (boardState[1] === boardState[4] && boardState[4] === boardState[7] && boardState[1] !== " ") {
            winner = boardState[2];
            return true;
        } else {
            return false;
        }
    }

    return {boardState, checkWin};
}) ();

const displayController = (function () {
    let actualMark = "X";

    const init = () => {
        gameboard.boardState.map((state, index) => {
            gameboard.boardState[index] = " ";
            document.getElementById(`${index}`).innerHTML = " "
        })
        document.getElementById("playerTurn").innerHTML = `Player ${actualMark}'s turn`;
    }

    const getActualMark = () => {
        return actualMark;
    }

    const setNewMark = () => {
        if (actualMark === "X") {
            actualMark = "0";
        } else {
            actualMark = "X";
        }
    }

    return { init, getActualMark, setNewMark }
}) ();

function player(mark) {
    let victory = 0;
    const setVictory = () => victory++;
    const getVictory = () => {return victory};

    return {mark, setVictory, getVictory};
}

action.addEventListener("click", (event) => {
    if (event.target.tagName === 'BUTTON') {
        const mark = displayController.getActualMark();
        document.getElementById(event.target.id).innerHTML = mark;
        gameboard.boardState[event.target.id] = mark;
        if (gameboard.checkWin()) {
            if (mark === "X") {
                p1.setVictory();
            } else {
                p2.setVictory();
            }
            document.getElementById("playerWin").innerHTML = `${mark} win!`
            document.getElementById("counter").innerHTML = `X: ${p1.getVictory()} | 0: ${p2.getVictory()}`
            dialog.showModal();
        } else {
            displayController.setNewMark();
            document.getElementById("playerTurn").innerHTML = `Player ${displayController.getActualMark()}'s turn`;
        }
    }
});

closeButton.addEventListener("click", () => {
    displayController.init();
    dialog.close();
})

dialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        e.preventDefault();
    }
})

const p1 = player("X");
const p2 = player("0");