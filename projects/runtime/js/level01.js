var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 500, "y": groundY },
                { "type": "sawblade", "x": 800, "y": groundY - 10 },
                { "type": "sawblade", "x": 1200, "y": groundY },
                { "type": "healthpack", "x": 700, "y": groundY-80},
                { "type": "enemy", "x": 1500, "y": groundY-50},
                { "type": "enemy", "x": 3500, "y": groundY-50},
                { "type": "ownenemy", "x": 2500, "y": groundY-50},
                { "type": "ownobstacle", "x": 1000, "y": groundY - 100 },
                { "type": "ownenemy", "x": 1700, "y": groundY-50 },
                { "type": "ownobstacle", "x": 2300, "y": groundY - 100 },
                { "type": "ownobstacle", "x": 2700, "y": groundY - 100 },
                { "type": "ownenemy", "x": 4200, "y": groundY-50 },
                { "type": "ownobstacle", "x": 3700, "y": groundY - 100 },
                { "type": "sawblade", "x": 3500, "y": groundY - 10 },
                { "type": "sawblade", "x": 3300, "y": groundY },
                { "type": "healthpack", "x": 4500, "y": groundY-80},
                { "type": "healthpack", "x": 2900, "y": groundY-80},
  
            ]
        };

        for (var i = 0; i < levelData.gameItems.length; i++){
            obj = levelData.gameItems[i];
            objX = obj.x;
            objY = obj.y;
            objType = obj.type;
            if (objType === "sawblade"){
                createSawBlade(objX, objY);
            } else if (objType === "enemy"){
                createEnemy(objX, objY);
            } else if (objType === "ownobstacle"){
                createMexicanSun(objX, objY);
            } else if (objType === "healthpack") {
                createHealthPack(objX, objY);
            }
            else {
                createAlien(objX, objY);
            }
        }
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        /* code that is null
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        
        sawBladeHitZone.x = 400;
        sawBladeHitZone.y = 120;
        game.addGameItem(sawBladeHitZone);
        
        var obstacleImage = draw.bitmap('img/sawblade.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        */

        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        };

        function createMexicanSun(x, y) {
            var hitZoneSize = 20;
            var damageFromObstacle = 100;
            var MexicanSunHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            
            MexicanSunHitZone.x = x;
            MexicanSunHitZone.y = y;
            game.addGameItem(MexicanSunHitZone);
            
            var obstacleImage = draw.bitmap('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT317qD9p5CA4yn39ehtzA3HvqgJC8WMJQUw&usqp=CAU');
            MexicanSunHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            obstacleImage.scaleX = .1;
            obstacleImage.scaleY = .1;
        };

        /* code that is null
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.rect(70,70,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);

        enemy.x = 400;
        enemy.y = groundY-50;

        game.addGameItem(enemy);

        enemy.velocityX = -1;

        enemy.rotationalVelocity = 10;

        enemy.onPlayerCollision = function() {
            console.log('The enemy has hit Halle');
            game.changeIntegrity(-10);
            enemy.fadeOut();
        };

        enemy.onProjectileCollision = function() {
            console.log('Halle has hit the enemy');
            game.increaseScore(100);
            enemy.fadeOut();
        }
        */

        function createEnemy(x,y) {
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaKO2weFxrrKo6Y0bEsKXk3Aj4iof29DW5CZ6VAE030IVGjOdSKdA4nlvzHihGjF38FQ&usqp=CAU');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy);

            enemy.velocityX = -1.5;

            enemy.rotationalVelocity = 0;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-100);
                enemy.flyTo(500, 50);
            };

            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.fadeOut();
            }
        }

        function createAlien(x,y) {
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0vEr0jdalr2NKZ76dD6oQuyPfmcFIaXBVZg&usqp=CAU');
            redSquare.x = -25;
            redSquare.y = -135;
            redSquare.scaleX = .7;
            redSquare.scaleY = .7;
            enemy.addChild(redSquare);

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy);

            enemy.velocityX = -1.5;

            enemy.rotationalVelocity = 0;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-50);
                enemy.fadeOut();
            };

            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.fadeOut();
            }
        }
    

        function createHealthPack(x,y) {
            var HealthPack = game.createGameItem('HealthPack',25);
            var redSquare = draw.bitmap('https://lh3.googleusercontent.com/proxy/xxVWR7xrQOtQZ0yhQMY1nVu1nueuFeIj6mw4FGL5cAjwG4pcwplV9EPQ_6KMJRZU27m_ICW7pg0R8Sxezm6UOsWO_pgIDjma');
            redSquare.x = -25;
            redSquare.y = -25;
            HealthPack.addChild(redSquare);

            HealthPack.x = x;
            HealthPack.y = y;
            
            HealthPack.scaleX = .3;
            HealthPack.scaleY = .3;

            game.addGameItem(HealthPack);

            HealthPack.velocityX = -1.5;

            HealthPack.rotationalVelocity = 0;

            HealthPack.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(25);
                HealthPack.fadeOut();
            };

            HealthPack.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');
            };

            
        }

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
