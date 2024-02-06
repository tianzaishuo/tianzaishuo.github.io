/*
 * @Description: Cesium
 * @Author: tzs
 * @Date: 2024-02-06 16:12:08
 * @LastEditors: tzs
 * @LastEditTime: 2024-02-06 16:23:22
 *
 */
import GlobeRotate from "./GlobeRotate.js";
export default class MyCesium {
  init() {
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZWFlNzk1ZS0yNWRjLTRlMzUtYmUxNi1jMTJjM2RhMGI0MWEiLCJpZCI6ODgxNCwiaWF0IjoxNjM3ODA4NTk4fQ.4YrCdIO5VncCBrcDETOd3Uj_b9sSMUINHzjChGNPCf0";

    let viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false, // 动画控件
      shouldAnimate: false, // 初始时刻运动
      homeButton: false, // Home按钮
      fullscreenButton: false, // 全屏按钮
      baseLayerPicker: false, // 图层选择控件
      geocoder: false, // 地名查找控件
      timeline: false, // 时间线控件
      shadows: false,
      navigationHelpButton: false, // 帮助信息控件
      infoBox: true, // 点击要素之后显示的信息 信息框小部件
      requestRenderMode: false, // true启用请求渲染模式:更新实体需拖动地图 视图才更新[true 加载完entity后requestRender一下]
      scene3DOnly: false, // 几何图形以3D模式绘制以节约GPU资源：elmentUI卡顿原因
      sceneMode: Cesium.SceneMode.SCENE3D, // 初始场景模式  3d 球
      maximumRenderTimeChange: 1,
      sceneModePicker: false, // 切换展示模式控件
      selectionIndicator: false,
      terrainProvider: Cesium.createWorldTerrain(),
    });
    // 太阳光照效果
    viewer.scene.globe.enableLighting = true;

    // 地球球体自转
    let globeRotate = new GlobeRotate(viewer);
    globeRotate.start();

    var TDU_Key = "a89df02c93e5474e9ebeb81a32fcb487"; //天地图申请的密钥

    //在线天地图影像服务地址(墨卡托投影)
    var TDT_IMG_W =
      "http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
      "&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
      "&style=default&format=tiles&tk=" +
      TDU_Key;

    //在线天地图影像中文标记服务(墨卡托投影)
    var TDT_CIA_W =
      "http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
      "&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
      "&style=default.jpg&tk=" +
      TDU_Key;

    let Img = new Cesium.WebMapTileServiceImageryProvider({
      //调用影响中文服务
      url: TDT_IMG_W, //url地址
      layer: "img_w", //WMTS请求的层名称
      style: "default", //WMTS请求的样式名称
      format: "tiles", //MIME类型，用于从服务器检索图像
      tileMatrixSetID: "GoogleMapsCompatible", //	用于WMTS请求的TileMatrixSet的标识符
      subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
      minimumLevel: 0, //最小层级
      maximumLevel: 18, //最大层级
    });

    viewer.imageryLayers.addImageryProvider(Img); //添加到cesium图层上

    let cia = new Cesium.WebMapTileServiceImageryProvider({
      //调用影响中文注记服务
      url: TDT_CIA_W,
      layer: "cia_w",
      style: "default",
      format: "tiles",
      tileMatrixSetID: "GoogleMapsCompatible",
      subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
      minimumLevel: 0,
      maximumLevel: 18,
    });

    viewer.imageryLayers.addImageryProvider(cia); //添加到cesium图层上}
  }
}
