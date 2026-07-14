const moveLeftMobileButton = document.getElementById("move_left_mobile_button");
const moveRightMobileButton = document.getElementById("move_right_mobile_button");
const moveForwardMobileButton = document.getElementById("move_forward_mobile_button");
const shootMobileButton = document.getElementById("shoot_mobile_button");

let gameCore;
function setUpGameCore() {
    gameCore = new GameCore(document.getElementById("game_canvas"), document.getElementById("score"), document.getElementById("high_score"));
    
    const anyInput = gameCore.addInput("Any");
    const forwardInput = gameCore.addInput("Forward");
    const leftInput = gameCore.addInput("Left");
    const rightInput = gameCore.addInput("Right");
    const shootInput = gameCore.addInput("Shoot"); 

    window.addEventListener("keydown", function (e) {
        // console.log(`Key ${e.key} down.`);

        anyInput.activate();

        if (e.key == 'w' || e.key == "ArrowUp")
            forwardInput.activate();
        if (e.key == 'a' || e.key == "ArrowLeft")
            leftInput.activate();
        if (e.key == 'd' || e.key == "ArrowRight")
            rightInput.activate();
        if (e.key == 's' || e.key == "ArrowDown" || e.key == ' ')
            shootInput.activate();
    });

    
    window.addEventListener("keyup", function (e) {
        // console.log(`Key ${e.key} up.`);

        anyInput.deactivate();

        if (e.key == 'w' || e.key == "ArrowUp")
            forwardInput.deactivate();
        if (e.key == 'a' || e.key == "ArrowLeft")
            leftInput.deactivate();
        if (e.key == 'd' || e.key == "ArrowRight")
            rightInput.deactivate();
        if (e.key == 's' || e.key == "ArrowDown" || e.key == ' ')
            shootInput.deactivate();
    });

    moveLeftMobileButton.addEventListener("touchstart",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.activate();
        leftInput.activate();
    })
    moveLeftMobileButton.addEventListener("touchend",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.deactivate();
        leftInput.deactivate();
    })
    moveLeftMobileButton.addEventListener("mousedown",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.activate();
        leftInput.activate();
    })
    moveLeftMobileButton.addEventListener("mouseup",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.deactivate();
        leftInput.deactivate();
    })

    moveRightMobileButton.addEventListener("touchstart",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.activate();
        rightInput.activate();
    })
    moveRightMobileButton.addEventListener("touchend",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.deactivate();
        rightInput.deactivate();
    })
    moveRightMobileButton.addEventListener("mousedown",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.activate();
        rightInput.activate();
    })
    moveRightMobileButton.addEventListener("mouseup",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.deactivate();
        rightInput.deactivate();
    })
    
    moveForwardMobileButton.addEventListener("touchstart",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.activate();
        forwardInput.activate();
    })
    moveForwardMobileButton.addEventListener("touchend",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.deactivate();
        forwardInput.deactivate();
    })
    moveForwardMobileButton.addEventListener("mousedown",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.activate();
        forwardInput.activate();
    })
    moveForwardMobileButton.addEventListener("mouseup",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.deactivate();
        forwardInput.deactivate();
    })
    
    shootMobileButton.addEventListener("touchstart",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.activate();
        shootInput.activate();
    })
    shootMobileButton.addEventListener("touchend",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.deactivate();
        shootInput.deactivate();
    })
    shootMobileButton.addEventListener("mousedown",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.activate();
        shootInput.activate();
    })
    shootMobileButton.addEventListener("mouseup",function (e) {
        e.preventDefault();
        e.stopPropagation();
        anyInput.deactivate();
        shootInput.deactivate();
    })

    gameCore.addSound("MetalPipe","sounds/metal-pipe-clang.mp3")

    setInterval(runGame,1000 / 60);
}

function runGame() {
    gameCore.runUpdates();
}





class GameCore {

    baseWidth = 500;
    baseHeight = 500;
    scale = 1;

    canvas = null;
    context = null;

    gameState = "GameStart";

    // score //////////////////////////////////////
    scoreLable = null;
    highScoreLable = null;
    score = 0;
    highScore = 0;
    addScore(value){
        this.score += value;
        if (this.score > this.highScore)
            this.highScore = this.score;
        this.updateScores();
    }
    resetScore(){
        this.score = 0;
        this.updateScores();
    }
    updateScores() {
        this.scoreLable.innerHTML = `score: ${Math.floor(this.score)}`;
        this.highScoreLable.innerHTML = `high score: ${Math.floor(this.highScore)}`;
    }
    // score //////////////////////////////////////

