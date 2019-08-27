<template>
	<div class="curLocation bg-f4f4f4">
		<x-header :left-options="{backText: ''}">我的定位</x-header>
        <div class="changeCity bg-fff">
            <div class="flex flex-jsb">
                <p class="desc color-333 ft-30 color-1ccfcf"> 切换地址：</p>
                <button class="desc color-333 ft-28 color-1ccfcf" @click="confirmCg">确认切换</button>
            </div>
            <div class="address1 flex flex-ac relative">
                <div class="leftCont flex flex-js">
                    <group class="width">
                        <x-address title="" raw-value:true :list="addressData" placeholder="所在地区" v-model="location" @on-hide="logHide" @on-show="logShow" @on-shadow-change="onShadowChange"></x-address>
                    </group>
                </div>
                <!-- <div class="rightCont absolute flex flex-je pd-rt30">
                    <img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
                </div> -->
            </div>
            <group>
                <x-input placeholder="学校/小区/写字楼" v-model="detail" :show-clear="false"></x-input>
            </group>
        </div>
		<div class="curAds bg-fff mg-bt20">
			<p class="desc color-333 ft-30 color-1ccfcf">当前地址：</p>
			<div class="address bg-fff flex flex-ac" style="border-width:1px">
				<p class="place ft-28 color-333">{{myPlace}}</p>
				<p class="ft-28 color-1ccfcf flex flex-ac flex-je" @click="locateAgain">
					<img class="block mg-rt20" src="../../assets/images/index/location.png" alt="" />
					重新定位
				</p>
			</div>
		</div>
		<div class="nearAds bg-fff">
			<p class="desc color-666 ft-30 color-1ccfcf">附近地址：</p>
			<div class="list pd-lr30 bg-fff">
				<div class="list-item h100 line-h100 ft-32 color-333 bd-bt-f4f4f4" v-for="(item,index) in list">
					<!-- <router-link class="block" :to="{name:'index'}"> -->
						<span class="block ft-24 color-333" @click="changePlace(index)">{{item}}</span>
					<!-- </router-link> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ChinaAddressV4Data  } from 'vux'  //省市区三级联动
	export default{
        name:'',
		data(){
			return{
                myPlace:'', //我的位置信息
                regeo:'',
                area:'',
                lng:'',
                lat:'',
                list:[], //附近地址列表
                location:[], //选中所在地区三级联动
                myAddress:[],
                detail:'', //学校/小区/写字楼输入框内容
                addressData: ChinaAddressV4Data, //所在地区三级联动
			}
        },
        methods:{
            //获取参数
            getParams(){
                var that = this;
                that.lng = window.localStorage.getItem("lng")
                that.lat = window.localStorage.getItem("lat")
            },

            //获取位置信息
            getLct(){
                var that = this
                var params = {
                    lon:that.lng,
                    lat:that.lat
                }
                that.$apily.location(params).then(res =>{
                    if(res.code == 1){
                        that.regeo = res.data.regeo
                        that.area = res.data.area
                        that.list = res.data.nearregeo
                        if(window.localStorage.getItem("myLocate")){
                            that.myPlace = window.localStorage.getItem("myLocate")
                        }
                        else{
                            that.myPlace = that.area
                            window.localStorage.setItem("myLocate",that.myPlace)
                        }
                    }
                    setTimeout(() => {
                        that.$vux.loading.hide()
                    }, 500);
                })
            },

            //更改当前位置
            changePlace(index){
                var that = this
                var l = that.list
                console.log(index)
                var params = {
                    type:1,
                    pos:that.regeo + that.area + l[index]
                }
                that.$apily.location2(params).then(res =>{
                    if(res.code == 1){
                        that.lng = res.data[0]
                        that.lat = res.data[1]
                        window.localStorage.setItem("lng",that.lng)
                        window.localStorage.setItem("lat",that.lat)
                        window.localStorage.setItem("myLocate",l[index])
                        console.log(that.lng)
                        console.log(that.lat)
                        that.$router.push({name:'index',params:{name:l[index]}})
                        console.log(l[index])
                    }
                })
            },

            //重新定位
            locateAgain(){
                var that = this
                that.$vux.loading.show({
                    text:'重新定位中',
                })
                that.getPosition();
            },

            //地图定位
            getPosition() {
                var that = this
                var options = {
                    enableHighAccuracy: true,
                    timeout: 1000,
                    maximumAge: 3600000
                }
                var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

                function onSuccess(position) {
                    that.lat = position.coords.latitude
                    that.lng = position.coords.longitude
                    window.localStorage.removeItem("myLocate")
                    that.changeLat()
                };
                function onError(error) {
                    setTimeout(() => {
                        that.$vux.loading.hide()
                        that.$vux.toast.text('获取定位失败','middle');
                    }, 500);
                }
            },

            //经纬度转换
            changeLat(){
                var that = this;
                var m = that.lng + ',' + that.lat
                var params = {
                    type:3,
                    returnlat:m
                }
                that.$apily.location(params).then(res =>{
                    console.log('转换后的经纬度为',res)
                    if(res.code == 1){
                        that.lng = res.data[0]
                        that.lat = res.data[1]
                        window.localStorage.setItem("lng",that.lng)
                        window.localStorage.setItem("lat",that.lat)
                    }
                    else{
                        that.$vux.toast.text('经纬度转换失败！');
                    }
                    setTimeout(() => {
                        that.$vux.toast.text('重新定位成功！','middle')
                    }, 500);
                    console.log(that.lng,that.lat)
                    //获取位置信息
                    that.getLct()
                })
            },
            logHide (str) {
      			console.log('on-hide', str)
   			},
		    logShow (str) {
		      console.log('on-show')
		    },
		    onShadowChange (ids, names) {
                var that = this
                that.myAddress = []
                console.log(ids, names)
                for(let i=0;i<3;i++){
                
                that.myAddress.push(names[i]) 
                }
            },
            // 确认切换切换地址
            confirmCg(){
                var that = this;
                var a = that.myAddress
                a = a.join('')
                let b = a + that.detail
                console.log(b)
                if(that.detail){
                    window.localStorage.setItem("myLocate",that.detail)
                    var params = {
                        type:1,
                        pos:b
                    }
                    that.$apily.location2(params).then(res =>{
                        if(res.code == 1){
                            that.lng = res.data[0]
                            that.lat = res.data[1]
                            window.localStorage.setItem("lng",that.lng)
                            window.localStorage.setItem("lat",that.lat)
                            that.$router.push({name:'index'})
                        }
                    })
                }
                else{
                    that.$router.push({name:'index'})
                }
            },

        },
        mounted(){
            var that = this
            //获取参数
            that.getParams()
            //获取位置信息
            that.getLct()
        }
	}
