function initGUI()
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