    // Game Objects //////////////////////////////
    gameObjs = [];
    /**
     * 
     * @param {GameObj} gameObj 
     */
    addGameObj(gameObj){ 
        this.gameObjs.push(gameObj);
    }
    /**
     * 
     * @param {GameObj} gameObj 
     */
    removeGameObj(gameObj){
        const index = this.gameObjs.indexOf(gameObj);
        if (index != -1){
            this.gameObjs.splice(index, 1);
        }
    }
    resetGameObjs(){
        for (let i = this.gameObjs.length - 1; i >= 0; i--){
            this.gameObjs[i].remove();
        }
    }
    
    playerShip = null;
    asteroids = [];
    /**
     * 
     * @param {Asteroid} asteroid 
     */
    addAsteroid(asteroid){ 
        this.asteroids.push(asteroid);
    }
    /**
     * 
     * @param {Asteroid} asteroid 
     */
    removeAsteroid(asteroid){
        const index = this.asteroids.indexOf(asteroid);
        if (index != -1){
            this.asteroids.splice(index, 1);
        }
    }
    // Game Objects //////////////////////////////

    // Input //////////////////////////////
    inputs = {};
    /**
     * 
     * @param {string} name 
     * @returns 
     */
    addInput(name){
        let newInput = new Input();
        this.inputs[name] = newInput;
        return newInput;
    }
    /**
     * 
     * @param {string} name 
     * @returns {Input}
     */
    getInput(name){
        return this.inputs[name];
    }
    updateInputs(){
        for (let inputName in this.inputs){
            this.inputs[inputName].justPressed = 0;
        }
    }
    // Input //////////////////////////////

    // Sounds //////////////////////////////
    sounds = {};
    /**
     * 
     * @param {string} name 
     * @param {string} src 
     * @returns {Sound}
     */
    addSound(name, src){
        let newSound = new Sound(src);
        this.sounds[name] = newSound;
        return newSound;
    }
    /**
     * 
     * @param {string} name 
     * @returns {Sound}
     */
    getSound(name){
        return this.sounds[name];
    }
    // Sounds //////////////////////////////

    constructor(canvas, scoreLable, highScoreLable){
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.fitCanvas();

        this.scoreLable = scoreLable;
        this.highScoreLable = highScoreLable;
    }

    fitCanvas() {
        const reducedCanvasScale = 0.8;

        const minLength = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);

        this.canvas.width = minLength * reducedCanvasScale;
        this.canvas.height = minLength * reducedCanvasScale;

        this.canvas.style.left = `${document.documentElement.clientWidth * 0.5 - minLength * reducedCanvasScale * 0.5}px`;

