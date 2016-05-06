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
			$("#controlPanel").show();
		}
	});
	$("#monitorPanel_navBtn").click(function(){
		if(!$("#monitorPanel").is(":visible"))
		{
			$("#controlPanel").hide();
			$("#monitorPanel").show();
		}
	});
}