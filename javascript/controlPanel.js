function initControlPanel()
{
	initControlVariables();

	var controlPanel = "";

	controlPanel += "<div class='wrapper'>";	
  	controlPanel += 	"<input type='checkbox' id='powerCheckbox'>";
  	controlPanel += 	"<label><i class='icon-off'></i>";
	controlPanel += 	"</label>";
	controlPanel += "</div>";
	controlPanel +=	"<div class='container-fluid text-center'>"
	controlPanel += 	"<form action='#'>";
	controlPanel +=         	"<input type='number' value='100.0' min='35' max='100' step='0.1' data-number-to-fixed='2' data-number-stepfactor='100' class='digitalOff' id='c2' />";
	controlPanel += 	"</form>";
	controlPanel += "</div>";

	document.getElementById("controlPanel").innerHTML = controlPanel;
	initControlComponents();
	//setInterval(controlPanelHeartbeat, 1000);
}

function initControlComponents()
{	
	$("#controlPanel").show();

	$('#powerCheckbox').change(function(){
	  if($(this).is(':checked')){
	    console.log("powerCheckbox checked");
	    $('#c2').attr('class', 'digitalOn');
	  } else {
	    console.log("powerCheckbox unchecked");
	    $('#c2').attr('class', 'digitalOff');
	  }
	});

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
}

