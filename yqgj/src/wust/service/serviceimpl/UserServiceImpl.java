package wust.service.serviceimpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wust.bean.User;
import wust.dao.UserDao;
import wust.service.UserService;

/**
* @author 夏旭
* @version 创建时间：2020年3月29日 下午2:00:41
* 类说明
*/
@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserDao dao;

	@Override
	public void insert_user(User user) {
		// TODO Auto-generated method stub
		dao.insert_user(user);
	}

	@Override
	public User query_user_by_user_name(String user_name) {
		// TODO Auto-generated method stub
		User user = dao.query_user_by_user_name(user_name);
		return user;
	}

	@Override
	public void update_user(User user) {
		// TODO Auto-generated method stub
		dao.update_user(user);
	}

}
