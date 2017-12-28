/**
 * @name [快速构建前台的应用程序]
 * @author [Peterfzh]
 * @mail:peterfzh@126.com
 * @beta Version 1.0.0.1
 */
(function(a,b){
  "use strict";
   a.QcWind = a.QcWind || {};
   var c,d,
      e = a.document,
      f = a.location,
      g = {
           type:['Function','Array','Object','String'],
       },
   /**
   * 类库
   */
    h = {
          jquery:{
              src:"http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js",
              re:/(\?|&)jquery=/gi,
          },
          layer:{
              src:"http://apps.bdimg.com/libs/layer/2.1/layer.js",
              re:/(\?|&)layer=/gi,
              css:["http://apps.bdimg.com/libs/layer/2.1/skin/layer.css"],
          },
          alert:{
              src:"http://apps.bdimg.com/libs/layer/2.1/layer.js",
              re:/(\?|&)alert=/gi,
              css:["http://apps.bdimg.com/libs/layer/2.1/skin/layer.css"],
          }
    },
    /**
     * 需要安装的js
     */
    j = [],
    /**
     * 需要安装的CSS
     */
    k = [],
    /**
     * 加载完js需要执行的事件集合
     */
    l = [],
    /**
     * 需要转移的dom事件
     */
    m = [],
    /**
     * 追加到数组
     */
    p = Array.prototype.push,
    /**
     * 删除数组
     */
    q = Array.prototype.slice,
    /**
     * 判断数组中的出现位置
     */
    r = Array.prototype.indexOf,
    /**
     * 判断数组中是否存在不存在则添加
     */
    s = Array.prototype.insert = function(a){ for(var i=0;i<this.length;i++){if(this[i]==a) return true;} p.call(this,a); return false;},
    /**
     * 循环执行数组中的事件结合
     * @param  {[type]} a){ for(var       i [description]
     * @return {[type]}      [description]
     */
    t = Array.prototype.excuteevent = function(a){ for(var i = 0; i < this.length ; i++){if(a) this[i]();}},
    /**
     * 判断数组中是否包含这个元素
     */
    u = Array.prototype.has = function(a){ for(var i=0 ; i<this.length ; i++){ if(this[i]==a) return true; } return false; },
    /**
     * 获取当前的scirpt的配置信息
     */
    v = function() {
            var a = document.scripts,
              b = a[a.length - 1],
              c = b.src;
              return c.substring(c.lastIndexOf("/") + 1);
    },
    // ie = !!(window.attachEvent && !window.opera),
    // wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525),

    /**
     * 应用本身
     */
   _self = this;

   window.jQuery || j.push(h.jquery.src);

   QcWind = QcWind.fn = QcWind.prototype = {
        fn:[],
        config:{},
        is:function(a,b){ /*类型判断*/
            return b !== undefined && b !== null && Object.prototype.toString.call(b).slice(8,-1) === a;
        },
        isFunction:function(a){
            return this.is.call(this.isFunction,g.type[0],a);
        },
        isArray:function(a){
            return this.is.call(this.isArray,g.type[1],a);
        },
        isJson:function(a){
            return this.is.call(this.isJson,g.type[2],a);
        },
        extend:function(a,b){/*拓展类型数据*/
          if(!this.isJson(a) || arguments.length<2) return;
            var args = Array.prototype.slice.apply(arguments);args.splice(0,1);
            for(var o in a){
                if(!this.isFunction(a[o])) continue;
                this[o] = function(){
                    a[o].apply(null,args);
                };
            }
          if(!this.isJson(b) || b==undefined) return;
          for(var o in b){
            this.config[o] =b[o];
          }
        },
        get:function(){/*加载远程的script脚本*/
            var a = arguments,l = a.length,d=a[0],b=a[1],c=a[2];
            if(!this.isArray(d)) var d = [d];
            if(d.length==0)return;
             var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
             var loaded;
             var s = new Array(), last = d.length - 1, recursiveLoad = function(i) {  //递归
                 s[i] = document.createElement((c==undefined) ? "script" : c);
                 s[i].setAttribute((c==undefined) ? "type" : ((c=='link') ? "rel" : "type"),(c==undefined) ? "text/javascript" : ((c=='link') ? "stylesheet" : "text/javascript"));
                 s[i].setAttribute((c==undefined) ? "src" : ((c=='link') ? "href" : "src"),d[i]);
                 s[i].onload = s[i].onreadystatechange = function() {
                     if((!/*@cc_on!@*/0 || !s[i].readyState || /loaded|complete/.test(s[i].readyState))){
                        this.onload = this.onreadystatechange = null;
                        if(i != last) {
                          recursiveLoad(i + 1); 
                        }else{
                          if(typeof(b) == "function") {
                            b();
                          }
                        }
                     }
                 }
                HEAD.appendChild(s[i]);
             };
             recursiveLoad(0);
        },
        
        load:function(){
            if(arguments.length==0){ /*加载控制器中需要的js类库*/
                var b = v();
                for(var o in h){
                    if(b.match(h[o].re)!=null){
                      s.call(j,h[o].src); if(h[o].css !=undefined) s.call(k,h[o].css); s.call(m,o);
                    }
                }
                this.get(j,function(){ QcWind.plusin(); t.call(l,true); });
                this.get(k,{},"link");
            }
            else{
              if(arguments.length<2 || !this.isFunction(arguments[1])) return;
            }
        },
        plusin:function(){
            if(u.call(m,"alert")){  
                if(window.layer!=undefined){
                  window.realAlert = window.alert = function(msg){
                    layer.alert(msg,{icon:7,title:"\u7cfb\u7edf\u63d0\u793a"},function(i){
                        layer.close(i);
                    });
                  } 
                  window.confirm = function(a,b,c,d){
                    layer.confirm(a,{title:b,icon:3},function(index){
                      layer.close(index);
                      if(QcWind.isFunction(c)) c();
                    },function(index){
                      layer.close(index);
                      if(QcWind.isFunction(d)) d();
                    });
                  }
               }
            }
        },
        install:function(){this.load();}, 
        layer:{
            open:function(a,b){
                var args = arguments,len = args.length,c=(arguments[3]==undefined) ? 800 : arguments[3],d=(arguments[4]==undefined) ? 600 : arguments[4];
                var cd = "dialogWidth=%C%,dialogHeight=%D%,location=no,menubar=no,status=no,center=yes,resizable=no";

                if(window.layer){
                  // if(QcWind.in("alert",p)){
                    layer.open({
                        type: 2,
                        shade: [0.8, '#cccccc'],
                        area: [c+'px',d+'px'],
                        maxmin: true,
                        content: a,
                        title:b,
                        zIndex: layer.zIndex,
                        cancel: function(index, layero){ 
                          layer.close(index)
                        }  
                    });
                }
                else{
                    window.showModalDialog(a,'',cd.replace("%C%",c).replace("%D%",d));
                }
            }
        },
        a_:function(a){
          return e.getElementById(a);
        },
        b_:function(a,b){
          var as = e.getElementsByTagName(b),arr = [];
          for(var i=0; i<as.length; i++){
            if(as[i].name === a){
                p.call(arr,as[i]);
            }
          }
          return arr;
        },
        htmlDom:{
            Checkbox:{
                selectAll:function(a){
                   if(!QcWind.isJson(a))return;
                   if(a.aBox==undefined || a.sBox==undefined) return;
                   var b = QcWind.a_(a.aBox);
                   var c = QcWind.b_(a.sBox,"input");
                   if(b==null || c.length==0)return;
                    b.addEventListener('click',function(){
                     for (var i = 0; i < c.length; i++) { 
                         c[i].checked = this.checked;
                     }
                   },false);
                }
            },
            Select:{
                selectAll:function(a){
                  if(!QcWind.isJson(a))return;

                }
            },
        },
        ready:function(){
            if(this.isFunction(arguments[0]))p.call(l,arguments[0]);
        },

   };

   QcWind.install();

})(window);

