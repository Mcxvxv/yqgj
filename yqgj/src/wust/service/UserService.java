package wust.service;

import wust.bean.User;

/**
* @author 夏旭
* @version 创建时间：2020年3月28日 下午9:25:10
* 类说明
*/
public interface UserService {
	public void insert_user(User user);
	public User query_user_by_user_name(String user_name);
	public void update_user(User user);
}
