var count = 0;

function load_data(mylayer, id) {
	init_quality_table(mylayer, id);
	init_source_table(mylayer, id);
	init_source_detail(mylayer, id);
	get_yuqingyujing_list(mylayer, id);
	get_gaoxiaozuixinlist(mylayer, id);
	get_schoollist(mylayer, id);
}

function get_yuqingyujing_list(mylayer, id) {
	$.ajax({
		type: "GET",
		url: "yujing_news",
		dataType: "json",
		data: {
			'cursor': 0
		},
		success: function(data) {
			count++;
			console.log(count);
			if (count == 6) {
				mylayer.close(id);
				// mylayer.closeLoading();
			}
			var content = $(".yujing.content")
			var yujing_ul = $("<ul class='yujing_ul'>");
			var news_list = data.data;
			for (var index in news_list) {
				var news = news_list[index];
				var li = $("<li class='yujing_item'>");
				var img = $("<img class='yujing_icon' src='img/icon/yujing_item.png'/>");
				var div = $("<div class='yujing_text'>");
				var h5 = $("<a class='layui-timeline-title' href='news_detail?id="+news.id+"' target='_blank'><span>" + news.title + "</span></a>");
				var news_div = $("<div class='layui-timeline-news'>");
				var span_time = $("<span class='news_time'>" + news.time + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "</span>");
				var span_source = $("<span class='news_source'>" + news.source + "</span>");
				news_div = news_div.append(span_time).append(span_source);
				div = div.append(h5).append(news_div);
				li = li.append(img).append(div);
				yujing_ul.append(li);
			}
			content.append(yujing_ul);

		},
		error: function(xhr, error, status) {

		}
	})
}

function get_gaoxiaozuixinlist(mylayer, id) {
	$.ajax({
		type: "GET",
		url: "gaoxiao_news",
		dataType: "json",
		data: {
			'cursor': 0
		},
		success: function(data) {
			count++;
			console.log(count);
			if (count == 6) {
				mylayer.close(id);
				// mylayer.closeLoading();
			}
			var content = $(".zuixin.content")
			var zuixin_ul = $("<ul class='zuixin_ul'>");
			var news_list = data.data;
			for (var index in news_list) {
				var news = news_list[index];
				var li = $("<li class='zuixin_item'>");
				var img = $("<img class='zuixin_icon' src='img/icon/zuixingengxin.png'/>");
				var div = $("<div class='zuixin_text'>");
				var h5 = $("<a class='layui-timeline-title' href='news_detail?id="+news.id+"' target='_blank'><span>" + news.title + "</span></a>");
				var news_div = $("<div class='layui-timeline-news'>");
				var span_time = $("<span class='news_time'>" + news.time + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "</span>");
				var span_source = $("<span class='news_source'>" + news.source + "<br />" + "</span>");
				var span_keyword = $("<span class='news_keyword'>" + news.keyword + "</span>");
				news_div = news_div.append(span_time).append(span_source).append(span_keyword);
				div = div.append(h5).append(news_div);
				li = li.append(img).append(div);
				zuixin_ul.append(li);
			}
			content.append(zuixin_ul);
		},
		error: function(xhr, error, status) {

		}
	})
}

