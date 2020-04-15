package wust.bean;
/**
* @author 夏旭
* @version 创建时间：2020年3月28日 下午9:24:07
* 类说明
*/
public class User {
	private int user_id;
	private String user_name;
	private String user_psd;
	private String user_tele;
	private String user_avatar;
	
	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_psd() {
		return user_psd;
	}

	public void setUser_psd(String user_psd) {
		this.user_psd = user_psd;
	}

	public String getUser_tele() {
		return user_tele;
	}

	public void setUser_tele(String user_tele) {
		this.user_tele = user_tele;
	}

	public String getUser_avatar() {
		return user_avatar;
	}

	public void setUser_avatar(String user_avatar) {
		this.user_avatar = user_avatar;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "{\"user_name\":\"" + user_name + "\",\"user_psd\":\"" + user_psd + "\",\"user_tele\":\"" + user_tele + "\",\"user_avatar\":\"" + user_avatar+"\"}";
	}
	
}
