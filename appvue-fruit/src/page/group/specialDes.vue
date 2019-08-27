<template>
	<div class="specialDes bg-f4f4f4">
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
			        <div class="absolute bottomBox">
						<div class="relative dots ft-24 color-fff" v-if="swiperList.length > 0">
		        			<img class="block" src="@/assets/images/group/dots.png" alt="" />
		        			<span class="absolute text-center inline-block">{{indexSwiper+1}}/{{swiperList.length}}</span>
			        	</div>
					</div>
	       		</div>
			</div>
			<!--商品信息-->
			<div class="pro_desc1 pd30 bg-fff bd-bt-f4f4f4">
				<div class="title ft-28 one-line-ellipsis line-h40">
					<!-- <span class="h30 line-h30 bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8">限量</span>
					<b>{{proDes.product_name}}</b> -->
                    <span class="bg-fc5920 ft-20 color-fff pd-lr10 mg-rt10 bd-rd8">限量</span>
					<span><b>{{proDes.product_name}}</b></span>
                    
				</div>
				<div class="pro_xl_kc ft-26 mg-tp20 flex flex-ac color-666">
					<span class="mg-rt10 dian inline-block bd-rd50"></span>
					<span class="mg-rt20">销量</span>
					<span class="mg-lt20 mg-rt50">{{proDes.ordercount}}</span>
					<span class="mg-rt10 mg-lt20 dian inline-block bd-rd50"></span>
					<span class="mg-rt20">库存</span>
					<span>{{proDes.total}}</span>
				</div>
				<div class="mg-tp30 pro_price ft-22">
					<span class="color-fc5920">￥<span class="ft-30"><strong>{{proDes.present_price}}</strong></span></span>
					<span class="ft-26 color-999 line-through">￥{{proDes.original_price}}</span>
				</div>
			</div>
			<!--数量-->
			<div class="limitNum h100 bg-fff pd-lr30 clearfix">
				<div class="ft-28 color-666 line-h100 pull-left">数量<span class="ft-26 color-999 mg-lt10">每个用户限购{{proDes.limit}}份</span></div>
				<div class="chooseNum h50 pull-right flex flex-jc flex-ac bd-rd8 mg-tp25">
					<div class="ft-34 color-999 text-center" @click="reduce">-</div>
					<div class="ft-28 color-333 text-center">{{buyNum}}</div>
					<div class="ft-34 color-fc5920 text-center" @click="add">+</div>
				</div>
			</div>
			<!--核销商品门店-->
			<div class="he_goods bg-fff bd-bt-f4f4f4 mg-tp10 pd30">
				<p class="h35 line-h35 pd-lt15 title ft-30 color-333">核销商品门店</p>
				<div class="storeInfo flex flex-ac mg-tp40">
					<div class="storeImg">
						<img class="block bd-rd50" :src="proDes.logo" alt="" />
					</div>
					<div class="storeName">
						<p class="ft-28 color-333"><b>{{proDes.name}}</b></p>
						<div class="flex flex-ac ft-24 mg-tp15">
							<div class="ads"><img class="block" src="@/assets/images/group/address_icon.png" alt="" /></div>
							<p class="color-333 ads_text one-line-ellipsis">{{proDes.address}}</p>
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
				<p class="mg-tp40 ft-28 color-333"><span class="color-666">重量：</span>{{attribute[0]}}</p>
				<p class="mg-tp20 ft-28 color-333"><span class="color-666">产地：</span>{{attribute[1]}}</p>
				<p class="mg-tp20 ft-28 color-333"><span class="color-666">储存：</span>{{attribute[2]}}</p>
				<div class="ft-24 mg-tp20 contentBox" v-html="proDes.product_content"></div>
			</div>
		</div>
		<shareModal :isShareModal='isShareModal' @qxShareModal='closeModal' @post='closeModal' :proId='id' :type='special' :argInfos='argInfos'></shareModal>
		<!--底部功能-->
		<div class="btnFixed h100 flex bd-tp-eee">
			<div class="shareBtn list-item bg-fff" @click="shareBtn">
				<img class="block" src="@/assets/images/group/shareBtn.png" alt="" />
				<p class="ft-24 mg-tp10 color-999 text-center">好物去分享</p>
			</div>
			<!--<div class="joinCart list-item bg-fc5920 ft-32 line-h100 text-center color-fff" @click="joinCart">加入购物车</div>-->
			<div class="toBuy list-item bg-1ccfcf line-h100 text-center color-fff ft-32" @click='payMent' v-if="proDes.total > 0 &&myLimit>0">
				立即购买
			</div>
			<div class="toBuy list-item bg-ccc line-h100 text-center color-fff ft-32" v-if="proDes.total==0">
				已售完
			</div>
            <div class="toBuy list-item bg-ccc line-h100 text-center color-fff ft-32" v-if="myLimit<1">
               	达到限购数量
			</div>
		</div>
	</div>
</template>