        this.scale = this.canvas.width / this.baseWidth;

    }
    

    runUpdates() {
        
        this.fitCanvas();
        this.clear();

        let delta = 1 / 60;
        this.updateGameObjs(delta);

        this.drawGameObjs();


        switch (this.gameState){
            case "GameStart":
                this.drawText("Press any to start.","Tiny5",20,new Vector2(50,50));
                if (this.getInput("Any").justPressed)
                    this.startGame();
                break;
            case "InGame":
                this.gameLoop(delta);
                break;
            case "GameEnd":
                this.drawText(`Score: ${Math.floor(this.score)}`,"Tiny5",20,new Vector2(50,50));
                this.drawText(`High Score: ${Math.floor(this.highScore)}`,"Tiny5",20,new Vector2(50,80));
                this.drawText(`Press any to restart.`,"Tiny5",20,new Vector2(50,110));
                if (this.getInput("Any").justPressed)
                    this.startGame();
                break;
        }

        this.updateInputs();
    }
    clear() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
    /**
     * 
     * @param {number} delta 
     */
    updateGameObjs(delta = 1) {
        this.gameObjs.forEach((gameObj) => {
            gameObj.update(delta);
        });
    }
    drawGameObjs() {
        this.gameObjs.forEach((gameObj) => {
            gameObj.draw(this.scale);
        });
    }
    /**
     * 
     * @param {string} text 
     * @param {string} font
     * @param {number} fontsize
     * @param {Vector2} pos
     */
    drawText(text, font, fontsize, pos){
        const ctx = this.context;
        ctx.font = `${fontsize * this.scale}px ${font}`;
ctx.fillStyle = "white";
        ctx.fillText(text, pos.x * this.scale, pos.y * this.scale);
    }

    
    startGame(){
        console.log("Game Start");

        this.gameState = "InGame";
        this.resetScore();
        this.resetGameObjs();
        new PlayerShip(new Vector2(60,60), new Vector2(250,250),0, new Vector2(0,0),0,"images/ship.png",gameCore);
    }

    asteroidSpawnTimer = 0;
    asteroidSpawnTimeThreshold = 2;
    /**
     * 
     * @param {number} delta 
     */
    gameLoop(delta){
        this.asteroidSpawnTimer += delta;
        if (this.asteroidSpawnTimer > this.asteroidSpawnTimeThreshold){
            this.asteroidSpawnTimer = 0;

            let gameCenter = new Vector2(gameCore.baseWidth/2.0,gameCore.baseWidth/2.0);
            let asteroidSpawnDirection = Math.random() * Math.PI * 2.0;
            let asteroidSize = Math.random() * 60 + 60;
            let asteroidSpeed = Math.random() * 50 + 20;
            let asteroidTravelOffset = (Math.random() * 2.0 - 1.0) * Math.PI * 0.25;
            let asteroidSpin = Math.random() * Math.PI;
            
            new Asteroid(
                new Vector2(asteroidSize,asteroidSize), 
                Vector2.Sum(
                    gameCenter,
                    Vector2.Rotate(
                        new Vector2(375,0),
                        asteroidSpawnDirection
                    )
                ),
                asteroidSpawnDirection, 
                Vector2.Rotate(
                    new Vector2(-asteroidSpeed,0),
                    asteroidSpawnDirection + asteroidTravelOffset
                ),
                asteroidSpin,
                "images/asteroid.png",
                gameCore,
                asteroidSize);
        }
    }

    gameOver(){
        this.gameState = "GameEnd";
    }
}






// GameObjs ///////////////////////////////////
class GameObj{
    /**
     * @type {Vector2}
     */
    linearVelocity = new Vector2(0,0);
    /**
     * @type {number}
     */
    angularVelocity = 0;

    /**
     * 
     * @param {Vector2} size
     * @param {Vector2} pos
     * @param {number} rot
     * @param {Vector2} linVel
     * @param {number} angVel
     * @param {string} imageSrc
     * @param {GameCore} gameCore 
     */
    constructor(size, pos, rot, linVel, angVel, imageSrc, gameCore){
        this.size = size;
        this.pos = pos;
        this.rot = rot;

        this.linearVelocity = linVel;
        this.angularVelocity = angVel;

        this.image = new Image();
        this.image.src = imageSrc;

        this.gameCore = gameCore;
        this.gameCore.addGameObj(this);

    }
    
    // Runs every frame before draw
    /**
     * @param {number} delta 
     */
    update(delta = 1){
        this.pos = Vector2.Sum(this.pos,Vector2.Prod(this.linearVelocity, delta));
        this.rot += this.angularVelocity * delta;
    }

    // Runs every frame after update
    /**
     * @param {number} drawScale
     */
    draw(drawScale){
        let ctx = this.gameCore.context;
        ctx.save();
        ctx.translate(this.pos.x*drawScale,this.pos.y*drawScale); // moves context origin to ship
        ctx.rotate(this.rot); // rotates context

        ctx.drawImage(this.image,-this.size.x*drawScale * 0.5,-this.size.y*drawScale * 0.5,this.size.x*drawScale,this.size.y*drawScale); // draws image on context origin
        
        ctx.restore(); // restores context transforms back to save
    }

    remove(){
        this.gameCore.removeGameObj(this);
    }
}

//// CollidableGameObjs ///////////////////////
class CollidableGameObj extends GameObj{
    /**
     * 
     * @param {Vector2} size
     * @param {Vector2} pos
     * @param {number} rot
     * @param {Vector2} linVel
     * @param {number} angVel
     * @param {string} imageSrc
     * @param {GameCore} gameCore 
     * @param {number} collisionRadius
     */
    constructor(size, pos, rot, linVel, angVel, imageSrc, gameCore, collisionRadius = -1){
        super(size,pos,rot,linVel,angVel,imageSrc,gameCore)
        this.collisionRadius = collisionRadius;
    }
    
