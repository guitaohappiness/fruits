<template>
	<div class="hotSale bg-f4f4f4">
		<x-header :left-options="{backText: ''}">
			{{title}}
			<a slot="right">
				<router-link :to="{name:'cart'}">
					<div class="relative header">
						<img class="block" src="@/assets/images/common/showCatNum.png" alt="" />
						<span v-if="cartNum>0" class="dian absolute inline-block bg-fc5920 bd-rd50 line-h30 text-center">{{cartNum}}</span>
					</div>
				</router-link>
			</a>
		</x-header>
		<!--search-->
        <router-link :to="{name:'search'}">
            <div class="h90 line-h90 flex flex-ac pd-lr30 topSearch relative">
                <div class="topLt flex flex-ac">
                    <img class="block " src="@/assets/images/common/search.png" alt="" />
                    <input class="leftCont bg-fff ft-24 h60 line-h60 bd-rd8" type="search" placeholder="请输入商品名称"/>
                </div>
                <p class="rightCont bg-fff h60 line-h60 ft-26 text-center bd-rd8">搜索</p>
            </div>
        </router-link>
		<!--筛选-->
		<div class="screenList h90 line-h90 bg-fff pd-lr30 flex bd-bt-f4f4f4">
			<div class="list-item flex flex-ac" v-for="(item,index) in screenList" @click="tabFun(index)">
				<p class="ft-28 color-999" :class="curIndex == index ? 'color-1ccfcf':''">{{item}}</p>
				<img class="block mg-lt10" v-if="index != curIndex" src="@/assets/images/common/sortPrice.png" alt="" />
                <img class="block mg-lt10" v-if="index == curIndex && isPrice" src="@/assets/images/common/price1.png" alt="" />
                <img class="block mg-lt10" v-if="index == curIndex &&!isPrice" src="@/assets/images/common/price2.png" alt="" />
			</div>
		</div>
		<!--筛选列表-->
		<div class="proList" v-if="list1.length > 0">
            <div class="list-item pd30 flex bd-bt-f4f4f4 bg-fff relative" v-for="(item,index) in list1">
            	<router-link class="listLink flex flex-jc" :to="{name:'proDetails',params:{id:item.id}}">
                    <div class="leftCont relative">
                        <img class="block bd-rd8" :src="item.product_images" alt="" />
                        <!--<div class="sale_null absolute bd-rd50 ft-26 flex flex-jc flex-ac color-fff" v-if="item.num == 0">
                           	已售完
                        </div>-->
                        <img class="hotIcon block absolute" v-if="index==0" src="@/assets/images/index/hotSale1.jpg" alt="" />
                        <img class="hotIcon block absolute" v-else-if="index==1" src="@/assets/images/index/hotSale2.jpg" alt="" />
                        <img class="hotIcon block absolute" v-else-if="index==2" src="@/assets/images/index/hotSale3.jpg" alt="" />
                    </div>
                    <div class="rightCont mg-tp20">
                        <p class="title ft-28 mult_line-ellipsis line-h40">
                            <span v-if="item.product_tag" class="bg-fc5920 bd-rd8 ft-20 color-fff pd-lr10">{{item.product_tag}}</span>
                            <span v-else class="bg-fc5920 bd-rd8 ft-20 color-fff pd-lr10 h30 line-h30">优选</span>
                            <span>{{item.product_name}}</span>
                        </p>
                        <p class="ft-24 limit flex flex-ac mg-tp10 flex">
                            <span class="dian inline-block bd-rd8"></span>
                            <span class="color-999 mg-rt20">销量</span>
                            <span class="color-999">{{item.ordercount}}</span>
                        </p>
                        <p class="price mg-tp20 ft-22 color-fc5920">
                        	￥<span class="ft-30 color-fc5920"><strong>{{item.product_fact_price}}</strong> </span>
                        	<span class="ft-26 color-999 line-through">￥{{item.product_price}}</span>
                        </p>
                    </div>
                </router-link>
                <img @click="joinCart(index)" class="block absolute joinCart" src="@/assets/images/common/joinCart.png" alt="" />
        	</div>
        	<!--没有更多-->
	        <div class="loadMore text-center" v-if="isLoadMore">
	            <group>
			      	<cell v-for="(type, index) in types" :key="type">
			       		<spinner :type="type"></spinner>
			       		<p class="ft-26 color-666">正在加载更多</p>
			      	</cell>
			    </group>
	        </div>
	        <div v-else class="loadMore text-center">
	            <img class="block" src="@/assets/images/common/icon1.png" alt="" />
	            <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
	        </div>
        </div>
        <!--没有更多-->
        <div v-else>
    		<div class="styleNull">
    			<img class="block" src="@/assets/images/user/orderNull.png" alt="" />
				<p class="text-center ft-28 color-999 mg-tp30">暂无商品~</p>
    		</div>
    	</div>
    	<v-backTop></v-backTop>
	</div>
