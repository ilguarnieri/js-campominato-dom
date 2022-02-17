
const btn_play = document.querySelector('.btn_play');
btn_play.addEventListener('click', startGame);

function startGame(){
    //reset grid
    resetGrid();
    console.clear();

    //modalità gioco
    const selectMode = modeGame();

    //generazione grid
    generateGrid(selectMode);
}


//reset contenuto grid
function resetGrid(){

    const grid_wrapper = document.querySelector('.grid-wrapper');
    grid_wrapper.innerHTML = '';
    //impostazione border padding grid
    grid_wrapper.style.border = '0';
    grid_wrapper.style.padding = '0';    
    
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid');
    grid_wrapper.append(gridElement);
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


//generatore bombe
function generateBombs(totalBombs, min, max){

    const arrayBombs = [];
    do {
        const numbBomb = getRandom(min, max);
        if(!arrayBombs.includes(numbBomb)){
            arrayBombs.push(numbBomb);
        }
    }while(arrayBombs.length < totalBombs);

    //ordinamento array
    arrayBombs.sort((a, b) => a - b);
    return arrayBombs;
}


//generazione grid
function generateGrid(difficulty){
    const gridElement = document.querySelector('.grid');
    let colums_rows, bombs, score = 0;

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
    bombs = generateBombs(16, 1, square_tot);
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
       

    //click
    function gridCallBack(event){
        const element = event.target.closest('.square');
        const numberSquare = parseInt(element.dataset.number);
        const allBombs = document.getElementsByClassName('square');

        //trovo la bomba
        if(bombs.includes(numberSquare)){
            element.classList.add('bomb');

            //game over
            console.log(`'Hai perso totalizzando ${score}`);

            //ricerca di tutte le bombe            
            for(let i = 1; i <= square_tot; i++){
                if(bombs.includes(i)){                    
                    allBombs[i].classList.add('bomb');
                }
            }

            //blocco listener
            gridElement.removeEventListener('click', gridCallBack);
        }else{
            //casella libera
            element.classList.add('selected');
            score++;
        }
    }

    gridElement.addEventListener('click', gridCallBack);

}
