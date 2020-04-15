var count = 0;
function load_data(mylayer,id,table){
	init_yuqing_zoushi_chart(mylayer,id);
	init_meiti_laiyuan_chart(mylayer,id);
	init_meiti_laiyuan_table(table,mylayer,id);
	init_ciyun(table,mylayer,id);
	init_zhuanti_ciyun(table,mylayer,id);
	init_huoyue_meiti(mylayer,id);
	init_huoyue_bozhu(mylayer,id);
}
function init_yuqing_zoushi_chart(layer,id) {
	if(cookie.get("news_emoAnddate_count_data") == null){
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/yqgj/news_emoAnddate",
			dataType: "json",
			success: function(data) {
				cookie.set("news_emoAnddate_count_data",JSON.stringify(data));
				count++;
				if(count == 7){
					layer.close(id);
				}
				var laiyuan_table_data = [];
				var xAxis_data = [];
				var all_data = [];
				var positive_data = [];
				var negative_data = [];
				var neutral_data = [];
				var list = data.data;
				for (var index in list) {
					var item = list[index];
					xAxis_data.push(item.rel_date);
					all_data.push(Number(item.positive)+Number(item.negative)+Number(item.neutral));
					positive_data.push(item.positive);
					negative_data.push(item.negative);
					neutral_data.push(item.neutral);
				}
				var yuqing_zoushi_table = echarts.init(document.getElementById("yuqing_zoushi_chart"));
				var yuqing_zoushi_option = {
					title: {
						text: '折线图堆叠'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['全部', '正面', '中性', '负面']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						show: true,
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							dataView: {
								readOnly: false
							},
							magicType: {
								type: ['line', 'bar']
							},
							restore: {},
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: xAxis_data
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '全部',
							type: 'line',
							data: all_data
						},
						{
							name: '正面',
							type: 'line',
							data: positive_data
						},
						{
							name: '中性',
							type: 'line',
							data: neutral_data
						},
						{
							name: '负面',
							type: 'line',
							data: negative_data
						}
					]
				
				};
				yuqing_zoushi_table.setOption(yuqing_zoushi_option);
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		var list = 	JSON.parse(cookie.get("news_emoAnddate_count_data")).data;
		count++;
		if(count == 7){
			layer.close(id);
		}
		var laiyuan_table_data = [];
		var xAxis_data = [];
		var all_data = [];
		var positive_data = [];
		var negative_data = [];
		var neutral_data = [];
		
		for (var index in list) {
			var item = list[index];
			xAxis_data.push(item.rel_date);
			all_data.push(Number(item.positive)+Number(item.negative)+Number(item.neutral));
			positive_data.push(item.positive);
			negative_data.push(item.negative);
			neutral_data.push(item.neutral);
		}
		var yuqing_zoushi_table = echarts.init(document.getElementById("yuqing_zoushi_chart"));
		var yuqing_zoushi_option = {
			title: {
				text: '折线图堆叠'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['全部', '正面', '中性', '负面']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {
						readOnly: false
					},
					magicType: {
						type: ['line', 'bar']
					},
					restore: {},
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: xAxis_data
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					name: '全部',
					type: 'line',
					data: all_data
				},
				{
					name: '正面',
					type: 'line',
					data: positive_data
				},
				{
					name: '中性',
					type: 'line',
					data: neutral_data
				},
				{
					name: '负面',
					type: 'line',
					data: negative_data
				}
			]
		
		};
		yuqing_zoushi_table.setOption(yuqing_zoushi_option);
	}
	
}

