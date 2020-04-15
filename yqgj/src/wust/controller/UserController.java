package wust.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.descriptor.web.LoginConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import wust.bean.ResultObj;
import wust.bean.User;
import wust.service.UserService;

/**
* @author 夏旭
* @version 创建时间：2020年3月28日 下午9:24:19
* 类说明
* status:1000 success
* status:1001 faild
*/
@Controller
public class UserController {
	
	@Autowired
	UserService service;
	
	@ResponseBody
	@RequestMapping("/login")
	public Map<String, Object> login(HttpServletRequest request,HttpServletResponse response){
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		String user_name = request.getParameter("user_name");
		String user_psd = request.getParameter("user_psd");
		System.out.println(user_name);
		User user = service.query_user_by_user_name(user_name);
		ResultObj result = new ResultObj();
		if(user != null) {
			if(user.getUser_psd().equals(user_psd)) {
				result.setRetcode("1002");
				result.setData(user);
			}else {
				result.setRetcode("1003");
				result.setData("login failed");
			}
		}else {
			result.setRetcode("1003");
			result.setData("login failed");
		}
		Map<String, Object> map = new HashMap<>();
		map.put("data", result);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/register")
	public Map<String, Object> register(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		String user_name = request.getParameter("user_name");
		String user_psd = request.getParameter("user_psd");
		User user = new User();
		user.setUser_name(user_name);
		user.setUser_psd(user_psd);
		System.out.println(user);
		User query_user = service.query_user_by_user_name(user_name);
		ResultObj result = new ResultObj();
		if(query_user==null) {
			service.insert_user(user);
			result.setRetcode("1000");
			result.setData("register success");
		}else {
			result.setRetcode("1001");
			result.setData("register failed");
		}
		Map<String, Object> map = new HashMap<>();
		map.put("data", result);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/update")
	public Map<String, Object> update(HttpServletRequest request,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Method", "POST,GET");
		String user_name = request.getParameter("user_name");
		String user_psd = request.getParameter("user_psd");
		User user = new User();
		user.setUser_name(user_name);
		user.setUser_psd(user_psd);
		System.out.println(user);
		User query_user = service.query_user_by_user_name(user_name);
		ResultObj result = new ResultObj();
		if(query_user==null) {
			result.setRetcode("1001");
			result.setData("update failed");
		}else {
			user.setUser_id(query_user.getUser_id());
			service.update_user(user);
			result.setRetcode("1000");
			result.setData(user);
		}
		Map<String, Object> map = new HashMap<>();
		map.put("data", result);
		return map;
	}
	
	@ResponseBody
	@RequestMapping("/upload_file")
	public Map<String,String> uploadfile(@RequestParam("file") MultipartFile file,HttpServletRequest request,HttpServletResponse response) 
		    throws IllegalStateException, IOException{
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setHeader("Access-Control-Allow-Method", "POST,GET");
		    if(null!=file){
		        String fileOrigName=file.getOriginalFilename();// 文件原名称
		        if (!fileOrigName.contains(".")) {
		            throw new IllegalArgumentException("缺少后缀名");
		        }
		        //获取后缀名
		        SimpleDateFormat df = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");//设置日期格式
		        String date = df.format(new Date());
		        fileOrigName = fileOrigName.substring(fileOrigName.lastIndexOf("."));
		        String newfileName = date +fileOrigName;
		        System.out.println(newfileName);
		        //得到上传文件的保存目录 D:\apache-tomcat-8.0.53\webapps\yqgj\
		        String uploadPath=request.getServletContext().getRealPath("")+"\\img\\upload\\" + newfileName;
		        System.out.println(uploadPath);
		        //获取项目名
//		        String projectName=request.getServletContext().getContextPath().substring(1);
//		        System.out.println(projectName);
//		        //将上传文件的保存目录换成 D:\apache-tomcat-8.0.53\webapps/uploadfile\
//		        String newdestPath= uploadPath.replaceAll(projectName, "uploadfile")+newfileName;
		        //判断上传文件的目录是否存在
		        File newfile=new File(uploadPath);
		        if(!newfile.exists() && !newfile.isDirectory()){
		            System.out.println(newfile+" 目录不存在，需要创建");
		            //创建目录
		            newfile.mkdirs();
		        }
		        file.transferTo(newfile);
		    }
		    Map<String,String> map=new HashMap<String,String>();
		    map.put("code", "0");
		    map.put("msg","上传成功");
		    return map;	
		}
}
