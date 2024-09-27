function WIPAlert() {
	if ($("#myAlert").find("div#myAlert2").length == 0) {
		$("#myAlert").append(
			"<div class='alert alert-warning alert-dismissable' id='myAlert2'> <button type='button' class='close' data-dismiss='alert'  aria-hidden='true'>&times;</button> <strong>WIP!</strong> Este Projecto esta en desarrollo, por favor vuelva mas tarde.</div>"
		);
	}
	$("#myAlert").css("display", "");
}
