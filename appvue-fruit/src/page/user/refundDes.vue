<template>
	<div class="refundDes bg-f4f4f4">
		<x-header :left-options="{backText: ''}">
			退款详情<a slot="right" :href="'tel:' + orderDes.shop_phone"><img src="@/assets/images/common/phone.png" alt="" /></a>
		</x-header>
		<div class="headBox relative">
			<div class="absolute pd30 bd-rd10 hx_status bg-fff flex flex-ac">
				<div class="rightCont">
					<p class="ft-32 color-333 status" v-if="orderDes.status == 7">已拒绝</p>
					<p class="ft-32 color-333 status" v-if="orderDes.status == 9">退款成功</p>
					<p class="ft-32 color-333 status" v-if="orderDes.status == 10">退款中</p>
					<p class="date ft-24 color-999 mg-tp10 pd-bt20 bd-bt-f4f4f4">{{orderDes.returnTime}}</p>
					<p class="ft-26 color-333 h90 line-h90 color-333 bd-bt-f4f4f4">因商家超时未处理，交易支持退款</p>
					<p class="ft-26 color-333 h90 line-h90 color-333 bd-bt-f4f4f4">
						退款总金额：<span class="color-fc5920 refundPrice">￥{{orderDes.price}}</span>
					</p>
					<div class="btn ft-28 color-999 pd-tp30">
						注：退款时钱会按原路返回
					</div>
				</div>
			</div>
		</div>
		<div class="proDes bg-fff">
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
			<div class="totalPrice flex flex-ac flex-je pd30">
				<p class="color-1ccfcf inline-block ft-24 disPrice bd-rd5 mg-rt30" v-if="orderDes.coupon_price">已优惠￥{{orderDes.coupon_price}}</p>
				<p class="ft-26 color-333 mg-rt30">共{{orderDes.total_sum}}件</p>
				<p class="ft-26 color-333">实付总额：<span class="price color-fc5920">{{orderDes.price}}</span></p>
			</div>
		</div>
		<div class="hx_info bg-fff mg-tp20 mg-bt20 ft-28">
			<div class="pd-lr30 h90 flex flex-ac bd-bt-f4f4f4">
				<p class="title h30 line-h30 pd-lt10 ft-28">退款信息</p>
			</div>
			<div class="pd30">
				<div class="clearfix">
					<p class="color-999 ft-26 pull-left">退款类型</p>
					<p class="color-333 ft-26 pull-right" v-if="orderDes.type == 1">普通订单</p>
					<p class="color-333 ft-26 pull-right" v-if="orderDes.type == 2">核销订单</p>
					<p class="color-333 ft-26 pull-right" v-if="orderDes.type == 3">拼团核销订单</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-999 ft-26 pull-left">退款原因</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.proof_cause}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-999 ft-26 pull-left">退款金额</p>
					<p class="color-333 ft-26 pull-right">￥{{orderDes.price}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-999 ft-26 pull-left">申请时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.returnTime}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-999 ft-26 pull-left">退款编号</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.refundnumber}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-999 ft-26 pull-left">退款描述</p>
					<p class="color-333 ft-26 pull-right desc line-h40">{{orderDes.proof_content}}</p>
				</div>
				<div class="uploadImg bg-fff mg-tp20">
					<p class="ft-26 color-999">上传凭证</p>
					<div class="list mg-tp20 flex flex-ac">
						<div class="list-item inline-block bd-rd4 mg-rt20 relative" v-for="(item,index) in list">
							<img class="block bd-rd8" :src="item">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'refundDes',
		data(){
			return{
				id:'', //商品id
				orderDes:{}, //退款订单详情
			}
		},
		methods:{
			// 获取路由信息
			getParams(){
				var that = this;
				that.id = that.$route.params.id;
			},
			// 获取退款订单详情
			getRefundDes(){
				var that = this;
				var data = that.id;
				that.$api.orderDes(data).then(res => {
					that.orderDes = res.data;
					that.list = res.data.proof_img;
				})
			}
		},
		created(){
			var that = this;
			// 获取路由信息
			that.getParams();
			// 获取退款订单详情
			that.getRefundDes();
		}
	}
</script>

<style lang="less" scoped>
	.refundDes{
		min-height: calc(100vh - 0.8rem);
		.headBox{
			margin-top:-0.08rem;
			width:100%;
			height:2.8rem;
			background:url('../../assets/images/user/orderBg.png');
			background-size:cover;
			.hx_status{
				margin:0 auto;
				margin-left:4%;
				width:92%;
				top:0.5rem;
				.rightCont{
					width:100%;
					.status,.refundPrice{
						font-family: 'PingFang-Medium';
					}
					.btn{
						width:100%;
						span{
							width:1.5rem;
							border:0.02rem solid #1CCFCF;
							border-radius:0.3rem;
							line-height: 0.46rem;
						}
					}
				}
			}
		}
		.proDes{
			margin-top:2rem;
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
				.price{
					font-family: 'PingFang-Medium';
				}
				.disPrice{
					font-family: 'PingFang-Medium';
					padding:0.05rem 0.1rem;
					background:#E3F8F9;
				}
			}
		}
		.hx_info{
			.title{
				font-family: 'PingFang-Medium';
				border-left:0.04rem solid #1CCFCF;
			}
			.desc{
				word-break: break-all;
			}
			.uploadImg{
				.list{
					.list-item{
						width:1.3rem;
						height:1.3rem;
						border:0.01rem dashed #ccc;
						img{
							width:100%;
							height:100%;
						}
						.delete{
							position: absolute;
							top: -0.12rem;
							right: -0.12rem;
							width: 0.24rem;
							height: 0.24rem;
						}
					}
					.addImg{
						width:1.3rem;
						height:1.3rem;
						border:0.01rem dashed #ccc;
						.upload_img{
							width:0.42rem;
							height:0.32rem;
						}
						
					}
					#uploadImg{
						position:absolute;
						display:none;
					}
				}
			}
		}
	}
</style>