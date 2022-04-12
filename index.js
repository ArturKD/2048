
    const newGame = document.querySelector('.new-game');
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('results');
    const bestScores = document.querySelector('.best-scores')
    const width = 4;
    let squares = [];
    let score = 0;
    let totalScore = [];
    let currentScore = [];

// board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.classList.add('square');
            square.innerHTML = '';
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
    }
createBoard();

// random number
    function generate() {
       let randomNumber = Math.floor(Math.random() * squares.length);
       if (squares[randomNumber].innerHTML == 0) {
           squares[randomNumber].innerHTML = 2;
           checkLose();
       } else {
           generate()
        }
        color();
    }

//swipe right
    function moveRight(){
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let numRow = [parseInt(totalOne), parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                let filteredRow = numRow.filter(a => a);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow);
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

//swipe left
    function moveLeft(){
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let numRow = [parseInt(totalOne), parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]
                let filteredRow = numRow.filter(a => a);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros);
                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

//swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width + width].innerHTML;
            let totalFour = squares[i + width + width + width].innerHTML;
            let numColumn  = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredColumn = numColumn.filter(a => a);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);
            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width + width].innerHTML = newColumn[2];
            squares[i + width + width + width].innerHTML = newColumn[3];
        }
    }

//swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width + width].innerHTML;
            let totalFour = squares[i + width + width + width].innerHTML;
            let numColumn  = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
            let filteredColumn = numColumn.filter(a => a);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);
            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + width + width].innerHTML = newColumn[2];
            squares[i + width + width + width].innerHTML = newColumn[3];
        }
    }
// column
    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = 0;
                score += parseInt(combinedTotal);
                scoreDisplay.innerHTML = score;
            }
        }
        checkWin();
        totalScores();
    }

//row
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;

            }
        }
        checkWin();
        totalScores();
    }
// assign keys
    function control(e) {
        if(e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }

    document.addEventListener('keyup', control)

    function keyRight(){
        moveRight();
        combineRow();
        moveRight();
        generate();
        color();
    }
    function keyLeft(){
        moveLeft();
        combineRow();
        moveLeft();
        generate();
        color();
    }
    function keyDown(){
        moveDown();
        combineColumn();
        moveDown();
        generate();
        color();
    }
    function keyUp(){
        moveUp();
        combineColumn();
        moveUp();
        generate();
        color();
    }

// win
    function checkWin(){
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You win!';
                document.removeEventListener('keyup', control);
            }
        }
    }
// lose
    function checkLose() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You lose!'
            document.removeEventListener('keyup', control)
        }
    }
//scores
    function totalScores() {
        currentScore.push(scoreDisplay.innerHTML);
    }
    function createBestScores() {
        clearBestScores();
        for (let i = 0; i < 10; i++) {
            scoreDesk = document.createElement('div');
            scoreDesk.classList.add('score-desk');
            if(totalScore[i] === undefined){
                totalScore[i] = 0;
            }
            scoreDesk.innerHTML = `${i+1} place:` + `  ${totalScore[i]}`;
            bestScores.appendChild(scoreDesk);
        }
    }

    function clearBestScores() {
        bestScores.innerHTML = '';
    }

// color
    function color() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2) {
                squares[i].style.backgroundColor = '#eee4da';
                squares[i].style.color = '#776e65';
            } else if (squares[i].innerHTML == 4) {
                squares[i].style.backgroundColor = "#ede0c8";
                squares[i].style.color = '#776e65';
            } else if (squares[i].innerHTML == 8) {
                squares[i].style.color = "#ffffff";
                squares[i].style.backgroundColor = "#f2b179";
            } else if (squares[i].innerHTML == 16) {
                squares[i].style.backgroundColor = '#f59563';
            } else if (squares[i].innerHTML == 32) {
                squares[i].style.backgroundColor = '#f67c5f';
            } else if (squares[i].innerHTML == 64) {
                squares[i].style.backgroundColor = '#f65e3b';
            } else if (squares[i].innerHTML == 128) {
                squares[i].style.backgroundColor = '#edcf72';
            } else if (squares[i].innerHTML == 256) {
                squares[i].style.backgroundColor = '#edcc61';
            } else if (squares[i].innerHTML == 512) {
                squares[i].style.backgroundColor = '#edc850';
            }else if (squares[i].innerHTML == 1024) {
                squares[i].style.backgroundColor = '#edc22e';
            }else if (squares[i].innerHTML == 2048) {
                squares[i].style.backgroundColor = '#3e3933';

            } else {
                squares[i].style.backgroundColor = '#ccc0b3';
                squares[i].innerHTML = '';
            }
        }
    }
// sort score
    function totalScoreSort() {
        totalScore.push(currentScore[currentScore.length - 1]);
        totalScore = totalScore.sort(function (a, b) {return b - a})
    }
//reset button
    function reset() {
        gridDisplay.innerHTML = '';
        resultDisplay.innerHTML = '';
        document.addEventListener('keyup', control);
        squares = [];
        score = 0;
        createBoard();
        totalScoreSort();
        createBestScores();
        setLocalStorage();
    }
//local storage
    function setLocalStorage() {
        localStorage.setItem('localScore', totalScore);
   }
    window.addEventListener('beforeunload', setLocalStorage);

    function getLocalStorage() {
        if (localStorage.getItem('localScore')) {
          totalScore = localStorage.getItem('localScore').split(',');
            createBestScores();
       }
    }
    window.addEventListener('load', getLocalStorage);
    newGame.addEventListener('click', reset);

// console
    console.log('Ваша отметка - 55 балла(ов)\n' +
        'Отзыв по пунктам ТЗ:\n' +
        'Не выполненные/не засчитанные пункты:\n' +
        '1) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения\n' +
        '\n' +
        'Нет у меня высокого качества.\n' +
        '\n' +
        'Частично выполненные пункты:\n' +
        '1) Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам — 9 балл(а)\n' +
        '\n' +
        'Нарушена немного догика когда проигрываешь. Написал заканчивать из-за отсутсвия свободных клеток. Но иногда возможность хода есть, а клеток пустых нет.\n' +
        '\n' +
        '2) Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов — 6 балл(а)\n' +
        '\n' +
        'Не успел доделать анимацию. Есть только при старте новой игры. При свайпах нет. Ну и в целом дизайн ещё нужно мне дорабатывать.\n' +
        '\n' +
        'Не судите строго, я разбираюсь и доделываю.:(\n')

