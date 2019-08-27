<template>
    <div class="group bg-f4f4f4" v-if="isShowPage">
        <x-header :left-options="{showBack: false}">来拼</x-header>
        
        <div class="groupBox">
            <!--店铺信息-->
            <div class="storeInfo bg-fff bd-bt-f4f4f4">
                <div class="flex flex-ac storeBox ft-26">
                    <div class="leftCont">
                    	<img class="block bd-rd50" :src="logo" alt="" />
                    </div>
                    <div class="rightCont">
                       <p class="color-fff ft-30">{{storeName}}</p>
                       <p class="color-fff ft-26 one-line-ellipsis">{{storeAddress}}</p>
                    </div>
                </div>
            </div>
            <!--tab-->
            <div class="tabList h80 line-h80">
                <tab default-color="#999" prevent-default active-color="#1CCFCF" v-model='curIndex' @on-before-index-change="switchTabItem">
                    <tab-item>
                        <div class="line h60 line-h60 mg-tp10 flex flex-jc">
                            <p class="rentOut ft-30"><b>限量特价</b> </p>
                        </div>
                    </tab-item>
                    <tab-item>
                        <div class="h60 line-h60 mg-tp10 flex flex-jc">
                            <p class="sell ft-30"><b>限时拼团</b> </p>
                        </div>
                    </tab-item>
                </tab>
            </div>
            <!--限量特价-->
            <div v-if="curIndex == 0">
                <div class="proList bg-fff mg-tp10">
                    <div class="list-item pd30 flex bd-bt-f4f4f4 relative" v-for="(item,index) in list1">
                    	<router-link class="flex flex-jc width-full" :to="{name:'specialDes',params:{id:item.id}}">
	                        <div class="leftCont relative">
	                            <img class="block bd-rd8" :src="item.product_images" alt="" />
	                            <div class="sale_null absolute bd-rd50 ft-26 flex flex-jc flex-ac color-fff" v-if="item.total < 0">
	                               	已售完
	                            </div>
	                        </div>
	                        <div class="rightCont">
	                            <p class="title ft-26 mult_line-ellipsis line-h40">
	                                <span class="bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8">限量</span>
	                                <span>{{item.product_name}}</span>
	                            </p>
	                            <p class="ft-24 limit flex flex-ac mg-tp15 flex" v-if="item.total > 0">
	                                <span class="dian inline-block bd-rd8"></span>
	                                <span class="color-fc5920 mg-rt30">仅剩{{item.total}}份</span>
	                                <span class="color-999">每人限购{{item.limit}}份</span>
	                            </p>
	                            <p class="ft-24 limit flex flex-ac mg-tp10" v-else>
	                                <span class="dian inline-block bd-rd8"></span>
	                                <span class="color-999 mg-rt30">仅剩{{item.total}}份</span>
	                                <span class="color-999">明天再来看看吧~</span>
	                            </p>
	                            
	                            <div class="price mg-tp20 color-fc5920 clearfix">
	                            	<p class="ft-22 color-fc5920 pull-left">
	                              	   	￥<span class="ft-30 color-fc5920">{{item.present_price}}</span>
	                                    <span class="ft-26 color-999 line-through">￥{{item.original_price}}</span>
	                              	</p>
                                	<!--<img v-if="item.total > 0" class="block joinCart pull-right" src="@/assets/images/common/joinCart.png" alt="" />
	                    			<img v-else class="block joinCart pull-right" src="@/assets/images/common/joinCart2.png" alt="" />-->
                                </div>
	                        </div>
	                    </router-link>
                    </div>
                </div>
                <!--没有更多-->
                <div class="loadMore text-center">
                    <img class="block" src="@/assets/images/common/icon4.png" alt="" />
                    <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
                </div>
            </div>
            <!--限时拼购-->
            <div v-else>
                <div class="proList bg-fff mg-tp10">
                    <div class="list-item pd30 flex bd-bt-f4f4f4 relative" v-for="(item,index) in list2">
                    	<router-link :to="{name:'groupDetails',params:{id:item.id,sid:sid}}" class="flex flex-jc width-full">
	                        <div class="leftCont relative">
	                            <img class="block bd-rd8" :src="item.product_images" alt="" />
	                            <p class="absolute bd-rd8 qh_time h40 line-h40 ft-22 color-fff text-center">预计取货：{{item.takeTime}}</p>
	                            <div class="sale_null absolute bd-rd50 ft-26 flex flex-jc flex-ac color-fff" v-if="item.timeObj.countDown <= 0">
	                               	已结束
	                            </div>
	                        </div>

	                        <div class="rightCont">
	                            <p class="title ft-28 mult_line-ellipsis line-h40">
	                                <span class="bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8">{{item.quorum}}人团</span>
	                                <span>{{item.product_name}}</span>
	                            </p>
	                            <p class="ft-24 end_time flex flex-ac mg-tp10" v-if="item.timeObj.countDown > 0">距结束：
	                                <span class="bg-1ccfcf times bd-rd8 color-fff h35 line-h35 text-center">
										{{item.timeObj.hourStr}}
									</span>
	                                <span class="dian">:</span>
	                                <span class="bg-1ccfcf times bd-rd8 color-fff h35 line-h35 text-center">
										{{item.timeObj.minStr}}
									</span>
	                                <span class="dian">:</span>
	                                <span class="bg-1ccfcf times bd-rd8 color-fff h35 line-h35 text-center">
										{{item.timeObj.secStr}}
									</span>
	                            </p>
	                            <p class="ft-24 end_time flex flex-ac mg-tp10" v-else>距结束：
	                                <span class="bg-999 times bd-rd8 color-fff h35 line-h35 text-center">
										00
									</span>
	                                <span class="dian">:</span>
	                                <span class="bg-999 times bd-rd8 color-fff h35 line-h35 text-center">
										00
									</span>
	                                <span class="dian">:</span>
	                                <span class="bg-999 times bd-rd8 color-fff h35 line-h35 text-center">
										00
									</span>
	                            </p>
	                            <div class="price mg-tp20 clearfix">
	                                <p class="ft-22 color-fc5920 pull-left">
	                              	   	￥<span class="ft-30 color-fc5920">{{item.present_price}}</span>
	                                    <span class="ft-26 color-999 line-through">￥{{item.original_price}}</span>
	                                </p>
	                                <p class="pull-right ft-24 color-fc5920 h40 line-h40 pd-lr10 joinGroup" v-if="item.timeObj.countDown > 0">我要参团</p>
	                    			<p class="pull-right ft-24 color-999 h40 line-h40 pd-lr10 joinGroup joinGroup2" v-else>我要参团</p>
	                            </div>
	                        </div>
	                    </router-link>
                    </div>
                </div>
                <!--没有更多-->
                <div class="loadMore text-center bg-f4f4f4">
                    <img class="block" src="@/assets/images/common/icon4.png" alt="" />
                    <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
                </div>
            </div>
            <v-backTop></v-backTop>
        </div>
        <!-- 底部导航 -->
        <v-footer :footer='footer'></v-footer>
    </div>
    <div class="index2 bg-fff" v-else>
		<div class="isShowPage text-center color-333 ft-28" @click="checkConnection">
			<img src="@/assets/images/common/network.png" alt="" />
			<p class="mg-tp50">点击屏幕，重新加载</p>
		</div>
		<!-- 底部导航 -->
		<v-footer :footer='footer'></v-footer>
	</div>
