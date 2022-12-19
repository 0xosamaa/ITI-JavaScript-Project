import { Bird } from './Bird.js';

const go_button = document.querySelector('button#go');
const name_input = document.querySelector('input[name=name]');
const enter_name = document.querySelector('.enter-name');
const instructions = document.querySelector('.instructions');
const container = document.querySelector('.container');
const game_container = document.querySelector('.game-container');
const player_name_hud = document.querySelector('.player-name');
const player_score_hud = document.querySelector('.player-score');
const player_time_hud = document.querySelector('.player-time');
const player_birds_hud = document.querySelector('.player-birds');

let player_name = 'Player 1';
let time = 60;
let score = 0;
let birds_killed = 0;

const start_game = () => {
    if (!name_input.value) return;
    
    let y = 0;
    player_name = name_input.value;
    player_name_hud.firstChild.innerText += ` ${player_name}`;
    player_score_hud.firstChild.innerText += ` ${score}`;
    player_time_hud.firstChild.innerText += ` ${time}`;
    player_birds_hud.firstChild.innerText += ` ${birds_killed}`;

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
};

go_button.addEventListener('click', start_game);