function get_schoollist(mylayer, id) {
	var user_id = cookie.get("user_id");
	$.ajax({
		type: "post",
		url: "http://localhost:8080/yqgj/guanzhu_list",
		data: {
			'user_id': user_id,
			'table': 'school_guanzhu'
		},
		dataType: "json",
		success: function(data) {
			var data = data.data;
			if (data.length == 0) {
				console.log("未关注")
				count++;
				console.log(count);
				if (count == 6) {
					mylayer.close(id);
				}		
			} else {
				var school = data[0].keyword;
				$.ajax({
					type: "GET",
					url: "news_guanzhu",
					dataType: "json",
					data: {
						'cursor': 0,
						'school': school,
						'time': "2019-12-16",
						'emotion': "",
						'media': "",
						'sort': "desc",
						'zhuanti': ""
					},
					success: function(data) {
						count++;
						console.log(count);
						if (count == 6) {
							mylayer.close(id);
							// mylayer.closeLoading();
						}
						var content = $(".guanzhu.content")
						content.html("");
						var timeline = $("<ul class='layui-timeline'>");
						var news_list = data.data;
						for (var index in news_list) {
							var news = news_list[index];
							var li = $("<li class='layui-timeline-item'>");
							var i = $("<i class='layui-icon layui-timeline-axis'></i>");
							var div = $("<div class='layui-timeline-content layui-text'>");
							var h5 = $("<a class='layui-timeline-title' href='javascript:;'><span>" + news.title + "</span></a>");
							var news_div = $("<div class='layui-timeline-news'>");
							var span_time = $("<span class='news_time'>" + news.time + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "</span>");
							var span_keyword = $("<span class='news_keyword'>" + news.keyword + "</span>");
							news_div = news_div.append(span_time).append(span_keyword);
							div = div.append(h5).append(news_div);
							li = li.append(i).append(div);
							timeline.append(li);
						}
						content.append(timeline);
					},
					error: function(xhr, error, status) {
				
					}
				})
			}
			
			
		},
		error: function(xhr, error, status) {
	
		},
	})
}

function init_quality_table(mylayer, id) {
	if(cookie.get("date_emotion_count_data") == null){
		$.ajax({
			type: "GET",
			url: "news_emotion",
			data:{
				'date':"2019-12-16"
			},
			dataType: "json",
			success: function(data) {
				cookie.set("date_emotion_count_data",JSON.stringify(data));
				var legend_data = [];
				var quality_pie_data = [];
				count++;
				console.log(count);
				if (count == 6) {
					mylayer.close(id);
					// mylayer.closeLoading();
				}
				var data = data.data;
				for (var index in data) {
					var item = data[index];
					legend_data.push(item.emotion);
					quality_pie_data.push({
						"name": item.emotion,
						"value": item.count,	
					})
				}
				var quality_pie_chart = echarts.init(document.getElementById('quality_table'));
				var quality_pie_option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: 10,
						data: legend_data
					},
					series: [{
						name: '性质',
						type: 'pie',
						radius: ['40%', '60%'],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '30',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: quality_pie_data
					}]
				};
				quality_pie_chart.setOption(quality_pie_option);
		
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		var data = JSON.parse(cookie.get("date_emotion_count_data")).data;
		var legend_data = [];
		var quality_pie_data = [];
		count++;
		console.log(count);
		if (count == 6) {
			mylayer.close(id);
			// mylayer.closeLoading();
		}
		
		for (var index in data) {
			var item = data[index];
			legend_data.push(item.emotion);
			quality_pie_data.push({
				"name": item.emotion,
				"value": item.count
			})
		}
		var quality_pie_chart = echarts.init(document.getElementById('quality_table'));
		var quality_pie_option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 10,
				data: legend_data
			},
			series: [{
				name: '性质',
				type: 'pie',
				radius: ['40%', '60%'],
				avoidLabelOverlap: false,
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: '30',
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: quality_pie_data
			}]
		};
		quality_pie_chart.setOption(quality_pie_option);
	}
	
}