<script>
	import shareModal from '@/components/base/shareModal.vue'
	export default{
		name:'specialDes',
		data(){
			return{
				id:'', //商品id
				uid:'', //用户id
				sid:'', //门店id
                indexSwiper:0, //商品轮播图下标
                isPlay:false, //是否播放
                showVideo:false, //显示视频播放
				isShareModal:false, //是否显示分享弹窗
				proDes:{}, //商品详细信息
				buyNum:1, //购买商品数量
				swiperList:[], //商品轮播图列表
				attribute:[], //商品重量、产地、储存信息
				cartList:[], //购物车商品列表
				argInfos:{}, //商品分享信息
                special:1,
                myLimit:'', //商品限购数量
                ask:'', //门店支持的服务
                storeId:'', //门店id
			}
		},
		methods:{
			// 获取商品详情
			getProductDes(){
				var that = this;
				var data = that.id + '?sid=' + window.localStorage.getItem('clickId');
				that.$api.specialDes(data).then(res => {
                    console.log('商品详情',res)
					that.proDes = res.data;
					that.swiperList = res.data.product_images;
                    that.attribute = res.data.product_attribute;
                    that.storeId = res.data.sid;
                    if(res.data.video){
                    	that.swiperList.unshift(res.data.video)
                    }
                })
                var data2 = that.id + '?uid=' + that.uid;
				that.$api.specialDes(data2).then(res => {
                    that.myLimit = res.data.buy_num
                    console.log(that.myLimit)
				})
				
				let data3 = {
                    oid: that.oid,
                    type:4,
                }
				that.$apily.options(data3).then(res =>{
					if(res.code == 1){
						that.ask = res.data;
						console.log(that.ask)
					}
				})
			},
			// 获取购物车商品列表
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
			// 轮播图切换
			indexSwiperChange(index){
				var that = this;
				that.indexSwiper = index;
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
			/*joinCart(){
				var that = this;
				var list = that.cartList;
				var len = list.filter(item => item.shopid == that.sid);
				len = len.filter(item => item.pid == that.id);
				console.log(len)
				
				var len = list.filter(item => item.pid == that.id);
				if(len.length > 0){
					that.$vux.toast.text('该商品已存在购物车！','middle');
				}
				else{
					var data = new FormData();
	                data.append("uid",that.uid);
	                data.append("pid",that.id);
	                data.append("shopid",that.sid);
	                data.append("num",that.buyNum);
	                data.append("oid",7);
	                data.append("shop_type",2);
					that.$api.joinCart(data).then(res => {
						that.$vux.toast.text('加入购物车成功！','middle');
					})
				}
			},*/

			// 立即购买按钮
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
                else if(that.buyNum > that.myLimit){
                    that.$vux.toast.text('您最多还可购买'+ that.myLimit+ '件哦~','middle')
                }
                else{
                    that.$set(that.proDes,'buyNum',that.buyNum);
                    var proArr = [];
                    proArr.push(that.proDes);
                    window.localStorage.setItem('proArr',JSON.stringify(proArr));
                    that.$router.push({name:'subOrder',params:{type:1}});
                }
			},
			//分享
			shareBtn(){
				var that = this;
				that.isShareModal = true;
				var args ={url:'',name:'',description:'',thumb:''};
				args.url = that.__proto__.__proto__.baseUrl + "/#/specialDes/" + that.id;
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
			//减少
			reduce(){
				var that = this;
				if(that.buyNum == 1){
					that.buyNum = 1;
				}
				else{
					that.buyNum--;
				}
			},
			//增加
			add(){
				var that = this;
				if(that.buyNum < that.proDes.buy_num){
					that.buyNum++;
				}
				else{
					that.$vux.toast.text('每人限购' + that.buyNum +'份!' ,'middle');
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
			// 获取购物车商品列表
			that.getCartList();
			// 获取商品详情
            that.getProductDes();
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
	.specialDes{
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
            padding-bottom: 1.3rem;
			// height:calc(100vh - 1.88rem);
			// overflow-y: scroll;
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
						bottom:0.2rem;
						right:0.3rem;
						.dots{
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
				.pro_xl_kc{
					span.dian{
					    width: 0.1rem;
					    height: 0.1rem;
					    background: #ccc;
					}
				}
				.pro_price{
					span{
						font-family: 'PingFang-Medium';
					}
				}
			}
			.limitNum{
				.chooseNum{
					width:1.75rem;
					border:0.02rem solid #ccc;
					div{
						width:33.333%;
						height:0.46rem;
						&:nth-child(1){
							border-right:0.02rem solid #ccc;
						}&:nth-child(2){
							border-right:0.02rem solid #ccc;
							line-height:0.46rem;
						}
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
				padding:0.3rem 0.3rem 0.5rem 0.3rem;
				.title{
					font-family: 'PingFang-Medium';
					border-left:0.06rem solid #1CCFCF;
				}
				.contentBox{
					/deep/ div{
						width:100%!important;
						img{
							width:100%;
						}
					}
					/deep/ img{
						margin-top:0.2rem;
						width:100%;
                    }
                    /deep/ p{
                        line-height: 0.5rem;
                    }
				}
			}
		}
		.btnFixed{
			position:fixed;
			width:100%;
			bottom:0;
			font-family: 'PingFang-Medium';
			.list-item{
				width:50%;
			}
			.shareBtn{
				img{
					margin:0 auto;
					margin-top:0.15rem;
					width:0.42rem;
					height:0.39rem;
				}
			}
		}
	}
</style>