<template>
	<div class="userRec bg-f4f4f4">
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
		<div class="banner pd30 bg-fff">
			<img class="block" :src="banner" alt="" />
		</div>
		<div class="proList mg-tp10" v-if="goodShop.length > 0">
			<div class="list bg-fff clearfix">
				<div class="list-item pull-left relative" v-for="(item,index) in goodShop">
	    			<router-link :to="{name:'proDetails',params:{id:item.id}}" class="block">
	    				<img class="proImg block bd-rd8" :src="item.product_images" alt="" />
	        			<p class="title ft-26 one-line-ellipsis mg-tp20 line-h35 h40">
	        				<span v-if="item.product_tag" class="bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8 mg-rt10">{{item.product_tag}}</span>
	                        <span v-else class="inline-block h30 line-h30 bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8 mg-rt10">优选</span>
	        				<span>{{item.product_name}}</span>
	        			</p>
	        			<p class="color-fc5920 ft-28 mg-tp20">
	        				<span class="ft-22">￥</span><strong>{{item.product_fact_price}}</strong> <span class="mg-lt10 ft-24 color-999 line-through">￥{{item.product_price}}</span>
	        			</p>
	    			</router-link>
	    			<img @click="joinCart(index)" class="joinCart absolute" src="@/assets/images/common/joinCart.png" alt="" />
	    		</div>
			</div>
			<div class="loadMore text-center" v-if="isLoadMore">
    			<group>
			      	<cell v-for="(type, index) in types" :key="type">
			       		<spinner :type="type"></spinner>
			       		<p class="ft-26 color-666">正在加载更多</p>
			      	</cell>
			    </group>
    		</div>
			<div class="loadMore text-center" v-else>
	            <img class="block" src="@/assets/images/common/icon2.png" alt="" />
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
		name:'giftBox',
		data(){
			return{
				id:'', //商品分类id
                uid:'', //用户id
                oid:'', //行业id
                title:'', //头部标题
                cartNum:'', //购物车商品数量
                storeId:'', //当前门店id
				goodShop:[], //商品列表
				banner:'', //顶部banner图
				paged:1, //分页
				scrollWatch: true, //是否监听
				types:['ios-small'],
				isLoadMore:false,
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
			
			// 获取顶部banner图
            windowimg(){
            	var that = this;
            	var data = {
            		oid:that.oid,
            	}
            	that.$api.windowimg(data).then(res => {
            		console.log(res);
            		if(res.code == 1){
            			that.banner = res.data;
            		}
            	})
            },
            //获取商品列表
            getGoods(){
                var that = this;
                var params = {
                    oid:that.oid,
                    type:that.id,
                    sid:that.storeId,
                    paged:that.paged,
                }
                that.$apily.products(params).then(res =>{
                	if(res.code == 1 && res.data != ''){
						var arr = res.data;
		    			arr.forEach(item => {
		    				that.goodShop.push(item);
		    			})
		    			if(that.paged == 1 && arr.length < 5){
		    				that.isLoadMore = false;
			    			that.scrollWatch = false;
		    			}
		    			else{
		    				that.isLoadMore = true;
			    			that.scrollWatch = true;
		    			}
		    			that.paged++;
					}
					else{
		    			that.isLoadMore = false;
			    		that.scrollWatch = false;
			    	}
					
					setTimeout(() => {
						that.$vux.loading.hide();
					},500)
					
					if (that.scrollWatch) {
						window.addEventListener("scroll", that.handleScroll);
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

			// 加入购物车
			joinCart(index){
                var that = this;
                if(!that.uid){
                    that.$vux.toast.text("您还未登录哦！","middle")
                }
                var params = new FormData();
                params.append("uid",that.uid);
                params.append("pid",that.goodShop[index].id);
                params.append("shopid",that.storeId);
                params.append("num",1);
                params.append("oid",that.oid);
                params.append("shop_type",1);
                that.$apily.storecart2(params).then(res =>{
                    if(res.code == 1){
						that.$vux.toast.text("加入购物车成功！","middle")
						//获取购物车信息
                        that.getCart()
                    }
                })
            },
            //监听滚动
			handleScroll() {
				var that = this;
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
						//获取商品列表
						that.getGoods();
					}
				}
			},
        },
        mounted(){
			var that = this
			//获取用户信息
			that.getUser();
			//获取购物车信息
			that.getCart();
			// 获取顶部banner图
			that.windowimg();
			//获取商品列表
            that.getGoods();
        },
        destroyed() {
			var that = this;
			that.scrollWatch = false;
			window.removeEventListener('scroll', that.handleScroll)
		},
		components:{
            'v-backTop':backTop,
        }
	}
</script>

<style lang="less" scoped>
	.userRec{
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
		.banner{
			img{
				width:100%;
				height:3rem;
			}
		}
		.proList{
			.list{
				padding-bottom:0.6rem;
				.list-item{
					font-family: 'PingFang-Medium';
	                width:50%;
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
					.proImg{
	                    width:100%;
	                    height: 2.5rem
					}
					&.list-item:nth-child(odd){
						padding:0.3rem 0.15rem 0 0.15rem;
					}
					&.list-item:nth-child(even){
						padding:0.3rem 0.15rem 0 0.15rem;
					}
					.joinCart{
						bottom:0;
						right:0.3rem;
						width:0.39rem;
						height:0.39rem;
					}
					
				}
			}
		}
		.loadMore{
            padding:0.3rem 0 0.3rem 0;
            img{
                width:0.5rem;
                margin: 0 auto;
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
	}
</style>