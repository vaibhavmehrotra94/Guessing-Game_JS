var body = document.querySelector("body");
var buttons = document.querySelectorAll("button");
var boxes = document.querySelectorAll(".box");
var colorText = document.querySelector("span");
var message = document.querySelector("#msg");
var head = document.querySelector("#uBar");
var colorChange = document.querySelector("#change");
var difficulty =  document.querySelectorAll(".difficulty");
var colors = [];
var guessColor;
var flag;
var isEasy = false;
var defaultColor = head.style.backgroundColor;


colorChange.addEventListener("click",start);
difficulty[0].addEventListener("click",easy);

start();


// ********************functions start************************
function start(){
	if(isEasy===false)
		{
			colorArray(6);
		}
	else{
			colorArray(3);
		}
	head.style.backgroundColor = defaultColor;
	colorText.innerText = guessColor;
	colorChange.textContent="New Colors";
	message.textContent="";
	flag=false;

	// Random color assignment from colorARRAY & addEventListner
	for (var i=0;i<colors.length;i++)
	{
		// Give Color To the Boxes
		boxes[i].style.backgroundColor = colors[i];

		// Add eventListener to all boxes

		boxes[i].addEventListener("click", change);
	}

}


function colorArray(n){
	for(var i=0; i<n; i++)
	{
		colors[i]="rgb("+r(255)+", "+r(255)+", "+r(255)+")";
	}
	guessColor = colors[Number(r(n-1))];
}



function r(i){
	return (Math.floor(Math.random() * i) + 1);
}



function change(){
	if (flag!=true)
	{
		if(this.style.backgroundColor !== guessColor)
		{
			this.style.backgroundColor = body.style.backgroundColor;
			message.textContent="Try Again!";
			this.removeEventListener("click",change);
		}
		else{
			flag = true;
			message.textContent="Correct!!";
			finalColor();
			colorChange.textContent="Play Again?";
		}
	}
	
}

function finalColor(){
	head.style.backgroundColor=guessColor;
	for(var i=0; i<colors.length; i++)
	{
		boxes[i].style.backgroundColor = guessColor;
	}
}


function easy(){
	difficulty[1].addEventListener("click",hard);
	difficulty[0].classList.toggle("selected");
	difficulty[1].classList.toggle("selected");
	difficulty[0].removeEventListener("click",easy);
	for(i=0;i<6;i++)
	{
		boxes[i].removeEventListener("click", change);
		boxes[i].style.backgroundColor=body.style.backgroundColor;
		colors.pop();
	}
	isEasy=true;
	start();
}


function hard(){
	difficulty[0].addEventListener("click",easy);
	difficulty[0].classList.toggle("selected");
	difficulty[1].classList.toggle("selected");
	difficulty[1].removeEventListener("click",hard);
	for(i=0;i<colors.length;i++)
	{
		colors.pop();
	}
	isEasy=false;
	start();

}
