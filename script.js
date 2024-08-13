let score = 0; // Лічильник очок
let timeLeft = 30; // Час гри
let gameInterval; // Змінна для зберігання інтервалу
let timerInterval; // Змінна для зберігання таймера

const scoreElement = document.getElementById('score'); // Елемент для відображення очок
const timeElement = document.getElementById('time'); // Елемент для відображення часу
const gameArea = document.getElementById('gameArea'); // Область гри
const messageElement = document.getElementById('message'); // Елемент для повідомлень
const catchSound = document.getElementById('catchSound'); // Звук при натисканні на м'яч
const bombSound = document.getElementById('bombSound'); // Звук при натисканні на бомбу
const bgMusic = document.getElementById('bgMusic'); // Фоновий музичний трек
const startBtn = document.getElementById('startBtn'); // Кнопка для початку гри
const volumeControl = document.getElementById('volumeControl'); // Повзунок для гучності

// Функція для створення м'яча
function createBall() {
    const ball = document.createElement('div');
    ball.classList.add('ball');

    // Випадкові координати для м'яча
    const x = Math.random() * (gameArea.clientWidth - 50); // Врахування ширини м'яча
    const y = Math.random() * (gameArea.clientHeight - 50); // Врахування висоти м'яча

    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;

    // Додаємо м'яча в область гри
    gameArea.appendChild(ball);

    // Додаємо обробник подій для кліка на м'яча
    ball.addEventListener('click', function() {
        score++; // Збільшуємо лічильник очок
        scoreElement.textContent = `Очки: ${score}`; // Оновлюємо відображення очок
        catchSound.currentTime = 0; // Скидаємо час відтворення, щоб звук відтворився з початку
        catchSound.play(); // Відтворюємо звук
        gameArea.removeChild(ball); // Видаляємо м'яча
        createBall(); // Створюємо нового м'яча
    });
}

// Функція для створення бомби
function createBomb() {
    const bomb = document.createElement('div');
    bomb.classList.add('bomb');

    // Випадкові координати для бомби
    const x = Math.random() * (gameArea.clientWidth - 50); // Врахування ширини бомби
    const y = Math.random() * (gameArea.clientHeight - 50); // Врахування висоти бомби

    bomb.style.left = `${x}px`;
    bomb.style.top = `${y}px`;

    // Додаємо бомбу в область гри
    gameArea.appendChild(bomb);

    // Додаємо обробник подій для кліка на бомбу
    bomb.addEventListener('click', function() {
        // Зупиняємо гру
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        bgMusic.pause(); // Зупиняємо музику
        bombSound.currentTime = 0; // Скидаємо час відтворення
        bombSound.play(); // Відтворюємо звук бомби
        messageElement.textContent = `Гра закінчена! Ви натиснули на бомбу. Ви набрали ${score} очок.`; // Показуємо повідомлення
        gameArea.innerHTML = ''; // Очищуємо ігрову область
    });
}

// Функція для запуску гри
function startGame() {
    score = 0; // Скидаємо очки
    timeLeft = 30; // Скидаємо час
    scoreElement.textContent = `Очки: ${score}`; // Оновлюємо очки
    timeElement.textContent = `Час: ${timeLeft}`; // Оновлюємо час
    messageElement.textContent = ""; // Очищуємо повідомлення

    // Запускаємо музику
    bgMusic.volume = volumeControl.value; // Встановлюємо гучність фонової музики на значення повзунка
    bgMusic.play();

    gameInterval = setInterval(() => {
        createBall(); // Створюємо м'яч
        if (Math.random() < 0.5) { // 50% ймовірності створити бомбу
            createBomb();
        }
    }, 2000); // Інтервал для створення м'ячів

    timerInterval = setInterval(() => {
        timeLeft--; // Зменшуємо залишок часу
        timeElement.textContent = `Час: ${timeLeft}`; // Оновлюємо відображення часу

        if (timeLeft <= 0) { // Коли час закінчується
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            bgMusic.pause(); // Зупиняємо музику
            messageElement.textContent = `Гра закінчена! Час вичерпано. Ви набрали ${score} очок.`; // Показуємо повідомлення
            gameArea.innerHTML = ''; // Очищуємо ігрову область
        }
    }, 1000); // Кожну секунду
}

// Додаємо обробник події на кнопку
startBtn.addEventListener('click', startGame);

// Додаємо обробник подій для повзунка
volumeControl.addEventListener('input', function() {
    bgMusic.volume = volumeControl.value; // Встановлюємо гучність музики на значення повзунка
});
