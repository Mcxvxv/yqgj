package wust.service.serviceimpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import wust.dao.GuanzhuDao;
import wust.service.GuanzhuService;

/**
* @author 夏旭
* @version 创建时间：2020年4月6日 下午4:23:58
* 类说明
*/
@Service
public class GuanzhuServiceImpl implements GuanzhuService {
	@Autowired
	GuanzhuDao dao;

	@Override
	public Map<String, Object> query_guanzhu_by_UK(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_guanzhu_by_UK(map);
	}

	@Override
	public int insert_guanzhu(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int status = 0;
		try {
			dao.insert_guanzhu(map);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
			status = 1;
		}
		return status;
		
	}

	@Override
	public int delete_guanzhu(Map<String, Object> map) {
		// TODO Auto-generated method stub
		int status = 0;
		try {
			dao.delete_guanzhu(map);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e);
			status = 1;
		}
		return status;
	}

	@Override
	public List<Map<String, Object>> query_guanzhu_byid(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_guanzhu_byid(map);
	}

}
