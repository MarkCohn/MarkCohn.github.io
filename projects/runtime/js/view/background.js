var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree = draw.bitmap('https://browser-e58828bb-117a-40d7-b0aa-97bdb250c55d.ws-us03.gitpod.io/workspace/MarkCohn.github.io/kisspng-halo-reach-amphibious-assault-ship-aircraft-carri-5af57d37d13f28.6684766915260378158571.png');
        var buildings = [];
        var triangles = [];
        var rains = [];
        var reins = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();
                
            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,550,'gray');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('https://browser-e58828bb-117a-40d7-b0aa-97bdb250c55d.ws-us03.gitpod.io/workspace/MarkCohn.github.io/wallpaperflare.com_wallpaper.jpg');
            moon.x = 0;
            moon.y = -665;
            moon.scaleX = 1;
            moon.scaleY = 1;
            background.addChild(moon);

            /* starfield that is no longer part of it
            for (var i = 0; i < 400; i++) {
                var circle = draw.circle(5,'white','LightGray',1, 0.8);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random();
                background.addChild(circle);
            }
            */

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<5;++i) {
                var buildingHeight = [360, 350, 305, 320, 335];
                var building = draw.rect(75,buildingHeight[i], 'DarkSlateGrey','Black',1);
                building.x = 200*i;
                building.y = groundY-buildingHeight[i];
                background.addChild(building);
                buildings.push(building);
            };

            /*triangle on buildings, maybe delete if breaks game
            for (var i=0; i<5; ++i) {
                var triangleHeight = [360, 350, 305, 320, 335];
                var triangle = draw.triangle(75, triangleHeight[i], 100, 'DarkSlateGrey', 'Black', 1);
                triangle.x = 200 * i;
                triangle.y = groundY - triangleHeight[i];
                background.addChild(triangle);
                triangles.push(triangle);
            };
            */
            
            // TODO 4: Part 1 - Add a tree
            tree.x = 800;
            tree.y = 0;
            tree.scaleX = 0.3;
            tree.scaleY = 0.3;
            background.addChild(tree);
            
            // Attempt at Rain
            for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -800;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -780;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -760;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -740;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -720;
                background.addChild(rain);
                rains.push(rain);
            };

            for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -820;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -840;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -860;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -880;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -900;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -920;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -940;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -960;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -980;
                background.addChild(rain);
                rains.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1000;
                background.addChild(rain);
                rains.push(rain);
            };
// this is where the fun begins
            for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1020;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1040;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1060;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1080;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1100;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1120;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1140;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1160;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1180;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1200;
                background.addChild(rain);
                reins.push(rain);
            };

            for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1220;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1240;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1260;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1280;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1300;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1320;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1340;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1360;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1380;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1400;
                background.addChild(rain);
                reins.push(rain);
            };

            for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1420;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1440;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1460;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1480;
                background.addChild(rain);
                reins.push(rain);
            };

             for (var i=0; i<10;++i) {
                var rain = draw.rect(1, 5, 'Blue', 'White', .5);
                rain.x = canvasWidth*Math.random();
                rain.y = -1500;
                background.addChild(rain);
                reins.push(rain);
            };

            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 3;

            if (tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax

            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x = building.x - 2;
                if (building.x < -200) {
                    building.x = canvasWidth;
                }
            }
            // Rain moving!
            for (var i = 0; i < rains.length; i++) {
                var rain = rains[i];
                rain.y = rain.y + 8;
                if (rain.y > 400) {
                    rain.y = -700;
                }
            }

            for (var i = 0; i < reins.length; i++) {
                var rain = reins[i];
                rain.y = rain.y + 12;
                if (rain.y > 400) {
                    rain.y = -700;
                }
            }
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
