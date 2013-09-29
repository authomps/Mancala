var img_main;
var img_side;

function preloader() {
	if (document.images) {

		img_main = new Image();
		img_side = new Image();

		img_main.src = "resources/template_main.png";
		img_side.src = "resources/template_side.png";
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

var houses = new Array();
houses[0] = 0;
for (i=1; i<7; i++) {
	houses[i] = 4;
}
houses[7] = 0;
for (i=8; i<14; i++) {
	houses[i] = 4;
}

// Helper functions
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
				ctx.fillStyle = "rgb(" + getRandomInt(0,235) + "," + getRandomInt(0,235) + "," + getRandomInt(0,235) + ")";
				ctx.fill();
		   	}

		   	// Draw number
			ctx.fillStyle = "#000000";
			ctx.font="25px Helvetica";
			ctx.fillText(houses[i],3,20);
		}

		// Offset
		if (i > 0 && i < 7) {
			house.style.top = "-150px";
		} else if (i > 7) {
			house.style.left = "150px";
			house.style.top = "-154px";
		}
		house.style.position = "relative";

		// Tie the DOM events for each canvas to a function
		// c.onmouseover = mouse_over;
		// c.onmouseout = mouse_out;
		// c.onclick = on_click;

		// Add to document
		document.getElementById("game").appendChild(house);
	}
}

window.onload = function() {draw();};
