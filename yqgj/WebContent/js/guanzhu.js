var is_init_source = 0;
var is_init_school_list = 0;

function init_school_list(mylayer) {
	var user_id = cookie.get("user_id");
	$.ajax({
		type: "post",
		url: "guanzhu_list",
		data: {
			'user_id': user_id,
			'table': 'school_guanzhu'
		},
		dataType: "json",
		success: function(data) {
			var data = data.data;
			var school_list = $("#school_list");
			if (data.length == 0) {
				var dd = $("<dd><a href='javascript:;'>" + "您还未关注高校" + "</a></dd>");
				school_list.append(dd);
			} else {
				for (var index in data) {
					var school = data[index];
					if (index == 0) {
						var dd = $("<dd class='layui-this'><a href='javascript:;' >" + school.keyword + "</a></dd>");
					} else {
						var dd = $("<dd><a href='javascript:;' >" + school.keyword + "</a></dd>");
					}
					school_list.append(dd);
				}
			}
			$.ajax({
					type: "post",
					url: "guanzhu_list",
					data: {
						'user_id': user_id,
						'table': 'zhuanti_guanzhu'
					},
					dataType: "json",
					success: function(data) {
						var data = data.data;
						var zhuanti_list = $("#zhuanti_list");
						if (data.length == 0) {
							var dd = $("<dd><a href='javascript:;'>" + "您还未关注专题" + "</a></dd>");
							zhuanti_list.append(dd);
						} else {
							for (var index in data) {
								var zhuanti = data[index];
								var dd = $("<dd><a href='javascript:;' >" + zhuanti.keyword + "</a></dd>");
								zhuanti_list.append(dd);
							}
						}
						$(".layui-nav-tree dd").on("click", function() {
							$(".layui-nav-tree .layui-this").removeClass("layui-this");
							$(this).addClass("layui-this");
							get_yuqing_list(mylayer, 0, 1)
						});
						$(".layui-nav-tree dd").on("click", function() {
							$(".layui-nav-tree .layui-this").removeClass("layui-this");
							$(this).addClass("layui-this");
							get_yuqing_list(mylayer, 0, 1)
						});
						is_init_school_list = 1;
						get_yuqing_list(mylayer, 0, 1);
					},
					error: function(xhr, error, status) {

					},
				})
		},
		error: function(xhr, error, status) {

		}
	})

}

function get_yuqing_list(mylayer, cursor, is_init_page) {
	var id = mylayer.msg("数据加载中", {
		icon: 16,
		shade: 0.5,
		time: false
	});
	if (is_init_source == 0 || is_init_school_list == 0) {
		init_tree_source(mylayer, id);
	} else {
		var time = $(".shijian .select_item_content .select_item_content_span").text();
		switch (time) {
			case "全部时间":
				time = "全部时间";
				break;
			case "当天":
				time = "2019-12-16"
				console.log(time);
				break;
			case "近七天":
				time = getDate("2019-12-16", 7)[0];
				console.log(time);
				break;
			case "近一个月":
				time = getDate("2019-12-16", 30)[0];
				console.log(time);
				break;
		}
		var media = $(".leixing .select_item_content .select_item_content_span").text();
		var emotion = $(".qinggan .select_item_content .select_item_content_span").text();
		var sort = $(".paixu .select_item_content .select_item_content_span").text();
		switch (sort) {
			case "时间降序":
				sort = "desc";
				break;
			case "时间升序":
				sort = "asc";
				break;
		}
		console.log(time);
		console.log(media);
		console.log(emotion);
		var school = $("#school_list .layui-this").text();
		if (school == "您还未关注高校" || school == "") {
			school = "全部高校";
		}
		var zhuanti = $("#zhuanti_list .layui-this").text();
		if (zhuanti == "您还未关注专题" || zhuanti == "") {
			zhuanti = "全部专题";
		}
		console.log(school);
		var search_scope = $("#search_scope").text();
		if(search_scope == "标题"){
			zhuanti = "全部专题";
		}
		if(search_scope == "来源"){
			media = "全部媒体";
		}
		var search_content = $("#search_content").val();
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
				'sort': sort,
				'zhuanti':zhuanti,
				'search_scope':search_scope,
				'search_content':search_content
			},
			success: function(data) {
				if (is_init_page == 1) {
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
					get_yuqing_list(layer, Number(data.pageIndex * 30), 0);
				});
				var content = $(".list")
				content.html("");
				var news_list = data.data;
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

function init_tree_source(mylayer, id) {
	if(cookie.get("date_source_count_data") == null){
		$.ajax({
			type: "GET",
			url: "news_source",
			dataType: "json",
			data: {
				limit: 10,
				date:'2019-12-16'
			},
			success: function(data) {
				cookie.set("date_source_count_data",JSON.stringify(data));
				var data = data.data;
				var select_item_content = $(".leixing .select_item_content");
				console.log(data);
				for (var index in data) {
					var item = data[index];
					var span = $("<span><a href='javascript:;'>" + item.source + "</a></span>");
					select_item_content.append(span);
				}
				var span = $("<span><a href='javascript:;'>" + "其他" + "</a></span>");
				select_item_content.append(span);
				is_init_source = 1;
				$(".leixing .select_item_content span").on("click", function() {
					$(".leixing .select_item_content .select_item_content_span").removeClass("select_item_content_span");
					$(this).addClass("select_item_content_span");
					get_yuqing_list(layer, 0, 1);
				});
				if (is_init_school_list == 0) {
					init_school_list(mylayer);
				}
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		var data = JSON.parse(cookie.get("date_source_count_data")).data;
		var select_item_content = $(".leixing .select_item_content");
		console.log(data);
		for (var index in data) {
			var item = data[index];
			var span = $("<span><a href='javascript:;'>" + item.source + "</a></span>");
			select_item_content.append(span);
		}
		var span = $("<span><a href='javascript:;'>" + "其他" + "</a></span>");
		select_item_content.append(span);
		is_init_source = 1;
		$(".leixing .select_item_content span").on("click", function() {
			$(".leixing .select_item_content .select_item_content_span").removeClass("select_item_content_span");
			$(this).addClass("select_item_content_span");
			get_yuqing_list(layer, 0, 1);
		});
		if (is_init_school_list == 0) {
			init_school_list(mylayer);
		}
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
