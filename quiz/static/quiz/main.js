var categories = [];
var cursorOnDiv = false;
var num_questions;
var num_categories;
var num_most_popular;
var num_most_difficult;
var numqincat = {};
var status;
function initialize() {    
    //Get categories
    console.log("main.js::init()   ");
    //get_categories();
    $.get("/getstatistics",{},function(receiveddata) {
	num_questions = receiveddata["qnumber"];
	num_categories = receiveddata["cnumber"];
	numqincat = receiveddata["numqincat"];
	status = receiveddata["status"];
	document.getElementById("login").innerHTML =status;
	if(status =="login") {
	    login();
	}
	createTableOfStatistics(numqincat);
    });
    //loop(0); kall denne på klikk categorye...obs må gjøre query på riktig category 
}

function clean_screen() {
    console.log("main.js::clean_screen()");
    if(document.getElementById("hcontainer").style.display=="block")
	document.getElementById("hcontainer").style.display="none";
    if(document.getElementById("mcontainer").style.display=="block")
	document.getElementById("mcontainer").style.display="none";
    if(document.getElementById("ccontainer").style.display=="block")
	leavecategory();
    if(document.getElementById("lcontainer").style.display=="block")
	leavelogin();
    if(document.getElementById("pcontainer").style.display=="block")
	document.getElementById("pcontainer").style.display="none";
    if(document.getElementById("mecontainer").style.display=="block")
	document.getElementById("mecontainer").style.display="none";
    if(document.getElementById("ncontainer").style.display=="block")
	document.getElementById("ncontainer").style.display="none";
    if(document.getElementById("acontainer").style.display=="block")
	document.getElementById("acontainer").style.display="none";
    if(document.getElementById("scontainer").style.display=="block")
	document.getElementById("scontainer").style.display="none";
}
function get_categories() {
    console.log("main.js::get_categories()");
    $.get("quiz/getdata",function(receiveddata) {
        console.log("will execute this line");
	categories = JSON.parse(receiveddata);
	console.log("will not execute this line");
    });        
}
function printing() {
    console.log("main.js::printing()");
    console.log(categories[0].fields["category_name"]);
}
function home() {
    console.log("main.js::home()");
    window.location.href="/";
}
function main() {
    console.log("main.js::main()");
}
function news() {
    console.log("main.js::news()");
    //Since login block is used initialy, we don't want the
    //other menus to pop up behind when mouse is moving from
    //url to lcontainer
/*    var l = document.getElementById("lcontainer");
    if(l.style.display=="block")
	return;
*/	
    var element = document.getElementById("ncontainer");
    if(element.style.display=="block"){
	element.style.display="none";
    }
    else{
	clean_screen();
	element.style.display="block";
	var header = document.getElementById("nh2");
	header.innerHTML = "News";
	var text = document.getElementById("nc");
	text.innerHTML = "20.06.2017 : release : mobile version<br>01.06.2017 : Domain Name   : www.qdb.no<br>01.06.2017 : release    : QDB version 1.0.1 <br>28.05.2017 : highscore      : implemented<br>23.05.2017 : new category : Economy<br>22.05.2017 : new category : TV<br>22.05.2017 : new category : Art<br>20.05.2017 : release date : 01.06.2017<br>20.05.2017 : new category : Telecom<br>20.05.2017 : new category : Food<br>20.05.2017 : new category : Language<br>";
		/*text.style.fontFamily="Courier";*/
    }
}
function mysite() {
    console.log("main.js::mysite()");
    //    clean_screen();
    var l = document.getElementById("lcontainer");
    if(l.style.display=="block")
	return;
    var is_active = false;
    var element = document.getElementById("mcontainer");
    if(element.style.display=="block"){
	is_active = true;
    }
    clean_screen();
    if(!is_active){
	console.log("Popping up mysite");
	element.style.display="block";
	var header = document.getElementById("myh2");
	header.innerHTML="My Site";
	var text = document.getElementById("myc");
	text.innerHTML ="Coming Soon";
	text.style.fontFamily="Courier";
    }
}
function about() {
    console.log("main.js::about()");
    //clean_screen();
    //Since login block is used initialy, we don't want the
    //other menus to pop up behind when mouse is moving from
    //url to lcontainer
/*    var l = document.getElementById("lcontainer");
    if(l.style.display=="block")
	return;
*/
    var element = document.getElementById("acontainer");
    if(element.style.display=="block"){
	element.style.display="none";
    }
    else{
	clean_screen();
	element.style.display="block";
	var header = document.getElementById("ah2");
	header.innerHTML = "About";
	var text = document.getElementById("ac");
	text.innerHTML = "This is soon the worlds biggest quiz database:) Register for free and get access to thousands of different quizzes.<br><br>There are 10 questions per quiz, which are randomly selected from the database. You get 1 bonus point if you answer before the Time Bar has gone below 75.<br><br>When you are done with a quiz the highscores are updated and you may click on the tab and scroll down to view the tables.<br><br>If you encounter any problems or you want to make some questions please contact me on email.<br><br> author : Anders Huse<br>design : Anders Huse<br> mail : huse007@hotmail.com";
	/*text.style.fontFamily="Courier";*/
    }
}
/* Called from initialize() */
function createTableOfStatistics() {
    console.log("CREATE");
    document.getElementById("sh2").innerHTML = "Statistics";
    
    var container = document.getElementById("sc");
    var table = document.createElement("TABLE");
    var thead = document.createElement("THEAD");
    var tbody = document.createElement("TBODY");
    var header_text = ["Categories ("+num_categories+")","Questions ("+num_questions+")"];
    
    thead.innerHTML = "<thead><tr><th>"+header_text.join("</th><th>")+"</th></tr></thead>";
    
    for(var key in numqincat) {
	var row = "<tr><td>"+key+"</td><td>"+numqincat[key]+"</td></tr>";
	tbody.innerHTML +=row;
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    table.setAttribute("class","customtable table table-striped table-sm table-bordered");
    thead.setAttribute("class","table-primary");	
    container.appendChild(table);    
}
/* show/hide statistics container */
function statistics() {
    var element = document.getElementById("scontainer");
    if(element.style.display=="block") {
	element.style.display="none";
    }
    else{
	clean_screen();
	element.style.display="block";
     }	    
}
function category() {
    console.log("main.js::category()");
    var element = document.getElementById("ccontainer");
    if(element.style.display=="block")
	element.style.display="none";
    else{
	clean_screen();
	element.style.display="block";
    }
}
/*
function category() {
    console.log("main.js::category()");
    clean_screen();
    //Since login block is used initialy, we don't want the
    //other menus to pop up behind when mouse is moving from
    //url to lcontainer
    var l = document.getElementById("lcontainer");
    if(l.style.display=="block"){
	console.log("login vises");
	return;
}
    var element = document.getElementById("ccontainer");
    if(element.style.display=="block"){
	var x = event.clientX;
	var y = event.clientY;
	var elementMouseIsOver = document.elementFromPoint(x, y);
	if(elementMouseIsOver.id == "ccontainer" || elementMouseIsOver.id =="screen"){
	}
	else{
	    element.style.display="none";
	}
    }
    else{
	element.style.display="block";
	var header = document.getElementById("ch2");
	header.innerHTML = "Choose a Category";

    }
}
*/
function leavecategory() {
    console.log("main.js::leavecategory()");
    var element = document.getElementById("ccontainer");
    if(element.style.display=="block"){
	element.style.display="none";
    }

}

function login() {
    console.log("main.js::login() status: "+status);
/*    if(document.getElementById("login").innerHTML=="logout") {
	window.location.href="/logout";
	return;
    }*/

    if(status !="login") {
	clean_screen();
	window.location.href="/logout"
	return;
    }
    var element = document.getElementById("lcontainer");
    if(element.style.display=="block") {
    clean_screen();
	//	leavelogin();
    }

/*    if(element.style.display=="block") {
	var x = event.clientX;
	var y = event.clientY;
	var elementMouseIsOver = document.elementFromPoint(x, y);
	if(elementMouseIsOver.id == "lcontainer" || elementMouseIsOver.id =="screen"){
	}
	else{
	    element.style.display="none";
	}
    }*/
    else{
	clean_screen();
	element.style.display="block";
	

    }

}

function leavelogin() {
    console.log("main.js::leavelogin()");
    var element = document.getElementById("lcontainer");
    if(element.style.display=="block"){
	element.style.display="none";
    }
}
function gone_off_screen() {
    console.log("main.js::gone_off_screen()");
    var element1 = document.getElementById("msg");
    var element2 = document.getElementById("ccontainer");
    var x = event.clientX;
    var y = event.clientX;
    var elementMouseIsOver = document.elementFromPoint(x,y);
    
    element2.style.display="none";
}
function hiscore() {
    var tmp = document.getElementById("hc");
    while(tmp.firstChild){
	tmp.removeChild(tmp.firstChild);
    }
    var is_active = false;
    
    /* Creating a hiscore container */
    var element = document.getElementById("hcontainer");
    if(element.style.display=="block"){
	is_active = true;
    }
    /* Removes other elements from screen */
    clean_screen();
    
    if(!is_active){
	element.style.display="block";
	var header = document.getElementById("hh2");
	header.style.textAlign="center";
	header.innerHTML = "High Score Tables";

	$.get("/gethiscore",function(data){
	    var hiscore_map = data;
	    for(var key in hiscore_map){
		var lista = JSON.parse(hiscore_map[key]);
		var node =document.createElement("DIV");
		node.id =key;
		node.setAttribute("class","hiscoretable col-lg-4");
		var title =document.createElement("H2");
		title.setAttribute("class","tableheader");
		title.style.textAlign="center";

		var header = document.createTextNode(key);
		title.appendChild(header);
		node.appendChild(title);

		/* Create table */
		var mytable = document.createElement("TABLE");
		mytable.setAttribute("class","customtable table table-striped table-sm");
		var mytablehead = document.createElement("THEAD");
		mytablehead.setAttribute("class","thead-dark");
		var mytablerow = document.createElement("TR");

		/* First row */
		var header1 = document.createElement("TH");
		var header2 = document.createElement("TH");
		var header3 = document.createElement("TH");
		var col1 = document.createTextNode("#");
		var col2 = document.createTextNode("Pts");
		var col3 = document.createTextNode("User");
		header1.appendChild(col1);
		header2.appendChild(col2);
		header3.appendChild(col3);
		mytablerow.appendChild(header1);
		mytablerow.appendChild(header2);
		mytablerow.appendChild(header3);

		/* Body */
		var body1 = document.createElement("TBODY");

		/* Add the rest */
		mytablehead.appendChild(mytablerow);
		mytable.appendChild(mytablehead);
		node.appendChild(mytable);

		/* Iterate through tables */
		for(var i = 0; i<10;i++) {
		    var myindex = i+1;
		    var tr = document.createElement("TR");
		    var td1 = document.createElement("TD");
		    td1['scope'] ="col";
		    var td2 = document.createElement("TD");
		    var td3 = document.createElement("TD");
		    var rad = [];
		    var index = "";
		    var ipoints ="";
		    var uname = "";
		    var row = "";
		    if(lista[i] != null) {
			rad =lista[i].split(" ");
			var myindex = document.createTextNode(myindex);
			var mypoints = document.createTextNode(rad[0]);
			var myuser = document.createTextNode(rad[1])
			td1.appendChild(myindex);
			td2.appendChild(mypoints);
			td3.appendChild(myuser);
		    }
		    else {
			if(i<9){
			    td1.appendChild(document.createTextNode(myindex));
			    td2.appendChild(document.createTextNode("0"));
			    td3.appendChild(document.createTextNode("Empty"));
			}
			else{
			    td1.appendChild(document.createTextNode(myindex));
			    td2.appendChild(document.createTextNode("0"));
			    td3.appendChild(document.createTextNode("Empty"));
			}
		    }
		    tr.appendChild(td1);
		    tr.appendChild(td2);
		    tr.appendChild(td3);
		    body1.appendChild(tr);
		    mytable.appendChild(body1);
		}
		/*document.getElementById("hc").setAttribute("class","row");*/		
		document.getElementById("hc").appendChild(node);
		node.style.fontSize="15px";
		
		/*node.style.float="Left";*/
		/*node.style.display="Inline";*/

	    }
	});
	
    }

}

/*function scrollup() {
    console.log("main.js::scrollup()");
    var bg = document.getElementById("hc");
    document.getElementById("scrolliconcontainerdown").style.visibility="visible";
    if(bg.scrollTop < bg.scrollHeight-bg.offsetHeight) {
	bg.scrollTop+=100;
    }
    else {
	document.getElementById("scrolliconcontainerup").style.visibility="hidden";

    }
}
function scrolldown() {
    console.log("main.js::down()");
    var bg = document.getElementById("hc");
    document.getElementById("scrolliconcontainerup").style.visibility="visible";
    if(bg.scrollTop >= 1){
	bg.scrollTop-=100;
    }
    else {
	document.getElementById("scrolliconcontainerdown").style.visibility="hidden";
	
    }
}
*/
function play() {
    console.log("main.js::play()");
    
    
    var tmp = document.getElementById("pc");
    while(tmp.firstChild){
	tmp.removeChild(tmp.firstChild);
    }
    var is_active = false;
    var element = document.getElementById("pcontainer");
    if(element.style.display=="block"){
	//element.style.display="none";
	console.log("play er oppe");
	is_active = true;
    }
    clean_screen();
    if(!is_active){
	console.log("popping up play() når ikke det er noen oppe fra før");
	element.style.display="block";
	var header = document.getElementById("ph2");
	header.style.textAlign="center";
	header.innerHTML = "Play a category";
	$.get("/gethiscore",function(data){
	    var hiscore_map = data;
	    for(var key in hiscore_map){
		var lista = JSON.parse(hiscore_map[key]);
		var node =document.createElement("a");
		node.id =key;
		node.innerHTML =key;
		node.href = "/"+key;
		node.setAttribute("class","btn btn-primary custom");
		
		document.getElementById("pc").appendChild(node);
		//node.style.backgroundColor="grey";
		//node.style.fontSize="2.5vh";
//		node.style.fontFamily="Gloria Hallelujah,cursive";
		//node.style.padding="1vh 1vw 1vh 1vw";
		//node.style.margin="1vh 1vw 1vh 1vw";
//		node.style.width="270px";
		node.style.float="Left";
	    }
	  	    
	});
	
    }

}
function menubutton() {
    console.log("menu");

    var element = document.getElementById("mecontainer");
    if(element.style.display=="block"){
	element.style.display="none";
    }
    else {
	clean_screen();
	element.style.display="block";
    }
}