function init_meiti_laiyuan_chart(layer,id) {
	if(cookie.get("emotion_count_data") == null || cookie.get("source_count_data") == null){
		$.ajax({
			type: "GET",
			url: "news_emotion",
			data:{
				date:""
			},
			dataType: "json",
			success: function(data) {
				cookie.set("emotion_count_data",JSON.stringify(data));
				var quality_legend_data = [];
				var quality_pie_data = [];
				var data = data.data;
				for (var index in data) {
					var item = data[index];
					quality_legend_data.push(item.emotion);
					quality_pie_data.push({
						"name": item.emotion,
						"value": item.count
					})
				}
				$.ajax({
					type: "GET",
					url: "news_source",
					dataType: "json",
					data: {
						'limit': 10,
						'date':''
					},
					success: function(data) {
						cookie.set("source_count_data",JSON.stringify(data));
						var source_legend_data = [];
						var source_pie_data = [];
						var data = data.data;
						for (var index in data) {
							var item = data[index];
							source_legend_data.push(item.source);
							source_pie_data.push({
								"name": item.source,
								"value": item.count
							})
						}
						var meiti_laiyuan_table = echarts.init(document.getElementById("meiti_laiyuan_chart"));
						var meiti_laiyuan_option = {
							tooltip: {
								trigger: 'item',
								formatter: '{a} <br/>{b}: {c} ({d}%)'
							},
							legend: [{
									orient: 'vertical',
									left: 120,
									data: quality_legend_data,
								},
								{
									orient: 'vertical',
									left: 10,
									data: source_legend_data
								}
							],
							toolbox: {
								show: true,
								feature: {
									saveAsImage: {}
								}
							},
							series: [{
									name: '性质',
									type: 'pie',
									selectedMode: 'single',
									radius: [0, '30%'],
						
									label: {
										position: 'inner',
									},
									labelLine: {
										show: false
									},
									data: quality_pie_data
								},
								{
									name: '媒体来源',
									type: 'pie',
									radius: ['40%', '55%'],
									data: source_pie_data
								}
							]
						};
						meiti_laiyuan_table.setOption(meiti_laiyuan_option);
						count++;
						if(count == 7){
							layer.close(id);
						}
					},
					error: function(xhr, error, status) {
				
					}
				})
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		var quality_legend_data = [];
		var quality_pie_data = [];
		var data = JSON.parse(cookie.get("emotion_count_data")).data;
		for (var index in data) {
			var item = data[index];
			quality_legend_data.push(item.emotion);
			quality_pie_data.push({
				"name": item.emotion,
				"value": item.count
			})
		}
		var source_legend_data = [];
		var source_pie_data = [];
		var data = JSON.parse(cookie.get("source_count_data")).data;
		for (var index in data) {
			var item = data[index];
			source_legend_data.push(item.source);
			source_pie_data.push({
				"name": item.source,
				"value": item.count
			})
		}
		var meiti_laiyuan_table = echarts.init(document.getElementById("meiti_laiyuan_chart"));
		var meiti_laiyuan_option = {
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			legend: [{
					orient: 'vertical',
					left: 120,
					data: quality_legend_data,
				},
				{
					orient: 'vertical',
					left: 10,
					data: source_legend_data
				}
			],
			toolbox: {
				show: true,
				feature: {
					saveAsImage: {}
				}
			},
			series: [{
					name: '性质',
					type: 'pie',
					selectedMode: 'single',
					radius: [0, '30%'],
		
					label: {
						position: 'inner',
					},
					labelLine: {
						show: false
					},
					data: quality_pie_data
				},
				{
					name: '媒体来源',
					type: 'pie',
					radius: ['40%', '55%'],
					data: source_pie_data
				}
			]
		};
		meiti_laiyuan_table.setOption(meiti_laiyuan_option);
		count++;
		if(count == 7){
			layer.close(id);
		}	
	}
	
}

function init_ciyun(table,layer,id) {
	if(cookie.get("keyword_ciyun_data") == null){
		$.ajax({
			type: "GET",
			url: "news_keyword",
			dataType: "json",
			success: function(data) {
				cookie.set("keyword_ciyun_data",JSON.stringify(data));
				count++;
				if(count == 7){
					layer.close(id);
				}
				var ciyun_list = data.data;
				var ciyun_data = [];
				var table_data = [];
				for (var index in ciyun_list) {
					var ciyun = ciyun_list[index];
					// console.log(ciyun);
					ciyun_data.push({
						name: ciyun.keyword,
						value: ciyun.count
					});
					table_data.push({
						num: Number(index) + Number(1),
						keyword: ciyun.keyword,
						count: ciyun.count,
					})
				}
				init_ciyun_chart(ciyun_data,layer,id);
				table.render({
					elem: '#ciyun_table',
					width: 300,
					height: 380,
					cols: [
						[{
							field: 'num',
							title: '排名',
							align: 'center'
						}, {
							field: 'keyword',
							title: '关键词',
							align: 'center'
						}, {
							field: 'count',
							title: '词频',
							align: 'center'
						}]
					],
					data: table_data,
					page: true
				});
			},
			error: function(xhr, error, status) {
		
			}
		});
	}else{
		var ciyun_list = JSON.parse(cookie.get("keyword_ciyun_data")).data;
		count++;
		if(count == 7){
			layer.close(id);
		}
		
		var ciyun_data = [];
		var table_data = [];
		for (var index in ciyun_list) {
			var ciyun = ciyun_list[index];
			// console.log(ciyun);
			ciyun_data.push({
				name: ciyun.keyword,
				value: ciyun.count
			});
			table_data.push({
				num: Number(index) + Number(1),
				keyword: ciyun.keyword,
				count: ciyun.count,
			})
		}
		init_ciyun_chart(ciyun_data,layer,id);
		table.render({
			elem: '#ciyun_table',
			width: 300,
			height: 380,
			cols: [
				[{
					field: 'num',
					title: '排名',
					align: 'center'
				}, {
					field: 'keyword',
					title: '关键词',
					align: 'center'
				}, {
					field: 'count',
					title: '词频',
					align: 'center'
				}]
			],
			data: table_data,
			page: true
		});
	}
	
}

// function init_ciyun(layer,id) {
// 	$.ajax({
// 		type: "GET",
// 		url: "http://114.55.218.124:5000/ciyun_list",
// 		dataType: "json",
// 		success: function(data) {
// 			count++;
// 			if(count == 8){
// 				layer.close(id);
// 			}
// 			var ciyun_list = data.data.ciyun_list;
// 			var data = [];
// 			for (var index in ciyun_list) {
// 				var ciyun = ciyun_list[index].ciyun;
// 				data.push({
// 					name: ciyun.keyword,
// 					value: ciyun.count
// 				})
// 			}
// 			init_ciyun_chart(data,layer,id);
// 		},
// 		error: function(xhr, error, status) {

// 		}
// 	})
// }

function init_ciyun_chart(data,layer,id) {
	var chart = echarts.init(document.getElementById("ciyun"));

	var maskImage = new Image();

	var option = {
		tooltip: {
			trigger: 'item',
			formatter: '热门高校 <br/>{b} : {c}'
		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {}
			}
		},
		series: [{
			type: 'wordCloud',
			sizeRange: [10, 100],
			rotationRange: [-90, 90],
			rotationStep: 45,
			gridSize: 2,
			shape: 'pentagon',
			maskImage: maskImage,
			drawOutOfBound: false,
			textStyle: {
				normal: {
					color: function() {
						return 'rgb(' + [
							Math.round(Math.random() * 160),
							Math.round(Math.random() * 160),
							Math.round(Math.random() * 160)
						].join(',') + ')';
					}
				},
				emphasis: {
					color: 'red'
				}
			},
			data: data.sort(function(a, b) {
				return b.value - a.value;
			})
		}]
	};
	maskImage.src = 'img/icon/logo.png';
	maskImage.onload = function() {
		option.series[0].maskImage
		chart.setOption(option);
	}
}

function init_zhuanti_ciyun(table,layer,id) {
	if(cookie.get("zhuanti_ciyun_data") == null){
		$.ajax({
			type: "GET",
			url: "http://114.55.218.124:5000/yujing_keyword",
			dataType: "json",
			success: function(data) {
				cookie.set("zhuanti_ciyun_data",JSON.stringify(data));
				count++;
				if(count == 7){
					layer.close(id);
				}
				var ciyun_list = data.data.yujing_keyword;
				var ciyun_data = [];
				var table_data = [];
				for (var index in ciyun_list) {
					var ciyun = ciyun_list[index];
					// console.log(ciyun);
					ciyun_data.push({
						name: ciyun.keyword,
						value: ciyun.count
					});
					table_data.push({
						num: Number(index) + Number(1),
						keyword: ciyun.keyword,
						count: ciyun.count,
					})
				}
				init_zhuanti_ciyun_chart(ciyun_data,layer,id);
				table.render({
					elem: '#zhuanti_ciyun_table',
					width: 300,
					height: 380,
					cols: [
						[{
							field: 'num',
							title: '排名',
							align: 'center'
						}, {
							field: 'keyword',
							title: '关键词',
							align: 'center'
						}, {
							field: 'count',
							title: '词频',
							align: 'center'
						}]
					],
					data: table_data,
					page: true
				});
			},
			error: function(xhr, error, status) {
		
			}
		});
	}else{
		var ciyun_list = JSON.parse(cookie.get("zhuanti_ciyun_data")).data.yujing_keyword;
		count++;
		if(count == 7){
			layer.close(id);
		}
		var ciyun_data = [];
		var table_data = [];
		for (var index in ciyun_list) {
			var ciyun = ciyun_list[index];
			// console.log(ciyun);
			ciyun_data.push({
				name: ciyun.keyword,
				value: ciyun.count
			});
			table_data.push({
				num: Number(index) + Number(1),
				keyword: ciyun.keyword,
				count: ciyun.count,
			})
		}
		init_zhuanti_ciyun_chart(ciyun_data,layer,id);
		table.render({
			elem: '#zhuanti_ciyun_table',
			width: 300,
			height: 380,
			cols: [
				[{
					field: 'num',
					title: '排名',
					align: 'center'
				}, {
					field: 'keyword',
					title: '关键词',
					align: 'center'
				}, {
					field: 'count',
					title: '词频',
					align: 'center'
				}]
			],
			data: table_data,
			page: true
		});
	}
	
}

// function init_zhuanti_ciyun(layer,id) {
// 	$.ajax({
// 		type: "GET",
// 		url: "http://114.55.218.124:5000/yujing_keyword",
// 		dataType: "json",
// 		success: function(data) {
// 			count++;
// 			if(count == 8){
// 				layer.close(id);
// 			}
// 			var ciyun_list = data.data.yujing_keyword;
// 			var data = [];
// 			for (var index in ciyun_list) {
// 				var ciyun = ciyun_list[index];
// 				data.push({
// 					name: ciyun.keyword,
// 					value: ciyun.count
// 				})
// 			}
// 			init_zhuanti_ciyun_chart(data,layer,id);
// 		},
// 		error: function(xhr, error, status) {

// 		}
// 	})
// }

function init_zhuanti_ciyun_chart(data,layer,id) {
	var chart = echarts.init(document.getElementById("zhuanti_ciyun"));

	var maskImage = new Image();

	var option = {
		tooltip: {
			trigger: 'item',
			formatter: '专题 <br/>{b} : {c}'
		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {}
			}
		},
		series: [{
			type: 'wordCloud',
			sizeRange: [10, 100],
			rotationRange: [-90, 90],
			rotationStep: 45,
			gridSize: 2,
			shape: 'pentagon',
			width: '60%',
			height: '60%',
			maskImage: maskImage,
			drawOutOfBound: false,
			textStyle: {
				normal: {
					color: function() {
						return 'rgb(' + [
							Math.round(Math.random() * 160),
							Math.round(Math.random() * 160),
							Math.round(Math.random() * 160)
						].join(',') + ')';
					}
				},
				emphasis: {
					color: 'red'
				}
			},
			data: data.sort(function(a, b) {
				return b.value - a.value;
			})
		}]
	};
	maskImage.src = 'img/icon/logo.png';
	maskImage.onload = function() {
		option.series[0].maskImage
		chart.setOption(option);
	}
}

function init_meiti_laiyuan_table(table,layer,id) {
	if(cookie.get("source_detail_data") == null){
		$.ajax({
			type: "GET",
			url: "news_emoAndsource",
			data:{
				date:''
			},
			dataType: "json",
			success: function(data) {
				cookie.set("source_detail_data",JSON.stringify(data));
				count++;
				if(count == 7){
					layer.close(id);
				}
				var meiti_laiyuan_table_data = [];
				var list = data.data;
				for (var index in list) {
					var item = list[index];
					meiti_laiyuan_table_data.push({
						"source": item.source,
						"all": item.all_count,
						"positive": item.positive,
						"neuter": item.neutral,
						"negative": item.negative
					})
			    }
				table.render({
					elem: '#meiti_laiyuan_table',
					width: 600,
					height: 300,
					cols: [
						[{
							field: 'source',
							title: '来源',
							align: 'center'
						}, {
							field: 'all',
							title: '全部',
							align: 'center'
						}, {
							field: 'positive',
							title: '正面',
							align: 'center'
						}, {
							field: 'neuter',
							title: '中性',
							align: 'center'
						}, {
							field: 'negative',
							title: '负面',
							align: 'center'
						}]
					],
					data: meiti_laiyuan_table_data
				});
			},
			error: function(xhr, error, status) {
		
			}
		})
	}else{
		var list = JSON.parse(cookie.get("source_detail_data")).data;
		count++;
		if(count == 7){
			layer.close(id);
		}
		var meiti_laiyuan_table_data = [];
		for (var index in list) {
			var item = list[index];
			meiti_laiyuan_table_data.push({
				"source": item.source,
				"all": item.all_count,
				"positive": item.positive,
				"neuter": item.neutral,
				"negative": item.negative
			})
		}
		table.render({
			elem: '#meiti_laiyuan_table',
			width: 600,
			height: 300,
			cols: [
				[{
					field: 'source',
					title: '来源',
					align: 'center'
				}, {
					field: 'all',
					title: '全部',
					align: 'center'
				}, {
					field: 'positive',
					title: '正面',
					align: 'center'
				}, {
					field: 'neuter',
					title: '中性',
					align: 'center'
				}, {
					field: 'negative',
					title: '负面',
					align: 'center'
				}]
			],
			data: meiti_laiyuan_table_data
		});
	}
	
}




function init_huoyue_meiti(layer,id) {
	if(cookie.get("source_count_data") == null){
		$.ajax({
			type: "GET",
			url: "news_source",
			dataType: "json",
			data:{
				'limit':10,
				'date':""
			},
			success: function(data) {
				cookie.set("source_count_data",JSON.stringify(data));
				count++;
				if(count == 7){
					layer.close(id);
				}
				var data_x = [];
				var data_y = [];
				var huoyue_meiti = data.data;
				for (var index in huoyue_meiti) {
					var meiti = huoyue_meiti[index];
					// console.log(meiti);
					data_x.push(meiti.source);
					data_y.push(meiti.count);
				}
				init_huoyue_meitichart(data_x, data_y);
			},
			error: function(xhr, error, status) {
		
			}
		});
	}else{
		var huoyue_meiti = JSON.parse(cookie.get("source_count_data")).data;
		count++;
		if(count == 7){
			layer.close(id);
		}
		var data_x = [];
		var data_y = [];
		for (var index in huoyue_meiti) {
			var meiti = huoyue_meiti[index];
			// console.log(meiti);
			data_x.push(meiti.source);
			data_y.push(meiti.count);
		}
		init_huoyue_meitichart(data_x, data_y);
	}
	
}

function init_huoyue_meitichart(data_x, data_y) {
	var huoyue_meiti_chart = echarts.init(document.getElementById("huoyue_meiti_chart"));
	option = {
		title: {
			text: '活跃媒体',
		},
		tooltip: {
			trigger: 'axis'
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {
					readOnly: false
				},
				magicType: {
					type: ['line', 'bar']
				},
				restore: {},
				saveAsImage: {}
			}
		},
		xAxis: {
			data: data_x,
			axisLabel: {
				// inside: true,
				textStyle: {
					color: '#999'
				},
				interval: 0,
				rotate:-45
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			z: 10
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				}
			}
		},
		dataZoom: [{
			type: 'inside'
		}],
		series: [{
			type: 'bar',
			data: data_y,
			showBackground: true,
			backgroundStyle: {
				color: 'rgba(220, 220, 220, 0.8)'
			}
		}]
	};

	huoyue_meiti_chart.setOption(option)
	// Enable data zoom when user click bar.
	var zoomSize = 6;
	huoyue_meiti_chart.on('click', function(params) {
		console.log(data_x[Math.max(params.dataIndex - zoomSize / 2, 0)]);
		huoyue_meiti_chart.dispatchAction({
			type: 'dataZoom',
			startValue: data_x[Math.max(params.dataIndex - zoomSize / 2, 0)],
			endValue: data_x[Math.min(params.dataIndex + zoomSize / 2, data_y.length - 1)]
		});
	});
}

