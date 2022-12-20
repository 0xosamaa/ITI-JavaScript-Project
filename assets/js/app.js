import { Bird } from './Bird.js';

const go_button = document.querySelector('button#go');
const name_input = document.querySelector('input[name=name]');
const enter_name = document.querySelector('.enter-name');
const instructions = document.querySelector('.instructions');
const container = document.querySelector('.container');
const game_container = document.querySelector('.game-container');

let player = 'Player 1';
let timer = 60;
let score = 0;
let birds_killed = 0;

go_button.addEventListener('click', () => {
    if (name_input.value) {
        player = name_input.value;
        enter_name.style.display = 'none';
        instructions.style.display = 'none';
        game_container.style.display = 'flex';
        let x = 0;
        const id = setInterval(() => {
            x -= 5;
            container.style.transform = `translateY(${x}%)`;
            game_container.style.transform = `translateY(${x}%)`;
            if (x == -100) {
                clearInterval(id);
            }
        }, 100);
    }
});
