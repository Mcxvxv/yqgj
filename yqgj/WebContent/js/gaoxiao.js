var is_init_tab = 0;
var is_init_nav = 0;

	
function check_guanzhu(user_id,keyword){
	var user_id = cookie.get("user_id");
	var keyword = $(".gaoxiao_title").text();
	$.ajax({
		type: "post",
		url: "check_guanzhu",
		data:{
			'user_id':user_id,
			'keyword':keyword,
			'table':'school_guanzhu'
		},
		dataType: "json",
		success: function(data) {
			var data = data.data;
			if(data.retcode == 2000){
				console.log("已关注");
				$("#guanzhu span").html("已关注");
				$("#quguan").css("display", "inline-block");
				$("#guanzhu").prop("disabled", "disabled");
			}else{
				console.log("未关注");
				$("#guanzhu span").html("关注");
				$("#guanzhu").prop("disabled", "");
				$("#quguan").css("display", "none");
			}
		},
		error: function(xhr, error, status) {
	
		}
	})
}

function add_guanzhu(){
	var user_id = cookie.get("user_id");
	console.log(user_id);
	var keyword = $(".gaoxiao_title").text();
	$.ajax({
		type: "post",
		url: "add_guanzhu",
		data:{
			'user_id':user_id,
			'keyword':keyword,
			'table':'school_guanzhu'
		},
		dataType: "json",
		success: function(data) {
			var data = data.data;
			if(data.retcode == 2000){
				$("#guanzhu span").html("已关注");
				$("#quguan").css("display", "inline-block");
				$("#guanzhu").prop("disabled", "disabled");
			}
		},
		error: function(xhr, error, status) {
	
		}
	})
}

function cancel_guanzhu(){
	var user_id = cookie.get("user_id");
	console.log(user_id);
	var keyword = $(".gaoxiao_title").text();
	$.ajax({
		type: "post",
		url: "cancel_guanzhu",
		data:{
			'user_id':user_id,
			'keyword':keyword,
			'table':'school_guanzhu'
		},
		dataType: "json",
		success: function(data) {
			var data = data.data;
			if(data.retcode == 2000){
				$("#guanzhu span").html("关注");
				$("#guanzhu").prop("disabled", "");
				$("#quguan").css("display", "none");
			}
		},
		error: function(xhr, error, status) {
	
		}
	})
}


