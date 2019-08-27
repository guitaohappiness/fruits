<template>
	<div class="groupDetails bg-f4f4f4">
		<x-header :left-options="{backText: ''}">
			商品详情
			<a slot="right">
				<router-link :to="{name:'cart'}">
					<div class="relative header">
						<img class="block" src="@/assets/images/common/showCatNum.png" alt="" />
						<span v-show="cartList.length > 0" class="dian absolute inline-block bg-fc5920 bd-rd50 line-h30 text-center">{{cartList.length}}</span>
					</div>
				</router-link>
			</a>
		</x-header>
		<div class="scrollHeight pd-bt30">
			<!--商品主图-->
			<div class="mainImgBox">
				<div class="indexSwiper relative">
		          	<swiper 
		          		:show-desc-mask='false'
		          		v-model='indexSwiper' 
		          		@on-index-change="indexSwiperChange" 
			          	height='7.5rem'
			          	dots-position='center'
			          	loop
			          	dots-class='custom-bottom'
			          	:show-dots='false'>
			          	<swiper-item v-for="(item, index) in swiperList" :key="index">
                            <div v-if="index==0&&proDes.video" class="video relative">
                                <video v-show="showVideo" id="myVd" :src="item"
                                :poster="swiperList[1]"
                                ></video>
                                <img class="poster" v-show="!showVideo" :src="swiperList[1]">
                                <img v-show="!isPlay" src="@/assets/images/common/video-play.png" @click="playVd">
                            </div>
		        			<img v-else :src="item">
		      			</swiper-item>
			        </swiper>
			        <div class="absolute bottomBox flex flex-ac">
						<div class="qh_time ft-28 color-fff line-h50 h50 text-center">预计取货：{{proDes.takeTime}}</div>
						<div class="absolute dots">
							<div class="relative ft-24 color-fff" v-if="swiperList.length > 0">
		        				<img class="block" src="@/assets/images/group/dots.png" alt="" />
		        				<span class="absolute text-center inline-block">{{indexSwiper+1}}/{{swiperList.length}}</span>
			        		</div>
						</div>
					</div>
	       		</div>
			</div>
			<!--商品信息-->
			<div class="pro_desc1 bg-fff bd-bt-f4f4f4">
				<div class="title ft-28 one-line-ellipsis">
					<span class="bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8 mg-rt10">{{proDes.quorum}}人团</span>
                    <span>{{proDes.product_name}}</span>
                    <!-- <span class="h30 line-h30 bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8">{{proDes.quorum}}人团</span>
                    <span>{{proDes.product_name}}</span> -->
				</div>
				<div class="pro_xl_kc ft-26 mg-tp20 flex flex-ac color-666">
					<span class="mg-rt10 dian inline-block bd-rd50"></span>
					<span class="mg-rt20">销量</span>
					<span class="mg-lt20 mg-rt50">{{proDes.ordercount}}</span>
					<span class="mg-rt10 mg-lt20 dian inline-block bd-rd50"></span>
					<span class="mg-rt20">库存</span>
					<span>{{proDes.total}}</span>
				</div>
				<div class="mg-tp30 pro_price ft-22 clearfix">
					<div class="leftCont pull-left">
						<span class="color-fc5920">￥<span class="ft-30">{{proDes.present_price}}</span></span>
						<span class="ft-26 color-999 line-through">￥{{proDes.original_price}}</span>
					</div>
					<div class="rightCont pull-right">
						<p class="ft-24 end_time flex flex-ac" v-if="timeObj.countDown > 0">距结束：
							<span class="bg-1ccfcf times bd-rd8 color-fff h35 line-h35 text-center">
								{{timeObj.hourStr}}
							</span>
							<span class="dian">:</span>
							<span class="bg-1ccfcf times bd-rd8 color-fff h35 line-h35 text-center">
								{{timeObj.minStr}}
							</span>
							<span class="dian">:</span>
							<span class="bg-1ccfcf times bd-rd8 color-fff h35 line-h35 text-center">
								{{timeObj.secStr}}
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
					</div>
				</div>
			</div>
			<!--限购数量-->
			<div class="limitNum h100 bg-fff pd-lr30 clearfix">
				<div class="ft-28 color-666 line-h100 pull-left">数量<span class="ft-26 color-999 mg-lt10">每个用户限购{{proDes.limit}}份</span></div>
				<div class="chooseNum h50 pull-right flex flex-jc flex-ac bd-rd8 mg-tp25">
					<div class="ft-34 color-999 text-center" @click="reduce">-</div>
					<div class="ft-28 color-333 text-center">{{buyNum}}</div>
					<div class="ft-34 color-999 text-center" @click="add">+</div>
				</div>
			</div>
			<!--参团人数-->
			<div class="joinGroupNum bg-fff mg-tp10 bd-bt-f4f4f4">
				<p class="h35 line-h35 pd-lt15 title ft-30 color-333">门店范围内参团人数</p>
				<div class="flex flex-ac joined mg-tp20">
					<img class="block mg-rt10 bd-rd50" v-for="(item,index) in avatarList" v-if="item == '' || item == null" src="@/assets/images/user/default.png" alt="" />
					<img class="block mg-rt10 bd-rd50" v-for="(item,index) in avatarList" v-if="item != '' && item != null" :src="item" alt="" />
					<img class="block mg-rt10 bd-rd50" v-for="(item,index) in groupNum" v-if="index < 6" src="@/assets/images/group/groupNum.png" alt="" />
					<p class="mg-lt20 ft-24 color-333" v-if="groupNum > 0">还差<span class="color-fc5920">{{proDes.group_num}}人</span>成团</p>
					<p class="mg-lt20 ft-24 color-333" v-if="groupNum == 0">总共<span class="color-fc5920">{{proDes.quorum}}人</span>成团</p>
				</div>
			</div>
			<!--拼团流程-->
			<div class="group_progress bg-fff bd-bt-f4f4f4">
				<p class="h35 line-h35 pd-lt15 title ft-30 color-333">拼团流程</p>
				<div class="flex flex-ac progress ft-24 color-333 mg-tp20">
					<div v-for="(item,index) in progress" class="list-item relative">
						<div class="progress_des text-center">
							<img class="block" :src="item.img" alt="" />
							<p class="mg-tp20">{{item.name}}</p>
						</div>
						<img class="block absolute" v-if="index != 4" src="@/assets/images/group/groupSort.png" alt="" />
					</div>
				</div>
				<div class="groupHint flex mg-tp50">
					<div class="leftCont color-fc5920 ft-26">提示：</div>
					<div class="ft-24 color-666">
						<p>1、拼团成功与否以活动页面倒计时为准。</p>
						<p class="mg-tp20">2、拼团结束并成功的订单不可取消。</p>
						<p class="mg-tp20">3、拼团失败，已扣款金额原路返还。</p>
						<p class="mg-tp20">4、本活动不支持配送，需到店核销自提。</p>
					</div>
				</div>
			</div>
			<!--核销商品门店-->
			<div class="he_goods bg-fff bd-bt-f4f4f4 pd30">
				<p class="h35 line-h35 pd-lt15 title ft-30 color-333">核销商品门店</p>
				<div class="storeInfo flex flex-ac mg-tp20">
					<div class="storeImg">
						<img class="block bd-rd50" :src="proDes.img" alt="" />
					</div>
					<div class="storeName">
						<p class="ft-28 color-333">{{proDes.name}}</p>
						<div class="flex flex-ac ft-24 mg-tp15">
							<div class="ads"><img class="block" src="@/assets/images/group/address_icon.png" alt="" /></div>
							<p class=" color-333 ads_text one-line-ellipsis">{{proDes.address}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="h100 line-h100 flex flex-ac pd-lr30 storeAdvantage bg-fff">
				<div class="list-item flex flex-ac flex-jc" v-if="ask.slogan1">
					<div class="leftCont">
						<img class="block" src="@/assets/images/group/advantage.png" alt="" />
					</div>
					<p class="ft-24 color-333 rightCont">{{ask.slogan1}}</p>
				</div>
				<div class="list-item flex flex-ac flex-jc" v-if="ask.slogan2">
					<div class="leftCont">
						<img class="block" src="@/assets/images/group/advantage.png" alt="" />
					</div>
					<p class="ft-24 color-333 rightCont">{{ask.slogan2}}</p>
				</div>
				<div class="list-item flex flex-ac flex-jc" v-if="ask.slogan3">
					<div class="leftCont">
						<img class="block" src="@/assets/images/group/advantage.png" alt="" />
					</div>
					<p class="ft-24 color-333 rightCont">{{ask.slogan3}}</p>
				</div>
			</div>
			<!--商品信息-->
			<div class="mg-tp10 bg-fff proInfo">
				<p class="h35 line-h35 pd-lt15 title ft-30 color-333">商品信息</p>
				<p class="mg-tp20 ft-28 color-333"><span class="color-666">重量：</span>{{attribute[0]}}</p>
				<p class="mg-tp20 ft-28 color-333"><span class="color-666">产地：</span>{{attribute[1]}}</p>
				<p class="mg-tp20 ft-28 color-333"><span class="color-666">储存：</span>{{attribute[2]}}</p>
				<div class="ft-24 mg-tp20 contentBox" v-html="proDes.product_content"></div>
			</div>
		</div>
		<shareModal :isShareModal='isShareModal' @qxShareModal='closeModal' @post='closeModal' :type='special' :proId='id' :argInfos='argInfos'></shareModal>
		<!--底部功能-->
		<div class="btnFixed h100 flex bd-tp-eee">
			<div class="shareBtn bg-fff" @click="shareBtn">
				<img class="block" src="@/assets/images/group/shareBtn.png" alt="" />
				<p class="ft-24 mg-tp10 color-999 text-center">好友一起拼</p>
			</div>
			<div class="joinGroup bg-1ccfcf line-h100 text-center ft-32 color-fff" @click='payMent' v-if="proDes.group_status == 1">
				我要参团
			</div>
			<div class="joinGroup bg-ccc line-h100 text-center ft-32 color-fff" v-else-if="proDes.group_status == 2">
				已参团
			</div>
			<div class="joinGroup bg-ccc line-h100 text-center ft-32 color-fff" v-else>
				已结束
			</div>
		</div>
	</div>
</template>

<script>
	import shareModal from '@/components/base/shareModal.vue'
	export default{
		name:'groupDetails',
		data(){
			return{
				indexSwiper:0, //商品轮播图下标
                isShareModal:false, //是否显示分享弹窗
                isPlay:false, //是否播放
                showVideo:false, //显示视频播放
				buyNum:1, //购买商品数量
				proDes:{}, //商品详细信息
				attribute:[], //商品重量、产地、储存信息
				timeObj:{}, //拼团倒计时时间
				cartList:[], //购物车商品列表
				swiperList:[], //商品轮播图列表
				avatarList:[], //拼团用户头像列表
				progress:[ //拼团流程指示
					{img:require('@/assets/images/group/progress1.png'),name:'参与拼团'},
					{img:require('@/assets/images/group/progress2.png'),name:'邀请好友'},
					{img:require('@/assets/images/group/progress3.png'),name:'拼团成功'},
					{img:require('@/assets/images/group/progress4.png'),name:'消息提醒'},
					{img:require('@/assets/images/group/progress5.png'),name:'自提成功'},
				],
				argInfos:{}, //商品分享信息
                groupNum:'', //拼团人数
                special:2,
                ask:'', //门店支持的服务
                storeId:'', //门店id
			}
		},
		methods:{
			// 轮播图切换
			indexSwiperChange(index){
				var that = this;
				that.indexSwiper = index;
			},
			//分享
			shareBtn(){
				var that = this;
				that.isShareModal = true;
				var args ={url:'',name:'',description:'',thumb:''};
				args.url = that.__proto__.__proto__.baseUrl + "/#/groupDetails/" + that.id + '/' + that.sid;
    			var proDes = that.proDes;
				args.name = proDes.product_name;
				args.description = proDes.product_name;
				args.thumb = proDes.product_images[1];
				
				that.argInfos = args;
			},
			// 关闭分享弹窗
			closeModal(msg){
				var that = this;
				that.isShareModal = !msg;
			},
			//商品减少
			reduce(){
				var that = this;
				if(that.buyNum == 1){
					that.buyNum = 1;
				}
				else{
					that.buyNum--;
				}
			},
			//商品增加
			add(){
				var that = this;
				if(that.buyNum < that.proDes.buy_num){
					that.buyNum++;
				}
				else{
					that.$vux.toast.text('每人限购' + that.buyNum +'份!' ,'middle');
				}
				
			},
			// 获取相片详情
			getProductDes(){
				var that = this;
				if(that.uid){
					var data = that.id + '?sid=' + that.sid + '&uid=' + that.uid;
				}
				else{
					var data = that.id + '?sid=' + that.sid;
				}
				
				that.$api.groupbuyDes(data).then(res => {
					console.log(res);
					if(res.code == 1){
                        that.proDes = res.data;
                        console.log(res.data)
						that.swiperList = res.data.product_images;
                        that.attribute = res.data.product_attribute;
                        that.storeId = res.data.sid;
                        if(res.data.video)
                        {that.swiperList.unshift(res.data.video)}
						if(res.data.avatar){
							that.avatarList = res.data.avatar;
						}
						else{
							that.avatarList = [];
						}
                        that.groupNum = res.data.quorum - that.avatarList.length;
						console.log(that.proDes)
						// 获取拼团倒计时时间
                        that.getGroupTime();
					}
					else{
						that.$vux.toast.text(res.msg ,'middle');
					}
				})
				
				let data3 = {
                    oid: that.oid,
                    type:4,
                }
				that.$apily.options(data3).then(res =>{
					if(res.code == 1){
						that.ask = res.data;
					}
				})
			},
			// 点击播放按钮播放视频介绍
            playVd(){
                var that = this;
                var myVideo=document.getElementById("myVd");
                myVideo.play();
                that.isPlay = true
                myVideo.controls = true
                that.showVideo = true
			},
			// 获取拼团倒计时时间
			getGroupTime(){
				var that = this;
				
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
				
				let end_time = that.proDes.endTime;
                end_time = end_time.replace(/\-/g, "/");
                let now_time  = new Date();
                now_time = formatDateTime(now_time);
                let endTime = new Date(end_time).getTime();
                let nowTime = new Date(now_time).getTime();
                
				let total_micro_second = endTime - nowTime;
				// 格式化时间，时间转换
                that.timeObj = that.dateFormat(total_micro_second);
                
                setTimeout(function () {
					// 获取拼团倒计时时间
      				that.getGroupTime();
    			}, 1000)
			},
			// 格式化时间，时间转换
			dateFormat(micro_second) {
				//console.log(micro_second)
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
                timeObj.hourStr = parseInt(hourStr) + day*24; //获取天数转化为小时 + 小时
                //timeObj.hourStr = hourStr;  //只获取小时
                timeObj.minStr  = minStr;
                timeObj.secStr  = secStr;
                timeObj.countDown = second;
                return timeObj;
			},
			// 获取购物车列表
            getCartList(){
				var that = this;
				var data ={
					uid:that.uid,
					oid:that.oid,
				}
				that.$api.cartList(data).then(res => {
					res.data.forEach(item => {
						if(item.shopid == that.sid){
							that.cartList = item.list;
						}
					})
					
				})
			},
			// 点击我要参团按钮
			payMent(){
				var that = this;
				if(!that.uid){
                    that.$vux.toast.text("您还未登录哦！","middle");
                    setTimeout(() => {
                    	that.$router.replace({name:'login'});
                    },1000)
                }
				else if(that.storeId!=window.localStorage.getItem('clickId')){
                    that.$vux.toast.text("该商品不在您的配送范围内，请切换到对应门店在购买！","middle");
                }
                else{
                	that.$set(that.proDes,'buyNum',that.buyNum);
					var proArr = [];
					proArr.push(that.proDes);
					window.localStorage.setItem('proArr',JSON.stringify(proArr));
					console.log(proArr)
					that.$router.push({name:'groupOrder'});
                }
			},
			// 获取路由、缓存信息
			getParams(){
				var that = this;
				that.id  = that.$route.params.id;
				that.uid = window.localStorage.getItem('uid');
				that.sid = window.localStorage.getItem("clickId");
				that.oid = that.$router.app.__proto__.$oid;
			}
		},
		created(){
			var that = this;
			// 获取路由、缓存信息
			that.getParams();
			// 获取相片详情
			that.getProductDes();
			// 获取购物车列表
            that.getCartList();
            setTimeout(() => {
                var myVideo=document.getElementById("myVd");
                myVideo.addEventListener('pause',function(){  
                    console.log('暂停')
                    that.showVideo = false;
                    that.isPlay = false;
                }) 
            }, 2000);
		},
		components:{
			'shareModal':shareModal,
		},
	}
</script>

<style lang="less" scoped>
	.groupDetails{
		.header{
			.dian{
				width:0.3rem!important;
				height:0.3rem!important;
				right:-0.1rem!important;
				top:-0.1rem!important;
				font-size:0.12rem!important;
			}
		}
		.scrollHeight{
			// height:calc(100vh - 1.88rem);
            // overflow-y: scroll;
            padding-bottom: 1.3rem;
			.mainImgBox{
				.indexSwiper{
                    .video{
                        width: 100%;
                        height:7.5rem;
                    }
                    .video img{
                        position: absolute;
                        top: 37%;left: 41%;
                        width: 1.6rem;
                        height: 1.5rem;
                    }
                    .video .poster{
                        position: static;
                        width:100%;
                        height:7.5rem;
                    }
                    video{
                        height: 7.5rem;
                        width: 100%;
                    }
					.bottomBox{
						width:100%;
						bottom:0.2rem;
						.qh_time{
							width:2.85rem;
							background:rgba(0,0,0,.3);
						}
						.dots{
							right:0.3rem;
							line-height: 0.36rem;
							span{
								width:100%;
								bottom:0;
								left:0;
							}
							img{
								width:0.72rem;
								height:0.36rem;
							}
						} 
					}
				}
			}
			.pro_desc1{
                padding:0.3rem 0.3rem 0.5rem 0.3rem;
                .title{
                    height: 0.4rem;
                    line-height: 0.4rem;
                    span{
                        vertical-align: middle;
                    }
                }
				.pro_xl_kc{
					span.dian{
					    width: 0.1rem;
					    height: 0.1rem;
					    background: #ccc;
					}
				}
				.pro_price{
					.rightCont{
						.end_time{
							span.times{
								min-width:0.4rem;
							}
							span.dian{
								margin:0 0.05rem;
							}
						}
					}
				}
			}
			.limitNum{
				.chooseNum{
					width:1.75rem;
					border:0.02rem solid #ccc;
					div{
						width:33.333%;
						height:0.48rem;
						&:nth-child(1){
							border-right:0.02rem solid #ccc;
						}&:nth-child(2){
							border-right:0.02rem solid #ccc;
							line-height:0.46rem;
						}
					}
					
				}
			}
			.joinGroupNum{
				padding:0.3rem 0.3rem 0 0.3rem;
				height:2rem;
				.title{
					font-family: 'PingFang-Medium';
					border-left:0.06rem solid #1CCFCF;
					
				}
				.joined{
					img{
						width:0.6rem;
						height:0.6rem;
					}
				}
			}
			.group_progress{
				padding:0.3rem 0.3rem 0.5rem 0.3rem;
				.title{
					font-family: 'PingFang-Medium';
					border-left:0.06rem solid #1CCFCF;
					
				}
				.progress{
					.list-item{
						width:20%;
						.progress_des img{
							margin:0 auto;
							width:0.8rem;
							height:0.8rem;
						}
						&>img{
							top:0.3rem;
							right:-0.15rem;
							width:0.34rem;
							height:0.24rem;
						}
					}
				}
				.groupHint{
					.leftCont{
						font-family: 'PingFang-Medium';
					}
				}
			}
			.he_goods{
				.title{
					font-family: 'PingFang-Medium';
					border-left:0.06rem solid #1CCFCF;
					
				}
				.storeInfo{
					.storeImg{
						width:20%;
						img{
							width:1rem;
							height:1rem;
						}
					}
					.storeName{
						width:80%;
						.ads{
							width:8%;
							img{
								width:0.3rem;
								height:0.38rem;
							}
						}
						.ads_text{
							width:92%;
						}
						
					}
				}
			}
			.storeAdvantage{
				.list-item{
					width:33.3333333%;
					.leftCont{
						/*width:20%;*/
						img{
							width:0.28rem;
							height:0.28rem;
						}
					}
					.rightCont{
						/*width:60%;*/
					}
				}
			}
			.proInfo{
				padding:0.3rem 0.3rem 0 0.3rem;
				.title{
					font-family: 'PingFang-Medium';
					border-left:0.06rem solid #1CCFCF;
				}
				.contentBox{
					/deep/ p {
                        padding-bottom: 0.3rem;
                        line-height: 0.5rem;
						img{
							width:100%;
						}
					}
				}
			}
		}
		.btnFixed{
			position:fixed;
			width:100%;
			bottom:0;
			font-family: 'PingFang-Medium';
			.shareBtn{
				width:50%;
				img{
					margin:0 auto;
					margin-top:0.15rem;
					width:0.42rem;
					height:0.39rem;
				}
			}
			.joinGroup{
				width:50%;
			}
		}
	}
</style>