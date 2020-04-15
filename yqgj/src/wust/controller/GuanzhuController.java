package wust.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import wust.bean.ResultObj;
import wust.service.GuanzhuService;

/**
* @author 夏旭
* @version 创建时间：2020年4月6日 下午4:25:46
* 类说明
* status:2000 success
* status:2001 faild
*/
@Controller
public class GuanzhuController {
	@Autowired
	GuanzhuService service;
	
	@ResponseBody
	@RequestMapping("/check_guanzhu")
	public Map<String, Object> check_guanzhu(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		ResultObj obj = new ResultObj();
		Map<String, Object> map = new HashMap<>();
		int user_id = Integer.parseInt((request.getParameter("user_id")));
		String keyword = request.getParameter("keyword");
		String table = request.getParameter("table");
		System.out.println(table);
		map.put("user_id", user_id);
		map.put("keyword", keyword);
		map.put("table", table);
		Map<String, Object> result = service.query_guanzhu_by_UK(map);
		Map<String, Object> result_map = new HashMap<>();
		if(result==null) {
			obj.setRetcode("2001");
			obj.setData("check failed");
		}else {
			obj.setRetcode("2000");
			obj.setData(result);
		};
		result_map.put("data", obj);
		return result_map;
	}
	
	@ResponseBody
	@RequestMapping("/add_guanzhu")
	public Map<String, Object> insert_guanzhu(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		ResultObj obj = new ResultObj();
		Map<String, Object> map = new HashMap<>();
		int user_id = Integer.parseInt((request.getParameter("user_id")));
		String keyword = request.getParameter("keyword");
		String table = request.getParameter("table");
		map.put("user_id", user_id);
		map.put("keyword", keyword);
		map.put("table", table);
		System.out.println(table);
		int result_status = service.insert_guanzhu(map);
		if(result_status == 0) {
			obj.setRetcode("2000");
			obj.setData("focus success");
		}else {
			obj.setRetcode("2001");
			obj.setData("focus failed");
		}
		Map<String, Object> result_map = new HashMap<>();
		result_map.put("data", obj);
		return result_map;
	}
	
	@ResponseBody
	@RequestMapping("/cancel_guanzhu")
	public Map<String, Object> delete_guanzhu(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		ResultObj obj = new ResultObj();
		Map<String, Object> map = new HashMap<>();
		int user_id = Integer.parseInt((request.getParameter("user_id")));
		String keyword = request.getParameter("keyword");
		String table = request.getParameter("table");
		map.put("user_id", user_id);
		map.put("keyword", keyword);
		map.put("table", table);
		System.out.println(table);
		int result_status = service.delete_guanzhu(map);
		if(result_status == 0) {
			obj.setRetcode("2000");
			obj.setData("focus success");
		}else {
			obj.setRetcode("2001");
			obj.setData("focus failed");
		}
		Map<String, Object> result_map = new HashMap<>();
		result_map.put("data", obj);
		return result_map;
	}
	
	@ResponseBody
	@RequestMapping("/guanzhu_list")
	public Map<String, Object> query_guanzhu_byid(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		ResultObj obj = new ResultObj();
		Map<String, Object> map = new HashMap<>();
		int user_id = Integer.parseInt((request.getParameter("user_id")));
		String table = request.getParameter("table");
		map.put("user_id", user_id);
		map.put("table", table);
		System.out.println(table);
		List<Map<String, Object>> list = service.query_guanzhu_byid(map);
		Map<String, Object> result_map = new HashMap<>();
		result_map.put("data", list);
		return result_map;
	}


}
