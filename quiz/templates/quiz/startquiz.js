function loop() {
    console.log(9999);
    var question_number = 0;
    var choice_number = 0;
    for(var i = 0; i<3; i++) {
	document.getElementById(i).innerHTML = myq[question_number][choice_number].fields.choice_name;
    }
    var myq = JSON.parse('{{ qlist|escapejs }}');
    var myc = [];
    var count = 0;
    {% for i in clist %};
    var tmp = JSON.parse('{{ i|escapejs }}');
    myc[count++] = tmp;
    

}
