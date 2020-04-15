package wust.util;

import java.io.File;
import java.util.Locale;

import org.springframework.web.servlet.view.InternalResourceView;

/**
* @author 夏旭
* @version 创建时间：2020年3月28日 下午9:42:02
* 类说明
*/
public class HtmlResourceView extends InternalResourceView {
    @Override  
    public boolean checkResource(Locale locale) {  
     File file = new File(this.getServletContext().getRealPath("/") + getUrl());  
     return file.exists();// 判断该页面是否存在  
    }
}
