var myq = [];
var myc = [];
var q = 0;
var a ="testing";
var correct = 0;
var points = 100;
var total_points = 0;
var number_of_questions = 0;
var progressBarId = 0;
function init(i,j) {
    myq = i;
    myc = j;
    number_of_questions = myq.length;
    console.log("init");
    console.log(myq.length);
}
function loop(question_number) {
    console.log("loop");
    console.log("question");
    console.log(q);
//    document.getElementById("test").innerHTML = myc.length;
    document.getElementById("question_start").innerHTML = myq[question_number].fields.question_name;
    document.getElementById("0").innerHTML = myc[q][0].fields.choice_name;
    document.getElementById("1").innerHTML = myc[q][1].fields.choice_name;
    document.getElementById("2").innerHTML = myc[q][2].fields.choice_name;
    hide(false);
    move();
}
function check(b){
    clearInterval(progressBarId);
    console.log("check");
    //    document.getElementById("test").innerHTML = "Du svarte: "+myc[0][b].fields.choice_name ;
    if(b==99) {
	document.getElementById("test").innerHTML = "TIME OUT!";
    }
    else if(myc[q][b].fields.is_correct) {
	document.getElementById("test").innerHTML = "CORRECT!";
	correct++;
	console.log("correct");
	console.log(correct);
	total_points += points;
	
    }
    else{
	document.getElementById("test").innerHTML = "INCORRECT!";
    }
    if(q<number_of_questions-1){
	loop(++q);
    }
    else{
	finish();
    }
}
function finish(){
    console.log("finish");
    hide(true);
    document.getElementById("test").innerHTML = "Complete";
    document.getElementById("scoreBar").style.display = "block";
    document.getElementById("sbar").style.display = "block";    
    move_scoreBar();
    document.getElementById("correct").innerHTML = "Correct: "+correct+"/"+number_of_questions;
    //document.getElementById("points").innerHTML = "Points: "+Math.ceil(total_points/number_of_questions);

}

function hide(a){
    var status = "";
    
    if(a){
	status="none";
	 }
    else{
	status="block";
    }
    document.getElementById("question_start").style.display =status;
    document.getElementById("0").style.display =status;
    document.getElementById("1").style.display =status;
    document.getElementById("2").style.display =status;
    document.getElementById("progressBar").style.display = status;
    document.getElementById("bar").style.display = status;
    
    document.getElementById("scoreBar").style.display = "none";
    document.getElementById("sbar").style.display = "none";

}

function move_scoreBar() {
    var elem = document.getElementById("sbar");
    var width = 0;
    id = setInterval(frame,20);
    console.log(total_points);
    function frame() {
	if(width >=Math.ceil(total_points/number_of_questions)){
	    clearInterval(id);
	}
	else {
	    width++;
	    elem.style.width = width +'%';
	    elem.innerHTML = width * 1 + "points";
	}
    }
}
function move() {
    var i = 100;
    console.log("move");
    var elem = document.getElementById("bar");
    elem.innerHTML = i;
    var width = 1;
    points = 100;
    //var id = setInterval(frame, 50);
    progressBarId = setInterval(frame,200);
    function frame() {
	i--;
	elem.innerHTML =i;	
	if (width >= 100) {
	    points = 0;
	    clearInterval(progressBarId);
	    check(99);
	}
	else {
	    width++;
	    elem.style.width = width + '%';
	    points--;
	}
    }
}

window.onload = hide(true);  