function init_huoyue_bozhu(layer,id) {
	if(cookie.get("bozhu_count_data") == null){
		$.ajax({
			type: "GET",
			url: "news_bozhu",
			data:{
				limit:10
			},
			dataType: "json",
			success: function(data) {
				cookie.set("bozhu_count_data",JSON.stringify(data));
				count++;
				if(count == 7){
					layer.close(id);
				}
				var data_x = [];
				var data_y = [];
				var huoyue_bozhu = data.data;
				for (var index in huoyue_bozhu) {
					var bozhu = huoyue_bozhu[index];
					// console.log(bozhu);
					data_x.push(bozhu.author);
					data_y.push(bozhu.count);
				}
				init_huoyue_bozhuchart(data_x, data_y);
			},
			error: function(xhr, error, status) {
		
			}
		});
	}else{
		var huoyue_bozhu = JSON.parse(cookie.get("bozhu_count_data")).data;
		count++;
		if(count == 7){
			layer.close(id);
		}
		var data_x = [];
		var data_y = [];
		
		for (var index in huoyue_bozhu) {
			var bozhu = huoyue_bozhu[index];
			// console.log(bozhu);
			data_x.push(bozhu.author);
			data_y.push(bozhu.count);
		}
		init_huoyue_bozhuchart(data_x, data_y);
	}
	
}

