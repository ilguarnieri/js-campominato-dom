
const btn_play = document.querySelector('.btn_play');
btn_play.addEventListener('click', startGame);

function startGame(){
    //reset grid
    resetGrid();
    console.clear();

    //modalità gioco
    const difficulty = modeGame();

    //generazione grid
    generateGrid(difficulty);
}


//reset contenuto grid
function resetGrid(){
    const gridElement = document.querySelector('.grid');
    gridElement.innerHTML = '';
    //impostazione border padding grid
    gridElement.style.border = '0';
    gridElement.style.padding = '0';
}


//modalità gioco
function modeGame(){
    const select_difficulty = document.getElementById('select_difficulty').value;
    return parseInt(select_difficulty);
}


//funzione random
function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}


//generazione grid
function generateGrid(difficulty){
    const gridElement = document.querySelector('.grid');
    let colums_rows;

    //impostazione colonne-righe
    switch(difficulty){

        case 1:
            //easy
            colums_rows = 10;
            break;

        case 2:
            //hard
            colums_rows = 9;
            break;

        case 3:
            //crazy
            colums_rows = 7;
            break;
    }
    //totale celle
    const square_tot = Math.pow(colums_rows, 2);

    //generazione bombe
    const bombs = [];
    while(bombs.length < 16){
        const numbBomb = getRandom(1, square_tot);
        if(!bombs.includes(numbBomb)){
            bombs.push(numbBomb);
        }
    }

    //ordinamento array
    bombs.sort((a, b) => a - b);
    console.log(bombs);

    //creazione deglle celle
    for(let i = 1; i <= square_tot; i++){

        const square = document.createElement('div');
        //aggiunta classe cella
        square.classList.add('square');
        //impostazioni dimensione cella
        square.style.width = `calc(100% / ${colums_rows})`;
        //inserimento numero cella
        square.dataset.number = i;
        
        gridElement.append(square);        
    }
       

    function gridCallBack(event){
        const element = event.target.closest('.square');
        const numberSquare = parseInt(element.dataset.number);

        if(bombs.includes(numberSquare)){
            element.classList.add('red');
        }else{
            element.classList.add('selected');
        }
    }

    gridElement.addEventListener('click', gridCallBack);
}