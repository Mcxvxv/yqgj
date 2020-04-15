var is_init_source = 0;

function get_yuqing_list(mylayer, cursor) {
	var id = mylayer.msg("数据加载中", {
		icon: 16,
		shade: 0.5,
		time: false
	});
	var time = $("#select_time").text();
	switch (time) {
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
	var emotion = $("#select_emotion").text();
	var media = $("#select_media").text();
	var source = $("#select_source").text();
	var scope = $("#select_scope").text();
	var search_scope = $("#search_scope").text();
	if(search_scope == "来源"){
		media = "全部媒体";
	}
	var search_content = $("#search_content").val();
	$.ajax({
		type: "GET",
		url: "all_news",
		dataType: "json",
		data: {
			'time': time,
			'emotion': emotion,
			'media': media,
			'source': source,
			'scope': scope,
			'cursor': cursor,
			'search_scope':search_scope,
			'search_content':search_content
		},
		success: function(data) {
			var isInited = $("#page").pagination();
			if (isInited) {
				 $("#page").pagination('destroy');	
			}
			$("#page").pagination({
				pageSize: 30,
				total: data.count.count,
			});
			$("#page").on("pageClicked", function(event, data) {
				var id = layer.msg("数据加载中", {
					icon: 16,
					shade: 0.5,
					time: false
				});
				get_yuqing_list(layer, Number(data.pageIndex * 30));
			});
			var content = $(".list");
			content.html("");
			var news_list = data.data;
			for (var index in news_list) {
				var news = news_list[index];
				var item_div = $("<div class='yuqing_list_content_item'>");
				var title_div = $("<div class='yuqing_list_content_item_title'>");
				var content_div = $("<div class='yuqing_list_content_item_content'>");
				var source_div = $("<div class='yuqing_list_content_item_source'>");
				var img_path = "";
				switch (news.emotion) {
					case "负面":
						img_path = "img/icon/dead.png";
						break;
					case "中性":
						img_path = "img/icon/bored.png";
						break;
					case "正面":
						img_path = "img/icon/smile.png";
						break;
					default:
						img_path = "img/icon/bored.png";
				}
				var title_img = $("<img src='" + img_path + "' />");
				var count = Number(index) + Number(1);
				var title_a = $("<a href='news_detail?id="+news.id+"' target='_blank'><span class='news_num'>" + count + ".</span>" +
					"<span class='news_emotion'>" + news.emotion + "</span>" + "<span class='news_title'>" + news.title +
					"</span></a>");
				title_div = title_div.append(title_img).append(title_a);
				var content_p = $("<p>" + news.content + "</p>");
				content_div = content_div.append(content_p);
				var span_time = $("<span class='time'>" + news.time + "</span>");
				var span_source = $("<span class='source'>" + news.source + "</span>");
				var span_author = $("<span class='author'>" + news.author + "</span>");
				source_div = source_div.append(span_time).append(span_source).append(span_author);
				item_div = item_div.append(title_div).append(content_div).append(source_div);
				content.append(item_div);
			}
			if (is_init_source == 0) {
				init_tree_source(mylayer, id);
			} else {
				mylayer.close(id);
			}
		},
		error: function(xhr, error, status) {

		}
	})

}

function init_tree_source(mylayer, id) {
	if(cookie.get("date_source_count_data") == null){
		$.ajax({
			type: "GET",
			url: "news_source",
			dataType: "json",
			data: {
				limit: 10,
				date:"2019-12-16"
			},
			success: function(data) {
				cookie.set("date_source_count_data",JSON.stringify(data));
				var data = data.data;
				var select_tree_media = $("#select_tree_media .layui-nav-child");
				console.log(data);
				for (var index in data) {
					var item = data[index];
					var dd = $("<dd><a href='javascript:;'>" + item.source + "</a></dd>");
					select_tree_media.append(dd);
				}
				var dd = $("<dd><a href='javascript:;'>其他</a></dd>");
				select_tree_media.append(dd);
				is_init_source = 1;
				$("#select_tree_media dl dd").on("click", function() {
					$("#select_tree_media .layui-this").removeClass("layui-this");
					$("#select_media").html($(this).text());
					$(this).addClass("layui-this");
					$(".list").html("");
					get_yuqing_list(layer, 0);
				});
				mylayer.close(id);
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		var data = JSON.parse(cookie.get("date_source_count_data")).data;
		var select_tree_media = $("#select_tree_media .layui-nav-child");
		console.log(data);
		for (var index in data) {
			var item = data[index];
			var dd = $("<dd><a href='javascript:;'>" + item.source + "</a></dd>");
			select_tree_media.append(dd);
		}
		var dd = $("<dd><a href='javascript:;'>其他</a></dd>");
		select_tree_media.append(dd);
		is_init_source = 1;
		$("#select_tree_media dl dd").on("click", function() {
			$("#select_tree_media .layui-this").removeClass("layui-this");
			$("#select_media").html($(this).text());
			$(this).addClass("layui-this");
			$(".list").html("");
			get_yuqing_list(layer, 0);
		});
		mylayer.close(id);
	}

}

function getDate(date,count) {
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