</template>

<script>
	import backTop from '@/components/base/backTop.vue'
	export default{
		name:'hotSale',
		data(){
			return{
				id:'', //商品分类id
                uid:'', //用户id
                oid:'', //行业id
                title:'', //头部标题
                storeId:'', //当前门店id
				screenList:['综合','销量','最新','价格'], //商品分类
                curIndex:0, //商品分类选中的下标
                isPrice:true, //图标切换
                list:[], //商品列表
                list1:[], //商品列表
                cartNum:'', //购物车商品数量
                paged:1, //分页
                isLoadMore:false,
                scrollWatch: true, //是否监听
                types:['ios-small'],
			}
		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid");
                that.oid = that.$router.app.__proto__.$oid;
                that.id = that.$route.params.id;
                that.title = that.$route.params.name;
                that.storeId = window.localStorage.getItem("clickId");
            },
            //获取商品列表
            getGoods(){
                var that = this;
                var params = {
                    oid:that.$router.app.__proto__.$oid,
                    type:that.id,
                    sid:that.storeId,
                    paged:that.paged,
                    by:that.curIndex + 1,
                } 
                that.$apily.products(params).then(res =>{
                    if(res.code == 1){
                        that.list = res.data;
                        that.list1 = that.list;
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
                                let cartList = a[i];
                                let goodList = a[i].list;
                                that.cartNum = goodList.length;
                            }
                        }
                    }
                })
            },
            
            // 加入购物车
			joinCart(index){
                var that = this;
                if(!that.uid){
                    that.$vux.toast.text("您还未登录哦！","middle");
                }
                var params = new FormData();
                params.append("uid",that.uid);
                params.append("pid",that.list[index].id);
                params.append("shopid",that.storeId);
                params.append("num",1);
                params.append("oid",that.oid);
                params.append("shop_type",1);
                that.$apily.storecart2(params).then(res =>{
                    if(res.code == 1){
                        that.$vux.toast.text("加入购物车成功！","middle");
                        //获取购物车信息
                        that.getCart();
                    }
                })
            },
            // 商品分类点击选中
            tabFun(index,paged){
                var that = this;
                that.$vux.loading.show({
                    text:'加载中',
                })
                //切换tab栏的请求
                if(that.curIndex!=index){
                    that.paged = 1;
                    that.list1 = [];
                }
                else{
                	if(paged){
                		that.paged = paged;
                	}
                	else{
                		that.paged = 1;
	                	that.isPrice = !that.isPrice;
	                	that.list1 = [];
                	}
                }
                that.curIndex = index;
                if(that.curIndex){
                	var params = {
	                    oid:that.$router.app.__proto__.$oid,
	                    type:that.id,
	                    sid:that.storeId,
	                    by:index + 1,
	                    sort:that.isPrice,
	                    paged:that.paged,
	                }
                }
                else{
                	var params = {
	                    oid:that.$router.app.__proto__.$oid,
	                    type:that.id,
	                    sid:that.storeId,
	                    by:index + 1,
	                    paged:that.paged,
	                }
                }
                that.$apily.products(params).then(res =>{
                    if(res.code == 1 && res.data!= ''){
                        var arr = res.data;
                        arr.forEach(item => {
		    				that.list1.push(item);
		    			})
                        if(that.paged == 1 && arr.length < 5){
		    				that.isLoadMore = false;
			    			that.scrollWatch = false;
		    			}
		    			else{
		    				that.isLoadMore = true;
			    			that.scrollWatch = true;
		    			}
                        that.paged++
                    }
                    else{
                    	that.isLoadMore = false;
                        that.scrollWatch = false;
                    }
                    setTimeout(() => {
	                    that.$vux.loading.hide()
	                }, 500);
	                
	                if (that.scrollWatch) {
						window.addEventListener("scroll", that.handleScroll);
					}
                })
            },

            //监听滚动
			handleScroll() {
				var that = this;
				var paged = that.paged;
				if (that.scrollWatch) {
					//当前滚动条高度
					var scrollTop =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop;

					//内容高度
					var bodyScrollHeight = document.body.scrollHeight;
					var documentScrollHeight = document.documentElement.scrollHeight;
					var allheight =
					bodyScrollHeight - documentScrollHeight > 0
						? bodyScrollHeight
						: documentScrollHeight;

					//可视页面高度
					var windowHeight =
					document.documentElement.clientHeight || document.body.clientHeight;

					var bottom = allheight - windowHeight - scrollTop;
					if (parseInt(bottom) <= 0) {
						that.$vux.loading.show({
							text: "加载中"
                       	});
						that.tabFun(that.curIndex,paged);
						console.log("触底加载更多");
					}
				}
			},
        },
        mounted(){
            var that = this
            that.$vux.loading.show({
                text:'加载中'
            })
            //获取用户信息
            that.getUser();
            //获取商品列表
            that.getGoods();
            //获取购物车信息
            that.getCart();
            setTimeout(() => {
                that.$vux.loading.hide()
            }, 500);
        },
        destroyed() {
			var that = this;
			that.scrollWatch = false;
			window.removeEventListener('scroll', that.handleScroll);
		},
		components:{
            'v-backTop':backTop,
        }
	}
