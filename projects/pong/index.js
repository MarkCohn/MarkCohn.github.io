$(document).ready(function() {
	////////////////////////////////////////////////////////////////////////////////
	///////////////////////// INITIALIZATION ////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	// declaring framerate of game
	var FPS = 60;

	// variables that don't fit within the factory function
	var BOARD_WIDTH = $("#board").width();
	var BOARD_HEIGHT = $("#board").height();
	var paddle1Score = 0;
	var paddle2Score = 0;

	// Hiding play again button
	$("#playAgain").hide();

	// key for movement keys on paddle1 and paddle2
	KEY = {
		"UP": 38,
		"DOWN": 40,
  
		"W": 87,
		"S": 83,
	}

	// factory function in order to store many essential parts of the core moving game-objects like the id, x, y, velocity of X, and velocity of Y
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

	// declaration of factory function for paddle1 to define parameters
	var paddle1 = Factory("#paddle1", BOARD_WIDTH - 30 - $("#paddle1").width(), BOARD_HEIGHT/2, 0, 0);

	// declaration of factory function for paddle2 to define parameters
	var paddle2 = Factory("#paddle2", 30, BOARD_HEIGHT/2, 0, 0);
  
	// declaration of factory function for ball to define parameters
	var ball = Factory("#ball", BOARD_WIDTH/2, BOARD_HEIGHT/2, 5, 2);
 

	////////////////////////////////////////////////////////////////////////////////
	////////////////////////////// CORE LOGIC //////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	let interval = setInterval(newFrame, 1000 / FPS); // execute newFrame() 60 times per second

	$(document).on('keydown', setVelocity); // execute setVelocity() in response to keydown events
	$(document).on('keyup', stopVelocity);  // execute stopVelocity() in response to keydown events
  
	// used to constantly perform checks on functions that move game objects and detect game object interaction
	function newFrame() {
        repositionInstance(paddle1);
		repositionInstance(paddle2);
		repositionInstance(ball);
        redrawInstance(paddle1);
		redrawInstance(paddle2);
		redrawInstance(ball);
        borderStopInstance(paddle1);
		borderStopInstance(paddle2);
		ballLeftRightCollide();
		ballTopBottomCollide();
		ballHitsPaddle();
	}

	////////////////////////////////////////////////////////////////////////////////
	////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////
	// repositions the game object coordinates on the screen as they move
    function repositionInstance(object) {
      	object.x += object.velocityX;
		object.y += object.velocityY;
    }

	// repeatedly redraws the game objects to convey motion
    function redrawInstance(object) {
        $(object.id).css("left", object.x);
		$(object.id).css("top", object.y);
    }
  
	// detects border collision for the paddles against the top and bottom of the board to stop them as they collide
    function borderStopInstance(paddle) {
        if (paddle.y >= BOARD_HEIGHT - paddle.height) {
			paddle.y += -5; 
		}
		if (paddle.y <= BOARD_HEIGHT - BOARD_HEIGHT) {
			paddle.y += 5; 
		}
    }

	// detects border collision for the ball against the top and bottom of the board to bounce off diagonally at the same speed
	function ballTopBottomCollide() {
		if (ball.y >= BOARD_HEIGHT - ball.height) {
			ball.velocityY = -ball.velocityY; 
		}
		if (ball.y <= BOARD_HEIGHT - BOARD_HEIGHT) {
			ball.velocityY = -ball.velocityY; 
		}
	}

	// detects border collision for the ball against the left and right walls of the board to update score and reset the ball position, and detects when the game ending point is reached
	function ballLeftRightCollide() {
		if (ball.x >= BOARD_WIDTH - ball.width) {
			   // paddle2 scores!
			   paddleScore(paddle2);
			   ballReset();
			   
			   if (paddle2Score === 11) {
					endGame(paddle2);
			   }
			  
		   }
		   if (ball.x <= BOARD_WIDTH - BOARD_WIDTH) {
			   // paddle1 scores!
			   paddleScore(paddle1);
			   ballReset();
			 
			   if (paddle1Score === 11) {
				   endGame(paddle1);
			   }
			 
		   }
	}

	// used to detect the collision of game objects against one another
	function doCollide(obj1, obj2) {
		// TODO: calculate and store the remaining
		// sides of the square1
		obj1.leftX = obj1.x;
		obj1.topY = obj1.y;
		obj1.rightX = obj1.leftX + $(obj1.id).width();
		obj1.bottomY = obj1.y + $(obj1.id).height();
		
		// TODO: Do the same for square2
		obj2.leftX = obj2.x;
		obj2.topY = obj2.y;
		obj2.rightX = obj2.leftX + $(obj2.id).width();
		obj2.bottomY = obj2.y + $(obj2.id).height();
		// TODO: Return true if they are overlapping, false otherwise
		if ((obj1.rightX > obj2.leftX) && 
		    (obj1.leftX < obj2.rightX) &&
		    (obj1.bottomY > obj2.topY) &&
		    (obj1.topY < obj2.bottomY)) {
			
			return true;
		} else {
		
			return false;
		  
		}
	}

	// uses doCollide function to detect the collision of either paddle and the ball, adding more speed as the ball is bounced
	function ballHitsPaddle() {
		if (doCollide(paddle1, ball)) {
			ball.velocityX = -ball.velocityX;
			ball.velocityX -= 0.5;
		}
		if (doCollide(paddle2, ball)) {
			ball.velocityX = -ball.velocityX;
			ball.velocityX += 0.5;
		}
	}

	// used to directly append the score to the screen as text and update the score variable for either paddle
	function paddleScore(paddle) {
		if (paddle.id === paddle1.id) {
		paddle1Score += 1;
		$('#paddle1Score').text(paddle1Score);
		}
		else if (paddle.id === paddle2.id) {
		paddle2Score += 1;
		$('#paddle2Score').text(paddle2Score);
		
		}
	}

	// resets the position of the ball to center and speed of the ball to its starting speed while also making it appear on the side of the person who last scored
	function ballReset() {
		ball.x = BOARD_WIDTH/2;
		ball.y = BOARD_HEIGHT/2;
		if (ball.velocityX > 5) {
			ball.velocityX = -5;
		}
		else if (ball.velocityX < -5) {
			ball.velocityX = 5;
		}
		else {
		ball.velocityX = -5;
		}
		ball.velocityY = -ball.velocityY;
	}

	// ends the game of pong, showing a win screen for the winning paddle and offering for the game to be reset with a button
	function endGame(paddle) {
		if (paddle.id === paddle1.id) {
			clearInterval(interval);
			$(document).off();
			$('#paddleWinScreen').text("Paddle 1 Wins!");
			$("#playAgain").show();
			$("#playAgain").on("click", playAgain);
		}
		else if (paddle.id === paddle2.id) {
			clearInterval(interval);
			$(document).off();
			$('#paddleWinScreen').text("Paddle 2 Wins!");
			$("#playAgain").show();
			$("#playAgain").on("click", playAgain);
		}
	}

	// reloads the game by reloading the webpage
	function playAgain() {
		location.reload();
	}

	////////////////////////////////////////////////////////////////////////////////
	////////////////////////// KEYBOARD FUNCTIONS //////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////

	// makes the paddles move depending on which key is pressed
	function setVelocity(event) {
		if (event.which === KEY.UP) {
			paddle1.velocityY = -5; 
		}
		if (event.which === KEY.DOWN) {
			paddle1.velocityY = 5; 
		}

		if (event.which === KEY.W) {
			paddle2.velocityY = -5; 
		}
		if (event.which === KEY.S) {
			paddle2.velocityY = 5; 
		}
	
	}

	// halts the paddles' movement with the release of a key
	function stopVelocity(event) {
		if (event.which === KEY.UP || event.which === KEY.DOWN) {
			paddle1.velocityY = 0; 
		}

	

		if (event.which === KEY.W || event.which === KEY.S) {
			paddle2.velocityY = 0; 
		}

	}
  

}); // DO NOT DELETE