function init_huoyue_bozhuchart(data_x, data_y) {
	var huoyue_bozhu_chart = echarts.init(document.getElementById("huoyue_bozhu_chart"));
	option = {
		title: {
			text: '活跃博主',
		},
		tooltip: {
			trigger: 'axis'
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {
					readOnly: false
				},
				magicType: {
					type: ['line', 'bar']
				},
				restore: {},
				saveAsImage: {}
			}
		},
		xAxis: {
			data: data_x,
			axisLabel: {
				// inside: true,
				textStyle: {
					color: '#999'
				},
				interval: 0,
				rotate:-45
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			z: 10
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				}
			}
		},
		dataZoom: [{
			type: 'inside'
		}],
		series: [{
			type: 'bar',
			data: data_y,
			showBackground: true,
			backgroundStyle: {
				color: 'rgba(220, 220, 220, 0.8)'
			}
		}]
	};

	huoyue_bozhu_chart.setOption(option)
	// Enable data zoom when user click bar.
	var zoomSize = 6;
	huoyue_bozhu_chart.on('click', function(params) {
		console.log(data_x[Math.max(params.dataIndex - zoomSize / 2, 0)]);
		huoyue_bozhu_chart.dispatchAction({
			type: 'dataZoom',
			startValue: data_x[Math.max(params.dataIndex - zoomSize / 2, 0)],
			endValue: data_x[Math.min(params.dataIndex + zoomSize / 2, data_y.length - 1)]
		});
	});
}
