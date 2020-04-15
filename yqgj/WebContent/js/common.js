if (cookie.get("user_name") == null || cookie.get("user_name") == "") {
	console.log("没有用户");
	window.location.href = "index.html";
}

if (cookie.get("user_name") != null && cookie.get("user_name") != "") {
	$("#current_user").html(cookie.get("user_name"));
}