function init_layui_nav_child(mylayer, id) {
	console.log(cookie.get("school_data"));
	if(cookie.get("school_data") == null){
		$.ajax({
			type: "GET",
			url: "news_school",
			dataType: "json",
			success: function(data) {
				console.log("未缓存")
				cookie.set("school_data",JSON.stringify(data));
				var layui_nav_child = $(".layui-side-scroll .layui-nav-tree .layui-nav-child");
				var school_list = data.data;
				for (var index in school_list) {
					var school = school_list[index];
					var dd = $("<dd><a href='javascript:;'>" + school.keyword + "</a></dd>");
					layui_nav_child.append(dd);
				}
				$(".layui-side-scroll .layui-nav-tree .layui-nav-child dd").on("click", function() {
					$(".layui-side-scroll .layui-nav-tree .layui-nav-child .layui-this").removeClass("layui-this");
					$(this).addClass("layui-this");
					$(".gaoxiao_title").html($(this).text());
					$("#guanzhu").prop("disabled", "");
					$("#quguan").prop("disabled", "");
					var id = mylayer.msg("数据加载中", {
						icon: 16,
						shade: 0.5,
						time: false
					});
					check_guanzhu();
					get_yuqing_list(mylayer, id, 0,1);
				})
				is_init_nav = 1;
				if (is_init_tab == 0) {
					init_layui_tab(mylayer, id);
				} else {
					mylayer.close(id);
				}
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		var school_list = JSON.parse(cookie.get("school_data")).data;
		var layui_nav_child = $(".layui-side-scroll .layui-nav-tree .layui-nav-child");
		console.log("缓存")
		for (var index in school_list) {
			var school = school_list[index];
			var dd = $("<dd><a href='javascript:;'>" + school.keyword + "</a></dd>");
			layui_nav_child.append(dd);
		}
		$(".layui-side-scroll .layui-nav-tree .layui-nav-child dd").on("click", function() {
			$(".layui-side-scroll .layui-nav-tree .layui-nav-child .layui-this").removeClass("layui-this");
			$(this).addClass("layui-this");
			$(".gaoxiao_title").html($(this).text());
			$("#guanzhu").prop("disabled", "");
			$("#quguan").prop("disabled", "");
			var id = mylayer.msg("数据加载中", {
				icon: 16,
				shade: 0.5,
				time: false
			});
			check_guanzhu();
			get_yuqing_list(mylayer, id, 0,1);
		})
		is_init_nav = 1;
		if (is_init_tab == 0) {
			init_layui_tab(mylayer, id);
		} else {
			mylayer.close(id);
		} 
	}
	
}

function init_layui_tab(mylayer, id) {
	if(cookie.get("date_source_count_data") == null){
		$.ajax({
			type: "GET",
			url: "news_source",
			dataType: "json",
			data: {
				'limit': 8,
				'date':'2019-12-16'
			},
			success: function(data) {
				cookie.set("date_source_count_data",JSON.stringify(data));
				var layui_tab_title = $(".layui-tab-title");
				var layui_tab_content = $(".layui-tab-content");
				var first_li = $("<li class='layui-this'>全部媒体</li>");
				var first_item = $(
					"<div class='layui-tab-item layui-show'><div class='list'></div><div id='page' class='m-pagination'></div></div>"
				);
				layui_tab_title = layui_tab_title.append(first_li);
				layui_tab_content = layui_tab_content.append(first_item);
				var huoyue_meiti = data.data;
				for (var index in huoyue_meiti) {
					var meiti = huoyue_meiti[index];
					var li = $("<li>" + meiti.source + "</li>");
					var layui_tab_item = $(
						"<div class='layui-tab-item'><div class='list'></div><div id='page' class='m-pagination'></div></div>");
					layui_tab_title.append(li);
					layui_tab_content.append(layui_tab_item);
				}
				var other_li = $("<li>其他</li>");
				var layui_tab_item = $(
					"<div class='layui-tab-item'><div class='list'></div><div id='page' class='m-pagination'></div></div>");
				layui_tab_content.append(layui_tab_item);
				layui_tab_title.append(other_li);
				is_init_tab = 1;
				get_yuqing_list(mylayer, id, 0,1);
				$(".layui-tab-title li").on("click", function() {
					var id = mylayer.msg("数据加载中", {
						icon: 16,
						shade: 0.5,
						time: false
					});
					$(".layui-tab-title .layui-this").removeClass("layui-this");
					$(this).addClass("layui-this");
					get_yuqing_list(mylayer, id, 0,1);
				});
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		var huoyue_meiti = JSON.parse(cookie.get("date_source_count_data")).data;
		var layui_tab_title = $(".layui-tab-title");
		var layui_tab_content = $(".layui-tab-content");
		var first_li = $("<li class='layui-this'>全部媒体</li>");
		var first_item = $(
			"<div class='layui-tab-item layui-show'><div class='list'></div><div id='page' class='m-pagination'></div></div>"
		);
		layui_tab_title = layui_tab_title.append(first_li);
		layui_tab_content = layui_tab_content.append(first_item);
		
		for (var index in huoyue_meiti) {
			var meiti = huoyue_meiti[index];
			var li = $("<li>" + meiti.source + "</li>");
			var layui_tab_item = $(
				"<div class='layui-tab-item'><div class='list'></div><div id='page' class='m-pagination'></div></div>");
			layui_tab_title.append(li);
			layui_tab_content.append(layui_tab_item);
		}
		var other_li = $("<li>其他</li>");
		var layui_tab_item = $(
			"<div class='layui-tab-item'><div class='list'></div><div id='page' class='m-pagination'></div></div>");
		layui_tab_content.append(layui_tab_item);
		layui_tab_title.append(other_li);
		is_init_tab = 1;
		get_yuqing_list(mylayer, id, 0,1);
		$(".layui-tab-title li").on("click", function() {
			var id = mylayer.msg("数据加载中", {
				icon: 16,
				shade: 0.5,
				time: false
			});
			$(".layui-tab-title .layui-this").removeClass("layui-this");
			$(this).addClass("layui-this");
			get_yuqing_list(mylayer, id, 0,1);
		}); 
	}
	
}


function get_yuqing_list(mylayer, id, cursor,is_init_page) {
	if (is_init_nav == 0 || is_init_tab == 0) {
		init_layui_nav_child(mylayer, id);
	} else {
		var time = $("#time_select .layui-btn span").text();
		switch (time) {
			case "时间":
				time = "全部时间";
				break;
			case "全部时间":
				time = "全部时间";
				break;
			case "当天":
				time = "2019-12-16"
				console.log(time);
				break;
			case "近七天":
				time = getDate("2019-12-16",7)[0];
				console.log(time);
				break;
			case "近一个月":
				time = getDate("2019-12-16",30)[0];
				console.log(time);
				break;
		}
		var media = $(".layui-tab .layui-this").text();
		var emotion = $("#emotion_select .layui-btn span").text();
		if(emotion == "情感倾向"){
			emotion = "全部情感";
		}
		console.log(time);
		console.log(media);
		console.log(emotion);
		var school = $(".gaoxiao_title").text();
		console.log(school);
		var sort = $("#sort_select .layui-btn span").text();
		switch (sort){
			case '排序':
				sort = "desc";
				break;
			case "时间降序":
				sort = "desc";
				break;
			case "时间升序":
				sort = "asc";
				break;
		}
		$.ajax({
			type: "GET",
			url: "news_guanzhu",
			dataType: "json",
			data: {
				'cursor': cursor,
				'school': school,
				'time': time,
				'emotion': emotion,
				'media': media,
				'sort':sort
			},
			success: function(data) {
				if(is_init_page == 1){
					var isInited = $("#page").pagination();
					if (isInited) {
						 $("#page").pagination('destroy');	
					}
					$("#page").pagination({
						pageSize: 30,
						total: data.count.count,
					});
				}
				$("#page").on("pageClicked", function(event, data) {
					var id = layer.msg("数据加载中", {
						icon: 16,
						shade: 0.5,
						time: false
					});
					get_yuqing_list(mylayer,id, Number(data.pageIndex * 30),0);
				});
				var content = $(".layui-show .list")
				content.html("");
				var news_list = data.data;
				// console.log(news_list);
				for (var index in news_list) {
					var news = news_list[index];
					var item_div = $("<div class='yuqing_list_content_item'>");
					var title_div = $("<div class='yuqing_list_content_item_title'>");
					var content_div = $("<div class='yuqing_list_content_item_content'>");
					var source_div = $("<div class='yuqing_list_content_item_source'>");
					var count = Number(index) + Number(1);
					var title_a = $("<a href='news_detail?id="+news.id+"' target='_blank'><span class='news_num'>" + count + ".</span>" +
						"<span class='news_emotion'>" + news.emotion + "</span>" + "<span class='news_title'>" + news.title +
						"</span></a>");
					title_div = title_div.append(title_a);
					var content_p = $("<p>" + news.content + "</p>");
					content_div = content_div.append(content_p);
					var span_time = $("<span class='time'>" + news.time + "</span>");
					var span_source = $("<span class='source'>" + news.source + "</span>");
					var span_school = $("<span class='school'>" + news.keyword + "</span>");
					var span_author = $("<span class='author'>" + news.author + "</span>");
					source_div = source_div.append(span_time).append(span_source).append(span_school).append(span_author);
					item_div = item_div.append(title_div).append(content_div).append(source_div);
					content.append(item_div);
				}
				mylayer.close(id);
			},
			error: function(xhr, error, status) {

			}
		})
	}
}

function getDate(date, count) {
	var base = new Date(date).getTime()
	var oneDay = 24 * 3600 * 1000;
	var date = [];
	var data = [Math.random() * 300];
	var time = new Date(base);
	date.push([time.getFullYear(), time.getMonth() + 1, time.getDate()].join('-'));
	for (var i = 1; i < count; i++) {
		var now = new Date(base -= oneDay);
		date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
		data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
	}
	var newdate = date.reverse()
	return newdate;
}
