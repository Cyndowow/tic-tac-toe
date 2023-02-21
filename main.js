const gameBoardModule = (() => {
    let _board = ["X","O","X",
                  "O","X","O",
                  "X","O","X"];
    /*new Array(9);*/

    const renderBoard = () => {
        let field = _board;
        const container = document.getElementById('board');
        let gameButton = document.createElement('button');

        gameButton.innerHTML = field;
        container.appendChild(gameButton);
    }
    return {renderBoard};
})();

const displayController = (() => {
});

const player = () => {

}