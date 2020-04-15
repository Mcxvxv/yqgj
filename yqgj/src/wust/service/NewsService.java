package wust.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import wust.bean.News;

/**
* @author 夏旭
* @version 创建时间：2020年3月28日 下午9:25:32
* 类说明
*/
public interface NewsService {
	public List<Map<Object, Object>> query_count_groupby_emotion(String date);
	public List<Map<Object, Object>> query_count_groupby_source(int limit,String date);
	public List<Map<Object, Object>> query_count_groupby_keyword();
	public List<Map<Object, Object>> query_count_groupby_bozhu(int limit);
	public List<Map<Object, Object>> query_count_groupby_school();
	public List<News> query_all_news(Map<String, Object> map);
	public List<News> query_other_news(Map<String, Object> map);
	public News query_news_byid(int id);
	public Map<String, Object> query_all_news_count(Map<String, Object> map);
	public Map<String, Object> query_others_news_count(Map<String, Object> map);
	public List<News> query_yujing_news(int cursor);
	public List<News> query_gaoxiao_news(int cursor);
	public List<News> query_guanzhu_news(Map<String, Object> map);
	public List<News> query_other_guanzhu_news(Map<String, Object> map);
	public Map<String, Object> query_guanzhu_news_count(Map<String, Object> map);
	public Map<String, Object> query_other_guanzhu_news_count(Map<String, Object> map);
	public List<News> query_zhuanti_news(Map<String, Object> map);
	public List<News> query_other_zhuanti_news(Map<String, Object> map);
	public Map<String, Object> query_zhuanti_news_count(Map<String, Object> map);
	public Map<String, Object> query_other_zhuanti_news_count(Map<String, Object> map);
	public List<Map<Object, Object>> query_count_groupby_sourceAnddate();
	public List<Map<Object, Object>> query_emotionCount_by_source(String date);
	
}
