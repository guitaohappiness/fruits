<template>
	<div class="verGoodDes bg-f4f4f4">
		<x-header :left-options="{backText: ''}">
			订单详情<a slot="right" :href="'tel:' + orderDes.shop_phone"><img src="@/assets/images/common/phone.png" alt="" /></a>
		</x-header>
		<div class="headBox relative">
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_wait.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">等待进店核销</p>
					<p class="ft-26 color-333 mg-tp20 line-h40">请于{{orderDes.receivingtime}}前到店核销商品如有特殊情况，请联系在线客服！</p>
				</div>
			</div>
		</div>
		<div class="finish_time pd30 bg-fff mg-tp30" v-if="orderDes.type == 3">
			<p class="ft-28 end_time flex flex-ac">
				<span class="h30 line-h30 pd-lt10 line">拼团成功</span>
			</p>
			<div class="flex flex-ac joined mg-tp20">
				<img class="block mg-rt10 bd-rd8" v-for="(item,index) in orderDes.avatar" v-if="item != '' && item != null" :src="item" alt="" />
				<img class="block mg-rt10 bd-rd8" v-for="(item,index) in orderDes.avatar" v-if="item == '' || item == null" src="@/assets/images/user/default.png" alt="" />
				<img class="block mg-rt10" v-for="(item,index) in orderDes.group_num" v-if="index < 6" src="@/assets/images/group/groupNum.png" alt="" />
				<p class="mg-lt20 ft-24 color-333">总共<span class="color-fc5920">{{orderDes.quorum}}人</span>成团</p>
			</div>
		</div>
		<div class="proDes bg-fff mg-tp30">
			<div class="list-item" v-for="(item,index) in orderDes.order_info">
				<router-link class="block" :to="{name:'proDetails',params:{id:item.id}}" v-if="item.shop_type == 1">
					<div class="flex flex-ac proInfo bd-bt-f4f4f4">
						<div class="leftCont">
							<img class="block" :src="item.product_images" alt="" />
						</div>
						<div class="rightCont">
							<p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item.product_name}}</p>
							<div class="clearfix mg-tp30">
								<p class="ft-28 color-333 pull-left">
									单价：<span class="ft-24">￥</span><span>{{item.product_fact_price}}</span>
								</p>
								<p class="pull-right ft-24 color-999 line-h35">×{{item.num}}</p>
							</div>
						</div>
					</div>
				</router-link>
				<router-link class="block" :to="{name:'specialDes',params:{id:item.id}}" v-if="item.shop_type == 2">
					<div class="flex flex-ac proInfo bd-bt-f4f4f4">
						<div class="leftCont">
							<img class="block" :src="item.product_images" alt="" />
						</div>
						<div class="rightCont">
							<p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item.product_name}}</p>
							<div class="clearfix mg-tp30">
								<p class="ft-28 color-333 pull-left">
									单价：<span class="ft-24">￥</span><span>{{item.product_fact_price}}</span>
								</p>
								<p class="pull-right ft-24 color-999 line-h35">×{{item.num}}</p>
							</div>
						</div>
					</div>
				</router-link>
				<router-link class="block" :to="{name:'groupDetails',params:{id:item.id}}" v-if="item.shop_type == 3">
					<div class="flex flex-ac proInfo bd-bt-f4f4f4">
						<div class="leftCont">
							<img class="block" :src="item.product_images" alt="" />
						</div>
						<div class="rightCont">
							<p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item.product_name}}</p>
							<div class="clearfix mg-tp30">
								<p class="ft-28 color-333 pull-left">
									单价：<span class="ft-24">￥</span><span>{{item.product_fact_price}}</span>
								</p>
								<p class="pull-right ft-24 color-999 line-h35">×{{item.num}}</p>
							</div>
						</div>
					</div>
				</router-link>
			</div>
			<div class="totalPrice h90 flex flex-ac flex-je pd-lr30">
				<p class="color-1ccfcf inline-block ft-24 disPrice bd-rd5 mg-rt30" v-show="orderDes.coupon_price">已优惠￥{{orderDes.coupon_price}}</p>
				<p class="ft-26 color-333 mg-rt30">共{{orderDes.total_sum}}件</p>
				<p class="ft-26 color-333">实付总额：<span class="price color-fc5920">￥{{orderDes.price}}</span></p>
			</div>
		</div>
		<div class="hx_info bg-fff mg-tp20">
			<div class="pd-lr30 h90 flex flex-ac bd-bt-f4f4f4">
				<p class="title h30 line-h30 pd-lt10 ft-28">核销信息</p>
			</div>
			<div class="pd30">
				<div class="clearfix">
					<p class="color-666 ft-26 pull-left">核销商家</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.name}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-333 ft-26 text-right">{{orderDes.store_address}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">核销时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.receivingtime}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">预留手机</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.address_info}}</p>
				</div>
			</div>
		</div>
		<div class="hx_info bg-fff mg-tp20 ft-28">
			<div class="pd-lr30 h90 flex flex-ac bd-bt-f4f4f4">
				<p class="title h30 line-h30 pd-lt10 ft-28">订单信息</p>
			</div>
			<div class="pd30">
				<div class="clearfix">
					<p class="color-666 ft-26 pull-left">订单编号</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.order_num}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">交易流水号</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.paynumber}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">下单时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.create_time}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">付款时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.paytime}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">备注</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.note}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'verGoodDes',
		data(){
			return{
				orderDes:{}, //订单详细信息
			}
		},
		methods:{
			// 获取路由信息
			getParams(){
				var that = this;
				that.id = that.$route.params.id;
			},
			// 获取订单详情
			getVerDes(){
				var that = this;
				var data = that.id;
				that.$api.orderDes(data).then(res => {
					that.orderDes = res.data;
				})
			}
		},
		created(){
			var that = this;
			// 获取路由信息
			that.getParams();
			// 获取订单详情
			that.getVerDes();
		}
	}
</script>

<style lang="less" scoped>
	.verGoodDes{
		min-height: calc(100vh - 0.8rem);
		.headBox{
			margin-top:-0.08rem;
			width:100%;
			height:2.8rem;
			background:url('../../assets/images/user/orderBg.png');
			background-size:cover;
			.hx_status{
				padding:0.3rem 0.3rem 0.3rem 0.2rem;
				margin:0 auto;
				margin-left:3%;
				width:92%;
				bottom:0;
				.leftCont{
					width:28%;
					img{
						width:1.5rem;
						height:1.5rem;
					}
				}
				.rightCont{
					.status{
						font-family: 'PingFang-Medium';
					}
					width:72%;
				}
			}
		}
		.finish_time{
			.end_time{
				font-family: 'PingFang-Medium';
				span.line{
					border-left:0.04rem solid #1CCFCF;
				}
				span.times{
					width:0.4rem;
				}
				span.dian{
					margin:0 0.05rem;
				}
			}
			.joined{
				img{
					width:0.6rem;
					height:0.6rem;
				}
			}
		}
		.proDes{
			.proInfo{
				padding:0.3rem 0.3rem 0.4rem 0.3rem;
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
			.totalPrice{
				.disPrice{
					font-family: 'PingFang-Medium';
					padding:0.05rem 0.1rem;
					background:#E3F8F9;
				}
				.price{
					font-family: 'PingFang-Medium';
				}
			}
		}
		.hx_info{
			.title{
				font-family: 'PingFang-Medium';
				border-left:0.04rem solid #1CCFCF;
			}
		}
	}
</style>