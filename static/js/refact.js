//class ship
class Ship {
    constructor() {
        const image = document.createElement('img');
        image.src = '../static/images/ship23x34.png';

        image.onload = () => {
            const scaling = 1.25;
            this.img = image;
            this.width = image.width * scaling;
            this.height = image.height * scaling;
            this.position = {
                x: canvas.width / 2 - this.width,
                y: canvas.height - this.height * 2,
            }
        }

        this.isShooting = true;
    };

    moveLeft() {
        if (this.position.x < canvas.width - canvas.width) {
            return this.position.x = canvas.width - this.width
        }
        this.position.x -= canvas.width / 7
    };

    moveRight(canvas) {
        if (this.position.x >= canvas.width - this.width - 10) {
            return this.position.x = 0;
        }
        this.position.x += canvas.width / 7
    }

    draw() {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        if (!this.img) { return /* console.log('carregando ship.png...') */};
        ctx.drawImage(
            this.img,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }
}

//class enemy
class Enemy {
    constructor(qtd = 0, x = 1) {
        const image = document.createElement('img');
        image.src = '../static/images/gift.png';
        image.onload = () => {
            this.img = image;
        }

        const scaling = 2;
        this.width = image.width * scaling;
        this.height = image.height * scaling;

        this.position = {
            x: x,
            y: 50,
        }

        this.texto = [];
        this.size = [];
        this.enemies = [];
        this.beenHit = false;
        this.qtd = qtd;
    }

    populate() {
        const qtdPerStage = canvas.width / this.qtd;

        for (let i = 0; i < this.qtd; i++) {
            let xPos = (i * qtdPerStage) + (qtdPerStage / 2);//useful formula for evenly spacing

            xPos -= this.width / 2 //centers

            const ene = new Enemy(0, xPos);

            this.enemies.push(ene);
        }
    }

    draw() {
        if (!this.img) { return /* console.log('carregando gift.png..') */ }

        this.enemies.forEach(element => {
            if (element.beenHit == true) { return };
            ctx.drawImage(this.img, element.position.x, element.position.y, this.width, this.height);
        })
    }
}

class Bullet {
    constructor(){
        const image = document.createElement('img');
        image.src = '../static/images/rocket.png';

        this.img = img;
        this.x = x;
        this.y = y;
        this.size = 20;
        this.speed = 8;
    };

    draw(ctx){
        ctx.drawImage(this.img, this.x + this.size/2,this.y,this.size,this.size);
    };

    move(){
        this.y -= this.speed
        if (this.y < 1){data.bullets.shift()}
    };

    boxCollision(obj1, obj2){
        if (
            obj1.x + obj1.size >= obj2.x &&
            obj1.x <= obj2.x + obj2.size &&
            obj1.y + obj1.size >= obj2.y &&
            obj1.y <= obj2.y + obj2.size
        ) {return true}
    }
    
};

//setting game assets
const palavras =  ['test1', 'teste2', 'aaaa'];
const bullets = [];
const enemies = [];

//setting up canvas
let raf;
const canvas = document.querySelector('#stage');
canvas.width = document.querySelector('body').clientWidth - 50;
canvas.height = document.querySelector('html').clientHeight - 50;
const ctx = canvas.getContext('2d');

//adding ship&&enemy
const ship = new Ship;
const enemy = new Enemy(5);
enemy.populate()

//adding events
canvas.addEventListener('click', (e) => {
    if (e.clientX > canvas.width / 2) { ship.moveRight(canvas) }
    if (e.clientX < canvas.width / 2) { ship.moveLeft(canvas) }
    const bullet = new Bullet(ship.x, ship.y, bulletImg)
    bullets.push(bullet);
});

function animate() {
    //clear
    ctx.fillStyle = 'rgba(255, 255, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ship.draw()
    enemy.draw()

    raf = requestAnimationFrame(animate)
}
animate()