var exteriorGaugeData = {};
var exteriorGaugeLabel;
var exteriorGaugeValue;

var interiorGaugeData = {};
var interiorGaugeLabel;
var interiorGaugeValue;

var gaugeStyle = {};

function initMonitorPanel()
{
	initMonitorVariables();

	var monitorPanel = "";
	monitorPanel +=	"<div class='container-fluid text-center'>"
	monitorPanel +=		"<div class='col-sm-6'>";
	monitorPanel +=			"<div>";
	monitorPanel +=				"<h3><span id='sensor1_lb' class='label label-default'>Exterior Sensor</span></h3>";
	monitorPanel +=			"</div>";
	monitorPanel +=			"<div>";
	monitorPanel +=				"<div id='exteriorGaugeContainer' style='margin-left: auto; margin-right: auto'></div>";
	monitorPanel +=				"<div id='exteriorGaugeValue' style='margin-top: auto; margin-bottom: auto; margin-left: auto; margin-right: auto; font-family: Sans-Serif; text-align: center; font-size: 17px; width: 70px;'></div>";
	monitorPanel +=			"</div>";
	monitorPanel +=		"</div>";
	monitorPanel +=		"<div class='col-sm-6'>";
	monitorPanel +=			"<div>";
	monitorPanel +=				"<h3><span id='sensor2_lb' class='label label-default'>Interior Sensor</span></h3>";
	monitorPanel +=			"</div>";
	monitorPanel +=			"<div>";
	monitorPanel +=				"<div id='interiorGaugeContainer' style='margin-left: auto; margin-right: auto'></div>";
	monitorPanel +=				"<div id='interiorGaugeValue' style='margin-top: auto; margin-bottom: auto; margin-left: auto; margin-right: auto; font-family: Sans-Serif; text-align: center; font-size: 17px; width: 70px;'></div>";
	monitorPanel +=			"</div>";
	monitorPanel +=		"</div>";
	monitorPanel += "</div>";
	
	document.getElementById("monitorPanel").innerHTML = monitorPanel;
	initMonitorComponents();
	setInterval(controlPanelHeartbeat, 1000);
}

function initMonitorComponents()
{
	$("#monitorPanel").show();
	$('#exteriorGaugeContainer').jqxGauge(exteriorGaugeData);
	$('#exteriorGaugeContainer').jqxGauge(gaugeStyle);
	$('#exteriorGaugeContainer').on('valueChanging', function (e) 
	{
		$('#exteriorGaugeValue').text(Math.round(e.args.value) + 'F');
	});

	$('#interiorGaugeContainer').jqxGauge(interiorGaugeData);
	$('#interiorGaugeContainer').jqxGauge(gaugeStyle);
	$('#interiorGaugeContainer').on('valueChanging', function (e) 
	{
		$('#interiorGaugeValue').text(Math.round(e.args.value) + 'F');
	});
	$("#monitorPanel").hide();
}

function monitorPanelHeartbeat()
{
	if($("#monitorPanel").is(':visible'))
	{
		$.ajax({
	        url: 'getSensorData',
	        type: 'GET',
	        success: function (data) {
	            updateMonitorPanel(data);
	        },
	        error: function (xhr, status, error) {
	            console.log('Error: ' + error.message);
	        },
	    });
	}
}

function updateMonitorPanel(data)
{
	if(data.sensorExterior.state)
	{
		$('#exteriorGaugeContainer').jqxGauge('value', data.sensorExterior.tempData[(data.sensorExterior.tempData.length)-1]);
	}
	else
	{
		$('#exteriorGaugeContainer').jqxGauge('value', 0);
	}
	if(data.sensorInterior.state)
	{
		$('#interiorGaugeContainer').jqxGauge('value', data.sensorInterior.tempData[(data.sensorInterior.tempData.length)-1]);
	}
	else
	{
		$('#interiorGaugeContainer').jqxGauge('value', 0);
	}
}

function initMonitorVariables()
{
	exteriorGaugeData = {
	    ranges: [
	    	{ startValue: 0, endValue: 50, style: { fill: '#99ccff', stroke: '#C9C9C9' }, endWidth: 5, startWidth: 1 },
	        { startValue: 50, endValue: 75, style: { fill: '#FCF06A', stroke: '#FCF06A' }, endWidth: 10, startWidth: 5 },
	        { startValue: 75, endValue: 85, style: { fill: '#FCA76A', stroke: '#FCA76A' }, endWidth: 15, startWidth: 10 },
	        { startValue: 85, endValue: 125, style: { fill: '#FC6A6A', stroke: '#FC6A6A' }, endWidth: 20, startWidth: 15}
        ],
        min: 				0,
        max: 				125,
        border: 			{ fill: '#333333', stroke: '#e6e6e6' },
	    style: 				{ fill: '#e6e6e6', stroke: '#666666' },
	    ticksMinor: 		{ interval: 5, size: '5%' },
	    ticksMajor: 		{ interval: 10, size: '9%' },
	    value: 				0,
	    colorScheme: 		'scheme08',
	    animationDuration: 	1200
	};

	interiorGaugeData = {
	    ranges: [
	    	{ startValue: 0, endValue: 50, style: { fill: '#99ccff', stroke: '#C9C9C9' }, endWidth: 5, startWidth: 1 },
	        { startValue: 50, endValue: 75, style: { fill: '#FCF06A', stroke: '#FCF06A' }, endWidth: 10, startWidth: 5 },
	        { startValue: 75, endValue: 85, style: { fill: '#FCA76A', stroke: '#FCA76A' }, endWidth: 15, startWidth: 10 },
	        { startValue: 85, endValue: 125, style: { fill: '#FC6A6A', stroke: '#FC6A6A' }, endWidth: 20, startWidth: 15}
        ],
        min: 				0,
        max: 				125,
        border: 			{ fill: '#333333', stroke: '#e6e6e6' },
	    style: 				{ fill: '#e6e6e6', stroke: '#666666' },
	    ticksMinor: 		{ interval: 5, size: '5%' },
	    ticksMajor: 		{ interval: 10, size: '9%' },
	    value: 				0,
	    colorScheme: 		'scheme08',
	    animationDuration: 	1200
	};

	gaugeStyle = { width: '200px', height: '200px', radius: '100px' };
}