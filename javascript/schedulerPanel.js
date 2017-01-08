
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

function initSchedulerPanel()
{	
	$.ajax({
	        url: 'getSavedSchedules',
	        type: 'GET',
	        success: function (data) {
				document.getElementById("schedulerPanel").innerHTML = setHTML(data.list);
				$(".dropdown-menu li a").click(function(){
					loadScheduler($(this).text());
				});
	        },
	        error: function (xhr, status, error) {
	            console.log('Error: ' + error.message);
	        },
	    });
}

function setHTML(savedScheduleList)
{	
	var dropdown = "";
	dropdown += "<div class='dropdown'>";
	dropdown += 	"<button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Schedule";
	dropdown += 		"<span class='caret'></span></button>";
	dropdown += 		"<ul class='dropdown-menu'>";
	for(var i = 0; i < savedScheduleList.length; i++)
	{
		dropdown += 			"<li><a href='#'>" + savedScheduleList[i] + "</a></li>";
	}
	dropdown += 		"</ul>";
	dropdown += "</div>";
	dropdown += "<div id='scheduleAccordion'>";
	dropdown += "</div>";
	return dropdown;
}

function loadScheduler(scheduleId)
{
	var schedObj = {};
	$.ajax({
	        url: 'getSchedule',
	        type: 'POST',
			data: scheduleId,
			dataType: 'json',
	        success: function (data) {
				schedObj = data;
				buildSchedule(schedObj);
	        },
	        error: function (xhr, status, error) {
	            console.log('Error: ' + error.message);
				
	        }
	});
}
function buildSchedule(scheduleObj)
{
	//console.log(scheduleObj);

	var scheduler = "";
	scheduler +=	"<div class='container-fluid text-center'>"	
	scheduler += 		getNewAccordionBegin();
	var stage = 1;
	scheduler += 			getNewStageBegin(stage);
	scheduler += 				getNewAccordionSubBegin();
	for(var i = 0; i < scheduleObj.sched.length; i++)
	{
		if(scheduleObj.sched[i].id.stage == stage)
		{
			scheduler += 					getNewStepBegin(scheduleObj.sched[i].id.step);
			scheduler += 						getNewRowFill(scheduleObj.sched[i].duration, scheduleObj.sched[i].temp);
			scheduler += 					getNewStepEnd();
			
			//console.log("add step " + scheduleObj.sched[i].id.step + "to stage " + stage);
		}
		else
		{
			
			scheduler += 				getNewAccordionEnd();
			scheduler +=	"<button id='"+ "b" +"' type='button' class='btn btn-default' aria-label='Left Align'>";
				scheduler +=	"<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>";
			scheduler +=	"</button>";

			scheduler += 			getNewStageEnd();
			stage++;
			scheduler += 			getNewStageBegin(scheduleObj.sched[i].id.stage);
			scheduler += 				getNewAccordionSubBegin();
			scheduler += 					getNewStepBegin(scheduleObj.sched[i].id.step);
			scheduler += 						getNewRowFill(scheduleObj.sched[i].duration, scheduleObj.sched[i].temp);
			scheduler += 					getNewStepEnd();
			//console.log("add step " + scheduleObj.sched[i].id.step + "to stage " + stage);
		}
		//console.log(scheduleObj.sched[i]);
		
	}
	scheduler += 				getNewAccordionEnd();
	scheduler +=	"<button id='"+ "b" +"' type='button' class='btn btn-default' aria-label='Left Align'>";
	scheduler +=		"<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>";
	scheduler +=	"</button>";
	scheduler += 			getNewStageEnd();
	scheduler +=		getNewAccordionEnd();
	
	scheduler +=	"<div>";
	
	
	scheduler +=	"<button id='"+ "b" +"' type='button' class='btn btn-default' aria-label='Left Align'>";
	scheduler +=		"<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>";
	scheduler +=	"</button>";
	
	document.getElementById("scheduleAccordion").innerHTML = scheduler;
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
	
	$('#b').on('click', function (e) {
		console.log("add Stage"); 
	});
	
	$('.btn btn-default step').on('click', function (e) {
		console.log("add Step"); 
	});
}

function getNewAccordionBegin()
{
	var accordionBegin = "";
	accordionBegin +=		"<div class='accordion'>";
	return accordionBegin;
}

function getNewAccordionEnd()
{
	var accordionEnd = "";
	accordionEnd +=		"</div>";
	return accordionEnd;
}

function getNewAccordionSubBegin()
{
	var accordionBegin = "";
	accordionBegin +=		"<div class='accordionSub'>";
	return accordionBegin;
}

function getNewStageBegin(stageId)
{
	var stageBegin = "";
	stageBegin +=	"<h3>Stage" + stageId + "</h3>";
	stageBegin +=		"<div>"
	return stageBegin;
}

function getNewStageEnd()
{
	var stageEnd = "";
	stageEnd +=		"</div>";
	return stageEnd;
}

function getNewStepBegin(stepId)
{
	var stepBegin = "";
	stepBegin +=	"<h3>Step " + stepId + "</h3>";
	stepBegin +=		"<div>"
	return stepBegin;
}
function getNewStepEnd()
{
	var stepEnd = "";
	stepEnd +=		"</div>";
	return stepEnd;
}

function getNewRowFill(duration, temp)
{
	var rowFill = "";
	rowFill +=				"<p>";
	rowFill +=					"<div class='col-sm-3'>"
	rowFill +=						"Days:<input type='text' class='spinnerDays' value='" + duration.days +"'/>";
	rowFill +=					"</div>";
	rowFill +=					"<div class='col-sm-3'>"
	rowFill +=						"Hours:<input type='text' class='spinnerHours' value='" + duration.hours +"'/>";
	rowFill +=					"</div>";
	rowFill +=					"<div class='col-sm-3'>"
	rowFill +=						"Minutes:<input type='text' class='spinnerMins' value='" + duration.minutes +"'/>";
	rowFill +=					"</div>";
	rowFill +=					"<div class='col-sm-3'>"
	rowFill +=						"Temp:<input type='text' class='spinnerTemp' value='" + temp +"'/>";
	rowFill +=					"</div>";
	rowFill +=				"</p>";
	return rowFill;
}

function getAddNewStage()
{
	var newAdd = "";
	newAdd +=		"<class='addStage'>+ Stage</>";
	return newAdd;
}

function debugScheduleList(scheduleList)
{
	console.log("list count = " + scheduleList.length);
	for(var i = 0; i < scheduleList.length; i++)
	{
		console.log(scheduleList[i]);
	}
}

function debugScheduleData(schedule)
{
	console.log("steps = " + schedule.length);
	for(var i = 0; i < schedule.length; i++)
	{
		console.log(schedule[i]);
	}
}



