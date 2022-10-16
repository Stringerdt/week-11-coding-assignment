// array with list of win conditions
const winCons = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// sets default states of player, turn, and winners
currentPlayer = "X";
turnCounter = 0;
isGameOver = false;

// displays status of who won the game
const handleGameOver = (winner) => {
    // sets isGameOver to true, to prevent future turns
    isGameOver = true;
    // removes text to $(".status-text") h3
    $(".status-text").text("");
    // conditional to see who won, or if game was draw
    if (winner === "Draw") {
        // Sets the victory text for each result, and removes the d-none(display: hidden) class from the alert div, for draws, changes alert to warning color
        $(".alert").text("It's a Draw!").removeClass("d-none").addClass("alert-warning");
    } else if (winner === "X") {
        $(".alert").text("Player X Wins!").removeClass("d-none");
    } else if (winner === "O") {
        $(".alert").text("Player O Wins!").removeClass("d-none");
    }
}

// sets the cell (ran when clicked)
const setCell = (cell) => {
    // sets the data-filled attribute to true, to prevent a cell from being clicked again
    cell.setAttribute("data-filled", "true");
    // sets the innerText to the currentPlayer value
    cell.innerText = currentPlayer;
    // runs the checkWinner() function, to see if there is a winner after the square is clicked
    checkWinner();
    // checks if checkWinner set isGameOver to true, if game is not over, runs logic
    if (isGameOver === false) {
        // if changes the current player to the opposite player, and updates status text accordingly
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
            $(".status-text").text("O's Turn");
        } else if (currentPlayer === 'O') {
            currentPlayer = 'X';
            $(".status-text").text("X's Turn");
        }
        // adds 1 to turnCounter to check for draws
        turnCounter++;
        // if 9 turns have occured, then runs gameOver as a draw
        if (turnCounter === 9) {
            handleGameOver("Draw");
        }
    }
}

const checkWinner = () => {
    // loops through the array of winCons
    for (winCon of winCons) {
        // sets cell0, cell1, and cell2 to the index's of the winCons
        let cell0 = $(".cell")[winCon[0]];
        let cell1 = $(".cell")[winCon[1]];
        let cell2 = $(".cell")[winCon[2]];
        // checks if all cells are equal, if they are not blank
        if(cell0.innerText === cell1.innerText && cell0.innerText === cell2.innerText && cell0.innerText !== "") {
            // changes text-color of the winning cells to success(green) color on win
            cell0.classList.add("text-success");
            cell1.classList.add("text-success");
            cell2.classList.add("text-success");
            // handles gameOver for the current player who played last
            handleGameOver(currentPlayer);
        } 
    }
}

// add event lister for the cells on the game board
$(".cell").on("click", (e) => {
    // checks to ensure game is not over
    if (isGameOver === false) {
        // if the data-filled attribute is false, then the move is legal
        if(e.target.getAttribute("data-filled") !== 'true') {
            setCell(e.target);
        } else {
            e.target.classList.add("bg-danger")
            setTimeout(() => e.target.classList.remove("bg-danger"), 200)
        }
    }
});

// add event listener to reset button
$(".btn").on("click", () => {
    // sets attributes/text/classes/variables back to default for a new game
    $(".cell").attr("data-filled", false);
    $(".cell").text("");
    $(".cell").removeClass("text-success");
    $(".status-text").text("X's Turn");
    $(".alert").addClass("d-none").removeClass("alert-warning");
    currentPlayer = 'X';
    turnCounter = 0;
    isGameOver = false;
});

