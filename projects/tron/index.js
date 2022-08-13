/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects

  $("#playAgain").hide(); // hides the play again button when the code begins so it may be shown later when the game ends


// my factory function used for game object values
function Factory (id, x, y, velocityX, velocityY) {
  var instance = {
    id: id,
    x: x,
    y: y,
    velocityX: velocityX,
    velocityY: velocityY,
    height: $(id).height(),
    width: $(id).width()
  };
  return instance;
};

  var tronHead = Factory("#tron", 100, 100, 0, 0); // declaration of factory values for the snake's head
  var tronBody = [tronHead];  // array that stores the snake's body segments

  var tronHead2 = Factory("#tron2", 300, 200, 0, 0); // declaration of factory values for the snake's head
  var tronBody2 = [tronHead2];  // array that stores the snake's body segments
  /*
  var apple = Factory("#apple", 100, 200, 0, 0); // declaration of factory values for  the apple
  */
  //
  var score = 0; // variable that stores the score value
  //
  var BOARD_WIDTH = $("#board").width(); // declaration of variable to store board width
  var BOARD_HEIGHT = $("#board").height(); // declaration of variable to store board height


  KEY = {  // key with key-value pairs for the snake's movement keys to have no magic numbers
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68
  };


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  /*
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  */
  $(document).on('keydown', setSnakeVelocity); // execute setPlayerVelocity() in response to keydown events
  /*
	$(document).on('keyup', stopSnakeVelocity);
  */

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    repositionTron(tronHead);
    redrawGameItem(tronHead);
    repositionTron(tronHead2);
    redrawGameItem(tronHead2);
    /*
    appleEatDetect();
    */
    /*
    redrawGameItem(apple);
    */
    repositionBody();
    borderDetectTron();
    
    tronCollision();
    
  }
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
//
/*
  function addSnakeSegment() { // function used to add a new segment to the snake, it is called whenever the snake eats the apple
    var newID = "tron" + tronBody.length; // variable that gives the new id of each snake segment


    $("<div>").addClass("tron").attr("id", newID).appendTo("#board"); // code that appends the new snake segment to the board


    var tail = tronBody[tronBody.length-1]; // array to store the current tail segment


    var newSegment = Factory("#" + newID, tail.x, tail.y, 0, 0); // code that actually declares the new segment
    

    tronBody.push(newSegment); // pushes the new segment into the body
// SECOND
    var newID = "tron2" + tronBody2.length; // variable that gives the new id of each snake segment


    $("<div>").addClass("tron2").attr("id", newID).appendTo("#board"); // code that appends the new snake segment to the board


    var tail = tronBody2[tronBody2.length-1]; // array to store the current tail segment


    var newSegment2 = Factory("#" + newID, tail.x, tail.y, 0, 0); // code that actually declares the new segment
   

    tronBody2.push(newSegment2); // pushes the new segment into the body
  }
  */

  function repositionBody() { // repositions the body segments to follow and flow with the head like in Snake
    for(var i = tronBody.length-1;i >= 1;i--){
      tronBody[i].x = tronBody[i-1].x;
      tronBody[i].y = tronBody[i-1].y;

      redrawGameItem(tronBody[i]);
    }
// SECOND
      for(var i = tronBody2.length-1;i >= 1;i--){
        tronBody2[i].x = tronBody2[i-1].x;
        tronBody2[i].y = tronBody2[i-1].y;
  
        redrawGameItem(tronBody2[i]);
    }
  }

  function endGame() { // called when game ends (you die by hitting yourself or borders)
    clearInterval(interval);
		$(document).off();
		$('#snakeEndScreen').text("Game Over"); // writes text on screen that says 'Game Over'
		$("#playAgain").show(); // shows button that you can click to play again
		$("#playAgain").on("click", playAgain); // makes the button register clicks in order to play again
  }

  // reloads the game by reloading the webpage
	function playAgain() { // simple function that just resets the page
		location.reload();
	}

  function repositionTron(obj) { // function used to reposition the snake across the board with its speed (basically make it move)
    obj.x += obj.velocityX;
    obj.y += obj.velocityY;
   
  }

  function redrawGameItem(obj) { // function used to redraw game items to make them consistently reappear to appear to move across the screen
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }
  /*
  function generateApple() { // function that is called whenever apple is eaten, generates a new apple in any random tile within the board that isn't occupied by snake
    apple.x = Math.floor(Math.random() * 25) * 20;
    apple.y = Math.floor(Math.random() * 25) * 20;
    
    for(var i = tronBody.length-1;i >= 1;i--) { // checks if the newly generated apple from the earlier code in the function actually appears over the snake, if it does it simply re-executes the function until it doesn't appear over the snake anymore
      if (tronHead.y === apple.y && tronHead.x === apple.x || tronBody[i].y === apple.y && tronBody[i].x === apple.x) {
        generateApple();
      }
    }
  }
  //
  function appleEatDetect() { // detects when the apple is eaten with a simple collision check with the snake's head coordinates and the apple's coordinates
    if (tronHead.y === apple.y && tronHead.x === apple.x) {
      // make increase score and add a segment
      score += 1; // adds to the score with each apple eaten
      $('#score').text("Score:" + score); // updates the score on the screen as text
      generateApple(); // calls the generateApple function to make a new apple
      addSnakeSegment(); // calls the addSnakeSegment function to add segment to snake
    }
  }
  */
  function borderDetectTron() {  // simple border collision check to see if snake's head collides with the border, and if it does endGame is called to end the game
    if (tronHead.y >= BOARD_HEIGHT - tronHead.height + 20) {
      endGame(); 
    }
    if (tronHead.y <= BOARD_HEIGHT - BOARD_HEIGHT - 20) {
      endGame(); 
    }
    if (tronHead.x >= BOARD_WIDTH - tronHead.width + 20) {
      endGame(); 
    }
    if (tronHead.x <= BOARD_WIDTH - BOARD_WIDTH - 20) {
      endGame();
    }

    if (tronHead2.y >= BOARD_HEIGHT - tronHead2.height + 20) {
      endGame(); 
    }
    if (tronHead2.y <= BOARD_HEIGHT - BOARD_HEIGHT - 20) {
      endGame(); 
    }
    if (tronHead2.x >= BOARD_WIDTH - tronHead2.width + 20) {
      endGame(); 
    }
    if (tronHead2.x <= BOARD_WIDTH - BOARD_WIDTH - 20) {
      endGame();
    }
  }

  function tronCollision() { // function used to check if the snake collides with itself
    for(var i = tronBody.length-1;i >= 2;i--) { // the loop goes through each segment of the snake's body starting after 2 segments already exist (head and the first body part because it, for some reason, spawns within the head and would immediately be registered as colliding) and checks to see if they collide with the head
      if ((tronHead.y === tronBody[i].y) && (tronHead.x === tronBody[i].x)) {
       endGame(); // game ends if the snake collides with itself
      }
    }
    for(var i = tronBody2.length-1;i >= 2;i--) { // the loop goes through each segment of the snake's body starting after 2 segments already exist (head and the first body part because it, for some reason, spawns within the head and would immediately be registered as colliding) and checks to see if they collide with the head
      if ((tronHead2.y === tronBody2[i].y) && (tronHead2.x === tronBody2[i].x)) {
       endGame(); // game ends if the snake collides with itself
      }
    }
    for(var i = tronBody.length-1;i >= 2;i--) { // the loop goes through each segment of the snake's body starting after 2 segments already exist (head and the first body part because it, for some reason, spawns within the head and would immediately be registered as colliding) and checks to see if they collide with the head
      if ((tronHead.y === tronBody2[i].y) && (tronHead.x === tronBody2[i].x)) {
       endGame(); // game ends if the snake collides with itself
      }
    }
    for(var i = tronBody2.length-1;i >= 2;i--) { // the loop goes through each segment of the snake's body starting after 2 segments already exist (head and the first body part because it, for some reason, spawns within the head and would immediately be registered as colliding) and checks to see if they collide with the head
      if ((tronHead2.y === tronBody[i].y) && (tronHead2.x === tronBody[i].x)) {
       endGame(); // game ends if the snake collides with itself
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// KEYBOARD FUNCTIONS //////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function setSnakeVelocity(event) { // keyboard function used to make the snake move, there is another if under each event.which key check to ensure that the snake can only move if it isn't already moving in that coordinate (y or x). For example, this prevents it from turning back into itself if it were moving to the right, forcing it to move either up or down, just like the real Snake game
		if (event.which === KEY.UP) {
      if (tronHead.velocityY === 0) {
        tronHead.velocityY = -20; 
        tronHead.velocityX = 0;
      }
		}
		if (event.which === KEY.DOWN) {
      if (tronHead.velocityY === 0) {
        tronHead.velocityY = 20; 
        tronHead.velocityX = 0;
      }

		}
		if (event.which === KEY.LEFT) {
      if (tronHead.velocityX === 0) {
			tronHead.velocityX = -20; 
      tronHead.velocityY = 0;
      }
		}
		if (event.which === KEY.RIGHT) {
      if (tronHead.velocityX === 0) {
        tronHead.velocityX = 20; 
        tronHead.velocityY = 0;
      }
		}

    if (event.which === KEY.W) {
      if (tronHead2.velocityY === 0) {
        tronHead2.velocityY = -20; 
        tronHead2.velocityX = 0;
      }
		}
		if (event.which === KEY.S) {
      if (tronHead2.velocityY === 0) {
        tronHead2.velocityY = 20; 
        tronHead2.velocityX = 0;
      }

		}
		if (event.which === KEY.A) {
      if (tronHead2.velocityX === 0) {
			tronHead2.velocityX = -20; 
      tronHead2.velocityY = 0;
      }
		}
		if (event.which === KEY.D) {
      if (tronHead2.velocityX === 0) {
        tronHead2.velocityX = 20; 
        tronHead2.velocityY = 0;
      }
		}
	}


}

