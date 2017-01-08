function initMainNavBar()
{
	$('#mainNavbar').on('click', 'li', function() 
	{
	    $('#mainNavbar li.active').removeClass('active');
	    $(this).addClass('active');
	});

	$("#controlPanel_navBtn").click(function(){
		if(!$("#controlPanel").is(":visible"))
		{
			$("#monitorPanel").hide();
			$("#schedulerPanel").hide();
			$("#controlPanel").show();
		}
	});
	$("#monitorPanel_navBtn").click(function(){
		if(!$("#monitorPanel").is(":visible"))
		{
			$("#controlPanel").hide();
			$("#schedulerPanel").hide();
			$("#monitorPanel").show();
		}
	});
	$("#schedulerPanel_navBtn").click(function(){
		if(!$("#schedulerPanel").is(":visible"))
		{
			$("#controlPanel").hide();			
			$("#monitorPanel").hide();
			$("#schedulerPanel").show();
		}
	});
}