    // Runs every frame before draw
    /**
     * @param {number} delta 
     */
    update(delta = 1){
        super.update(delta);
    }

    // Gets first object that is colliding with this
    /**
     * 
     * @param {Array<CollidableGameObj>} collidableGameObjs 
     * @param {CollidableGameObj} collidableGameObjs 
     */
    getCollidingObject(collidableGameObjs){
        let collidingObjects = []

        for (let collidableGameObj of collidableGameObjs){
            if (this.isCollidingObject(collidableGameObj))
                return collidableGameObj;
        }
        return null;
    }

    // Gets all objects that are colliding with this
    /**
     * 
     * @param {Array<CollidableGameObj>} collidableGameObjs 
     * @param {Array<CollidableGameObj>} collidableGameObjs 
     */
    getCollidingObjects(collidableGameObjs){
        let collidingObjects = []

        for (let collidableGameObj of collidableGameObjs){
            if (this.isCollidingObject(collidableGameObj))
                collidingObjects.push(collidableGameObj);
        }
        return collidingObjects;
    }

    // Returns if any object is colliding with this
    /**
     * 
     * @param {Array<CollidableGameObj>} collidableGameObjs 
     * @returns {boolean}
     */
    isCollidingObjects(collidableGameObjs){
        for (let collidableGameObj of collidableGameObjs){
            if (this.isCollidingObject(collidableGameObj))
                return true;
        }
        return false;
    }

    // Returns if the object is colliding with this
    /**
     * 
     * @param {CollidableGameObj} collidableGameObjs 
     * @returns {boolean}
     */
    isCollidingObject(collidableGameObj){
        const dist = Vector2.Dif(collidableGameObj.pos, this.pos).Length();
        return dist <= ((this.collisionRadius + collidableGameObj.collisionRadius) / 2.0);
    }
}

class PlayerShip extends CollidableGameObj{
    

    /**
     * 
     * @param {Vector2} size
     * @param {Vector2} pos
     * @param {number} rot
     * @param {Vector2} linVel
     * @param {number} angVel
     * @param {string} imageSrc
     * @param {GameCore} gameCore 
     * @param {number} collisionRadius
     */
    constructor(size, pos, rot, linVel, angVel, imageSrc, gameCore, collisionRadius = -1){
        super(size,pos,rot,linVel,angVel,imageSrc,gameCore,collisionRadius);
        this.gameCore.playerShip = this;
    }

    remove(){
        super.remove();
        this.gameCore.playerShip = null;
        this.gameCore.gameOver();

        for (let i = 0; i < 10; i++){
            let spawnDirection = Math.random() * Math.PI * 2;
            new FragmentParticle(
                new Vector2(16,16),
                Vector2.Sum(
                    this.pos,
                    Vector2.Rotate(
                        Vector2.Prod(new Vector2(this.size.Length() * 0.5,0), Math.random()),
                        spawnDirection
                    )
                ),
                this.rot + spawnDirection,
                Vector2.Sum(
                    this.linearVelocity,
                    Vector2.Rotate(
                        new Vector2(100,0), 
                        spawnDirection
                    )
                ),
                this.angularVelocity,
                "images/fragment.png",
                this.gameCore
            )
        }
    }
    
    particleTimer = 0;
    particleTimeThreshold = 0.05;

    readyBulletTimer = 0;
    readyBulletThreshold = 0.5;

