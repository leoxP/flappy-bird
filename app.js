document.addEventListener('DOMContentLoaded',()=>{

    const bird=document.querySelector('.bird');
    const gameDisplay=document.querySelector('.game-container');
    const ground=document.querySelector('.ground');
    const score=document.querySelector('.score');

    let birdLeft=220;
    let birdBottom=100;
    let gravity=2;
    let isGameOver=false;
    let gap=430;
    let count=-1;
    score.innerHTML="Score: "+count;

    function startGame(){
        birdBottom-=gravity;
        bird.style.bottom=birdBottom+'px';
        bird.style.left=birdLeft+'px';
        //adds a 100px to bottom in css file
    }

    let gametimerId=setInterval(startGame,20);
    //every 20 ms startGame is invoked

    function control(e){
        if(e.keyCode===32){
            jump();
        }
        //32 is keycode for space bar
    }

    function jump(){
        if(birdBottom<500) birdBottom+=50;
        bird.style.bottom-=birdBottom+'px';
    }

    function gameOver(){
        clearInterval(gametimerId);
        isGameOver=true;
        document.removeEventListener('keyup',control);
    }

    document.addEventListener('keyup',control);

    function generateObstacle(){
        let obstacleLeft=500;
        let randomHeight=Math.random()*60;
        let obstacleBottom=randomHeight;
        const obstacle=document.createElement('div');
        const topObstacle=document.createElement('div');

        if(!isGameOver){ 
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
            count+=1;
            score.innerHTML="Score: "+count;
        }

        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.left=obstacleLeft+'px';
        topObstacle.style.left=obstacleLeft+'px';
        obstacle.style.bottom=obstacleBottom+'px';
        topObstacle.style.bottom=obstacleBottom+gap+'px';

        function moveObstacle(){
            obstacleLeft-=2;
            obstacle.style.left=obstacleLeft+'px';
            topObstacle.style.left=obstacleLeft+'px';


            if(obstacleLeft=== -60){ //obstacle width=60
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if(
                obstacleLeft>200 && obstacleLeft<280 && birdLeft===220 && (birdBottom+150<=obstacleBottom+300 || birdBottom>=obstacleBottom+gap-195)||
                birdBottom===0
                ){
                gameOver();
                clearInterval(timerId); 
                //checking for collision around the center of the grid
            }
        }
        let timerId=setInterval(moveObstacle,20);

        //generating new obstacles every 3 seconds
        if(!isGameOver) setTimeout(generateObstacle,5000); 
    }

    generateObstacle();
})
