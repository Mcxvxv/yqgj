package wust.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
* @author 夏旭
* @version 创建时间：2020年3月31日 下午9:01:35
* 类说明
*/

@Controller
public class HomeController {
	
	@RequestMapping({"/home","","/"})
	public String home() {
		return "home_2.0";
	}
	
	@RequestMapping("/index")
	public String index() {
		return "index";
	}
	
	@RequestMapping("/all")
	public String all() {
		return "yuqing_list";
	}

	@RequestMapping("/zhuanti")
	public String zhuanti() {
		return "yujing_list";
	}
	
	@RequestMapping("/school")
	public String school() {
		return "gaoxiao_list";
	}
	
	@RequestMapping("/concern")
	public String concern() {
		return "wodeguanzhu";
	}
	
	@RequestMapping("/analyze")
	public String analyse() {
		return "analyze";
	}
	
	@RequestMapping("/news_detail")
	public String news_detail() {
		return "news_detail";
	}
	
	@RequestMapping("/forget_psd")
	public String forget_psd() {
		return "update";
	}
	
	
}
