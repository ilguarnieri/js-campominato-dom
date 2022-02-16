
const btn_play = document.querySelector('.btn_play');

btn_play.addEventListener('click',() => {

    const select_difficulty = document.getElementById('select_difficulty').value;

    //nessuna difficoltà    
    if(select_difficulty === ''){
        alert('ATTENZIONE\nSeleziona una difficoltà di gioco!');
        location.reload();
    }

    resetGrid();
    gridGenerator(select_difficulty);
})


function gridGenerator (difficulty){

    const gridElement = document.querySelector('.grid');
    //impostazione background color grid
    gridElement.style.background = '#f0b623';
    //aggiunta animazione grid
    gridElement.classList.add('animation_grid');
    let colonne_righe;

    //impostazione colonne-righe
    switch(difficulty){

        case '1':
            colonne_righe = 10;
            break;

        case '2':
            colonne_righe = 9;
            break;

        case '3':
            colonne_righe = 7;
            break;
    }

    //totale celle
    const square_tot = Math.pow(colonne_righe, 2);

    //creazione deglle celle
    for(let i = 1; i <= square_tot; i++){

        const square = document.createElement('div');
        //aggiunta classe cella
        square.classList.add('square');
        //impostazioni dimensione cella
        square.style.width = `calc(100% / ${colonne_righe})`;
        square.append(i);
        gridElement.append(square);

        /* square.addEventListener('click', change_color); */
    }



    gridElement.addEventListener('click', gridCallBack)
}


//funzione reset griglia
const resetGrid = () =>{
    const gridElement = document.querySelector('.grid');
    gridElement.innerHTML = '';
}


/* //funzione listener cella
function change_color (){
    const element = this;
    element.classList.add('selected');
    element.removeEventListener('clic', change_color);
} */


function gridCallBack(event){

    console.log(event.target);
    const element = event.target.closest('.square');
    console.log(element)
    /* element.classList.add('selected'); */
}

