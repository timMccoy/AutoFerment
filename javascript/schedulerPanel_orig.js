var rowCount;
var schedulerPanel;
var schedule = [];

function initSchedulerPanel()
{
	initSchedulerVariables();

	var schedulerPanel = "";
	schedulerPanel +=	"<div class='container-fluid text-center'>"	
	schedulerPanel += 		getNewAccordionBegin();
	schedulerPanel += 			getNewStageBegin();
	schedulerPanel += 				getNewAccordionSubBegin();
	schedulerPanel += 					getNewStepBegin();
	schedulerPanel += 						getNewRowFill();
	schedulerPanel += 					getNewStepEnd();
	schedulerPanel += 					getAddNewStep();
	schedulerPanel += 				getNewAccordionEnd();
	schedulerPanel += 			getNewStageEnd();
	/*
	schedulerPanel += 			getNewStageBegin();
	schedulerPanel += 				getNewAccordionSubBegin();
	schedulerPanel += 					getNewStepBegin();
	schedulerPanel += 						getNewRowFill();
	schedulerPanel += 					getNewStepEnd();
	schedulerPanel += 					getNewStepBegin();
	schedulerPanel += 						getNewRowFill();
	schedulerPanel += 					getNewStepEnd();
	schedulerPanel += 					getNewStepBegin();
	schedulerPanel += 						getNewRowFill();
	schedulerPanel += 					getNewStepEnd();
	schedulerPanel += 					getAddNew();
	schedulerPanel += 				getNewAccordionEnd();
	*/
	schedulerPanel += 			getNewStageEnd();
	schedulerPanel += 			getAddNewStage();
	schedulerPanel +=		getNewAccordionEnd();
	schedulerPanel +=	"</div>";
	
	
	

	document.getElementById("schedulerPanel").innerHTML = schedulerPanel;
	initSchedulerComponents();
}

function initSchedulerComponents()
{	
	$("#schedulerPanel").show();
	
	$(".addStage").click(function() {
		alert( "add STAGE was clicked." );
	});
	$(".addStep").click(function() {
		alert( "add STEP was clicked." );
	});
	
	$( ".spinnerDays" ).spinner({		
		step: 1, 
		min: 0, 
		max: 100
	});
	$( ".spinnerHours" ).spinner({		
		step: 1, 
		min: 0, 
		max: 23
	});
	$( ".spinnerMins" ).spinner({		
		step: 1, 
		min: 0, 
		max: 59
	});
	$( ".spinnerTemp" ).spinner({		
		step: .5, 
		min: 40, 
		max: 110
	});
	
	$( ".enableAlert" ).selectmenu();
	
	$(".accordion").accordion({
        collapsible: true,
        active: false,
        autoHeight:false,
		heightStyle: "content"
    });
    
    $('.ui-accordion-header').click(function () {
        $('.open').removeAttr("disabled");
        $('.close').removeAttr("disabled");

    });
	
	$(".accordionSub").accordion({
        collapsible: true,
        active: false,
        autoHeight:false,
		heightStyle: "content"
    });
	
	
    $("#schedulerPanel").hide();
}

function getNewAccordionBegin()
{
	var accordionBegin = "";
	accordionBegin +=		"<div class='accordion'>";
	return accordionBegin;
}
function getNewAccordionSubBegin()
{
	var accordionBegin = "";
	accordionBegin +=		"<div class='accordionSub'>";
	return accordionBegin;
}
function getNewAccordionEnd()
{
	var accordionEnd = "";
	accordionEnd +=		"</div>";
	return accordionEnd;
}
function getNewStageEnd()
{
	var stageEnd = "";
	stageEnd +=		"</div>";
	return stageEnd;
}
function getNewStageBegin()
{
	var stageBegin = "";
	stageBegin +=	"<h3>Stage</h3>";
	stageBegin +=		"<div>"
	return stageBegin;
}
function getNewStageEnd()
{
	var stageEnd = "";
	stageEnd +=		"</div>";
	return stageEnd;
}
function getNewStepBegin()
{
	var stepBegin = "";
	stepBegin +=	"<h3>Step</h3>";
	stepBegin +=		"<div>"
	return stepBegin;
}
function getNewStepEnd()
{
	var stepEnd = "";
	stepEnd +=		"</div>";
	return stepEnd;
}
function getAddNewStage()
{
	var newAdd = "";
	newAdd +=		"<h3 class='addStage'>+ Stage</h3>";
	return newAdd;
}
function getAddNewStep()
{
	var newAdd = "";
	newAdd +=		"<h3 class='addStep'>+ Step</h3>";
	return newAdd;
}

function getNewRowFill()
{
	var rowFill = "";
	rowFill +=				"<p>";
	rowFill +=					"<div class='col-sm-3'>"
	rowFill +=						"Days:<input type='text' class='spinnerDays' value='0' />";
	rowFill +=					"</div>";
	rowFill +=					"<div class='col-sm-3'>"
	rowFill +=						"Hours:<input type='text' class='spinnerHours' value='0' />";
	rowFill +=					"</div>";
	rowFill +=					"<div class='col-sm-3'>"
	rowFill +=						"Minutes:<input type='text' class='spinnerMins' value='0' />";
	rowFill +=					"</div>";
	rowFill +=					"<div class='col-sm-3'>"
	rowFill +=						"Temp:<input type='text' class='spinnerTemp' value='0' />";
	rowFill +=					"</div>";
	rowFill +=				"</p>";
	return rowFill;
}

function initSchedulerVariables()
{
}


var step = function(stageNum, stepNum, days, hours, minutes, temp) 
{
	this.id = {};
	this.id.stage = stageNum;
	this.id.step = stepNum;
	this.duration = {};
	this.duration.days = days;
	this.duration.hours = hours;
	this.duration.minutes = minutes;
	this.temp = temp;
}

