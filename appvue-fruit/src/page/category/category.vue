<template>
	<div class="category" v-if="isShowPage">
		<!--search-->
		<div class="bg-1ccfcf header flex flex-ac pd-lr30">
            <router-link class="searchLink" :to="{name:'search'}">
                <div class="searchBox flex flex-ac bg-fff relative">
                    <div class="s_icon flex flex-ac">
                        <img src="@/assets/images/common/search.png" alt="" />
                    </div>
                    <input type="text" class="text-center ft-28" placeholder="搜索店铺商品" />
                </div>
            </router-link>
			<div class="rightCont flex flex-je">
                <router-link :to="{name:'userMessage'}">
                    <div class="m_icon flex flex-je relative">
                        <span v-if="isShowMsg" class="dian inline-block absolute bd-rd50 bg-fc5920"></span>
                        <img class="block" src="@/assets/images/common/message_f.png" alt="" />
                    </div>
                </router-link>
				<span class="ft-24 color-fff mg-tp8 text-center">消息</span>
			</div>
		</div>
		
		<div class="categoryList flex">
			<div class="categoryListLeft">
				<div class="list-item text-center" v-for="(item,index) in categoryListLeft" @click="catgoryTabClcik(index)">
					<p class="ft-30 color-333 name" :class="curIndex == index ? 'bg-1ccfcf color-fff' : ''">{{item.category_name}}</p>
				</div>
			</div>
			<div class="categoryListRight" v-if="categoryListRight.length > 0">
				<div class="list-item pd30" :class="categoryListRight.length > 1 ? 'bd-bt-eee' : ''">
					<div class="banner">
						<!--<img class="block" :src="item.banner" alt="" />-->
						<img class="block" src="@/assets/images/index/banner.jpg" alt="" />
					</div>
					<div class="proList flex mg-tp30">
						<!--<div class="list-item mg-bt30" v-for="(item2,index) in item.proList">-->
							<div class="list-item mg-bt30" v-for="(item,index) in categoryListRight">
							<router-link class="block" :to="{name:'proDetails',params:{id:item.id}}">
								<div class="proImg mg-rt40">
									<!--<img class="block bd-rd8" :src="item.product_images" alt="" />-->
                                    <div class="recommendImageContainer">
                                    <div class="coverImg" :style="{ backgroundImage: `url(${item.product_images})`}"></div>
                                    </div> 
									<div class="title mult_line-ellipsis ft-26 mg-tp20 line-h40">
										<span v-if="item.product_tag" class="bg-fc5920 bd-rd8 ft-20 color-fff pd-lr10">{{item.product_tag}}</span>
			                            <span v-else class="bg-fc5920 bd-rd8 ft-20 color-fff pd-lr10 h30 line-h30">优选</span>
										<span class="mult_line-ellipsis">{{item.product_name}}</span>
									</div>
									<p class="flex flex-ac ft-26">
										<span class="ft-30 color-fc5920 mg-rt10">￥{{item.product_fact_price}}</span>
										<span class="ft-26 color-999 line-through">￥{{item.product_price}}</span>
									</p>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="categoryListRight flex flex-as flex-jc">
				<div class="loadMore text-center">
		            <p class="ft-28 mg-tp50 color-333">暂无商品~</p>
		       	</div>
	       	</div>
		</div>
		<v-backTop></v-backTop>
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
	export default{
		name:"category",
		data(){
			return{
				curIndex:0, //选项卡标题下标
				isShowPage:true, //是否有网络
				isShowMsg:'', //是否显示未读消息红点
				paged:1, //分页
				footer: { first: "", second: "", third: "", fourth: "", fifth:"active"}, //页脚选中高亮
				categoryListLeft:[], //分类左侧选项卡标题
				categoryListRight:[], //当前分类商品列表
			}
		},
		methods:{
			// 获取路由信息
			getParams(){
				var that = this;
				that.uid = window.localStorage.getItem('uid');
				that.clickId = window.localStorage.getItem("clickId");
				that.oid = that.$router.app.__proto__.$oid;
			},
			// 分类左侧选项卡点击选中
			catgoryTabClcik(index,paged){
				var that = this;
				var t = that.categoryListLeft;
				that.$vux.loading.show({
					text:'加载中.'
                })
                //切换tab栏的请求
               	if(that.curIndex!=index){
                   that.paged = 1;
                   that.categoryListRight = [];
                   that.scrollWatch = false;
               	}
               	else{
               		if(paged){
                		that.paged = paged;
                	}
               		else{
               			that.paged = 1;
               			that.categoryListRight = [];
               			that.scrollWatch = false;
               		}
               	}
                that.tabId = t[index].id;
                var params = {
                    oid:that.oid,
                    cid:that.tabId,
                    sid:that.clickId,
                    paged:that.paged,
                }
                that.$apily.products(params).then(res =>{
                    if(res.code == 1 && res.data != ''){
                        var arr = res.data;
                        arr.forEach(item => {
		    				that.categoryListRight.push(item);
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
                that.curIndex = index;
			},
			// 获取当前分类下的商品
			getProList(index){
				var that = this;
				var params = {
                    oid:that.oid,
                }
                that.$apily.procategory(params).then(res =>{
                    that.categoryListLeft = res.data;
                    console.log( that.categoryListLeft)
                    that.tabId = that.categoryListLeft[index].id;
                    //获取第一栏商品列表
                    // var params = {
                    //     oid:that.oid,
                    //     cid:that.tabId,
                    //     sid:that.clickId,
                    //     paged:that.paged,
                    // }
                    // that.$apily.products(params).then(res =>{
                    //     if(res.code == 1){
                    //         that.categoryListRight = res.data;
                    //     }
					// })
					that.catgoryTabClcik(that.curIndex,that.paged);
                })
			},
			//获取消息数量
            getMsg(){
                var that = this;
                var params = {
                    uid:that.uid,
                    oid:that.oid,
                }
                that.$apily.message(params).then(res =>{
                    if(res.code == 1){
                        if(res.data){
                           that.isShowMsg = res.data.message_count;
                        }
                    }
                })
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
					// 获取路由信息
					that.getParams();
					// 获取当前分类下的商品
			    	that.getProList(that.curIndex);
		       	 	that.getMsg();
			    }
			},
			// 检查网络连接
			checkConnection(){
				var that = this;
				// 电脑上调试需解开下面三行代码注释
				that.getParams();
				that.getProList(that.curIndex);
				that.getMsg();

				var networkState = navigator.connection.type;
			    if (networkState === Connection.NONE) {
			      	that.isShowPage = false;
			      	that.$vux.toast.text('网络错误，请检查网络连接','bottom');
			    }
			    else{
					that.isShowPage = true;
					// 获取路由信息
					that.getParams();
					// 获取当前分类下的商品
			    	that.getProList(that.curIndex);
		       	 	that.getMsg();
			    }
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
					console.log("当前滚动条高度："+scrollTop)

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
							text: "加载中",
						});
						that.catgoryTabClcik(that.curIndex,paged);
						console.log("触底加载更多");
					}
				}
			},
		},
		created(){
			var that = this;
			if(window.localStorage.getItem('groupIndex')){
				window.localStorage.removeItem('groupIndex');
            }
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
			that.scrollWatch = false;
			window.removeEventListener('scroll', that.handleScroll);
			document.removeEventListener("offline", that.offline, false);
		},
	}
