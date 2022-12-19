import { Bird } from './Bird.js';

const go_button = document.querySelector('button#go');
const name_input = document.querySelector('input[name=name]');
const start_items = document.querySelector('.container');

let player = 'Player 1';
let timer = 60;
let score = 0;
let birds_killed = 0;

go_button.addEventListener('click', () => {
    if (name_input.value) {
        player = name_input.value;
        start_items.style.display = 'none';
    }
});

