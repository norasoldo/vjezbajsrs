const questions = [
    {
        question: "Koje je glavno jelo u Kini?",
        options: ["a) Hamburger", "b) Pizza", "c) Kineski zid", "d) Piletina Kung Pao"],
        correctAnswer: "d"
    },
    {
        question: "Koliko sati ima u danu?",
        options: ["a) 12", "b) 24", "c) 36", "d) 48"],
        correctAnswer: "b"
    },
    {
        question: "Koji je glavni grad Hrvatske?",
        options: ["a) Zagreb", "b) Split", "c) Dubrovnik", "d) Rijeka"],
        correctAnswer: "a"
    },
    {
        question: "Tko je napisao knjigu 'Rat i mir'?",
        options: ["a) Leo Tolstoj", "b) Fjodor Dostojevski", "c) Ivan Turgenjev", "d) Anton Pavlovič Čehov"],
        correctAnswer: "a"
    },
    {
        question: "Koja je glavna boja Coca-Cole?",
        options: ["a) Zelena", "b) Crvena", "c) Plava", "d) Žuta"],
        correctAnswer: "b"
    },
    {
        question: "Koje godine je počeo Drugi svjetski rat?",
        options: ["a) 1914", "b) 1939", "c) 1941", "d) 1945"],
        correctAnswer: "b"
    }
];

let players = [];
let trenutniIgrac = 0;
let trenutnoPitanje = 0;

document.getElementById('start-btn').addEventListener('click', startQuiz);

function startQuiz() {
    const numPlayers = parseInt(document.getElementById('num-players').value);
    for (let i = 1; i <= numPlayers; i++) {
        const playerName = prompt("Unesite ime igrača "+ i +":");
        players.push({
            name: playerName,
            score: 0
        });
    }
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const question = questions[trenutnoPitanje];
    document.getElementById('question').textContent = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i];
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', function () {
            checkAnswer(option[0]);
        });
        optionsContainer.appendChild(button);
    }
}

function checkAnswer(answer) {
    const question = questions[trenutnoPitanje];
    if (answer === question.correctAnswer) {
        players[trenutniIgrac].score++;
    }
    trenutnoPitanje++;
    if (trenutnoPitanje === questions.length) {
        showScore();
    } else {
        trenutniIgrac++;
        if (trenutniIgrac === players.length) {
            trenutniIgrac = 0;
        }
        showQuestion();
    }
}

function showScore() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';
    players.sort(function (a, b) {
        return b.score - a.score;
    });
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const li = document.createElement('li');
        li.textContent = player.name + " : " + player.score;
        document.getElementById('score-list').appendChild(li);
    }
}