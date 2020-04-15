function init_news(layer) {
	var id = getQueryString('id');
	console.log(id);
	$.ajax({
		type: "GET",
		url: "news_id",
		dataType: "json",
		data: {
			'id': id
		},
		success: function(data) {
			var content = $(".right_content");
			content.html("");
			var news = data.data;
			var news_title = $("<div class='news_title'><span>" + news.title + "</span></div>");
			var news_tips = $("<div class='news_tips'><span class='time_tip'>" + news.time +
				"</span><span class='source_tip'>" + news.source + "</span><span class='author_tip'>" + news.author +
				"</span><span class='emotion_tip'>倾向性：" + news.emotion + "</span><span class='news_keyword'>关键字: " + news.keyword +
				"</span></div>");
			var news_url = $("<div class='news_url'><span>原文链接: </span><span id='copy_link_span'>" + news.url +
				"</span><a href='javascript:;' id='copy_link_a'>复制链接</a></div>");
			var news_content = $("<div class='news_content'><p>" + news.content + "</p></div>");
			content.append(news_title).append(news_tips).append(news_url).append(news_content);
			
			$("#suyuan").prop("href",$("#copy_link_span").text());
			
			var content = $("#copy_link_span").text();
			var clipboard = new Clipboard('#copy_link_a', {
				text: function() {
					return content;
				},
			});
			clipboard.on('success', function(e) {
				layer.msg("复制成功");
			});
			clipboard.on('error', function(e) {
				console.log(e);
			});	
			
			var content = $(".right_content").text();
			var clipboard = new Clipboard('#copy_all', {
				text: function() {
					return content;
				},
			});
			clipboard.on('success', function(e) {
				layer.msg("复制成功");
			});
			clipboard.on('error', function(e) {
				console.log(e);
			});	

			
		},
		error: function(xhr, error, status) {

		}
	})
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}
