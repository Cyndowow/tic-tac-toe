const gameBoardModule = (() => {
    let _board = ["","","","","","","","",""];

    const getGameBoard = (index) => {
        if (index > _board.length) return;
        return _board[index]
    };

    const setGameboard = (index, sign) => {
        if (index > _board.length) return;
        _board[index] = sign;
    };

    const reset = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = "";
        }
    }

    return {
        getGameBoard,
        setGameboard,
        reset
    };
})();

const displayController = (() => {
    const fieldElements = document.querySelectorAll('.field');
    const restart = document.getElementById('restart');
    const messageElement = document.getElementById ('message');

    fieldElements.forEach((field) =>
        field.addEventListener("click", (e) => {
            if (gameFlow.getIsOver() || e.target.textContent !== "") return;
            gameFlow.playRound(parseInt(e.target.dataset.index));
            updateGameBoard();
        })
    )

    const updateGameBoard = () => {
        for (let i = 0; fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoardModule.getGameBoard(i);
        }
    };

    restart.addEventListener("click", (e) => {
        gameBoardModule.reset();
        gameFlow.reset();
        updateGameBoard();
    });

    const setMessage = (message) => {
        messageElement.textContent = message;
    }

    const setResultMessage = (winner) => {
        if (winner === "Draw") {
            setMessage("It's a draw!");
        } else {
            setMessage(`Player ${winner} has won!`);
        }
    }



    return {
        setMessage,
        setResultMessage
    }
})();

const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return {
        getSign,
    };
};

const gameFlow = (() => {
    const _playerOne = player('X');
    const _playerTwo = player('O');
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        gameBoardModule.setGameboard(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayController.setResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        if (round === 9) {
            displayController.setResultMessage("Draw");
            isOver = true;
            return;
        }
        round++;
        displayController.setMessage(
            `Player ${getCurrentPlayerSign()}'s turn`
        );
    }


    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? _playerOne.getSign() : _playerTwo.getSign();
    }

    const reset = () => {
        round = 1;
        isOver = false;
        displayController.setMessage("Player X's turn");
    }

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    

    return winConditions
        .filter((combination) => combination.includes(fieldIndex))
        .some((possibleCombination) =>
            possibleCombination.every(
                (index) => gameBoardModule.getGameBoard(index) === getCurrentPlayerSign()
            )
        );
    };

    const getIsOver = () => {
        return isOver;
    }


    return {
        playRound,
        reset,
        getIsOver
    }
})();