package wust.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import wust.bean.News;

/**
* @author 夏旭
* @version 创建时间：2020年3月28日 下午9:24:57
* 类说明
*/
@Repository
public interface NewsDao {
	public List<Map<Object, Object>> query_count_groupby_emotion(@Param("date")String date);
	public List<Map<Object, Object>> query_count_groupby_source(@Param("limit")int limit,@Param("date")String date);
	public List<Map<Object, Object>> query_count_groupby_keyword();
	public List<Map<Object, Object>> query_count_groupby_school();
	public List<Map<Object, Object>> query_count_groupby_bozhu(int limit);
	public News query_news_byid(int id);
	public List<News> query_all_news(Map<String, Object> map);
	public List<News> query_other_news(Map<String, Object> map);
	public Map<String, Object> query_all_news_count(Map<String, Object> map);
	public Map<String, Object> query_others_news_count(Map<String, Object> map);
	public List<News> query_yujing_news(int cursor);
	public List<News> query_gaoxiao_news(int cursor);
	public List<News> query_guanzhu_news(Map<String, Object> map);
	public List<News> query_other_guanzhu_news(Map<String, Object> map);
	public List<News> query_zhuanti_news(Map<String, Object> map);
	public List<News> query_other_zhuanti_news(Map<String, Object> map);
	public Map<String, Object> query_guanzhu_news_count(Map<String, Object> map);
	public Map<String, Object> query_other_guanzhu_news_count(Map<String, Object> map);
	public Map<String, Object> query_zhuanti_news_count(Map<String, Object> map);
	public Map<String, Object> query_other_zhuanti_news_count(Map<String, Object> map);
	public List<Map<Object, Object>> query_date();
	public List<Map<Object, Object>> query_emotionCountby_date(String date);
	public List<Map<Object, Object>> query_source_detail(@Param("source")String source,@Param("date")String date);
	public String query_source_picurl(String source);
}
