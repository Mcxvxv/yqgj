package wust.dao;
/**
* @author 夏旭
* @version 创建时间：2020年4月6日 下午3:43:29
* 类说明
*/

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface GuanzhuDao {
	public int insert_guanzhu(Map<String, Object> map);
	public int delete_guanzhu(Map<String, Object> map);
	public List<Map<String, Object>> query_guanzhu_byid(Map<String, Object> map);
	public Map<String, Object> query_guanzhu_by_UK(Map<String, Object> map);

}