    // Runs every frame before draw
    /**
     * @param {number} delta 
     */
    update(delta = 1){
        super.update(delta);

        // wrap
        if (this.pos.x < 0)
            this.pos.x = this.gameCore.baseWidth;
        if (this.pos.x > this.gameCore.baseWidth){
            this.pos.x = 0;
        }
        if (this.pos.y < 0)
            this.pos.y = this.gameCore.baseHeight;
        if (this.pos.y > this.gameCore.baseHeight){
            this.pos.y = 0;
        }

        // particle timer
        if (gameCore.getInput("Left").pressed || gameCore.getInput("Right").pressed || gameCore.getInput("Forward").pressed)
            this.particleTimer += delta;

        // thrusters
        if (gameCore.getInput("Left").pressed || (gameCore.getInput("Forward").pressed && !gameCore.getInput("Right").pressed)){
            this.linearVelocity = Vector2.Sum(
                this.linearVelocity, 
                Vector2.Prod(
                    Vector2.Rotate(
                        new Vector2(0,-1), 
                        this.rot
                    ), 
                    delta * 15
                )
            );
            this.angularVelocity -= delta;

            // particle
            if (this.particleTimer > this.particleTimeThreshold)
                new ShipExhaustParticle(
                    new Vector2(15,15),
                    Vector2.Sum(
                        this.pos,
                        Vector2.Rotate(
                            new Vector2(15,30),
                            this.rot
                        )
                    ),
                    this.rot,
                    Vector2.Sum(
                        this.linearVelocity,
                        Vector2.Rotate(
                            new Vector2(0,30), 
                            this.rot
                        )
                    ),
                    this.angularVelocity,
                    "images/exhaust.png",
                    this.gameCore
                )
        }

        if (gameCore.getInput("Right").pressed || (gameCore.getInput("Forward").pressed && !gameCore.getInput("Left").pressed)){
            this.linearVelocity = Vector2.Sum(
                this.linearVelocity, 
                Vector2.Prod(
                    Vector2.Rotate(
                        new Vector2(0,-1), 
                        this.rot
                    ), 
                    delta * 15
                )
            );
            this.angularVelocity += delta;

            // particle
            if (this.particleTimer > this.particleTimeThreshold)
                new ShipExhaustParticle(
                    new Vector2(15,15),
                    Vector2.Sum(
                        this.pos,
                        Vector2.Rotate(
                            new Vector2(-15,30),
                            this.rot
                        )
                    ),
                    this.rot,
                    Vector2.Sum(
                        this.linearVelocity,
                        Vector2.Rotate(
                            new Vector2(0,30), 
                            this.rot
                        )
                    ),
                    this.angularVelocity,
                    "images/exhaust.png",
                    this.gameCore
                )
        }

        // reset particle timer
        if (this.particleTimer > this.particleTimeThreshold)
            this.particleTimer = 0;

        // bullet timer
        this.readyBulletTimer += delta;

        // shoot bullet
        if (gameCore.getInput("Shoot").justPressed && (this.readyBulletTimer > this.readyBulletThreshold)){
            new ShipBullet(
                    new Vector2(15,15),
                    Vector2.Sum(
                        this.pos,
                        Vector2.Rotate(
                            new Vector2(0,-30),
                            this.rot
                        )
                    ),
                    this.rot,
                    Vector2.Sum(
                        this.linearVelocity,
                        Vector2.Rotate(
                            new Vector2(0,-240), 
                            this.rot
                        )
                    ),
                    0,
                    "images/bullet.png",
                    this.gameCore,
                    10
                )
            // this.gameCore.getSound("MetalPipe").play();
            this.readyBulletTimer = 0;
        }
    }
}

class ShipBullet extends CollidableGameObj{
    
    distThreshold = 400;

    // Runs every frame before draw
    /**
     * @param {number} delta 
     */
    update(delta = 1){
        super.update(delta);

        let gameCenter = new Vector2(gameCore.baseWidth/2.0,gameCore.baseWidth/2.0);
        let dist = Vector2.Dif(this.pos,gameCenter).Length();

        if (dist > this.distThreshold)
            this.remove();
        
        let collidingObject = this.getCollidingObject(gameCore.asteroids);
        if (collidingObject != null){
            collidingObject.hit(this);
            this.remove();
        }
            

    }
}

class Asteroid extends CollidableGameObj{

    /**
     * 
     * @param {Vector2} size
     * @param {Vector2} pos
     * @param {number} rot
     * @param {Vector2} linVel
     * @param {number} angVel
     * @param {string} imageSrc
     * @param {GameCore} gameCore 
     * @param {number} collisionRadius
     */
    constructor(size, pos, rot, linVel, angVel, imageSrc, gameCore, collisionRadius = -1){
        super(size,pos,rot,linVel,angVel,imageSrc,gameCore,collisionRadius);
        this.gameCore.addAsteroid(this);
    }

    remove(){
        super.remove();
        this.gameCore.removeAsteroid(this);
    }
    
    distThreshold = 400;

