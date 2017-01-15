var sensorGaugeData = {};
var sensorGaugeLabel;
var sensorGaugeValue;

var controlGaugeData = {};
var controlGaugeLabel;
var controlGaugeValue;

var gaugeStyle = {};

function initMonitorPanel()
{
	initMonitorVariables();

	var monitorPanel = "";
	monitorPanel +=	"<div class='container-fluid text-center'>"
	monitorPanel +=		"<div class='col-sm-6'>";
	monitorPanel +=			"<div>";
	monitorPanel +=				"<h3><span id='sensor1_lb' class='label label-default'>Sensor</span></h3>";
	monitorPanel +=			"</div>";
	monitorPanel +=			"<div>";
	monitorPanel +=				"<div id='sensorGaugeContainer' style='margin-left: auto; margin-right: auto'></div>";
	monitorPanel +=				"<div id='sensorGaugeValue' style='margin-top: auto; margin-bottom: auto; margin-left: auto; margin-right: auto; font-family: Sans-Serif; text-align: center; font-size: 17px; width: 70px;'></div>";
	monitorPanel +=			"</div>";
	monitorPanel +=		"</div>";
	monitorPanel +=		"<div class='col-sm-6'>";
	monitorPanel +=			"<div>";
	monitorPanel +=				"<h3><span id='sensor2_lb' class='label label-default'>Control</span></h3>";
	monitorPanel +=			"</div>";
	monitorPanel +=			"<div>";
	monitorPanel +=				"<div id='controlGaugeContainer' style='margin-left: auto; margin-right: auto'></div>";
	monitorPanel +=				"<div id='controlGaugeValue' style='margin-top: auto; margin-bottom: auto; margin-left: auto; margin-right: auto; font-family: Sans-Serif; text-align: center; font-size: 17px; width: 70px;'></div>";
	monitorPanel +=			"</div>";
	monitorPanel +=		"</div>";
	monitorPanel += "</div>";
	
	document.getElementById("monitorPanel").innerHTML = monitorPanel;
	initMonitorComponents();
	setInterval(monitorPanelHeartbeat, 2000);
}

function initMonitorComponents()
{
	$("#monitorPanel").show();
	$('#sensorGaugeContainer').jqxGauge(sensorGaugeData);
	$('#sensorGaugeContainer').jqxGauge(gaugeStyle);
	$('#sensorGaugeContainer').on('valueChanged', function (e) 
	{
		$('#sensorGaugeValue').text(Math.round(e.args.value) + ' F');
	});

	$('#controlGaugeContainer').jqxGauge(controlGaugeData);
	$('#controlGaugeContainer').jqxGauge(gaugeStyle);
	$('#controlGaugeContainer').on('valueChanged', function (e) 
	{
		$('#controlGaugeValue').text(Math.round(e.args.value) + ' F');
		$('#controlGaugeValue').text(Math.round(e.args.value) + ' F');
	});
	
	$('#sensorGaugeContainer').jqxGauge('value', 0);
	$('#controlGaugeContainer').jqxGauge('value', 0);
	
	$("#monitorPanel").hide();
}

function monitorPanelHeartbeat()
{
	if($("#monitorPanel").is(':visible'))
	{
		$.ajax({
	        url: 'getTempStatus',
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
	if(data.sensorTemp)
	{
		//console.log('sensorVal: ' + data.sensorReadingTemps[(data.sensorReadingTemps.length)-1]);
		$('#sensorGaugeContainer').jqxGauge('value', data.sensorTemp);
	}
	else
	{
		$('#sensorGaugeContainer').jqxGauge('value', 0);
	}
	
	if(data.controlTemp)
	{
		//console.log('controlVal: ' + data.controlTemp[(data.controlTemp.length)-1]);
		$('#controlGaugeContainer').jqxGauge('value', data.controlTemp);
	}
	else
	{
		$('#controlGaugeContainer').jqxGauge('value', 0);
	}
}

function initMonitorVariables()
{
	sensorGaugeData = {
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
	    animationDuration: 	200
	};

	controlGaugeData = {
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
	    animationDuration: 	200
	};

	gaugeStyle = { width: '200px', height: '200px', radius: '100px' };
}