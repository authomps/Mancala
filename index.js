// Declare image variables
var img_board_background;
var img_main;
var img_side;
var img_main_focus;
var img_main_error;

// Preload images
function preloader() {
	if (document.images) {

		img_board_background = new Image();
		img_main = new Image();
		img_side = new Image();
		img_main_focus = new Image();
		img_main_error = new Image();

		img_board_background.src = "resources/baige.png";
		img_main.src = "resources/template_main.png";
		img_side.src = "resources/template_side.png";
		img_main_focus.src = "resources/template_main_focus.png";
		img_main_error.src = "resources/template_main_error.png";
	}
}
preloader();

// Width and heigh variables
var width = 1200;
var height = 300;
var x_main_min = 30;
var x_main_max = 105;
var y_main_min = 40;
var y_main_max = 105;
var x_side_min = 23;
var x_side_max = 115;
var y_side_min = 50;
var y_side_max = 269;

// Houses array
var houses = new Array();
for (i=1; i<14; i++) {
	houses[i] = 4;
}
houses[0] = 0;
houses[7] = 0;

// Player turn variable
var player1_turn = true;

//// Helper functions

// Generates random integer betwen range min and max
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Converts index i from child process creation to board order index
function convertIndex(i) {
	if(i == 0 || i == 7)  {
		return i;
	}
	else if ( i < 7 ) {
		return 14 - i;
	}
	else {
		return i - 7;
	}
	return board[i];
}

// Draw board
function draw() {
	// Draw each house and store
	for (i=0; i<14; i++) {

		var index = convertIndex(i);

		// Create canvas element
		var house = document.createElement("canvas");
		house.setAttribute('id',index);

		// Get context
		var ctx=house.getContext('2d');

		// Draw image on canvas
		if (index == 0 || index == 7) {
			house.setAttribute('width',width/8);
			house.setAttribute('height',height);
			house.className = "store";

			// Draw board part
		    ctx.drawImage(img_side,0,0);

		    // Draw beads
		    for(j=0; j<houses[index]; j++) {
		    	var x = getRandomInt(x_side_min, x_side_max);
		    	var y = getRandomInt(y_side_min, y_side_max);

				ctx.beginPath();
				ctx.arc(x,y,10,0,2*Math.PI);
				ctx.fillStyle = "rgb(" + getRandomInt(0,235) + "," + getRandomInt(0,235) + "," + getRandomInt(0,235) + ")";
				ctx.fill();	
		    }

		    // Draw number
			ctx.fillStyle = "#000000";
			ctx.font="25px Helvetica";
			ctx.fillText(houses[index],63,35);

		} else {
			house.setAttribute('width',width/8);
			house.setAttribute('height',height/2);
			house.className = "house";

			// Draw board part
		    ctx.drawImage(img_main,0,0);
		    
		    // Draw beads
		    for(j=0; j<houses[index]; j++) {
		    	var x = getRandomInt(x_main_min, x_main_max);
		    	var y = getRandomInt(y_main_min, y_main_max);

				ctx.beginPath();
				ctx.arc(x,y,10,0,2*Math.PI);
				ctx.fillStyle = "rgb(" + getRandomInt(0,255) + "," + getRandomInt(0,255) + "," + getRandomInt(0,255) + ")";
				ctx.fill();
		   	}

		   	// Draw number
			ctx.fillStyle = "#000000";
			ctx.font="25px Helvetica";
			ctx.fillText(houses[index],3,20);

			// Tie the DOM events for each canvas to a function
			house.onmouseover = mouse_over;
			house.onmouseout = mouse_out;
			house.onclick = mouse_click;
			// house.onclick = on_click;
		}

		// Offset
		if (index > 0 && index < 7) {
			house.style.left = "150px";
			house.style.top = "-154px";

		} else if (index > 7) {
			house.style.top = "-150px";
		}
		house.style.position = "relative";

		// Add to document
		document.getElementById("game").appendChild(house);
	}
}

