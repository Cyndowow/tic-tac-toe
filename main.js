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

    fieldElements.forEach((field) =>
        field.addEventListener("click", (e) => {
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
    })



    return {
        updateGameBoard,
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
        round++;
        
    }


    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? _playerOne.getSign() : _playerTwo.getSign();
    }

    const reset = () => {
        round = 1;
        isOver = false;
    }

    return {
        playRound,
        reset
    }
})();