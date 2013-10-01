var img_board_background;
var img_main;
var img_side;
var img_main_focus;

function preloader() {
	if (document.images) {

		img_board_background = new Image();
		img_main = new Image();
		img_side = new Image();
		img_main_focus = new Image();

		img_board_background.src = "resources/baige.png";
		img_main.src = "resources/template_main.png";
		img_side.src = "resources/template_side.png";
		img_main_focus.src = "resources/template_main_focus.png";
	}
}
preloader();

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


var board = new Array();
var houses = new Array();
for (i=1; i<14; i++) {
	houses[i] = i;
}
houses[0] = 0;
houses[7] = 0;

// Helper functions
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
		// Create canvas element
		var house = document.createElement("canvas");
		house.setAttribute('id','house'+i);

		// Get context
		var ctx=house.getContext('2d');

		// Draw image on canvas
		if (i == 0 || i == 7) {
			house.setAttribute('width',width/8);
			house.setAttribute('height',height);
			house.className = "store";

			// Draw board part
		    ctx.drawImage(img_side,0,0);

		    // Draw beads
		    for(j=0; j<houses[i]; j++) {
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
			ctx.fillText(houses[i],63,35);

		} else {
			house.setAttribute('width',width/8);
			house.setAttribute('height',height/2);
			house.className = "house";

			// Draw board part
		    ctx.drawImage(img_main,0,0);
		    
		    // Draw beads
		    for(j=0; j<houses[i]; j++) {
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
			ctx.fillText(houses[i],3,20);

			// Tie the DOM events for each canvas to a function
			house.onmouseover = mouse_over;
			house.onmouseout = mouse_out;
			// house.onclick = on_click;
		}

		// Offset
		if (i > 0 && i < 7) {
			house.style.top = "-150px";
		} else if (i > 7) {
			house.style.left = "150px";
			house.style.top = "-154px";
		}
		house.style.position = "relative";

		// Add to document
		document.getElementById("game").appendChild(house);
	}
}

function mouse_over() {
	var house = document.getElementById(this.id);
	var ctx = house.getContext('2d');

	ctx.drawImage(img_main_focus,0,0);
}

function mouse_out() {
	var house = document.getElementById(this.id);
	var ctx = house.getContext('2d');

	ctx.drawImage(img_main,0,0);
}

// function pickturn(){
// 		var difference = (this.id.substring(this.id.length - 1))%3;
// 		var amt = 0;
// 		if(difference == 1)
// 			amt = 0;
// 		else if(difference == 2)
// 			amt = 1;
// 		else
// 			amt = 2;
		
// 		if(turn%2 == 1){
// 			var n = document.getElementById(this.id);
// 			var ntx=n.getContext('2d');
// 			ntx.fillStyle='#0278CC';
// 			ntx.fillRect(3%3+amt,0,148,148);
// 			ntx.fillStyle='#000000';
// 			ntx.font = "134px Arial"
// 			ntx.fillText("X",30,125);
// 			ntx.fillStyle='#0278CC';	
// 		}
// 		else{
// 			var n = document.getElementById(this.id);
// 			var ntx=n.getContext('2d');
// 			ntx.fillStyle='#FF0000';
// 			ntx.fillRect(3%3+amt,0,148,148);
// 			ntx.fillStyle='#000000';
// 			ntx.font = "134px Arial"
// 			ntx.fillText("O",23,125);
// 			ntx.fillStyle='#FF0000';
// 		}
// 	}
// }

window.onload = function() {
	draw();
	var game = document.getElementById('game');
	game.style.maxHeight = "300px";
	game.style.backgroundImage = "url(" + img_board_background.src + ")";
};
