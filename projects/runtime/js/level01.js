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
                { "type": "sawblade", "x": 800, "y": groundY },
                { "type": "sawblade", "x": 1200, "y": groundY },
                { "type": "healthpack", "x": 700, "y": groundY-50},
                { "type": "enemy", "x": 1500, "y": groundY-50},
                { "type": "ownobstacle", "x": 1000, "y": groundY},
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


        function createHealthPack(x,y) {
            var HealthPack = game.createGameItem('HealthPack',25);
            var redSquare = draw.bitmap('https://cdn3.whatculture.com/images/2014/09/Medkit-600x338.jpg');
            redSquare.x = -25;
            redSquare.y = -25;
            HealthPack.addChild(redSquare);

            HealthPack.x = x;
            HealthPack.y = y;

            game.addGameItem(HealthPack);

            HealthPack.velocityX = -1.5;

            HealthPack.rotationalVelocity = 0;

            HealthPack.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(25);
                HealthPack.fadeOut();
            };

            HealthPack.onProjectileCollision = function() {
            }
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
