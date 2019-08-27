<template>
	<div class="curLocation bg-f4f4f4">
		<x-header :left-options="{backText: ''}">{{name}}</x-header>
        <el-amap class="myMap" vid="map" :plugin="plugin" :center="center"> </el-amap>
	</div>
</template>

<script type="text/javascript" src="../../iosMap/remogeo.js"></script>
<script>
	export default{
        name:'',
		data(){
			return{
                name:'', //门店名称
                position:'', //门店位置
                center: [],
                lng: 0,
                lat: 0,
                plugin: [{
                    //CameraUpdateFactory:
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 100,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
                    extensions:'all',
                    pName: 'Geolocation',
                }]
			}
        },
        methods:{
            //获取路由参数
            getParams(){
                var that = this;
                that.id = that.$route.params.id;
            },

            //获取门店详情
            getDetail(){
                var that = this;    
                var params = that.id
                that.$apily.store2(params).then(res =>{
                    if(res.code == 1){
                        that.name = res.data.name
                        that.position = res.data.area + res.data.address
                        //获取该商店位置
                        that.getPosition();
                    }
                })
            },

            //获取该商店位置
            getPosition(){
                var that = this
                var params = {
                        type:1,
                        pos:that.position
                    }
                    that.$apily.location2(params).then(res =>{
                        if(res.code == 1){
                            that.lng = res.data[0]
                            that.lat = res.data[1]
                            //that.init()
                            setTimeout(() => {
                                that.init()
                            }, 100);
                        }
                    })
                    setTimeout(() => {
                    that.$vux.loading.hide()
                }, 500);
            },
            //显示指定位置
            init() {
                var that = this
                var map, geolocation;
                //加载地图，调用浏览器定位服务   高德地图
                map = new AMap.Map('map', {
                    resizeEnable: true
                });
                
                var position = new AMap.LngLat(that.lng,that.lat);
                map.setCenter(position); 
                map.setZoom(16); 
                var marker1 = new AMap.Marker({
                    position: position,   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: '商店'
                });
                map.add(marker1);
                setTimeout(() => {
                    that.$vux.loading.hide();
                }, 500);
                //var latLng = new LatLng(30.49184,114.33144);//构造一个位置
                //map.moveCamera(CameraUpdateFactory.newLatLngZoom((30.49184,114.33144),16));
                
            },
        },
        mounted(){
            var that = this
            that.$vux.loading.show({
                text:'加载中'
            })
            //获取路由参数
            that.getParams();
            //获取门店详情
            that.getDetail();
        }
	}
</script>

<style lang="less" scoped>
	.myMap{
        width:100%;
        height: 100vh;
    }
</style>