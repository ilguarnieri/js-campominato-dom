const btn_play = document.querySelector('.btn_play');
btn_play.addEventListener('click', startGame);

const solution = document.querySelector('.solution');

//START
function startGame(){
    const score_wrapper = document.querySelector('.score-wrapper');    

    //reset grid
    resetGrid();
    console.clear();
    score_wrapper.classList.remove('d-none');
    score_wrapper.classList.add('animation_score');
    solution.classList.remove('d-none');
    solution.classList.add('animation_score');

    //modalità gioco
    const selectMode = modeGame();

    //generazione grid
    generateGrid(selectMode);
}


//reset contenuto grid
function resetGrid(){

    const grid_wrapper = document.querySelector('.grid-wrapper');
    const user_score = document.querySelector('.user_score');
    const score_emoji = document.querySelector('.score_emoji');

    grid_wrapper.innerHTML = '';
    user_score.innerHTML = '0';
    //impostazione border padding grid
    grid_wrapper.style.border = '0';
    grid_wrapper.style.padding = '0';
    solution.innerHTML = 'CLicca emoji in alto';

    //impostazione emoji
    score_emoji.innerHTML = '';
    const emoji = document.createElement('div');
    emoji.classList.add('score_smile', 'style-gray', 'style_hv', 'emoji');
    score_emoji.append(emoji);
    
    //creazione grid    
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


function checkBomb(totaleCelle, arrayBombs, variabileCelle, classeAdd){
    for(let i = 1; i <= totaleCelle; i++){
        if(arrayBombs.includes(i)){
            variabileCelle[i - 1].classList.add(classeAdd);
        }
    }
}


//generazione grid
function generateGrid(difficulty){
    const gridElement = document.querySelector('.grid');
    const score_smile = document.querySelector('.score_smile');
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
    /* console.log(bombs); */

    //creazione deglle celle
    for(let i = 1; i <= square_tot; i++){

        const square = document.createElement('div');
        //aggiunta classe cella
        square.classList.add('square', 'style-gray');
        //impostazioni dimensione cella
        square.style.width = `calc(100% / ${colums_rows})`;
        //inserimento numero cella
        square.dataset.number = i;
        
        gridElement.append(square);
    }

    //click casella
    gridElement.addEventListener('click', gridCallBack);

    //rivelazione soluzioni    
    score_smile.addEventListener('click', function(){
        const allBombs = document.getElementsByClassName('square');

        //se presente lo smile
        if(score_smile.classList.contains('emoji')){

            score_smile.classList.remove('emoji');
            score_smile.classList.add('evil');

            solution.innerHTML = `TI PIACE GIOCARE FACILE!`;

            //ricerca di tutte le bombe
            checkBomb(square_tot, bombs, allBombs, 'reveals_bomb');

        }else if(score_smile.classList.contains('evil')){
            //se presente devil
            score_smile.classList.remove('evil');
            score_smile.classList.add('emoji');

            solution.innerHTML = 'CLicca emoji in alto';
            for(let i = 1; i <= square_tot; i++){
                if(bombs.includes(i)){
                    allBombs[i - 1].classList.toggle('reveals_bomb');
                }
            }
        }else if(score_smile.classList.contains('party') || score_smile.classList.contains('dizzy')){
            startGame();
        }
    });

    //funzione click casella
    function gridCallBack(event){
        const element = event.target.closest('.square');
        const numberSquare = parseInt(element.dataset.number);
        const user_score = document.querySelector('.user_score');
        const allBombs = document.getElementsByClassName('square');

        //trovo la bomba
        if(bombs.includes(numberSquare)){
            element.classList.add('bomb');

            //cambio emoji
            score_smile.classList.remove('emoji', 'evil');
            score_smile.classList.add('dizzy');

            //messaggio da visualizzare
            solution.innerHTML = '';
            const par1 = document.createElement('p');
            par1.classList.add('text-red');
            par1.innerHTML = 'HAI PERSO!';
            solution.append(par1);
            const par2 = document.createElement('p');
            par2.innerHTML = `Hai totalizzato ${score} punti`;
            solution.append(par2);

            //ricerca di tutte le bombe
            checkBomb(square_tot, bombs, allBombs, 'bomb');

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
                solution.innerHTML = '';
                const par1 = document.createElement('p');
                par1.classList.add('text-green');
                par1.innerHTML = 'HAI VINTO!';
                solution.append(par1);
                solution.append(par1);
                const par2 = document.createElement('p');
                par2.innerHTML = `Hai totalizzato ${score} punti`;
                solution.append(par2);

                //cambio emoji
                score_smile.classList.remove('emoji', 'evil');
                score_smile.classList.add('party');

                //ricerca di tutte le bombe
                checkBomb(square_tot, bombs, allBombs, 'flag');

                //blocco listener alla fine del gioco
                gridElement.removeEventListener('click', gridCallBack);
            }
        }
    }
}
