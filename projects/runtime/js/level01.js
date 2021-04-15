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
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "healthpack", "x": 700, "y": groundY},
                { "type": "enemy", "x": 700, "y": groundY},
                { "type": "ownobstacle", "x": 700, "y": groundY},
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
            } else {
                createHealthPack(objX, objY);
            }
        }
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
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
        }

        createSawBlade(1200, 140);
        createSawBlade(650, 75);
        createSawBlade(900, 130);

        function createMexicanSun(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var MexicanSunHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            
            MexicanSunHitZone.x = x;
            MexicanSunHitZone.y = y;
            game.addGameItem(MexicanSunHitZone);
            
            var obstacleImage = draw.bitmap('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDmRLbZldKaN3bgpUwffYy85B0MXKAVt9-hiEANPSCV7drkVdpil0z_sjg1DS3_rE1Zg&usqp=CAU');
            MexicanSunHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        createMexicanSun(800,100);

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

        function createEnemy(x,y) {
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(70,70,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);

            enemy.x = x;
            enemy.y = y;

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
        }

        createEnemy(700, groundY-50);

        function createHealthPack(x,y) {
            var HealthPack = game.createGameItem('HealthPack',25);
            var redSquare = draw.rect(70,70,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            HealthPack.addChild(redSquare);

            HealthPack.x = x;
            HealthPack.y = y;

            game.addGameItem(HealthPack);

            HealthPack.velocityX = -1;

            HealthPack.rotationalVelocity = 5;

            HealthPack.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(10);
                HealthPack.fadeOut();
            };

            HealthPack.onProjectileCollision = function() {
            }
        }

        createHealthPack(900, groundY-30);
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