</script>

<style lang="less" scoped>
	.hotSale{
		min-height: calc(100vh - 0.88rem);
		.header{
			.dian{
				width:0.3rem!important;
				height:0.3rem!important;
				right:-0.1rem!important;
				top:-0.1rem!important;
				font-size:0.12rem!important;
			}
		}
		.topSearch{
            .topLt{
                width:80%;
                height: 0.6rem;
                background-color: #fff
            }
			img{
				padding-left:0.2rem;
				height:0.25rem;
			}
			.leftCont{
                padding-left: 0.2rem;
                text-align: left;
			}
			input::placeholder{
                font-size: 0.22rem;
				color:#999;
			}
			.rightCont{
                margin-left: 0.2rem;
				font-family: 'PingFang-Medium';
				width:15%;
            }
            p{
                color: rgb(107, 104, 104)
            }
		}
		.screenList{
			.list-item{
				font-family: 'PingFang-Medium';
				margin-right:13%;
                width:15%;
				img{
					width:0.17rem;
					height:0.26rem;
				}
				&.list-item:last-child{
					margin-right:0;
					display: flex;
					justify-content: flex-end;
				}
				
			}
		}
		.proList .list-item{
            .listLink{
                width: 100%;
            }
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
                .hotIcon{
                	top:0;
                	left:0;
                	width:0.76rem;
                	height:0.73rem;
                }
                .qh_time{
                    background:rgba(0,0,0,.3);
                    bottom:0;
                    font-family: 'PingFang-Medium';
                }
            }
            .rightCont{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
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
                        width:0.4rem;
                    }
                    span.dian{
                        margin:0 0.05rem;
                    }
                }
                .price{
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
            .joinCart{
            	right:0.4rem;
            	bottom:0.4rem;
                width:0.5rem;
                height:0.5rem;
            }
        }
        .styleNull{
			padding-top:2.7rem;
			img{
				margin:0 auto;
				width:2.53rem;
				height:1.77rem;
			}
        }
        .loadMore{
            padding:0.3rem 0 0.3rem 0;
            img{
                width:0.5rem;
                margin: 0 auto;
            }
            
        }
	}
</style>