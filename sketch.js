var bird, pipeGroup;
var score, cloud, ground;
var gameState = "fly";
var score;

function preload() {
    bird_flying = loadImage("flappybird.png");
    BackgroundImg = loadImage("background.png");
    CloudImg = loadImage("cloud.png");
    gameOverImg = loadImage("gameover.jpg");
    restartImg = loadImage("restart.jpg");
}

function setup() {
    var canvas = createCanvas(1200,400);

    Background = createSprite(0,0,1200,400);
    Background.addImage(BackgroundImg);
    Background.x = Background.width/2;

    bird = createSprite(200,100,50,50);
    bird.addImage("flying",bird_flying);
    bird.scale = 0.2;
    ground = createSprite(600,390,2400,20);
    
    ground.x = ground.width/2;

    pipeGroup = createGroup();
    cloudGroup = createGroup();

    gameOver = createSprite(500,100);
    gameOver.addImage(gameOverImg);
    restart = createSprite(500,280);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.7;
    restart.scale = 0.3;

    score = 0;
}

function draw() {
    background(0);

    if(gameState === "fly") { 
    score = score + Math.round(getFrameRate()/60);
    gameOver.visible = false;
    restart.visible = false;
        
    Background.velocityX = -3;
        if(Background.x < 0) {
            Background.x = Background.width/2;
        }

        if(ground.x < 0) {
            ground.x = ground.width/2;
        }

    bird.velocityY = bird.velocityY + 0.5;
    ground.velocityX = -3;
    if(bird.isTouching(pipeGroup)) {
        gameState = "fall";
    }
    spawnPipes();
    spawnClouds();
    }


    bird.collide(ground);

    if(gameState === "fall") {
        bird.velocityY = 0;
        bird.velocityX = 0;
        Background.velocityX = 0;
        ground.velocityX = 0;
        pipeGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        pipeGroup.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
        
        gameOver.visible = true;
        restart.visible = true;
        
        if(mousePressedOver(restart)) {
            reset();
        }
    }

    
    //bird.collide(bottomEdge);

    drawSprites();
    stroke("red")
    textSize(30);
    text("Score: "+ score,50,50);
}

function reset() {
    gameState = "fly";
    gameOver.visible = false;
    restart.visible = false;
    pipeGroup.destroyEach();
    cloudGroup.destroyEach();
    score = 0;
}

function spawnPipes() {
    if(World.frameCount % 130 === 0) {
        var pipe1 = createSprite(1100,380,20,200);
        var pipe2 = createSprite(1100,70,20,200)
        pipe1.shapeColor = "green";
        pipe1.velocityX = -(6+3*score/100);
        pipe1.y = random(0,30);
        pipe2.shapeColor = "green";
        pipe2.velocityX = -(6+3*score/100);
        pipe2.y = random(350,400);
        pipeGroup.add(pipe1);
        pipeGroup.add(pipe2);
        pipe1.lifetime = 400;
        pipe2.lifetime = 400;
    }
}

function spawnClouds() {
    if(World.frameCount % 120 === 0) {
        var cloud = createSprite(1100,50,70,30);
        cloud.addImage(CloudImg);
        cloud.scale = 0.2;
        cloud.y = random(20,100);
        cloud.velocityX = -3;
        cloudGroup.add(cloud);
        cloud.lifetime = 400;
    }
}

function mouseClicked() {
    if(gameState === "fly") {
        bird.velocityY = -8;
    }
}