</script>

<style lang="less" scoped>
	.curLocation{
        min-height: calc(100vh - 0.88rem);
        .changeCity{
            padding-bottom: 0.3rem;
            margin-bottom: 0.2rem;
            .desc{
				padding:0.4rem 0.3rem 0rem 0.3rem;
			}
        }
        /deep/ .weui-cells{
            margin-top: 0.2rem;
             /deep/ .weui-cell{
                padding: 0.1rem 0.3rem
            }
            /deep/.weui-input{
                // padding: 0.1rem 0;
                font-size: 0.25rem;
            }
            /deep/.weui-input::placeholder{
                font-size: 0.25rem;
            }
        }
        .address1{
            text-align: left;
            /deep/ .weui-cells{
                font-size: 0.25rem;
                margin-top: 0.4rem;
                /deep/ .weui-cell{
                    padding: 0.2rem 0.3rem;
                }
                /deep/ .vux-popup-picker-select{
                    text-align: left!important;
                }
                /deep/ .vux-popup-picker-placeholder{
                    font-size: 0.25rem;
                }
                
            }
			.leftCont{
				width:100%;
				.width{
					width:100%;
				}
			}
			.rightCont{
				top:0.35rem;
				right:0;
				img{
					width:0.16rem;
					height:0.3rem;
				}
			}
        }
        
		.curAds{
			.desc{
				padding:0.2rem 0.3rem 0.2rem 0.3rem;
			}
			.address{
                padding:0.2rem 0.3rem 0.2rem 0.3rem;
                border-top: solid #f4f4f4;
				p{
					font-family: 'PingFang-Medium';
					width:30%;
					img{
						width:0.38rem;
						height:0.38rem;
					}
                }
                .place{
                    width: 70%;
                    line-height: 0.5rem
                }
			}
		}
		.nearAds{
			.desc{
				padding:0.6rem 0.3rem 0.3rem 0.3rem;
			}
			.list{
				.list-item{
					font-family: 'PingFang-Medium';
				}
			}
		}
	}
</style>