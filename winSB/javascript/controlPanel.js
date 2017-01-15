function initControlPanel()
{
	var controlPanel = "";
	controlPanel += "<br>";
	controlPanel += "<br>";
	controlPanel += "<br>";
	
	controlPanel += "<div class='scheduleLoader'>";	
	controlPanel += 	"<form class='fform-horizontal'>";
	controlPanel +=   		"<div class='form-group'>";
	controlPanel +=  	   		"<label class='control-label col-sm-2' for='schedule'>Schedule:</label>";
	controlPanel += 			"<div class='col-sm-8'>";
	controlPanel += 				"<select class='form-control' id='schedule'>";
	controlPanel += 			    	"<option>Schedule 1</option>";
	controlPanel += 				    "<option>Schedule 2</option>";
	controlPanel += 				    "<option>Schedule 3</option>";
	controlPanel += 				    "<option>Schedule 4</option>";
	controlPanel += 				"</select>";
	controlPanel +=   			"</div>";
	controlPanel += 			"<div class='col-sm-2'>";
	controlPanel +=  	 			"<button type='submit' id='loadBtn' class='btn btn-default'>Load</button>";
	controlPanel += 			"</div>";
	controlPanel +=   		"</div>";
	controlPanel += 	"</form>";
	controlPanel += "</div>";
	
	controlPanel += "<br>";
	controlPanel += "<br>";
	controlPanel += "<br>";
	controlPanel += "<br>";
	controlPanel += "<br>";
	controlPanel += "<br>";

	controlPanel += "<div class='controlButtons'>";	
  	controlPanel += 	"<div class='btn-group btn-group-justified'>";
	controlPanel += 		"<div class='btn-group'>";
	controlPanel += 			"<button type='button' id='runBtn' class='btn btn-default btn-lg'>";
	controlPanel += 				"<span class='glyphicon glyphicon-play' aria-hidden='true'></span>";
	controlPanel += 			"</button>";
	controlPanel += 		"</div>";
	controlPanel += 		"<div class='btn-group'>";
	controlPanel += 			"<button type='button' id='pauseBtn' class='btn btn-default btn-lg'>";
	controlPanel += 				"<span class='glyphicon glyphicon-pause' aria-hidden='true'></span>";
	controlPanel += 			"</button>";
	controlPanel += 		"</div>";
	controlPanel += 		"<div class='btn-group'>";
	controlPanel += 			"<button type='button' id='stopBtn' class='btn btn-default btn-lg'>";
	controlPanel += 				"<span class='glyphicon glyphicon-stop' aria-hidden='true'></span>";
	controlPanel += 			"</button>";
	controlPanel += 		"</div>";
	controlPanel += 	"</div>";
	controlPanel += "</div>";

	document.getElementById("controlPanel").innerHTML = controlPanel;
	initControlComponents();
	initControlVariables();
	
	//setInterval(controlPanelHeartbeat, 1000);
}

function initControlComponents()
{	
	$("#controlPanel").show();

    $("#controlPanel").hide();
}

function controlPanelHeartbeat()
{
	if($("#controlPanel").is(':visible'))
	{
		$.ajax({
	        url: 'getSensorData',
	        type: 'GET',
	        success: function (data) {
	            updateControlPanel(data);
	        },
	        error: function (xhr, status, error) {
	            console.log('Error: ' + error.message);
	        },
	    });
	}
}

function updateControlPanel(data)
{
}
function changePowerState(newPowerState)
{
	$.ajax({
		url: 'setPowerState',
		type: 'POST',
		data: newPowerState,
		dataType: 'json',
		success: function (data) {
			//console.log(JSON.stringify(data));
		},
		error: function (xhr, status, error) {
			console.log('Error: ' + error.message);
		},
	});
}
function initControlVariables()
{
	console.log("initiating the GUI")
	$("#loadBtn").on('click', function(event)
	{
		var schedule = "../data/schedules/beerSchedule.xml";
		console.log("loadBtn clicked, please load : " + schedule);
		
		$.ajax({
			url: 'load',
			type: 'POST',
			data: schedule,
			dataType: 'json',
			success: function (data) {
				console.log(JSON.stringify(data));
			},
			error: function (xhr, status, error) {
				console.log('Error: ' + error.message);
			},
		});
	});
	$("#runBtn").on('click', function(event)
	{
		console.log("runBtn clicked");
		$.ajax({
			url: 'run',
			type: 'POST',
			data: '',
			dataType: 'json',
			success: function (data) {
				console.log(JSON.stringify(data));
			},
			error: function (xhr, status, error) {
				console.log('Error: ' + error.message);
			},
		});
	});
	$("#stopBtn").on('click', function(event)
	{
		console.log("stopBtn clicked");
		$.ajax({
			url: 'stop',
			type: 'POST',
			data: '',
			dataType: 'json',
			success: function (data) {
				console.log(JSON.stringify(data));
			},
			error: function (xhr, status, error) {
				console.log('Error: ' + error.message);
			},
		});
	});
	$("#pauseBtn").on('click', function(event)
	{
		console.log("pauseBtn clicked");
		$.ajax({
			url: 'pause',
			type: 'POST',
			data: '',
			dataType: 'json',
			success: function (data) {
				console.log(JSON.stringify(data));
			},
			error: function (xhr, status, error) {
				console.log('Error: ' + error.message);
			},
		});
	});
}

