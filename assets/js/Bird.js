export class Bird {
    static #current_count = 0;
    static #killed_count = 0;
    static #score = 0;
    static #time = 20;
    static get current_count() {
        return Bird.#current_count;
    }
    static get killed_count() {
        return Bird.#killed_count;
    }
    static get score() {
        return Bird.#score;
    }
    static get time() {
        return Bird.#time;
    }
    static set score(score) {
        Bird.#score = score;
    }
    static set killed_count(killed_count) {
        Bird.#killed_count = killed_count;
    }

    static countdown = () => {
        const player_time_hud = document.querySelector('.player-time');
        const game_time_id = setInterval(() => {
            Bird.#time--;
            player_time_hud.firstChild.innerText = `Time limit: ${Bird.#time}`;
            if (Bird.#time <= 0) {
                clearInterval(game_time_id);
            }
        }, 1000);
    };

    constructor(type) {
        const bird_up = document.createElement('img');
        const bird_down = document.createElement('img');
        const killed_birds_hud = document.querySelector('.killed-birds');
        const player_score_hud = document.querySelector('.player-score');

        if (type == 1) {
            this.bird_up = 'assets/images/green_bird_up.png';
            this.bird_down = 'assets/images/green_bird_down.png';
        } else if (type == 2) {
            this.bird_up = 'assets/images/brown_bird_up.png';
            this.bird_down = 'assets/images/brown_bird_down.png';
        } else if (type == 3) {
            this.bird_up = 'assets/images/red_bird_up.png';
            this.bird_down = 'assets/images/red_bird_down.png';
        }
        this.positionX = -64;
        this.positionY = Math.floor(Math.random() * (window.innerHeight - 128));
        this.bird = document.createElement('div');
        this.alive = true;

        killed_birds_hud.firstChild.innerText = `Birds Killed: ${
            Bird.#killed_count
        }`;
        player_score_hud.firstChild.innerText = `Score: ${Bird.#score}`;

        bird_up.src = this.bird_up;
        bird_down.src = this.bird_down;
        bird_down.style.display = 'none';
        this.bird.classList.add('bird');
        this.bird.dataset.birdType = type;
        this.bird.append(bird_up);
        this.bird.append(bird_down);
        document.querySelector('.game').append(this.bird);

        this.bird.style.position = 'absolute';
        this.bird.style.left = this.positionX + 'px';
        this.bird.style.top = `${this.positionY}px`;
        this.bird.children[0].draggable = false;
        this.bird.children[1].draggable = false;

        this.bird.addEventListener('click', () => {
            this.alive = false;
            if (type == 1) {
                Bird.#score += 5;
            } else if (type == 2) {
                Bird.#score += 10;
            } else if (type == 3) {
                Bird.#score -= 10;
            }
            Bird.#current_count--;
            Bird.#killed_count++;
            player_score_hud.firstChild.innerText = `Score: ${Bird.#score}`;
            killed_birds_hud.firstChild.innerText = `Birds Killed: ${
                Bird.#killed_count
            }`;
            console.log(player_score_hud.firstChild);
            console.log(killed_birds_hud.firstChild);
            this.bird.remove();
        });

        Bird.#current_count++;
    }

    static spawn_random = () => {
        let random_bird = Math.floor(Math.random() * 3) + 1;
        setTimeout(() => {
            let bird = new Bird(random_bird);
            bird.flop_wings();
            bird.move();
        }, 2000);
    };

    flop_wings = () => {
        let wings_up = true;
        const id = setInterval(() => {
            if (wings_up) {
                this.bird.children[0].style.display = 'none';
                this.bird.children[1].style.display = 'block';
                wings_up = false;
            } else {
                this.bird.children[1].style.display = 'none';
                this.bird.children[0].style.display = 'block';
                wings_up = true;
            }
            if (!this.alive) clearInterval(id);
        }, 300);
    };

    move = () => {
        const move_bird_id = setInterval(() => {
            this.positionX += 20;
            this.bird.style.left = this.positionX + 'px';
            if (!this.alive) clearInterval(move_bird_id);
            if (this.positionX >= window.innerWidth) {
                this.bird.remove();
                Bird.#current_count--;
                clearInterval(move_bird_id);
            }
            if (Bird.time <= 0) clearInterval(move_bird_id);

            // console.log('Current count:', Bird.current_count);
            // console.log('Killed count:', Bird.killed_count);
        }, 100);
    };
}
