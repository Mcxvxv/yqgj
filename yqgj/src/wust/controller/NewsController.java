package wust.controller;
/**
* @author 夏旭
* @version 创建时间：2020年3月28日 下午9:24:30
* 类说明
*/

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sun.java_cup.internal.runtime.virtual_parse_stack;
import com.sun.org.apache.bcel.internal.generic.NEW;

import wust.bean.News;
import wust.service.NewsService;

@Controller
public class NewsController {
	
	@Autowired
	NewsService service;
	
	@ResponseBody
	@RequestMapping("/news_emotion")
	public Map<String, Object> query_count_groupby_emotion(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		String date = request.getParameter("date");
		List<Map<Object, Object>> list = service.query_count_groupby_emotion(date);
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		return map;
	}

	@ResponseBody
	@RequestMapping("/news_source")
	public Map<String, Object> query_count_groupby_source(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		int int_limit = Integer.parseInt((request.getParameter("limit")));
		String date = request.getParameter("date");
		List<Map<Object, Object>> list = service.query_count_groupby_source(int_limit,date);
		List<Map<Object, Object>> emo_list = service.query_count_groupby_emotion(date);
		Map<String, Object> emo_map = new HashMap<>();
		for (Map<Object, Object> emotion : emo_list) {
			switch ((String) emotion.get("emotion")) {
				case "正面":
					emo_map.put("positive", emotion.get("count"));
					break;
				case "负面":
					emo_map.put("negative", emotion.get("count"));
					break;
				case "中性":
					emo_map.put("neutral", emotion.get("count"));
					break;
			}
			
		}
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		map.put("emo_data", emo_map);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/all_news")
	public Map<String, Object> query_all_news(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		Map<String, Object> map = new HashMap<>();
		int int_cursor = Integer.parseInt((request.getParameter("cursor")));
		String time = request.getParameter("time");
		System.out.println(time);
		String emotion = request.getParameter("emotion");
		System.out.println(emotion);
		String media = request.getParameter("media");
		System.out.println(media);
		String source = request.getParameter("source");
		System.out.println(source);
		String scope = request.getParameter("scope");
		System.out.println(scope);
		String search_scope = request.getParameter("search_scope");
		System.out.println(search_scope);
		String search_content = request.getParameter("search_content");
		System.out.println(search_content);
		map.put("cursor", int_cursor);
		map.put("time", time);
		map.put("emotion", emotion);
		map.put("media", media);
		map.put("source", source);
		map.put("scope", scope);
		map.put("search_scope", search_scope);
		map.put("search_content", search_content);
		List<News> list = null;
		Map<String, Object> count_map = null;
		if(media.equals("其他")) {
			list = service.query_other_news(map);
			count_map = service.query_others_news_count(map);
		}else {
			list = service.query_all_news(map);
		    count_map = service.query_all_news_count(map);
		}
		Map<String, Object> result_map = new HashMap<>();
		result_map.put("data", list);
		result_map.put("count", count_map);
		return result_map;
	}
	
	@ResponseBody
	@RequestMapping("/yujing_news")
	public Map<String, Object> query_yujing_news(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		int int_cursor = Integer.parseInt((request.getParameter("cursor")));
		List<News> list = service.query_yujing_news(int_cursor);
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/gaoxiao_news")
	public Map<String, Object> query_gaoxiao_news(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		int int_cursor = Integer.parseInt((request.getParameter("cursor")));
		List<News> list = service.query_gaoxiao_news(int_cursor);
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/news_emoAnddate")
	public Map<String, Object> query_count_groupby_sourceAnddate(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		List<Map<Object, Object>> list = service.query_count_groupby_sourceAnddate();
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/news_emoAndsource")
	public Map<String, Object> query_emotion_groupby_source(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		String date = request.getParameter("date");
		List<Map<Object, Object>> list = service.query_emotionCount_by_source(date);
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/news_keyword")
	public Map<String, Object> query_count_groupby_keyword(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		List<Map<Object, Object>> list = service.query_count_groupby_keyword();
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/news_school")
	public Map<String, Object> query_count_groupby_school(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		List<Map<Object, Object>> list = service.query_count_groupby_school();
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		return map;
	}
	

	@ResponseBody
	@RequestMapping("/news_bozhu")
	public Map<String, Object> query_count_groupby_bozhu(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		int int_limit = Integer.parseInt((request.getParameter("limit")));
		List<Map<Object, Object>> list = service.query_count_groupby_bozhu(int_limit);
		Map<String, Object> map = new HashMap<>();
		map.put("data", list);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/news_id")
	public Map<String, Object> query_news_by_id(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		int id = Integer.parseInt((request.getParameter("id")));
		News news = service.query_news_byid(id);
		Map<String, Object> map = new HashMap<>();
		map.put("data", news);
		return map;
	}


	@ResponseBody
	@RequestMapping("/news_guanzhu")
	public Map<String, Object> query_guanzhu_news(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		Map<String, Object> map = new HashMap<>();
		String school = request.getParameter("school");
		System.out.println(school);
		int int_cursor = Integer.parseInt((request.getParameter("cursor")));
		String time = request.getParameter("time");
		System.out.println(time);
		String emotion = request.getParameter("emotion");
		System.out.println(emotion);
		String media = request.getParameter("media");
		System.out.println(media);
		String sort = request.getParameter("sort");
		System.out.println(sort);
		String zhuanti = request.getParameter("zhuanti");
		System.out.println(zhuanti);
		String search_scope = request.getParameter("search_scope");
		System.out.println(search_scope);
		String search_content = request.getParameter("search_content");
		System.out.println(search_content);
		map.put("cursor", int_cursor);
		map.put("time", time);
		map.put("emotion", emotion);
		map.put("media", media);
		map.put("school", school);
		map.put("sort", sort);
		map.put("zhuanti", zhuanti);
		map.put("search_scope", search_scope);
		map.put("search_content", search_content);
		List<News> list = null;
		Map<String, Object> count_map = null;
		if(media.equals("其他")) {
			list = service.query_other_guanzhu_news(map);
			count_map = service.query_other_guanzhu_news_count(map);
		}else {
			list = service.query_guanzhu_news(map);
			count_map = service.query_guanzhu_news_count(map);
		}
		Map<String, Object> result_map = new HashMap<>();
		result_map.put("data", list);
		result_map.put("count", count_map);
		return result_map;
	}
	
	@ResponseBody
	@RequestMapping("/news_zhuanti")
	public Map<String, Object> query_zhuanti_news(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		Map<String, Object> map = new HashMap<>();
		String zhuanti = request.getParameter("zhuanti");
		System.out.println(zhuanti);
		int int_cursor = Integer.parseInt((request.getParameter("cursor")));
		String time = request.getParameter("time");
		System.out.println(time);
		String emotion = request.getParameter("emotion");
		System.out.println(emotion);
		String media = request.getParameter("media");
		System.out.println(media);
		String sort = request.getParameter("sort");
		System.out.println(sort);
		map.put("cursor", int_cursor);
		map.put("time", time);
		map.put("emotion", emotion);
		map.put("media", media);
		map.put("zhuanti", zhuanti);
		map.put("sort", sort);
		List<News> list = null;
		Map<String, Object> count_map = null;
		if(media.equals("其他")) {
			list = service.query_other_zhuanti_news(map);
			count_map = service.query_other_zhuanti_news_count(map);
		}else {
			list = service.query_zhuanti_news(map);
			count_map = service.query_zhuanti_news_count(map);
		}
		Map<String, Object> result_map = new HashMap<>();
		result_map.put("data", list);
		result_map.put("count", count_map);
		return result_map;
	}
}
