package wust.service.serviceimpl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.support.DaoSupport;
import org.springframework.stereotype.Service;

import wust.bean.News;
import wust.dao.NewsDao;
import wust.service.NewsService;

/**
* @author 夏旭
* @version 创建时间：2020年3月31日 下午10:17:36
* 类说明
*/
@Service
public class NewsServiceImpl implements NewsService {
	@Autowired
	NewsDao dao;

	@Override
	public List<Map<Object, Object>> query_count_groupby_emotion(String date) {
		// TODO Auto-generated method stub
		return dao.query_count_groupby_emotion(date);
	}

	@Override
	public List<Map<Object, Object>> query_count_groupby_source(int limit,String date) {
		// TODO Auto-generated method stub
		return dao.query_count_groupby_source(limit,date);
	}

	@Override
	public List<News> query_yujing_news(int cursor) {
		// TODO Auto-generated method stub
		return dao.query_yujing_news(cursor);
	}

	@Override
	public List<News> query_gaoxiao_news(int cursor) {
		// TODO Auto-generated method stub
		return dao.query_gaoxiao_news(cursor);
	}



	@Override
	public List<Map<Object, Object>> query_count_groupby_sourceAnddate() {
		// TODO Auto-generated method stub
		List<Map<Object, Object>> result_list = new ArrayList<>();
		List<Map<Object, Object>> list = dao.query_date();
		for (Map<Object, Object> map : list) {
			Map<Object, Object> result_map = new HashMap<>();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String rel_date = sdf.format(map.get("rel_date"));
			result_map.put("rel_date", rel_date);
			List<Map<Object, Object>> emo_list = dao.query_emotionCountby_date(rel_date);
			for (Map<Object, Object> emotion : emo_list) {
				switch ((String) emotion.get("emotion")) {
					case "正面":
						result_map.put("positive", emotion.get("count"));
						break;
					case "负面":
						result_map.put("negative", emotion.get("count"));
						break;
					case "中性":
						result_map.put("neutral", emotion.get("count"));
						break;
				}
				
			}
			result_list.add(result_map);
		}
		return result_list;
	}

	@Override
	public List<Map<Object, Object>> query_emotionCount_by_source(String date) {
		// TODO Auto-generated method stub
		List<Map<Object, Object>> result_list = new ArrayList<>();
		List<Map<Object, Object>> list = dao.query_count_groupby_source(10,date);
		for (Map<Object, Object> map : list) {
			Map<Object, Object> result_map = new HashMap<>();
			result_map.put("source", map.get("source"));
			result_map.put("all_count", map.get("count"));
			List<Map<Object, Object>> emo_list = dao.query_source_detail((String)map.get("source"),date);
			String url = dao.query_source_picurl((String)map.get("source"));
			result_map.put("pic_url", url);
			for (Map<Object, Object> emotion : emo_list) {
				switch ((String) emotion.get("emotion")) {
					case "正面":
						result_map.put("positive", emotion.get("count"));
						break;
					case "负面":
						result_map.put("negative", emotion.get("count"));
						break;
					case "中性":
						result_map.put("neutral", emotion.get("count"));
						break;
				}
				
			}
			result_list.add(result_map);
		}
		return result_list;
	}

	@Override
	public List<Map<Object, Object>> query_count_groupby_keyword() {
		// TODO Auto-generated method stub
		return dao.query_count_groupby_keyword();
	}

	@Override
	public List<Map<Object, Object>> query_count_groupby_bozhu(int limit) {
		// TODO Auto-generated method stub
		return dao.query_count_groupby_bozhu(limit);
	}

	@Override
	public List<News> query_all_news(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_all_news(map);
	}

	@Override
	public List<News> query_guanzhu_news(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_guanzhu_news(map);
	}

	@Override
	public List<Map<Object, Object>> query_count_groupby_school() {
		// TODO Auto-generated method stub
		return dao.query_count_groupby_school();
	}

	@Override
	public Map<String, Object> query_all_news_count(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_all_news_count(map);
	}

	@Override
	public Map<String, Object> query_guanzhu_news_count(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_guanzhu_news_count(map);
	}

	@Override
	public List<News> query_zhuanti_news(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_zhuanti_news(map);
	}

	@Override
	public Map<String, Object> query_zhuanti_news_count(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_zhuanti_news_count(map);
	}

	@Override
	public News query_news_byid(int id) {
		// TODO Auto-generated method stub
		return dao.query_news_byid(id);
	}

	@Override
	public List<News> query_other_news(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_other_news(map);
	}

	@Override
	public Map<String, Object> query_others_news_count(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_others_news_count(map);
	}

	@Override
	public List<News> query_other_guanzhu_news(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_other_guanzhu_news(map);
	}

	@Override
	public Map<String, Object> query_other_guanzhu_news_count(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_guanzhu_news_count(map);
	}

	@Override
	public List<News> query_other_zhuanti_news(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_other_zhuanti_news(map);
	}

	@Override
	public Map<String, Object> query_other_zhuanti_news_count(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.query_other_zhuanti_news_count(map);
	}

}
