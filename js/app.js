
const btn_play = document.querySelector('.btn_play');
const score_wrapper = document.querySelector('.score-wrapper');
btn_play.addEventListener('click', startGame);

function startGame(){
    //reset grid
    resetGrid();
    console.clear();
    score_wrapper.classList.remove('d-none');
    score_wrapper.classList.add('animation_score');
   

    //modalità gioco
    const selectMode = modeGame();

    //generazione grid
    generateGrid(selectMode);
}


//reset contenuto grid
function resetGrid(){

    const grid_wrapper = document.querySelector('.grid-wrapper');
    const user_score = document.querySelector('.user_score');
    const score_smile = document.querySelector('.score_smile');

    grid_wrapper.innerHTML = '';
    user_score.innerHTML = '0';
    //impostazione border padding grid
    grid_wrapper.style.border = '0';
    grid_wrapper.style.padding = '0';

    //rimpostazione emoji
    score_smile.classList.remove('dizzy');
    score_smile.classList.add('emoji');
    
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid');
    grid_wrapper.append(gridElement);
    grid_wrapper.classList.add('animation_grid');
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
    let square_remain = document.querySelector('.square_remain');
    let colums_rows, bombs, score = 0;
    const totBombs = 16;
    const cells = [];

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
    //celle libere
    const freeSqaure = square_tot - totBombs;
    square_remain.innerHTML = `${freeSqaure}`;

    //generazione bombe
    bombs = generateBombs(totBombs, 1, square_tot);
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
        const user_score = document.querySelector('.user_score');
        const score_smile = document.querySelector('.score_smile');

        //trovo la bomba
        if(bombs.includes(numberSquare)){
            element.classList.add('bomb');
            score_smile.classList.remove('emoji');
            score_smile.classList.add('dizzy');

            //messaggio da visualizzare
            console.log(`'Hai perso totalizzando ${score}`);

            //ricerca di tutte le bombe            
            for(let i = 1; i <= square_tot; i++){
                if(bombs.includes(i)){                    
                    allBombs[i - 1].classList.add('bomb');
                }
            }

            //blocco listener se trovo una bomba
            gridElement.removeEventListener('click', gridCallBack);

        }else{
            //controllo casella
            if(!cells.includes(numberSquare)){
                element.classList.add('selected');
                score++;
                user_score.innerHTML = `${score}`;
                cells.push(numberSquare);
                square_remain.innerHTML = `${freeSqaure - score}`;
            }

            if(score === freeSqaure){

                //messaggio da visualizzare
                console.log(`'Hai VINTO totalizzando ${score}`);

                //ricerca di tutte le bombe
                for(let i = 1; i <= square_tot; i++){
                    if(bombs.includes(i)){                    
                        allBombs[i - 1].classList.add('x_bomb');
                    }
                }

                //blocco listener alla fine del gioco
                gridElement.removeEventListener('click', gridCallBack);
            }
        }
    }

    gridElement.addEventListener('click', gridCallBack);

}
