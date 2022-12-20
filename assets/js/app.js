import { Bird } from './Bird.js';
import { Bomb } from './Bomb.js';

const go_button = document.querySelector('button#go');
const name_input = document.querySelector('input[name=name]');
const enter_name = document.querySelector('.enter-name');
const instructions = document.querySelector('.instructions');
const container = document.querySelector('.container');
const game_container = document.querySelector('.game-container');
const player_name_hud = document.querySelector('.player-name');
const howtowin = document.querySelector('.howtowin');

const points_to_win = 50;
howtowin.innerText = `Score ${points_to_win} To Win`;

const save_score = (player, score) => {
    let data = {
        player,
        score,
    };
    var a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem('session')) || [];
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Alert the array value
    alert(a); // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('session', JSON.stringify(a));
};

// Start game if name entered
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

    // Slide background up and start the game
    const TRANSFORM_PERCENT = -100;
    const id = setInterval(() => {
        y -= 5;
        container.style.transform = `translateY(${y}%)`;
        game_container.style.transform = `translateY(${y}%)`;
        if (y <= TRANSFORM_PERCENT) {
            Bird.countdown();
            setTimeout(() => {
                const bomb = new Bomb();
                bomb.move();
            }, Math.floor(Math.random() * Bird.time) * 1000);
            clearInterval(id);
        }
    }, 100);

    //Spawn random type of bird every 500ms
    const spawn_interval_id = setInterval(() => {
        Bird.spawn_random();
        //Gameover
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

            // window.onclick = function (event) {
            //     if (event.target == modal) {
            //         modal.style.display = 'none';
            //     }
            //     window.location.reload();
            // };

            //Save score locally
            save_score(player_name, Bird.score);
            // Check win or lose
            if (Bird.score >= points_to_win) {
                music = new Audio('assets/music/win_gameover.wav');
                modal_text.innerText = player_name + ' You Win';
                modal_text = document.createElement('p');
                modal_text.innerText = 'Score: ' + Bird.score;
                modal_content.append(modal_text);
            } else {
                music = new Audio('assets/music/lose_gameover.wav');
                modal_text.innerText = player_name + ' You Lose';
                modal_text = document.createElement('p');
                modal_text.innerText = 'Score: ' + Bird.score;
                modal_content.append(modal_text);
            }
            modal.style.display = 'block';
            music.play();
        }
    }, 500);
};

go_button.addEventListener('click', start_game);