    // Runs every frame before draw
    /**
     * @param {number} delta 
     */
    update(delta = 1){
        super.update(delta);

        let gameCenter = new Vector2(gameCore.baseWidth/2.0,gameCore.baseWidth/2.0);
        let dist = Vector2.Dif(this.pos,gameCenter).Length();

        if (dist > this.distThreshold)
            this.remove();

        if (this.gameCore.playerShip != null){
            if (this.isCollidingObject(this.gameCore.playerShip)){
                this.gameCore.playerShip.remove();
            }
        }
        
    }

    sizeThreshold = 60;

    /**
     * 
     * @param {ShipBullet} shipBullet 
     */
    hit(shipBullet){

        this.linearVelocity = Vector2.Sum(this.linearVelocity,Vector2.Prod(shipBullet.linearVelocity,0.05));

        let sizeMag = this.size.Length();
        this.gameCore.addScore(sizeMag);

        if (sizeMag > this.sizeThreshold){
            for (let i = 0; i < Math.ceil(Math.random() * 2 + 1); i++){
                let spawnDirection = Math.random() * Math.PI * 2
                new Asteroid(
                    Vector2.Prod(this.size,0.5),
                    Vector2.Sum(
                        this.pos,
                        Vector2.Rotate(
                            Vector2.Rotate(
                                new Vector2(sizeMag*0.25,0),
                                spawnDirection
                            ),
                            this.rot
                        )
                    ),
                    this.rot + spawnDirection,
                    Vector2.Sum(
                        this.linearVelocity,
                        Vector2.Rotate(
                            new Vector2(-sizeMag*0.25,0),
                            spawnDirection
                        ),
                    ),
                    this.angularVelocity,
                    "images/asteroid.png",
                    this.gameCore,
                    this.collisionRadius / 2.0
                )
            }
        }

        for (let i = 0; i < 10; i++){
            let spawnDirection = Math.random() * Math.PI * 2;
            new FragmentParticle(
                new Vector2(16,16),
                Vector2.Sum(
                    this.pos,
                    Vector2.Rotate(
                        Vector2.Prod(new Vector2(this.size.Length() * 0.5,0), Math.random()),
                        spawnDirection
                    )
                ),
                this.rot + spawnDirection,
                Vector2.Sum(
                    this.linearVelocity,
                    Vector2.Rotate(
                        new Vector2(100,0), 
                        spawnDirection
                    )
                ),
                this.angularVelocity,
                "images/fragment.png",
                this.gameCore
            )
        }

        this.remove()
    }
}
//// CollidableGameObjs ///////////////////////

class ShipExhaustParticle extends GameObj{
    initSize = new Vector2(1,1);
    time = 0;
    lifetime = 5;

    /**
     * 
     * @param {Vector2} size
     * @param {Vector2} pos
     * @param {number} rot
     * @param {Vector2} linVel
     * @param {number} angVel
     * @param {string} imageSrc
     * @param {GameCore} gameCore 
     */
    constructor(size, pos, rot, linVel, angVel, imageSrc, gameCore){
        super(size,pos,rot,linVel,angVel,imageSrc,gameCore);
        this.initSize = size;
    }
    
    // Runs every frame before draw
    /**
     * @param {number} delta 
     */
    update(delta = 1){
        super.update(delta);

        
        // wrap
        if (this.pos.x < 0)
            this.pos.x = this.gameCore.baseWidth;
        if (this.pos.x > this.gameCore.baseWidth){
            this.pos.x = 0;
        }
        if (this.pos.y < 0)
            this.pos.y = this.gameCore.baseHeight;
        if (this.pos.y > this.gameCore.baseHeight){
            this.pos.y = 0;
        }

        // shrink out
        this.time += delta;
        this.size = Vector2.Prod(this.initSize,(this.lifetime - this.time)/this.lifetime);

        if (this.time > this.lifetime)
            this.remove(); // delete
    }
}

class FragmentParticle extends GameObj{
    initSize = new Vector2(1,1);
    time = 0;
    lifetime = 1;

    /**
     * 
     * @param {Vector2} size
     * @param {Vector2} pos
     * @param {number} rot
     * @param {Vector2} linVel
     * @param {number} angVel
     * @param {string} imageSrc
     * @param {GameCore} gameCore 
     */
    constructor(size, pos, rot, linVel, angVel, imageSrc, gameCore){
        super(size,pos,rot,linVel,angVel,imageSrc,gameCore);
        this.initSize = size;
    }
    