// DOM event functions
function mouse_over() {
	var house = document.getElementById(this.id);
	var ctx = house.getContext('2d');

	if((player1_turn && this.id < 7) || (!player1_turn && this.id > 7)) {
		ctx.drawImage(img_main_error,0,0);
	}
	else {
		ctx.drawImage(img_main_focus,0,0);
	}

}
function mouse_out() {
	var house = document.getElementById(this.id);
	var ctx = house.getContext('2d');

	ctx.drawImage(img_main,0,0);
}
function mouse_click() {
	var house = document.getElementById(this.id);
	var ctx = house.getContext('2d');

	if(player1_turn && this.id < 7) {
		//Display error	
	} 
	else if(!player1_turn && this.id > 7) {
		//Display error
	}
	else {
		playerTurn(this.id);
	}

}

// Moves beads for a player's turn
function playerTurn(pos) {

	//Check if valid turn, ie, the selected container has beads
	if(houses[pos] == 0) {
		console.log("IDIOT TRY AGAIN");
		return;
	}

	// Get amount of beads and get int value of pos
	var beads = houses[pos];
	houses[pos] = 0;
	pos_int = parseInt(pos);

	// current index
	current_index = (pos_int + 1)%14;	

	// loop until all beads are gone
	for(i = 0; i < beads; current_index++) {
		current_index = current_index%14;
		// Check if player is over his bank or other player's bank
		if(current_index == 0 && player1_turn) {
			houses[current_index] += 1;
			i++;
		}
		else if(current_index == 7 && !player1_turn) {
			houses[current_index] += 1;
			i++;
		}
		else if(current_index != 0 && current_index != 7){
			houses[current_index] += 1;
			i++;
		}
	}
	// Check if player goes again or gets beads
	checkBonus(current_index-1);

	//Check for end of game
	if( checkEmpty() ) {
		// Add beads remaining to players' store
		for(i = 1; i < 7; i++) {
			houses[7] += houses[i];
			houses[i] = 0;
		}
		for(i = 8; i < 14; i++) {
			houses[0] += houses[i];
			houses[i] = 0;
		}

		// Output winner dialogue
		if(houses[0] > houses[7]) {
			document.getElementById("display").innerHTML = "!!! Player 1 wins !!!";
		}
		else {
			document.getElementById("display").innerHTML = "!!! Player 2 wins !!!";
		}
		document.getElementById("display").className = "game_over";
	}

	// redraw html
	document.getElementById("game").innerHTML = "";
	draw();
}

// Check if player gets a bonus
function checkBonus(pos) {

	if(pos == 7 || pos ==0) {
		return;
	}
	
	if(houses[pos] == 1 && houses[14-pos] != 0) {
		if(player1_turn && pos > 7) {
			houses[0] += houses[14-pos] + houses[pos];
			houses[pos] = 0;
			houses[14-pos] = 0;
		}
		else if(!player1_turn && pos < 7 ) {
			houses[7] += houses[14-pos] + houses[pos];
			houses[pos] = 0;
			houses[14-pos] = 0;	
		}
	}

	player1_turn = !player1_turn;
	if (player1_turn) {
		document.getElementById("display").innerHTML = "Player 1's Turn";
	document.getElementById("display").className = "player1";
	} else {
		document.getElementById("display").innerHTML = "Player 2's Turn";
	document.getElementById("display").className = "player2";
	}
}

// Check if either side of the board has no beads
function checkEmpty() {
	var bot_empty = true;
	var top_empty = true;
	for(i=1; i < 7; i++) {
		if(houses[i] != 0) {
			bot_empty = false;
		}
	}

	for(i=8; i < 14; i++) {
		if(houses[i] != 0) {
			top_empty = false;
		}
	}

	return (bot_empty || top_empty);
}

// Called when window loads
window.onload = function() {
	draw();
	var game = document.getElementById('game');
	game.style.maxHeight = "300px";
	game.style.backgroundImage = "url(" + img_board_background.src + ")";
};
