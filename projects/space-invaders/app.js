const grid = document.querySelector('.grid') // declare grid as variable from css
const resultsDisplay = document.querySelector('.results') // declare display results as variable from css
let currentShooterIndex = 202 // middle coordinate for shooter
let width = 15 // defined width of grid
let direction = 1 // starting movement direction of invaders
let invadersId // declaration of constant invader movement interval
let goingRight = true // invaders initially are going right
let aliensRemoved = [] // stores removed/killed invaders
let results = 0 // declaration of initial score
// ^ set-up with declaration of variables and grid

for (let i = 0; i < 225; i++) {       // for loop used to put 225 squares into the grid 
  const square = document.createElement('div') // square variable as a div element
  grid.appendChild(square) // places created square inside grid for each loop
}

const squares = Array.from(document.querySelectorAll('.grid div')) // gets all the squares that are in the grid in an array

const alienInvaders = [    // an array that creates three rows of aliens on the specific squares
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

function draw() {     // draws invaders in squares 
  for (let i = 0; i < alienInvaders.length; i++) { // places them with a loop
    if(!aliensRemoved.includes(i)) { // if the aliens removed array does not include an alien, then it is able to be added/redrawn again
      squares[alienInvaders[i]].classList.add('invader')  // pass through the loop each time to add invaders
    }
  }
}

draw() // draw function called to draw all

function remove() { // remove function that is called to remove invaders
  for (let i = 0; i < alienInvaders.length; i++) { // for loop same as the one that adds/draws invaders yet is used for removal of them
    squares[alienInvaders[i]].classList.remove('invader') // pass through loop to remove invaders
  }
}

squares[currentShooterIndex].classList.add('shooter') // adds shooter 


function moveShooter(e) { // function to move shooter
  squares[currentShooterIndex].classList.remove('shooter') // removes shooter from board
  switch(e.key) {  // switches out key that is being pressed to whatever key is declared in case
    case 'ArrowLeft': // when left arrow is pressed
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1 // checking if shooter is at left border and if not it can move left
      break // segment to move on to next case
    case 'ArrowRight' : // when right arrow is pressed
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1 // checking if shooter is at right border and if not it can move right
      break // segment to end the cases
  }
  squares[currentShooterIndex].classList.add('shooter') // redraw shooter in new position
}
document.addEventListener('keydown', moveShooter) // event listener to listen to key presses to execute actions

function moveInvaders() { // function to move invaders
  const leftEdge = alienInvaders[0] % width === 0 // defined left border for alien invaders
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1 // defined right border for alien invaders
  remove() // calling remove function to remove invaders

  if (rightEdge && goingRight) {  // if going right and touching right edge
    for (let i = 0; i < alienInvaders.length; i++) { // looping through each alien invader
      alienInvaders[i] += width +1 // moves each alien invader along in order
      direction = -1 // change in direction for each invader
      goingRight = false // changes from going right to going left
    }
  }

  if(leftEdge && !goingRight) { // if not going right and touching left edge
    for (let i = 0; i < alienInvaders.length; i++) { // loops through each alien invader
      alienInvaders[i] += width -1 // moves each alien invader along in order
      direction = 1 // change in direction for each invader 
      goingRight = true // changes from going left to going right
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) { // looping through each alien invader
    alienInvaders[i] += direction // alien invader constantly moving in certain direction (changes to either be left or right if - or +)
  }

  draw() // draw function called to draw all

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) { // if invader and shooter are in same row
    resultsDisplay.innerHTML = 'GAME OVER' // displays game over text as you lose
    clearInterval(invadersId) // ends interval timer for invaders and freezes them
  }

  for (let i = 0; i < alienInvaders.length; i++) { // looping through each invader
    if(alienInvaders[i] > (squares.length)) { // if invader touches bottom of grid
      resultsDisplay.innerHTML = 'GAME OVER' // game displays game over text
      clearInterval(invadersId) // ends interval timer for invaders and freezes them
    }
  }
  if (aliensRemoved.length === alienInvaders.length) { // if invaders removed equals the number of invaders that existed
    resultsDisplay.innerHTML = 'YOU WIN' // displays victory text to show you win
    clearInterval(invadersId) // ends interval timer for invaders and freezes them
  }
}
invadersId = setInterval(moveInvaders, 600) // interval in which the invaders move

function shoot(e) { // shooting function
  let laserId // declaration of laserId for laser movement interval
  let currentLaserIndex = currentShooterIndex // wherever current shooter is, laser start froms there
  function moveLaser() { // function to move laser from shooter to invader
    squares[currentLaserIndex].classList.remove('laser') // removes laser from where it is
    currentLaserIndex -= width // laser is moved up
    squares[currentLaserIndex].classList.add('laser') // laser is drawn/added again

    if (squares[currentLaserIndex].classList.contains('invader')) { // if the laser is in the same square as an invader
      squares[currentLaserIndex].classList.remove('laser') // laser is removed
      squares[currentLaserIndex].classList.remove('invader') // invader is removed
      squares[currentLaserIndex].classList.add('boom') // a boom effect is added

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300) // timer for boom effect quickly disappearing as it is removed
      clearInterval(laserId) // ends interval for laser and freezes them

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex) // removes alien invader from array when it is destroyed by laser
      aliensRemoved.push(alienRemoved) // adds removed alien to removed alien array when it is destroyed by laser
      results++ // adds point to score for each alien invader destroyed
      resultsDisplay.innerHTML = results // displays results as html text
      console.log(aliensRemoved) // logs the aliens removed array in the console

    }

  }
  switch(e.key) { // switch case to other key
    case 'ArrowUp': // arrow up key press detect
      laserId = setInterval(moveLaser, 100) // interval set for laser's movement
  }
}

document.addEventListener('keydown', shoot) // event listener for shooting key press