</script>

<style lang="less" scoped>
    .recommendImageContainer{
        height:2rem;
    }
    div.coverImg{
        height:100%;
        background-size:cover;
        background-position:center;
    }
	.category{
		min-height: calc(100vh - 1.88rem);
		.header{
			position:fixed;
			top:0;
			width:100%;
			height:0.88rem;
			z-index:999;
            .searchLink{
                width: 90%;
                .searchBox{
	                border-radius:0.29rem;
	                a{  
	                    height: 0.58rem;
	                }
					.s_icon{
	                    padding-left: 0.2rem;
						img{
							height:0.25rem;
						}
					}
					input{
						width:70%;
	                    height:0.58rem;
	                    line-height: 0.58rem;
	                    border-radius:0.29rem;
	                    text-align: left;
	                    padding-left: 0.2rem;
					}
					input::placeholder{
						font-size: 0.24rem;
						color:#999;
						line-height: 0.58rem;
						background:#fff;
					}
				}
            }
			.rightCont{
				width:10%;
				.m_icon{
					margin-top:0.05rem;
					img{
						margin:0 auto;
						width:0.4rem;
						height:0.36rem;
					}
					.dian{
						top:0;
						right:0;
						width:0.12rem;
						height:0.12rem;
					}
				}
				.mg-tp8{
					margin-top:0.08rem;
				}
			}
		}
		.categoryList{
			width:100%;
			position: relative;
			.categoryListLeft{
				width:30%;
				height: calc(100vh - 1.88rem);
				/*border-right:0.02rem solid #F4F4F4;*/
				overflow: hidden;
				overflow-y: scroll;
				position: fixed;
				left: 0;
				.list-item{
					margin:0 auto;
					margin-top:0.6rem;
					width:70%;
					.name{
						width:100%;
						height:0.48rem;
						line-height:0.48rem;
						border-radius:0.24rem;
					}
					&:first-child{
						margin-top:0.75rem;
					}
					&:last-child{
						margin-bottom:0.3rem;
					}
				}
			}
			.categoryListRight{
				width:70%;
				// height: calc(100vh - 1.88rem);
				// overflow: hidden;
				// overflow-y: scroll;
				position: absolute;
				right: 0;
				padding-bottom: 0.98rem;
				.list-item{
					width:100%;
					.banner,img{
						width:100%;
					}
					.proList{
						width:100%;
						.list-item{
							width:48%;
							font-family: 'PingFang-Medium';
							.proImg{
								width:100%;
								img{
									width:2.2rem;
									height:2rem;
								}
								.title{
                                    color:#333;
                                    margin-bottom: 0.15rem;
                                    padding: 0;
									span{
                                        vertical-align: middle;
                                    }
                                    :last-child{
                                        display: inline;
                                    }
                                    
								}
							}
							&:nth-child(odd){
								margin-right:4%;
							}
							&:last-child{
								border-bottom:none;
							}
						}
					}
				}
				.loadMore{
	                padding:0.1rem 0 0.1rem 0;
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