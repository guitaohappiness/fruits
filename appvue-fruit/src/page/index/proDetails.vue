<template>
	<div class="groupDetails bg-f4f4f4">
		<x-header :left-options="{backText: ''}">
			商品详情
			<a slot="right">
				<router-link :to="{name:'cart'}">
					<div class="relative header">
						<img class="block" src="@/assets/images/common/showCatNum.png" alt="" />
						<span v-if="cartNum>0" class="dian absolute inline-block bg-fc5920 bd-rd50 line-h30 text-center">{{cartNum}}</span>
					</div>
				</router-link>
			</a>
		</x-header>
		<div class="scrollHeight">
			<!--商品主图-->
			<div class="mainImgBox">
				<div class="indexSwiper relative">
		          	<swiper 
		          		:show-desc-mask='false'
		          		v-model='indexSwiper' 
		          		@on-index-change="indexSwiperChange" 
			          	height='7.5rem'
                        auto:true
                        duration:300
			          	dots-position='center'
			          	loop
                        preload
			          	dots-class='custom-bottom'
			          	:show-dots='false'>
                          <!-- controls
                            preload -->
			          	<swiper-item v-for="(item, index) in swiperList" :key="index">
                            <div v-if="index==0 && proDetails.video" class="video relative">
                                <video v-show="showVideo" id="myVd" :data="index" :src="item"
                                  :poster="swiperList[1]" controlsList="nodownload"
                                ></video>
                                <div class="poster" v-show="!showVideo" :style="{ backgroundImage: `url(${swiperList[1]})`}"></div>
                                <img v-show="!isPlay" src="@/assets/images/common/video-play.png" @click="playVd">
                            </div>
		        			<div v-else class="poster" :data="index" :style="{ backgroundImage: `url(${item})`}"></div>
		      			</swiper-item>
			        </swiper>
			        <div class="absolute bottomBox">
						<div class="relative dots ft-24 color-fff" v-if="product_images.length > 0">
		        			<img class="block" src="@/assets/images/group/dots.png" alt="" />
		        			<span class="absolute text-center inline-block">{{indexSwiper+1}}/{{product_images.length}}</span>
			        	</div>
					</div>
	       		</div>
			</div>
			<!--商品信息-->
			<div class="pro_desc1 pd30 bg-fff bd-bt-f4f4f4">
				<p class="title ft-28 one-line-ellipsis line-h40">
                    <span v-if="proDetails.product_tag" class="h30 line-h30 bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8">{{proDetails.product_tag}}</span>
					<span v-else class="h30 line-h30 bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8">特卖</span>
					<span><b>{{proDetails.product_name}}</b></span>
				</p>
				<div class="pro_xl_kc ft-26 mg-tp20 flex flex-ac">
					<span class="mg-rt10 dian inline-block bd-rd50"></span>
					<span class="mg-rt20 color-333">销量</span>
					<span class="mg-rt50 color-666">{{proDetails.ordercount}}</span>
					<span class="mg-rt10 mg-lt20 dian inline-block bd-rd50"></span>
					<span class="mg-rt20 color-333">库存</span>
					<span class="color-666">{{proDetails.product_stock}}</span>
				</div>
				<div class="mg-tp30 pro_price ft-22">
					<span class="color-fc5920">￥<span class="ft-30"><strong>{{proDetails.product_fact_price}}</strong></span></span>
					<span class="ft-26 color-999 line-through">￥{{proDetails.product_price}}</span>
				</div>
			</div>
			<!--数量-->
			<div class="limitNum h100 bg-fff pd-lr30 clearfix">
				<div class="ft-28 color-333 line-h100 pull-left">数量</div>
				<div class="chooseNum h50 pull-right flex flex-jc flex-ac bd-rd8 mg-tp25">
					<div class="ft-34 color-999 text-center" @click="reduce">-</div>
					<div class="ft-28 color-333 text-center">{{num}}</div>
					<div class="ft-34 color-fc5920 text-center" @click="add">+</div>
				</div>
			</div>
			<!--核销商品门店-->
			<div class="he_goods bg-fff bd-bt-f4f4f4 mg-tp10 pd30">
				<p class="h35 line-h35 pd-lt15 title ft-30 color-333">核销商品门店</p>
				<div class="storeInfo flex flex-ac mg-tp40">
					<div class="storeImg">
						<img class="block bd-rd50" :src="storeInfo.logo" alt="" />
					</div>
					<div class="storeName">
						<p class="ft-28 color-333"><b>{{storeInfo.name}}</b></p>
						<div class="flex flex-ac ft-24 mg-tp15">
							<div class="ads"><img class="block" src="@/assets/images/group/address_icon.png" alt="" /></div>
							<p class="color-333 ads_text one-line-ellipsis">{{storeInfo.address}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="h100 line-h100 flex flex-ac pd-lr30 storeAdvantage bg-fff">
                <div class="list-item flex flex-ac flex-jc" v-if="ask.slogan1">
                    <img class="block" src="@/assets/images/group/advantage.png" alt="" />
                    <p class="ft-24 color-333 rightCont">{{ask.slogan1}}</p>
                </div>
                <div class="list-item flex flex-ac flex-jc" v-if="ask.slogan2">
                    <img class="block" src="@/assets/images/group/advantage.png" alt="" />
                    <p class="ft-24 color-333 rightCont">{{ask.slogan2}}</p>
                </div>
                <div class="list-item flex flex-ac flex-jc" v-if="ask.slogan3">
                    <img class="block" src="@/assets/images/group/advantage.png" alt="" />
                    <p class="ft-24 color-333 rightCont">{{ask.slogan3}}</p>
                </div>
			</div>
			<!--商品信息-->
			<div class="mg-tp10 bg-fff proInfo">
				<p class="h35 line-h35 pd-lt15 title ft-30 color-333">商品信息</p>
                <div class="mg-tp40 bg-fff">
                    <p class="mg-tp20 ft-28 color-333"><span class="color-666">重量：</span>{{attribute[0]}}</p>
                    <p class="mg-tp20 ft-28 color-333"><span class="color-666">产地：</span>{{attribute[1]}}</p>
                    <p class="mg-tp20 ft-28 color-333"><span class="color-666">储存：</span>{{attribute[2]}}</p>
                </div>
                <div class="proContent mg-tp40 ft26" v-html="content">
                </div>
			</div>
		</div>
		<shareModal :isShareModal='isShareModal' @qxShareModal='closeModal' @post='closeModal' :argInfos='argInfos' :proId='id'></shareModal>
		<!--底部功能-->
		<div class="btnFixed h100 flex bd-tp-eee">
			<div class="shareBtn list-item bg-fff" @click="shareBtn">
				<img class="block" src="@/assets/images/group/shareBtn.png" alt="" />
				<p class="ft-24 mg-tp10 color-999 text-center">好物去分享</p>
			</div>
			<div class="joinCart list-item bg-fc5920 ft-32 line-h100 text-center color-fff" @click="addCart">加入购物车</div>
			<div class="toBuy list-item bg-1ccfcf line-h100 text-center">
				<!-- <router-link class="block color-fff ft-32" :to="{name:'subOrder'}">立即购买</router-link> -->
                <span class="block color-fff ft-32" @click="buyNow">立即购买</span>
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
                id:'', //商品id
                uid:'',	//用户id
                oid:'', //行业id
                cartNum:'', //购物车商品数量
                storeId:'', //当前门店id
                indexSwiper:0, //商品轮播图下标
                isPlay:false, //是否播放
                showVideo:false, //显示视频播放
				isShareModal:false, //是否显示分享弹窗
				num:1, //商品数量
				proDetails:{}, //商品详细信息
                product_images:[], //商品轮播图列表
                swiperList:[], //商品轮播图列表
                attribute:[], //商品重量、产地、储存信息
                content:'', //商品介绍内容（富文本）
                argInfos:{}, //商品分享信息
                storeInfo:[], //当前门店信息
                ask:'', //门店支持的服务
			}
		},
		methods:{

            //获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid")
                that.oid = that.$router.app.__proto__.$oid
            },

           //获取路由参数
            getParams(){
                var that = this;
                that.id = that.$route.params.id
            },

            //获取商品详情
            getGood(){
                var that = this;
                var params = that.id
                that.$apily.products2(params).then(res =>{
                    if(res.code == 1){
                        that.proDetails = res.data
                        that.product_images = that.proDetails.product_images
                        that.swiperList = that.proDetails.product_images
                        if(res.data.video)
                        {that.swiperList.unshift(res.data.video)}
                        that.attribute = that.proDetails.product_attribute
                        that.content = that.proDetails.product_content
						that.storeId = that.proDetails.sid
						//获取当前门店
                        that.getDetail()
                    }
                })
            
            },

            //获取当前门店
            getDetail(){
                var that = this;    
                var params = that.storeId 
                that.$apily.store2(params).then(res =>{
                    if(res.code == 1){
                        that.storeInfo = res.data
                    }
                })
                let params2 = {
                    oid: that.oid,
                    type:4
                }
				that.$apily.options(params2).then(res =>{
					if(res.code == 1){
						that.ask = res.data
						console.log(that.ask)
					}
				})
            },

            //获取购物车信息
            getCart(){
				var that = this;
                var params = {
                    uid:that.uid,
                    oid:that.$router.app.__proto__.$oid
                }
                that.$apily.storecart(params).then(res =>{
                    if(res.code == 1){
                        var a = res.data
                        for(let i=0;i<a.length;i++){
                            if(a[i].shopid == that.storeId){
                                let cartList = a[i]
                                let goodList = a[i].list
                                that.cartNum = goodList.length
                            }
                        }
                    }
                })
			},

            //加入购物车
            addCart(){
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
                    var params = new FormData();
                    params.append("uid",that.uid);
                    params.append("pid",that.id);
                    params.append("shopid",that.storeId);
                    params.append("num",that.num);
                    params.append("oid",that.oid);
                    params.append("shop_type",1);
                    that.$apily.storecart2(params).then(res =>{
                        if(res.code == 1){
							that.$vux.toast.text("加入购物车成功！","middle")
							//获取购物车信息
                            that.getCart()
                        }
                    })
                }
            },

            //立即购买
            buyNow(){
                var that = this;
                if(!that.uid){
                    that.$vux.toast.text("您还未登录哦！","middle");
                    setTimeout(() => {
                    	that.$router.replace({name:'login'});
                    },1000)
                }
                else if(that.storeId!=window.localStorage.getItem('clickId')){
                    that.$vux.toast.text("该商品不在当前门店哦！","middle");
                }
                else{
                    var t = that.proDetails;
                    t.buyNum = that.num;
                    t.original_price = that.proDetails.product_price;
                    t.present_price = that.proDetails.product_fact_price;
                    t.logo = that.storeInfo.logo;
                    t.name = that.storeInfo.name;
                    var arr = []
                    arr.push(t)
                    var c = JSON.stringify(arr) 
                    window.localStorage.setItem("proArr",c)
                    that.$router.push({name:'subOrder',params:{type:2}})
                }
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
			//分享
			shareBtn(){
				var that = this;
                that.isShareModal = true;
                var args ={url:'',name:'',description:'',thumb:''};
				args.url = that.__proto__.__proto__.baseUrl + "/#/proDetails/" + that.id;
    			var proDes = that.proDetails;
				args.name = proDes.product_name;
				args.description = proDes.product_name;
				args.thumb = proDes.product_images[1];
				that.argInfos = args;
			},
			//关闭分享弹窗
			closeModal(msg){
				var that = this;
				that.isShareModal = !msg;
			},
			//商品减少
			reduce(){
				var that = this;
				if(that.num == 1){
					that.num = 1;
				}
				else{
					that.num--;
				}
			},
			//商品增加
			add(){
				var that = this;
				that.num++;
			},
		},
		created(){
            var that = this;
			//获取用户信息
            that.getUser();
			//获取路由参数
			that.getParams();
			//获取商品详情
			that.getGood();
			//获取购物车信息
            that.getCart();
            var myVideo = document.getElementById("myVd");
            if(myVideo){
            setTimeout(() => {
                myVideo.addEventListener('pause', function () {
                    that.showVideo = false
                    that.isPlay = false
                })
            }, 2000);
            }else{
                console.log("该video不存在！")
            }
            
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
            padding-bottom: 1.3rem;
			// height:calc(100vh - 1.88rem);
            // overflow-y: scroll;
            .proContent /deep/ p{
                    font-size: 0.26rem;
                    line-height: 0.5rem;
                    margin: 0.2rem,0
                }
            .proContent /deep/ img{
                width: 100%;
                margin: .2rem 0;
            }
            
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
                    }
                    div.poster {
                        height: 100%;
                        background-size: cover;
                        background-position: center;
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
                    height: 0.4rem;
                    color: #333;
                    display: flex;
                    align-items: center;
					span{
                        display: inline-block;
                        height: 0.3rem;
                        line-height: 0.3rem;
                        vertical-align: middle;
                        margin-right: 0.2rem;
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
			
			.proInfo{
				padding:0.3rem 0.3rem 0 0.3rem;
				.title{
					font-family: 'PingFang-Medium';
					border-left:0.06rem solid #1CCFCF;
					
				}
				img{
					width:100%;
					height:3rem;
				}
            }
            .storeAdvantage{
                flex-wrap: nowrap;
				.list-item{
                    // width:33.3333333%;
                    padding-right: 0.1rem;
                    flex-wrap: nowrap;
                    flex-grow: 1;
					img{
						margin-right:2%;
                        width:0.25rem;
                        height: auto
					}
					.rightCont{
						// width:85%;
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
				width:33.333%;
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