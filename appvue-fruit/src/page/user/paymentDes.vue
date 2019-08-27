<template>
	<div class="paymentDes bg-f4f4f4">
		<x-header :left-options="{backText: ''}">收支明细</x-header>
		<div class="headBox bg-fff">
			<div class="bd-bt-eee">
				<img class="block bd-rd50" :src="getDes.store_logo" alt="">
				<p class="ft-30 color-333 bold text-center mg-tp20">{{getDes.store_name}}</p>
				<p class="money color-fc5920 bold text-center" v-if="getDes.type == 1">+{{getDes.amount}}</p>
				<p class="money color-333 bold text-center" v-else>-{{getDes.amount}}</p>
			</div>
		</div>
		<div class="paymentInfo bg-fff">
			<div class="ft-30 list-item flex flex-ac">
				<p class="color-666 cont1">当前状态</p>
				<p class="color-333 cont2">{{getDes.status}}</p>
			</div>
			<div class="ft-30 list-item flex flex-ac">
				<p class="color-666 cont1">商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品</p>
				<p class="color-333 cont2">{{getDes.note}}</p>
			</div>
			<div class="ft-30 list-item flex flex-ac">
				<p class="color-666 cont1">付款时间</p>
				<p class="color-333 cont2">{{getDes.create_time}}</p>
			</div>
			<div class="ft-30 list-item flex flex-ac">
				<p class="color-666 cont1">付款方式</p>
				<p class="color-333 cont2">{{getDes.pay_way}}</p>
			</div>
			<div class="ft-30 list-item flex flex-ac">
				<p class="color-666 cont1">订单编号</p>
				<p class="color-333 cont2">{{getDes.order_number}}</p>
			</div>
			<div class="ft-30 list-item flex flex-as">
				<p class="color-666 cont1">交易流水号</p>
				<p class="color-333 cont2">{{getDes.pay_number}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'paymentDes',
		data(){
			return{
				getDes:{}, //收支明细详情信息
			}
		},
		methods:{
			// 获取路由相关信息
			getParams(){
				var that = this;
				that.id = that.$route.params.id;
				// 获取收支明细详情
				that.paymentDes();
			},
			// 获取收支明细详情
			paymentDes(){
				var that = this;
				var data = that.id;
				that.$api.rechargeDes2(data).then(res => {
					if(res.code == 1){
						that.getDes = res.data;
					}
				})
			}
		},
		created(){
			var that = this;
			// 获取路由相关信息
			that.getParams();
		}
	}
</script>

<style lang="less" scoped>
	.paymentDes{
		min-height: calc(100vh - 0.88rem);
		.headBox{
			>div{
				margin:0 auto;
				width:92%;
				padding:0.5rem 0 0.6rem 0;
				img{
					margin: 0 auto;
					width:1.56rem;
					height:1.56rem;
				}
				.money{
					margin-top:0.5rem;
					font-size: 0.6rem;
				}
			}
			
		}
		.paymentInfo{
			padding:0.4rem 0.6rem;
			.list-item{
				margin-top:0.3rem;
				font-family: 'PingFang-Medium';
				.cont1{
					width:30%;
				}
				.cont2{
					width:70%;
					word-break: break-all;
				}
				&:nth-child(1){
					margin-top:0;
				}
			}
		}
	}
</style>