window.addEventListener("load", function (e){

	var trigger = document.getElementsByTagName("img")[0];
	trigger.addEventListener("click",findwaldo);

	function findwaldo(e){
		clearInterval(myVar);
		clickcoordinates = convertClickCoordinates(e);
		querystring = "valueX=" + clickcoordinates[0] 
					+ "&valueY=" + clickcoordinates[1] 
					+ "&time=" + currenttimer.replace(/ /g, "");
		makeRequest('GET','/check?'+querystring, function(result){
			showresult(result);
		});

		e.preventDefault();
	}

	function convertClickCoordinates(e){
		var currentwidth = e.target.offsetWidth;
		var currentheight = e.target.offsetHeight;
		var ratiowidth = currentwidth/1150;
		var ratioheight = currentheight/726;

		var clickX = e.offsetX/ratiowidth;
		var clickY = e.offsetY/ratioheight;
		clickarray = [clickX,clickY];
		return clickarray
	}

	function showresult(result) {
		var messagenode = document.getElementsByClassName("message")[0];
		var messagetimer = document.getElementsByClassName("messagetime")[0];
		var modal = document.getElementsByClassName("modal_container")[0];
		var form = document.getElementsByTagName("form")[0];
		modal.style.display = "block";
		if (result == "false") {
			messagenode.textContent = "Nope!";
			messagetimer.textContent = "It's been " + currenttimer;
			form.style.display = "none";
		} else {
			messagenode.textContent = "You found Waldo!";
			messagetimer.textContent = "It took you " + currenttimer;
			form.style.display = "block";
		}
	}



	addClickListenerToClassEach("modalclose",closemodal);
	function closemodal(e) {
		var modal = e.target.parentElement.parentElement;
		modal.style.display = "none";
		myVar = setInterval(myTimer, 1000);
	}


	var myVar = setInterval(myTimer, 1000);
	var currenttimer = "";
	function myTimer() {
	    time = document.getElementsByClassName("timer")[0].textContent;
	    timearray = time.split(" ");
	    timearray[2] = String(parseInt(timearray[2]) + 1);
	    if (timearray[2] == "60") {
	    	timearray[0] = String(parseInt(timearray[0]) + 1); 
	    	timearray[2] = "0";
	    }
	    currenttimer = timearray.join(" ");
	    document.getElementsByClassName("timer")[0].textContent = currenttimer;
	}

	addClickListenerToClassEach("showtimes",showtimesmodal);
	timesclicked = 0;
	function showtimesmodal(){
		clearInterval(myVar);
		var modal = document.getElementsByClassName("besttimes_container")[0];
		modal.style.display = "block";
		if (timesclicked ==0) {
			getsavedtimes();
		}
		timesclicked =+ 1;
	}

	function getsavedtimes() {
		makeRequest('GET','/getsaved', function(data){
			jsondata = JSON.parse(data)
			for (var i=0;i<jsondata.length; i++) {
				time = jsondata[i]["time"]
				time = time.replace(/-/g, " ");
				name = jsondata[i]["name"]
				htmlstring = "<p>" + name + " " + time + "</p>"
				container = document.getElementsByClassName("besttimes")[0];
				container.insertAdjacentHTML('beforeend',htmlstring);
			}
		})
	}

	addClickListenerToClassEach("submitbutton",savetime);
	function savetime(e) {
		name = e.target.previousElementSibling.value
		time = currenttimer.replace(/ /g, "-");
		querystring = "name=" + name + "&time=" + time;
		makeRequest('POST','/savetime?'+querystring);
	}

});