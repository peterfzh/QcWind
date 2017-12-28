# QcWind  作者:GloryFu
PC版本网页前端开发小助手

________________________________________________________

# 使用说明
#### 1.下载QcWind到您的Web项目中，然后再使用的页面内加上如下的引用

~~~java
  <script type="text/javascript" src="/您的引入的路径/QcWind.js"></script>
~~~

#### 2.使用说明
~~~java
//当页面加载完成的时候需要运行的操作  
QcWind.ready(function(){  
    //您需要做的操作
    alert("页面加载完成，您想做点什么吗？");
});  
~~~

~~~java
//拓展QcWind的方法

QcWind.extend(你的拓展对象类,你的配置);

* 1.拓展的对象类可以是一个，也可以是多个，默认只能拓展对象类的方法，具体的实例如下
var myExtend = {
	//求两个数的合
	sum:function(a,b){
		alert(a+b);
	},
	//求连个数的差
	diff:function(a,b){
		alert(a-b);
	}
};
* 2.将对象拓展到QcWind中
QcWind.extend(myExtend,{});

* 3.调用的方法如下

	* 求 3+4 => QcWind.sum(3,4) 获取结果
	* 求 12-6 => QcWind.diff(12,6) 获取结果

~~~

________________________________________________________

# 版本说明
* #### 版本1.0.0.1  
  1. 自动引入jquery2.1.4  
  2. 使用Layer当作前端ui输出  


________________________________________________________

# 类库 百度静态资源公共库
百度静态资源公共库 地址:http://cdn.code.baidu.com/
