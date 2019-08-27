<template>
	<div class="refundList bg-f4f4f4">
		<x-header :left-options="{backText: ''}">退款/协商</x-header>
		<div class="refundLists" v-if="list.length > 0">
			<div class="list-item mg-tp20 bd-rd10 pd-lr30 bg-fff" v-for="(item,index) in list">
    			<div class="orderStatus bd-bt-f4f4f4 pd-tb30 clearfix">
    				<div class="leftCont flex flex-ac pull-left">
    					<img class="block mg-rt20" src="@/assets/images/user/orderTime.png" alt="" />
    					<p class="ft-28 color-333">{{item.create_time}}</p>
    				</div>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.status == 7">已拒绝</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.status == 9">已退款</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.status == 10">退款中</p>
    				
    			</div>
    			<div class="proDes">
    				<div class="list-item pd-tb30 bd-bt-f4f4f4 flex flex-as" v-for="(item2,index) in item.order_info">
	    				<!--<router-link class="flex flex-as" :to="{name:'orderDes',params:{status:item.status}}">-->
							<div class="leftCont">
								<img class="block" :src="item2.product_images" alt="" />
							</div>
							<div class="rightCont mg-tp15">
								<p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item2.product_name}}</p>
								<div class="clearfix mg-tp30">
									<p class="ft-28 color-333 pull-left">
										单价：<span class="ft-24">￥</span><span>{{item2.product_fact_price}}</span>
									</p>
									<p class="pull-right ft-24 color-999 line-h35">×{{item2.num}}</p>
								</div>
							</div>
						<!--</router-link>-->
					</div>
    			</div>
    			<div class="footBox ft-24 pd-tb30">
					<div class="rightCont text-right flex flex-ac flex-je">
						<p class="color-1ccfcf inline-block ft-24 disPrice bd-rd5 mg-rt30" v-if="item.coupon_price">已优惠￥{{item.coupon_price}}</p>
						<p class="color-333 ft-28 mg-rt35">共{{item.total_sum}}件</p>
						<p class="color-333 ft-28">合计：</p>
						<p class="color-fc5920 ft-28">￥{{item.price}}</p>
					</div>
				</div>
				<div class="btnBox pd-tb30 bd-tp-f4f4f4">
					<div class="ft-28 text-center flex flex-ac flex-je">
                        <div class="payment h60 mg-rt30" v-if="item.status == 7">
							<router-link :to="{name:'refund',params:{id:item.id}}" class="block color-999">退款</router-link>
						</div>
						<div class="payment h60">
							<router-link :to="{name:'refundDes',params:{id:item.id}}" class="block color-1ccfcf">查看详情</router-link>
						</div>
					</div>
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
		<div v-else>
    		<div class="nullStyle">
    			<img class="block" src="@/assets/images/user/orderNull.png" alt="" />
				<p class="text-center ft-28 color-999 mg-tp30">暂无退款订单，看看其他订单吧~</p>
    		</div>
    	</div>
    	<v-backTop></v-backTop>
	</div>
</template>

<script>
	import backTop from '@/components/base/backTop.vue'
	export default{
		name:'refundList',
		data(){
			return{
				uid:'', //用户id
				paged:1, //分页
				list:[], //退款协商商品列表
				scrollWatch: true, //是否监听
				types:['ios-small'],
				isLoadMore:false,
			}
		},
		methods:{
			// 获取缓存相关信息
			getParams(){
				var that = this;
				that.uid = window.localStorage.getItem('uid');
			},
			// 获取退款协商列表信息
			getRefundList(){
				var that = this;
				that.$vux.loading.show({
					text:'加载中',
				})
				var data = {
					uid:that.uid,
					paged:that.paged,
					order_type:2,
					oid:that.$router.app.__proto__.$oid,
				}
				that.$api.hxOrder(data).then(res => {
					console.log(that.paged)
					if(res.code == 1 && res.data.list.length > 0){
						var arr = res.data.list;
		    			arr.forEach(item => {
		    				that.list.push(item);
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
			      	}, 500)
					
					if (that.scrollWatch) {
						window.addEventListener("scroll", that.handleScroll);
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
					//console.log("当前滚动条高度："+scrollTop)

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
						// 获取退款协商列表信息
						that.getRefundList();
						console.log("触底加载更多");
					}
				}
			},
		},
		created(){
			var that = this;
			// 获取缓存相关信息
			that.getParams();
			// 获取退款协商列表信息
			that.getRefundList();
		},
		components:{
            'v-backTop':backTop,
        },
		destroyed() {
			var that = this;
			that.scrollWatch = false;
			window.removeEventListener('scroll', that.handleScroll);
		},
	}
</script>

<style lang="less" scoped>
	.refundList{
		min-height: calc(100vh - 0.88rem);
		.refundLists{
			border-top:0.2rem solid #F4F4F4;
			width:6.9rem;
			margin:0 auto;
			.list-item{
				&.list-item:first-child{
					margin-top: 0;
				}
				.orderStatus{
					font-family: 'PingFang-Medium';
					.leftCont{
						img{
							width:0.41rem;
							height:0.41rem;
						}
					}
				}
				.proDes{
					.leftCont{
						width:30%;
						img{
							width:1.68rem;
							height:1.68rem;
						}
					}
					.rightCont{
						width:70%;
					}
				}
				.footBox{
					width:100%;
					.rightCont{
						width:100%;
						.disPrice{
							font-family: 'PingFang-Medium';
							padding:0.05rem 0.1rem;
							background:#E3F8F9;
						}
						p:last-child{
							font-family: 'PingFang-Medium';
						}
					}
				}
				.btnBox{
					font-family: 'PingFang-Medium';
					line-height:0.56rem;
					.qxOrder{
						width:1.5rem;
						border:0.02rem solid #999;
						border-radius:0.3rem;
					}
					.payment{
						width:1.5rem;
						border:0.02rem solid #1CCFCF;
						border-radius:0.3rem;
					}
				}
			}
			.loadMore{
	            padding-bottom:0.2rem;
	            img{
	                width:1rem;
	                margin: 0rem auto;
	            }
	        }
		}
		.nullStyle{
			padding-top:2rem;
			img{
				margin: 0 auto;
				width:2.53rem;
				height:1.77rem;
			}
        }
	}
</style>