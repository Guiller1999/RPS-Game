let userChoice = null; // variable que contendrá la opción seleccionada por el usuario
const containerScore = document.getElementById('score'); // variable que contendrá el elemento que contiene a la tabla de score
const modal = document.getElementById('container-modal'); // variable que contendrá el elemento que contiene a la ventana modal
const btn_regresar = document.getElementById('btn-regresar'); // variable que contiene al botón de la ventana modal

const score = { // Objeto con propiedades que albergarán los puntajes del usuario y del computador
    user: 0,
    computer: 0
};

const choices = document.querySelectorAll('.choice'); // variable que contendrá todos los elementos con clase .choice
choices.forEach(choice => main(choice));

document.getElementById('reset').addEventListener('click', reset);

// Función principal que llama a los eventos que realiza el usuario
function main(choice) {
    choice.onmouseover = () => {
        getDarkIcon(choice);
    };

    choice.onmouseout = () => {
        getLightIcon(choice);
    };

    choice.onclick = () => {
        modificateIcon(choice);
        play(choice);
        
    };
}

// Cambia el diseño del ícono de un fondo blanco a un color de fondo negro
function getDarkIcon(element_choice) {
    element_choice.querySelector('i:first-child').classList.remove('fa-inverse');
}

// Cambia el diseño del ícono de las manos de un fondo oscuro a fondo blanco
function getLightIcon(element_choice) {
    element_choice.querySelector('i:first-child').classList.add('fa-inverse');
}

// Cambia el diseño del ícono de un fondo solido a uno sin fondo o viceversa
function modificateIcon(element_choice) {
    const icon = element_choice.querySelector('i:first-child');
    if(icon.classList.contains('fal')) {
        icon.classList.remove('fal');
        icon.classList.add('fas');
    }
    else {
        icon.classList.remove('fas');
        icon.classList.add('fal');
    }    
}

// Función que se activa cuando el usuario selecciona una de las tres opciones del juego 
function play(element_choice) {
    userChoice = element_choice.id;
    const computerChoice = getComputerChoice(); // Obtiene la selección de la computadora
    showModal(userChoice, computerChoice, element_choice); // Muestra la ventana modal
    const winner = getWinner(userChoice, computerChoice); // Obtiene al ganador
    showWinner(winner); // Muestra el mensaje de quien ganó
}

// Función que obtiene la opción que selecciona la computadora
function getComputerChoice() {
    const rand = Math.random();

    if(rand <= 0.33) { return 'rock'; }
    else if(rand <= 0.66) { return 'paper'; }
    else { return 'peace'; } 
}

// Función que muestra la ventana modal
function showModal(userChoice, compChoice, element_choice) {
    const modal = document.getElementById('container-modal');
    modal.style.display = 'block';

    let userhand = document.getElementById('hand-user');
    let computerhand = document.getElementById('hand-comp');

    // Agregamos animación a las manos que aparecen en la ventana modal
    userhand.style.animation = 'handPlayer 2s ease';
    computerhand.style.animation = 'handComputer 2s ease';

    changeIcon(userhand, computerhand, userChoice, compChoice);
    closeModal(userhand, computerhand, userChoice, compChoice, element_choice);
    
}

// Función que cierra y resetea la ventana modal
function closeModal(userhand, computerhand, userChoice, compChoice, element_choice) {
    window.addEventListener('click', (e) => { e.preventDefault(); });

    document.getElementById('btn-regresar').addEventListener('click', function() {
        modal.style.display = 'none';
        userhand.classList.remove('fa-hand-'+ userChoice);
        userhand.classList.add('fa-hand-rock');
    
        computerhand.classList.remove('fa-hand-' + compChoice);
        computerhand.classList.add('fa-hand-rock');
    
        const icon = element_choice.querySelector('i:first-child');
        icon.classList.remove('fas');
        icon.classList.add('fal');
    
    });
}

// Función que cambia de el ícono de las manos de la ventana modal
function changeIcon(userHand, computerHand, userChoice, compChoice) {
    const userhand = userHand;
    const computerhand = computerHand;
    setTimeout(function () {
        userhand.classList.remove('fa-hand-rock');
        userhand.classList.add('fa-hand-'+userChoice);
    
        
        computerhand.classList.remove('fa-hand-rock');
        computerhand.classList.add('fa-hand-'+compChoice);
    }, 2000);
}

// Obtiene cual es el ganador de la partida
function getWinner(userChoice, computerChoice) {
    if(userChoice == computerChoice) {
        return 'Draw';
    }
    else if(userChoice == 'rock') {
        if(computerChoice == 'peace') { return 'Player'; }
        else { return 'Computer'; }
    }
    else if(userChoice == 'paper') {
        if(computerChoice == 'rock') { return 'Player'; }
        else { return 'Computer'; }
    }
    else {
        if(computerChoice == 'paper') { return 'Player'; }
        else { return 'Computer'; }
    }
}

// Muestra al ganador
function showWinner(winner) {
    if(winner == 'Player') {
        document.getElementById('text-winner').innerHTML = 'You Win 🔥';
        score.user++;
        
    }
    else if (winner == 'Computer') {
        document.getElementById('text-winner').innerHTML = 'Computer Win ☹️';
        score.computer++; 
    }
    else {
        document.getElementById('text-winner').innerHTML = "It's a Draw 🤝";
    }

    containerScore.innerHTML = `
        <div class="score__badge" id="badge-user">User</div>
        <div class="score__badge" id="badge-comp">Comp</div>
        <span class="score__user" id="score__user">${score.user}</span> : 
        <span class="score__comp" id="score__comp">${score.computer}</span>
    `;
    document.querySelector('.modal__text').style.display = 'block';    
}


function reset() {
    score.user = 0;
    score.computer = 0;

    containerScore.innerHTML = `
        <div class="score__badge" id="badge-user">User</div>
        <div class="score__badge" id="badge-comp">Comp</div>
        <span class="score__user" id="score__user">${score.user}</span> : 
        <span class="score__comp" id="score__comp">${score.computer}</span>
    `;
}




