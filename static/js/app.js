
/* const enemy = new Enemy(1,100,20,palavras);
    if (enemies.length > 0){
        for (let i = 0; i < enemies.length; i++){
            enemies[i].draw()
            //console.log(enemies)
        }
    }

 */


function main(data) {

    //adding events
    canvas.addEventListener('click', (e) => {
        if (e.clientX > canvas.width / 2) { ship.moveRight(canvas) }
        if (e.clientX < canvas.width / 2) { ship.moveLeft(canvas) }
        const bullet = new Bullet(ship.x, ship.y, bulletImg)
        data.bullets.push(bullet);
    });

    //draw loop
    function loop() {

        //ship&&enemy
        ship.draw(ctx);
        enemy.draw(ctx)
        //shooting%%collision
        if (data.bullets.length > 0 && ship.isShooting == true) {
            for (let i = 0; i < data.bullets.length; i++) {
                for (let b = 0; b < enemy.enemies.length; b++) {
                    if (enemy.enemies[b].beenHit == true) {
                    } else
                        if (data.bullets[i].boxCollision(data.bullets[i], enemy.enemies[b])) {
                            enemy.enemies[b].beenHit = true;
                        }
                }
                data.bullets[i].draw(ctx)
                data.bullets[i].move()
            }
        }
        //request next frame
        raf = window.requestAnimationFrame(loop);
    }
    loop()
};

window.onload = function () {
    main(data);
}


