import { Bird } from './Bird.js';

export class Bomb {
    constructor() {
        const width = 64;
        this.bomb = document.createElement('div');
        let img = document.createElement('img');
        this.bomb.classList.add('bomb');
        img.src = 'assets/images/bomb.gif';
        img.classList.add('bomb-img');
        img.style.width = width + 'px';
        this.positionX = Math.floor(
            Math.random() * (window.innerWidth - this.bomb.style.width)
        );
        this.positionY = 0;
        this.bomb.style.left = this.positionX + 'px';
        this.bomb.style.top = this.positionY + 'px';
        this.bomb.append(img);
        img = document.createElement('img');
        img.src = 'assets/images/explosion.gif';
        img.classList.add('explosion-img');
        img.style.width = width + 'px';
        this.bomb.append(img);
        this.bomb.children[0].draggable = false;
        this.bomb.children[1].draggable = false;

        document.querySelector('.game').append(this.bomb);

        this.bomb.addEventListener('click', () => {
            let all_current_birds = document.querySelectorAll('.bird');
            all_current_birds.forEach((bird) => {
                if (bird.dataset.birdType == 1) {
                    Bird.score += 5;
                } else if (bird.dataset.birdType == 2) {
                    Bird.score += 10;
                } else if (bird.dataset.birdType == 2) {
                    Bird.score -= 10;
                }
                Bird.killed_count++;
                console.log(Bird.killed_count);
                bird.remove();
            });
            this.bomb.children[0].style.display = 'none';
            this.bomb.children[1].style.display = 'block';
            setTimeout(() => {
                this.bomb.children[1].style.display = 'none';
            }, 1500);
        });
    }

    move = () => {
        const id = setInterval(() => {
            this.positionY += 20;
            this.bomb.style.top = this.positionY + 'px';
            if (this.positionY >= window.innerHeight) {
                this.bomb.remove();
                clearInterval(id);
            }
        }, 200);
    };
}
