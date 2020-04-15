package wust.service;

import java.util.List;
import java.util.Map;

/**
* @author 夏旭
* @version 创建时间：2020年4月6日 下午4:17:49
* 类说明
*/
public interface GuanzhuService {
	public int insert_guanzhu(Map<String, Object> map);
	public int delete_guanzhu(Map<String, Object> map);
	public List<Map<String, Object>> query_guanzhu_byid(Map<String, Object> map);
	public Map<String, Object> query_guanzhu_by_UK(Map<String, Object> map);
}