    // Runs every frame before draw
    /**
     * @param {number} delta 
     */
    update(delta = 1){
        super.update(delta);

        // shrink out
        this.time += delta;
        this.size = Vector2.Prod(this.initSize,(this.lifetime - this.time)/this.lifetime);

        if (this.time > this.lifetime)
            this.remove(); // delete
    }
}
// GameObjs ///////////////////////////////////




class Sound{
    /**
     * 
     * @param {string} src 
     */
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;

        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";

        document.body.appendChild(this.sound);
    }

    play(){
        this.sound.play();
    }

    stop(){
        this.sound.pause();
    }
}

class Input {
    constructor() {
        this.justPressed = 0
        this.pressed = 0
    }

    activate() {
        if (!this.pressed)
            this.justPressed = 1;
        this.pressed = 1;
    }

    deactivate() {
        this.pressed = 0;
    }
}



class Vector2 {
 
    /** 
     * @param {Number} x 
     * @param {Number} y*/
    constructor(x, y) {
        /** @type {Number} */
        this.x = x;
        /** @type {Number} */
        this.y = y;
    }

    Length() {
        return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
    }

    Normalize() {
        /** @type {Number} */
        let length = this.Length();

        if (length != 0){
            this.x = this.x / length;
            this.y = this.y / length;
        }
    }

    
    /** 
     * @param {(Vector2)} a
     * @param {(Vector2|Number)} b */
    static Sum(a,b) {
        if (typeof(b) === "number") {
            return new Vector2(a.x + b, a.y + b);
        } else if (b instanceof Vector2) {
            return new Vector2(a.x + b.x, a.y + b.y);
        }
    }

    /** 
     * @param {(Vector2)} a
     * @param {(Vector2|Number)} b */
    static Dif(a,b) {
        if (typeof(b) === "number") {
            return new Vector2(a.x - b, a.y - b);
        } else if (b instanceof Vector2) {
            return new Vector2(a.x - b.x, a.y - b.y);
        }
    }

    /** 
     * @param {(Vector2)} a
     * @param {(Vector2|Number)} b */
    static Prod(a,b) {
        if (typeof(b) === "number") {
            return new Vector2(a.x * b, a.y * b);
        } else if (b instanceof Vector2) {
            return new Vector2(a.x * b.x, a.y * b.y);
        }
    }

    /** 
     * @param {(Vector2)} a
     * @param {(Vector2|Number)} b */
    static Div(a,b) {
        if (typeof(b) === "number") {
            return new Vector2(a.x / b, a.y / b);
        } else if (b instanceof Vector2) {
            return new Vector2(a.x / b.x, a.y / b.y);
        }
    }

    /** 
     * @param {(Vector2)} a
     * @param {(Vector2|Number)} b */
    Mod(a,b) {
        if (typeof(b) === "number") {
            return new Vector2(a.x % b, a.y % b);
        } else if (b instanceof Vector2) {
            return new Vector2(a.x % b.x, a.y % b.y);
        }
    }

    /** 
     * @param {(Vector2)} a
     * @param {(Vector2|Number)} b */
    static Max(a,b) {
        if (typeof(b) === "number") {
            return new Vector2(Math.max(a.x, b), Math.max(a.y, b));
        } else if (b instanceof Vector2) {
            return new Vector2(Math.max(a.x, b.x), Math.max(a.y, b.y));
        }
    }

    /** 
     * @param {(Vector2)} a
     * @param {(Vector2|Number)} b */
    static Min(a,b) {
        if (typeof(b) === "number") {
            return new Vector2(Math.min(a.x, b), Math.min(a.y, b));
        } else if (b instanceof Vector2) {
            return new Vector2(Math.min(a.x, b.x), Math.min(a.y, b.y));
        }
    }

    /**
     * @param {Vector2} vec 
     * @param {number} rad 
     * @returns {Vector2}
     */
    static Rotate(vec,rad){
        return new Vector2(
            vec.x * Math.cos(rad) - vec.y * Math.sin(rad),
            vec.x * Math.sin(rad) + vec.y * Math.cos(rad)
        );
    }

    Round() {
        return new Vector2(Math.round(this.x), Math.round(this.y));
    }

    Floor() {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }

    Ceil() {
        return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
    }

    

}


setUpGameCore()