function init_source_detail(mylayer, id){
	if(cookie.get("date_source_detail_data") == null){
		$.ajax({
			type: "GET",
			url: "news_emoAndsource",
			data:{
				'date':"2019-12-16"
			},
			dataType: "json",
			success: function(data) {
				cookie.set("date_source_detail_data",JSON.stringify(data));
				count++;
				console.log(count);
				if (count == 6) {
					mylayer.close(id);
				}
				var data = data.data;
				var emo_data = data.emo_data;
				var positive_
				var source_detail = $(".source_detail");
				for (var index in data) {
					var item = data[index];
					var a = $("<a href='javascript:;'></a>");
					var source_detail_item = $("<div class='source_detail_item'></div>");
					var title = $("<div class='source_detail_item title'><img src='img/icon/"+ item.pic_url +"' /><span>"+ item.source +"</span></div>");
					var all_count = $("<span class='source_detail_item count all_count'>"+item.all_count+"</span>");
					var bad_count = $("<span class='source_detail_item count bad_count'>"+item.negative+"</span>");
					source_detail_item.append(title).append(all_count).append(bad_count);
					a = a.append(source_detail_item);
					source_detail.append(a);
				}
			
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		
		var data = JSON.parse(cookie.get("date_source_detail_data")).data;
		count++;
		console.log(count);
		if (count == 6) {
			mylayer.close(id);
		}
		console.log(data);
		var source_detail = $(".source_detail");
		for (var index in data) {
			var item = data[index];
			var a = $("<a href='javascript:;'></a>");
			var source_detail_item = $("<div class='source_detail_item'></div>");
			var title = $("<div class='source_detail_item title'><img src='img/icon/"+ item.pic_url +"' /><span>"+ item.source +"</span></div>");
			var all_count = $("<span class='source_detail_item count all_count'>"+item.all_count+"</span>");
			var bad_count = $("<span class='source_detail_item count bad_count'>"+item.negative+"</span>");
			source_detail_item.append(title).append(all_count).append(bad_count);
			a = a.append(source_detail_item);
			source_detail.append(a);
		}
	}
	
}

function init_source_table(mylayer, id) {
	if(cookie.get("date_source_count_data") == null){
		$.ajax({
			type: "GET",
			url: "news_source",
			dataType: "json",
			data: {
				limit: 10,
				date: "2019-12-16"
			},
			success: function(data) {
				cookie.set("date_source_count_data",JSON.stringify(data));
				var legend_data = [];
				var source_pie_data = [];
				count++;
				console.log(count);
				if (count == 6) {
					mylayer.close(id);
					// mylayer.closeLoading();
				}
				var source_data = data.data;
				var emo_data = data.emo_data;
				var positive_count = emo_data.positive;
				var neutral_count = emo_data.neutral;
				var negative_count = emo_data.negative;
			    var emo_all_count = Number(positive_count) + Number(neutral_count) + Number(negative_count);
				console.log(source_data);
				for (var index in source_data) {
					var item = source_data[index];
					legend_data.push(item.source);
					source_pie_data.push({
						"name": item.source,
						"value": item.count
					})
					emo_all_count = Number(emo_all_count) - Number(item.count);
					console.log(emo_all_count);
				}
				legend_data.push("其他");
				source_pie_data.push({
					"name": "其他",
					"value": emo_all_count
				})
				var source_pie_chart = echarts.init(document.getElementById("source_table"));
				var source_pie_option = {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: 0,
						top: 0,
						data: legend_data
					},
					series: [{
						name: '来源平台',
						type: 'pie',
						top:30,
						left:50,
						radius: '55%',
						data: source_pie_data
					}]
				};
				source_pie_chart.setOption(source_pie_option);
		
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		var data = JSON.parse(cookie.get("date_source_count_data"));
		var legend_data = [];
		var source_pie_data = [];
		count++;
		console.log(count);
		if (count == 6) {
			mylayer.close(id);
			// mylayer.closeLoading();
		}
		var source_data = data.data;
		var emo_data = data.emo_data;
		var positive_count = emo_data.positive;
		var neutral_count = emo_data.neutral;
		var negative_count = emo_data.negative;
		var emo_all_count = Number(positive_count) + Number(neutral_count) + Number(negative_count);
		for (var index in source_data) {
			
			var item = source_data[index];
			console.log(item)
			legend_data.push(item.source);
			source_pie_data.push({
				"name": item.source,
				"value": item.count
			})
			console.log(emo_all_count);
			emo_all_count = Number(emo_all_count) - Number(item.count);
			console.log(emo_all_count);
		}
		legend_data.push("其他");
		source_pie_data.push({
			"name": "其他",
			"value": emo_all_count
		})
		var source_pie_chart = echarts.init(document.getElementById("source_table"));
		var source_pie_option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 0,
				top: 0,
				data: legend_data
			},
			series: [{
				name: '来源平台',
				type: 'pie',
				top:30,
				left:50,
				radius: '55%',
				data: source_pie_data
			}]
		};
		source_pie_chart.setOption(source_pie_option);
	}
	

}

