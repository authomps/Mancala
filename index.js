var houses = new Array();
houses[0] = 0;
for (i=1;i<7;i++) {
	houses[i] = 4;
}
houses[7] = 0;
for (i=8;i<14;i++) {
	houses[i] = 4;
}

window.onload = function(){
	var width = 1200;
	var height = 300;

	if (document.images) {

		var img_main = new Image();
		var img_side = new Image();

		img_main.src = "resources/template_main.png";
		img_side.src = "resources/template_side.png";
	}

	// var c = document.createElement("canvas");
	// c.setAttribute('id','board_background');
	// c.setAttribute('width',width);
	// c.setAttribute('height',height);
	// c.className = "board_background";
	
	// document.getElementById("game").appendChild(c);

	// var ctx=c.getContext('2d');
	// ctx.fillStyle='#FFFFFF';
	// ctx.fillRect(0,0,width,height);


	for (i=0;i<14;i++) {
		console.log(houses[i]);
		var house = document.createElement("canvas");
		house.setAttribute('id','house'+i);

		var ctx=house.getContext('2d');

		if (i == 0 || i == 7) {
			house.setAttribute('width',width/8);
			house.setAttribute('height',height);
			house.className = "store";

		    ctx.drawImage(img_side,0,0);
		    ctx.drawImage(img_main,0,100);

		} else {
			house.setAttribute('width',width/8);
			house.setAttribute('height',height/2);
			house.className = "house";

		    ctx.drawImage(img_main,0,0);
		}

		if (i > 0 && i < 7) {
			// var x = width/8 * i;
			// house.style.left = x + "px";
			house.style.top = "-150px";
		} else if (i > 7) {
			// var x = width/8 * (14 - i);
			house.style.left = "150px";
			house.style.top = "-154px";
		}
		house.style.position = "relative";

		document.getElementById("game").appendChild(house);

		ctx.fillStyle='#FFFFFF';
		// ctx.fillCircle(0,0,20,20);
	    	
	  		// var ctx=c.getContext('2d');								//Get the context - needed for HTML5 manipulation
			// ctx.fillStyle='#FFFFFF';								//Make it blank to begin with
			// ctx.fillRect(0,0,148,148);	



		// if (i == 0 || i = 7) {
		// }
		// else {
			// ctx.fillRect(0,0,150,150);
		// }

	}

}
