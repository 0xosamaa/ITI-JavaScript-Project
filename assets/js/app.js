import { Bird } from './Bird.js';

const go_button = document.querySelector('button#go');
const name_input = document.querySelector('input[name=name]');
const enter_name = document.querySelector('.enter-name');
const instructions = document.querySelector('.instructions');
const container = document.querySelector('.container');
const game_container = document.querySelector('.game-container');
const player_name_hud = document.querySelector('.player-name');

const start_game = () => {
    if (!name_input.value) return;
    let music = new Audio('assets/music/Harmony.mp3');
    music.play();

    let y = 0;
    const player_name = name_input.value;
    player_name_hud.firstChild.innerText = `Player: ${player_name}`;

    enter_name.style.display = 'none';
    instructions.style.display = 'none';
    game_container.style.display = 'flex';

    const move_bg_up = () => {
        y -= 5;
        container.style.transform = `translateY(${y}%)`;
        game_container.style.transform = `translateY(${y}%)`;
        if (y == -100) {
            clearInterval(id);
        }
    };
    const id = setInterval(move_bg_up, 100);

    const spawn_interval_id = setInterval(() => {
        Bird.spawn_random();
        if (Bird.time <= 0) {
            const modal = document.createElement('div');
            const modal_content = document.createElement('div');
            const modal_close = document.createElement('span');
            let modal_text = document.createElement('p');

            clearInterval(spawn_interval_id);
            music.pause();

            modal.classList.add('modal');
            modal_content.classList.add('modal-content');
            modal_close.classList.add('close');
            modal_close.innerHTML = '&times;';

            modal_content.append(modal_close);
            modal_content.append(modal_text);
            modal.append(modal_content);
            document.querySelector('.game').append(modal);

            modal_close.onclick = function () {
                modal.style.display = 'none';
                window.location.reload();
            };

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
                window.location.reload();
            };

            if (Bird.score >= 500) {
                music = new Audio('assets/music/win_gameover.wav');
                modal_text.innerText = 'You Win';
                modal_text = document.createElement('p');
                modal_text.innerText = 'Score: ' + Bird.score;
                modal_content.append(modal_text);
            } else {
                music = new Audio('assets/music/lose_gameover.wav');
                modal_text.innerText = 'You Lose';
                modal_text = document.createElement('p');
                modal_text.innerText = 'Score: ' + Bird.score;
                modal_content.append(modal_text);
            }
            modal.style.display = 'block';
            music.play();
        }
    }, 500);

    setTimeout(() => {
        Bird.countdown();
    }, 2000);
};

go_button.addEventListener('click', start_game);
