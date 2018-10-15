// 騰訊影片設定
const video = new tvp.VideoInfo();
video.setVid('l07427vkzdj');
const QQplayer = new tvp.Player();
QQplayer.create({
    video: video,
    modId: "video_qq_player", 
    clientbar: 0,
    autoplay: 0,
    pic: '../img/qqtv.png',
});


var theater = theaterJS();

theater
.on('type:start, erase:start', function () {
    // add a class to actor's dom element when he starts typing/erasing
    var actor = theater.getCurrentActor()
    actor.$element.classList.add('is-typing')
})
.on('type:end, erase:end', function () {
    // and then remove it when he's done
    var actor = theater.getCurrentActor()
    actor.$element.classList.remove('is-typing')
});

theater
.addActor('luke');

theater
.addScene('luke:TARS ON TREND', 3600)
.addScene(theater.replay);


//Number Counter + wow
$.fn.jQuerySimpleCounter = function( options ) {
  var settings = $.extend({
      start:  0,
      end:    100,
      easing: 'swing',
      duration: 400,
      complete: ''
  }, options );

  var thisElement = $(this);

  $({count: settings.start}).animate({count: settings.end}, {
  duration: settings.duration,
  easing: settings.easing,
  step: function() {
    var mathCount = Math.ceil(this.count);
    thisElement.text(mathCount);
  },
  complete: settings.complete
});
};

var wow = new WOW(
  {
    boxClass:     'wow',      
    animateClass: 'animated',
    offset:       0,
    mobile:       false,
    callback:     function(box) {
      $('#number1').jQuerySimpleCounter({end: 4000,duration: 2500});
      $('#number2').jQuerySimpleCounter({end: 20,duration: 2500});
      $('#number3').jQuerySimpleCounter({end: 500,duration: 2500});
      $('#number4').jQuerySimpleCounter({end: 900,duration: 2500});
    }
  }
);
wow.init();


//Map
function initMap() {
  var uluru = {lat: 25.028860, lng: 121.521458};
  var map = new google.maps.Map(document.getElementById('grey-map'), {
    zoom: 16,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

// 百度 Map
//创建和初始化地图函数：
function initMap(){
  createMap();//创建地图
  setMapEvent();//设置地图事件
  addMapControl();//向地图添加控件
  addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap(){
  var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
  var point = new BMap.Point(121.531548,25.032212);//定义一个中心点坐标
  map.centerAndZoom(point,18);//设定地图的中心点和坐标并将地图显示在地图容器中
  window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
  map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
  map.enableScrollWheelZoom();//启用地图滚轮放大缩小
  map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
  map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
  //向地图中添加缩放控件
var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_SMALL});
map.addControl(ctrl_nav);
  //向地图中添加缩略图控件
var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});
map.addControl(ctrl_ove);
  //向地图中添加比例尺控件
var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT});
map.addControl(ctrl_sca);
}

//标注点数组
var markerArr = [{title:"JUKSY",content:"台北市中正區羅斯福路二段9號5樓之1",point:"121.53175|25.032098",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
];
//创建marker
function addMarker(){
  for(var i=0;i<markerArr.length;i++){
      var json = markerArr[i];
      var p0 = json.point.split("|")[0];
      var p1 = json.point.split("|")[1];
      var point = new BMap.Point(p0,p1);
var iconImg = createIcon(json.icon);
      var marker = new BMap.Marker(point,{icon:iconImg});
var iw = createInfoWindow(i);
var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
marker.setLabel(label);
      map.addOverlay(marker);
      label.setStyle({
                  borderColor:"#808080",
                  color:"#333",
                  cursor:"pointer"
      });

(function(){
  var index = i;
  var _iw = createInfoWindow(i);
  var _marker = marker;
  _marker.addEventListener("click",function(){
      this.openInfoWindow(_iw);
    });
    _iw.addEventListener("open",function(){
      _marker.getLabel().hide();
    })
    _iw.addEventListener("close",function(){
      _marker.getLabel().show();
    })
  label.addEventListener("click",function(){
      _marker.openInfoWindow(_iw);
    })
  if(!!json.isOpen){
    label.hide();
    _marker.openInfoWindow(_iw);
  }
})()
  }
}
//创建InfoWindow
function createInfoWindow(i){
  var json = markerArr[i];
  var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
  return iw;
}
//创建一个Icon
function createIcon(json){
  var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
  return icon;
}

initMap();//创建和初始化地图