</template>

<script>
	import backTop from '@/components/base/backTop.vue'
    import footer from '@/components/footer/footer.vue'
    export default {
        name:'group',
        data(){
            return{
            	sid:'', //当前门店id
                footer: { first: "", second: "active", third: "", fourth: "", fifth:""}, //页脚选中高亮
                curIndex:0, //选项卡标题下标
                storeName:'', //门店名称
                storeAddress:'', // 门店地址
                logo:'', //门店logo
                list1:[], //限量特价商品列表
                list2:[], //限时拼团商品列表
                isShowPage:true, //是否有网络
            }
        },
        methods:{
            // 选项卡分类点击切换
            switchTabItem(index){
                var that = this;
                that.$vux.loading.show({
                    text: '加载中'
                });
                console.log('on-before-index-change', index);
                that.curIndex = index;
                // 获取分类下的商品信息
                that.getProList(index);
            },
            // 获取分类下的商品信息
            getProList(index){
            	var that = this;
            	var data = {
            		sid:that.sid,
            	}
            	if(index == 0){
            		that.$api.special(data).then(res => {
        				that.list1        = res.data.list;
            		})
            	}
            	else if(index == 1){
            		that.$api.groupbuy(data).then(res => {
                        if(res.code == 1){
                            that.list2 = res.data.list;
                            that.list2.forEach((item,index) => {
                                that.$set(item,'timeObj',{});
                            })
                            // 获取倒计时,时间处理
                            that.getGroupTime();
                        }else{
                            that.list2 = [];
                        }
        				
            		})
            	}

            	setTimeout(() => {
                    this.$vux.loading.hide();
                    window.localStorage.setItem('groupIndex',index);
               	}, 500)
            },
            // 获取倒计时,时间处理
            getGroupTime(){
                let that = this;
                let list1 = that.list2;
                
                var formatDateTime = function (date) {
			      	var y = date.getFullYear();
			      	var m = date.getMonth() + 1;
			      	m = m < 10 ? ('0' + m) : m;
			      	var d = date.getDate();
			      	d = d < 10 ? ('0' + d) : d;
			      	var h = date.getHours();
			      	h = h < 10 ? ('0' + h) : h;
			      	var minute = date.getMinutes();
			      	minute = minute < 10 ? ('0' + minute) : minute;
			      	var second = date.getSeconds();
			      	return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;
			    };
                
                for( let i = 0; i < list1.length; i++ ){
                    let end_time = list1[i].endTime;
                    end_time = end_time.replace(/\-/g, "/");
                    let now_time  = new Date();
                    now_time = formatDateTime(now_time);
                    let endTime = new Date(end_time).getTime();
                    let nowTime = new Date(now_time).getTime();
                    let total_micro_second = endTime - nowTime;
                    
                    //console.log(end_time,now_time)
                    if(that.list2[i].timeObj.countDown <= 0 && that.list2[i].timeObj.countDown){
                    	continue;
                    }
                    else{
                    	that.list2[i].timeObj = that.dateFormat(total_micro_second);
                    }
                    
                }
                
				setTimeout(function () {
  					that.getGroupTime();
				}, 1000)
            },
            // 时间格式化
            dateFormat: function (micro_second) {
//				console.log(micro_second)
                //总秒数
                let second = Math.floor(micro_second / 1000);
                //天数
                let day = Math.floor(second / 3600 / 24);
                //小时
                let hour = Math.floor(second / 3600 % 24);
                let hourStr = hour.toString();
                if (hourStr.length === 1) {
                    hourStr = '0' + hourStr;
                }
                //分钟
                let min = Math.floor(second / 60 % 60);
                let minStr = min.toString();
                if (minStr.length === 1) {
                    minStr = '0' + minStr;
                }
                //秒
                let sec = Math.floor(second % 60);
                let secStr = sec.toString();
                if (secStr.length === 1) {
                    secStr = '0' + secStr;
                }
                let timeObj = {};  //声明一下
                timeObj.hourStr = parseInt(hourStr) + day*24;
                //timeObj.hourStr = hourStr;
                timeObj.minStr  = minStr;
                timeObj.secStr  = secStr;
                timeObj.countDown = second;
                return timeObj;
            },
            // 获取拼团特价商品信息
            getParams(){
            	var that = this;
                that.sid = window.localStorage.getItem("clickId");
            	var data = {
            		sid:that.sid,
            	}
            	that.$api.special(data).then(res => {
        			that.storeName    = res.data.name;
    				that.storeAddress = res.data.address;     
    				that.logo = res.data.logo;
        		})
            	
            	if(window.localStorage.getItem('groupIndex')){
                    that.index01 = parseInt(window.localStorage.getItem('groupIndex'));
                    // 选项卡点击切换
					that.switchTabItem(that.index01);
				}
				else{
                    // 选项卡点击切换
					that.switchTabItem(0);
				}
            },
            // 监听网络状态
            offline(){
				var that = this;
				var networkState = navigator.connection.type;
			    if (networkState === Connection.NONE) {
			      	that.isShowPage = false;
			      	that.$vux.toast.text('网络错误，请检查网络连接','bottom');
			    }
			    else{
                    that.isShowPage = true;
                    // 获取拼团特价商品信息
			    	that.getParams();
			    }
            },
            // 检查网络连接
			checkConnection(){
                var that = this;
                // 电脑上调试需解开下面一行代码注释
                that.getParams();

				var networkState = navigator.connection.type;
			    if (networkState === Connection.NONE) {
			      	that.isShowPage = false;
			      	that.$vux.toast.text('网络错误，请检查网络连接','bottom');
			    }
			    else{
                    that.isShowPage = true;
                    // 获取拼团特价商品信息
				    that.getParams();
			    }
			}
        },
        created(){
        	var that = this;
        	// 检查网络连接
        	that.checkConnection();
        	//监听状态
            document.addEventListener("offline", that.offline, false);
        },
        components:{
            'v-footer':footer,
            'v-backTop':backTop,
        },
        destroyed() {
			var that = this;
			document.removeEventListener("offline", that.offline, false);
		},
    }
</script>

<style lang="less" scoped>
    .group{
    	min-height:calc(100vh - 0.88rem);
        /deep/ .vux-header{
            border-bottom: 0px;
        }
        .groupBox{
            /*height:calc(100vh - 1.86rem);
            overflow-y:scroll;*/
           padding-bottom:0.98rem;
            .storeInfo{
                height: 2.3rem;
                padding:0.3rem 0.3rem 0.2rem 0.3rem;
                background-image: url('../../assets/images/group/bg.jpg');
                background-size: 100%;
                .storeBox{
                    font-family: 'PingFang-Medium';
                    .leftCont{
                        width:26%;
                        padding-left: 0.5rem;
                        img{
                        	width:1rem;
                            height:1rem;
                        }
                    }
                    .rightCont{
                        width:74%;
                        height: 0.8rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .address{
                            div{
                                width:8%;
                                img{
                                    width:0.3rem;
                                    height:0.38rem;
                                }
                            }
                            p{
                                width:92%;
                            }
                            
                        }
                    }
                }
            }
            .tabList{
                font-family: 'PingFang-Medium';
                .line{
                    border-right:0.02rem solid #eee;
                }
                .rentOut,.sell{
                    width:40%;
                }
            }
            .proList .list-item{
                .leftCont{
                    width:36%;
                    img{
                        width:2.2rem;
                        height:2.2rem;
                    }
                    .sale_null{
                        width:1.1rem;
                        height:1.1rem;
                        background:rgba(0,0,0,.3);
                        bottom:0.55rem;
                        left:0.55rem;
                        font-family: 'PingFang-Medium';
                    }
                    .qh_time{
                    	width:2.2rem;
                        background:rgba(0,0,0,.3);
                        bottom:0;
                        font-family: 'PingFang-Medium';
                    }
                }
                .rightCont{
                    width:64%;
                    font-family: 'PingFang-Medium';
                    .title{
                        span{
                            // display: inline-block;
                            // height: 0.3rem;
                            // line-height: 0.3rem;
                            vertical-align: middle;
                        }
                        :last-child{
                            display: inline;
                        }
                    }
                    .limit{
                        .dian{
                            margin-right:0.03rem;
                            width:0.1rem;
                            height:0.1rem;
                            background:#ccc;
                        }
                    }
                    .end_time{
                        span.times{
                            min-width:0.4rem;
                        }
                        span.dian{
                            margin:0 0.05rem;
                        }
                    }
                    .price{
                    	font-family: 'PingFang-Bold';
                    	.joinCart{
		                	right:0.4rem;
		                	bottom:0.6rem;
		                    width:0.39rem;
		                    height:0.39rem;
		                }
                    	p.joinGroup{
		                    border:0.02rem solid #FC5920;
		                    border-radius: 0.2rem;
		                }
		                p.joinGroup2{
		                    border:0.02rem solid #999;
		                    border-radius: 0.2rem;
		                }
                    }
                }
            }
            .loadMore{
                padding:0.3rem 0 0.2rem 0;
                img{
                    width:1.2rem;
                    margin: 0 auto;
                }
                
            }
        }
    }
	.index2{
		margin-top:-0.88rem;
		min-height: 100vh;
		.isShowPage{
			padding-top:3rem;
			width:100%;
			height:100vh;
			img{
				width:4.66rem;
				height:3.18rem;
			}
		}
	}
</style>
