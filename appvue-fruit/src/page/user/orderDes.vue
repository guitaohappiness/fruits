<template>
	<div class="orderDes bg-f4f4f4">
		<x-header :left-options="{backText: ''}">
			订单详情<a slot="right" :href="'tel:' + orderDes.shop_phone"><img src="@/assets/images/common/phone.png" alt="" /></a>
		</x-header>
		<div class="headBox relative">
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.status == 1">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/waitPayment.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">订单待付款</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">商品数量有限，赶快去付款吧！</p>
					<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20" @click="payWay"> 
						<span class="h50 inline-block">付款</span>
					</div>
				</div>
			</div>
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.type == 1 && orderDes.status == 2">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_wait.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">等待商家配送</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">您的订单已付款，请耐心等待商家配送。</p>
					<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20">
                        <span class="qxOrder color-999 mg-rt30" @click="refund">
                        	退款
						</span>
						<span class="h50 inline-block" @click="hint_ps">提醒配送</span>
					</div>
				</div>
			</div>
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="(orderDes.type == 1 && orderDes.status == 3) || (orderDes.type == 1 && orderDes.status == 7)">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_ps.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">商品配送中</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">商品正在配送中，请保持电话畅通~</p>
					<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20">
						<span class="h50 inline-block" @click="comReceipt()">确认收货</span>
					</div>
				</div>
			</div>
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.type == 2 && orderDes.status == 3">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_ps.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">等待到店核销</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">感谢您对我们的信任，欢迎下次光临~</p>
					<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20">
						<span class="h50 inline-block" @click="buyAgain">再次购买</span>
					</div>
				</div>
			</div>
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.type == 1 && orderDes.status == 4">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_com.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">配送成功</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">感谢您对我们的信任，欢迎下次光临~</p>
					<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20">
                        <span class="h50 inline-block" @click="buyAgain">再次购买</span>
                        <!--<router-link style="border:0" :to="{name:'specialDes',params:{id:orderDes.order_info[0].id}}">
                            <span v-if="orderDes.type == 1&&orderDes.order_info[0].shop_type == 2" class="h50 inline-block" style="border-color:#1CCFCF;color:#1CCFCF">再次购买</span>
                        </router-link>
                        <router-link :to="{name:'groupOrderDes',params:{id:orderDes.id}}"><span v-if="orderDes.type == 3" class="h50 inline-block" style="border-color:#1CCFCF">再次购买</span></router-link>-->
					</div>
				</div>
			</div>
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.type == 2 && orderDes.status == 4">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_com.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">到店核销成功</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">感谢您对我们的信任，欢迎下次光临~</p>
					<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20">
						<span class="h50 inline-block" @click="buyAgain">再次购买</span>
					</div>
				</div>
			</div>
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.status == 6">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_close.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">交易关闭</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">已取消订单</p>
					<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20">
						<span class="h50 inline-block" @click="buyAgain">重新购买</span>
					</div>
				</div>
			</div>
		</div>
		<div class="proDes bg-fff mg-tp30">
			<div class="list-item" v-for="(item,index) in orderDes.order_info">
				<div class="proInfo bd-bt-f4f4f4" v-if="item.shop_type == 1">
					<router-link class="flex flex-ac" :to="{name:'proDetails',params:{id:item.id}}">
						<div class="leftCont">
							<img class="block bd-rd8" :src="item.product_images" alt="" />
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
					</router-link>
					<div class="refundBox mg-tp10 flex flex-je" v-if="orderDes.status == 4 && orderDes.order_info.length == index + 1">
						<span class="color-1ccfcf ft-24 refund bd-rd5" @click="refund">退款/协商</span>
					</div>
				</div>
				<div class="proInfo bd-bt-f4f4f4" v-if="item.shop_type == 2">
					<router-link class="flex flex-ac" :to="{name:'specialDes',params:{id:item.id}}">
						<div class="leftCont">
							<img class="block bd-rd8" :src="item.product_images" alt="" />
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
					</router-link>
					<div class="refundBox mg-tp10 flex flex-je" v-if="orderDes.status == 4 && orderDes.order_info.length == index + 1">
						<span class="color-1ccfcf ft-24 refund bd-rd5" @click="refund">退款/协商</span>
					</div>
				</div>
			</div>
			
			<div class="totalPrice h90 flex flex-ac flex-je pd-lr30">
				<p class="color-1ccfcf inline-block ft-24 disPrice bd-rd5 mg-rt30" v-show="orderDes.coupon_price">已优惠￥{{orderDes.coupon_price}}</p>
				<p class="ft-26 color-333 mg-rt30">共{{orderDes.total_sum}}件</p>
				<p class="ft-26 color-333">实付总额：<span class="price color-fc5920">￥{{orderDes.price}}</span></p>
			</div>
		</div>
		<div class="hx_info bg-fff mg-tp20" v-if="orderDes.type == 1">
			<div class="pd-lr30 h90 flex flex-ac bd-bt-f4f4f4">
				<p class="title h30 line-h30 pd-lt10 ft-28">配送信息</p>
			</div>
			<div class="pd30">
				<div class="clearfix">
					<p class="color-666 ft-26 pull-left">配送服务</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.name}}自主配送</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">配送时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.period_time}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">配送地址</p>
					<p class="color-333 ft-26 pull-right">{{address_info.l_name}}-{{address_info.l_phone}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-333 ft-26 text-right">{{address_info.l_province}}{{address_info.l_city}}{{address_info.l_district}}{{address_info.l_address}}</p>
				</div>
			</div>
		</div>
		<div class="hx_info bg-fff mg-tp20" v-else>
			<div class="pd-lr30 h90 flex flex-ac bd-bt-f4f4f4">
				<p class="title h30 line-h30 pd-lt10 ft-28">核销商家</p>
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
		<div class="hx_info bg-fff mg-tp20 ft-28" v-if="orderDes.type == 1">
			<div class="pd-lr30 h90 flex flex-ac bd-bt-f4f4f4">
				<p class="title h30 line-h30 pd-lt10 ft-28">订单信息</p>
			</div>
			<div class="pd30">
				<div class="clearfix">
					<p class="color-666 ft-26 pull-left">订单编号</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.order_num}}</p>
				</div>
				<div class="clearfix mg-tp20" v-if="orderDes.status == 2||orderDes.status == 3||orderDes.status == 4">
					<p class="color-666 ft-26 pull-left">交易流水号</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.paynumber}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">下单时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.create_time}}</p>
				</div>
				<div class="clearfix mg-tp20" v-if="orderDes.status == 2||orderDes.status == 3||orderDes.status == 4">
					<p class="color-666 ft-26 pull-left">付款时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.paytime}}</p>
				</div>
				<div class="clearfix mg-tp20" v-if="orderDes.status == 3||orderDes.status == 4">
					<p class="color-666 ft-26 pull-left">接单时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.shiptime}}</p>
				</div>
				<div class="clearfix mg-tp20" v-if="orderDes.status == 4">
					<p class="color-666 ft-26 pull-left">收货时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.receivingtime}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">备注</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.note}}</p>
				</div>
			</div>
		</div>
		<div class="hx_info bg-fff mg-tp20 ft-28" v-else>
			<div class="pd-lr30 h90 flex flex-ac bd-bt-f4f4f4">
				<p class="title h30 line-h30 pd-lt10 ft-28">订单信息</p>
			</div>
			<div class="pd30">
				<div class="clearfix">
					<p class="color-666 ft-26 pull-left">订单编号</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.order_num}}</p>
				</div>
				<div class="clearfix mg-tp20" v-if="orderDes.status == 2||orderDes.status == 3||orderDes.status == 4">
					<p class="color-666 ft-26 pull-left">交易流水号</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.paynumber}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">下单时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.create_time}}</p>
				</div>
				<div class="clearfix mg-tp20" v-if="orderDes.status == 2||orderDes.status == 3||orderDes.status == 4">
					<p class="color-666 ft-26 pull-left">付款时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.paytime}}</p>
				</div>
				<!--<div class="clearfix mg-tp20" v-if="orderDes.status == 3||orderDes.status == 4">
					<p class="color-666 ft-26 pull-left">接单时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.shiptime}}</p>
				</div>-->
				<!--<div class="clearfix mg-tp20" v-if="orderDes.status == 4">
					<p class="color-666 ft-26 pull-left">收货时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.receivingtime}}</p>
				</div>-->
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">备注</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.note}}</p>
				</div>
			</div>
		</div>
        <div class="black_cover" v-if="isCloseModal2">
			<div class="payList bg-fff">
				<div class="clearfix head h100 line-h100 pd-lr30 bd-bt-f4f4f4 relative">
		    		<p class="pull-left ft-28 color-333">选择支付方式</p>
		    		<img class="block pull-right absolute" @click="closeModal" src="@/assets/images/common/closeModal.png" alt="" />
		    	</div>
		    	<div class="list pd-lr30">
		    		<div class="list-item bd-bt-f4f4f4 pd-tb30 clearfix" v-for="(item,index) in payList" @click="choosePay(index)">
		    			<div class="leftCont flex flex-ac pull-left">
		    				<img class="block mg-rt20" :src="item.img" alt="" />
		    				<p class="ft-28 color-333">{{item.name}}</p>
		    			</div>
		    			<div class="rightCont pull-right" v-if="curIndex == index">
		    				<img class="block" src="@/assets/images/index/payWay.png" alt="" />
		    			</div>
		    		</div>
		    	</div>
		    	<div class="h100 line-h100 payment bg-1ccfcf text-center ft-28 color-fff" @click="payment(curIndex)">去支付</div>
			</div>
		</div>
		<!--钱包支付-->
		<div class="black_cover" v-if="isShowModal2">
			<div class="payList bg-fff">
				<div class="clearfix head h100 line-h100 pd-lr30 bd-bt-f4f4f4 relative">
		    		<p class="pull-left ft-32 color-333 text-center width-full">请输入支付密码</p>
		    		<img class="block pull-right absolute" @click.stop="closeModal2" src="@/assets/images/common/closeModal.png" alt="" />
		    	</div>
		    	<div class="list2 pd-lr30">
		    		<p class="pd-tb30 ft-28 color-333 text-center">{{payInfo.name}}</p>
		    		<p class="color-333 bold price text-center">￥{{payInfo.price}}</p>
		    		<div class="passwordBox bd-bt-eee">
		    			<div class="h60 line-h60 flex flex-ac">
			    			<div class="leftCont color-333 ft-32">密码</div>
			    			<div class="rightCont flex flex-ac">
			    				<input type="password" v-model="password" maxlength="16" class="ft-36" />
			    			</div>
			    		</div>
		    		</div>
		    		<button class="h80 line-h80 payment bg-1ccfcf text-center ft-32 color-fff block bd-rd8" :disabled="disabled" @click.stop="payment2()">立即支付</button>
		    		<p class="mg-tp30 color-666 ft-28 text-center pd-bt40">支付密码为手机号登录密码</p>
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
                uid:'', //用户id
                oid:'', //行业id
                orsid:'',//订单号
                id:'', //商品id
                sid:'', //门店id
				orderDes:'', //订单详细信息
                address_info:[], //用户配送地址相关信息
                isCloseModal2:false, //是否显示支付方式弹窗
                payList:[ //支付方式
					{name:'微信',img:require('@/assets/images/index/wx.png')},
					{name:'支付宝',img:require('@/assets/images/index/zfb.png')},
					{name:'钱包',img:require('@/assets/images/index/wallet-icon.png')},
                ],
                curIndex:0, //选中的支付方式下标
                isShowModal2:false, //是否显示钱包支付弹窗
				disabled:false, //钱包立即支付按钮禁用
				password:'', //钱包支付密码输入框内容
			}
		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.id = that.$route.params.id;
                that.uid = window.localStorage.getItem("uid")
                that.sid = window.localStorage.getItem("clickId")
                that.oid = that.$router.app.__proto__.$oid;
			},
			// 获取订单详细信息
			getorderDes(){
				var that = this;
				that.$vux.loading.show({
					text:'加载中',
				})
				var data = that.id;
				that.$api.orderDes(data).then(res => {
					that.orderDes = res.data;
					that.address_info = res.data.address_info;
				})
				setTimeout(() => {
					that.$vux.loading.hide();
				},500)
            },

			// 提醒配送按钮
            hint_ps(){
		    	var that = this;
		    	this.$vux.loading.show({
			       text: '加载中'
			    })
                var data = new FormData
                data.append("sid",that.orderDes.sid)
                data.append("uid",that.uid)
                data.append("order_id",that.orderDes.id)

		    	that.$apily.remind(data).then(res => {
		    		console.log(res);
		    		if(res.code == 1){
		    			setTimeout(() => {
				    		this.$vux.loading.hide();
				    		that.$vux.toast.text(res.msg,'middle');
				    	},1000)
		    		}
		    		else{
		    			setTimeout(() => {
		    				that.$vux.loading.hide();
		    				that.$vux.toast.text('操作失败！','middle');
				    	},1000)
		    		}
		    	})
		    	
			},
			// 确认收货按钮
            comReceipt(){
		    	var that = this;
		    	that.$vux.confirm.show({
		    		title:'提示',
		    		content:'确认收货吗？',
		    		onConfirm(){
		    			that.$vux.loading.show({
					       text: '加载中'
					    })
		    			var data = that.orderDes.id + "?type_status=2";
		    			that.$api.deleteOrder(data).then(res => {
		    				if(res.code == 1){
				    			setTimeout(() => {
									that.$vux.toast.text('操作成功！','middle');
									// 获取订单详细信息
						    		that.getorderDes();
						    	},1000)
				    			//that.$router.push({name:'orderList',params:{type:4}});
				    		}
				    		else{
				    			setTimeout(() => {
				    				that.$vux.loading.hide();
				    				that.$vux.toast.text('操作失败！','middle');
						    	},1000)
				    		}
		    			})
		    		}
		    	})
			},
			// 点击退款按钮
            refund(){
		    	var that = this;
		    	that.$router.replace({name:'refund',params:{id:that.orderDes.id}});
            },
            //获取当前门店
            getDetail(info){
                var that = this;
                if(info.length > 1){
                	that.$vux.loading.show({
	                	text:'加载中',
	                })
	                var cartList = 0;
	                info.forEach(item => {
	                	var params = new FormData();
	                    params.append("uid",that.uid);
	                    params.append("pid",item.id);
	                    params.append("shopid",that.sid);
	                    params.append("num",item.num);
	                    params.append("oid",that.oid);
	                    params.append("shop_type",1);
	                	that.$apily.storecart2(params).then(res => {
	                		cartList += 1;
	                		if(cartList == info.length){
			                	that.$vux.loading.hide();
			                	setTimeout(() => {
			                		that.$router.push({name:'cart'});
			                	},500)
			                }
	                	})
	                })
                }
                else{
                	that.$router.push({name:'proDetails',params:{id:info[0].id}});
                }
			},
			// 再次购买、重新购买按钮
            buyAgain(){
                var that = this;
                let order = that.orderDes;
                let info = order.order_info;
                if(info[0].shop_type == 2){
                	that.$router.push({name:'specialDes',params:{id:info[0].id}});
                }
                else{
					//获取当前门店
                	that.getDetail(info);
                }
            },
            //支付
            payWay(){
                var that = this;
                var data = new FormData();
                that.orsid = that.orderDes.order_num
                console.log(that.orsid)
                that.isCloseModal2 = true;
            },

			// 点击选中支付方式
            choosePay(index){
				var that = this;
                that.curIndex = index;
			},
			// 去支付按钮
            payment(index){
            	var that = this;
            	if(index == 0){
					//微信支付
                    that.wePay()
                }
                else if(index == 1){
					// 支付宝支付
                    that.aliPay()
                }
                else{
					// 钱包支付
            		that.wallet();
            	}
            },
            //钱包支付
            wallet(){
            	var that = this;
            	that.disabled = true;
            	that.$vux.loading.show({
                	text:'加载中',
                })
            	var data = {
                    order_num :that.orsid,
                    oid:that.oid,
               	}
            	that.$api.walletpay(data).then(res => {
    				console.log(res);
    				if(res.code == 1){
    					that.payInfo = res.data;
    					setTimeout(() => {
        					that.disabled = false;
        					that.$vux.loading.hide();
        					that.isShowModal2 = true;
        				})
    				}
    			})
			},
			// 钱包立即支付按钮
            payment2(){
            	var that = this;
            	that.disabled = true;
            	if(that.password){
            		that.$vux.loading.show({
	                	text:'支付中',
	                })
            		var data = new FormData();
	            	data.append('orsid',that.orsid);
	            	data.append('oid',that.oid);
	            	data.append('pay_type',1);
	            	data.append('uid',that.uid);
	            	data.append('password',that.password);
        			that.$api.walletpay2(data).then(res => {
        				console.log(res);
        				if(res.code == 1){
        					setTimeout(() => {
        						that.disabled = false;
        						that.isCloseModal2 = false;
								that.isShowModal2 = false;
								that.$vux.loading.hide();
            					that.$vux.toast.text(res.msg,'middle');
            					setTimeout(() => {
									// 获取订单详细信息
            						that.getorderDes();
            					},1000)
            				},500)
        				}
        				else{
        					setTimeout(() => {
        						that.$vux.loading.hide();
        						that.disabled = false;
        						that.$vux.toast.text(res.msg,'middle');
        					},500)
        				}
        			})
            	} 
            	else{
            		that.disabled = false;
            		that.$vux.toast.text("请输入支付密码 ",'middle');
            	}
            },
            //微信支付
            wePay(){
                var that = this;
                that.disabled = true;
            	that.$vux.loading.show({
                	text:'加载中',
                })
                var params = {
                    orsid:that.orsid,
                    oid:that.oid,
                    price:that.orderDes.totalPrice
                }
                that.$apily.appwxpay(params).then(res =>{
                    if (res.data.sign && res.data.prepayid){
                        var params = {
                            mch_id: res.data.partnerid, // merchant id
                            prepay_id: res.data.prepayid, // prepay id returned from server
                            nonce: res.data.noncestr, // nonce string returned from server
                            timestamp: res.data.timestamp, // timestamp
                            sign: res.data.sign, // signed string
                        };
                        //console.log("插件参数：");
                        //console.log(params);
                        Wechat.sendPaymentRequest(params, function (result) {
                            console.log('支付结果：' + result)
                            // alert('支付结果：' + result)
                            that.$vux.loading.hide()
                            that.isCloseModal2 = false;
                            that.$vux.toast.show(result,'middle');
                            setTimeout(() => {
								that.$vux.toast.hide()
								// 获取订单详细信息
                                that.getorderDes();
                            }, 500);
                        }, function (reason) {
                        //console.log('支付失败' + reason)
                            that.$vux.loading.hide()
                            that.isCloseModal2 = false;
                            that.$vux.toast.show("支付失败: " + reason,'middle');
                            setTimeout(() => {
                                that.$vux.toast.hide()
                            }, 500);
                        });
                    }else{
                        that.$vux.loading.hide()
                        that.isCloseModal2 = false;
                        that.$vux.toast.show("支付失败 ",'middle');
                        setTimeout(() => {
                            that.$vux.toast.hide()
                        }, 500);
                    }
                }).catch((error) => {
                // alert(error)
                    that.$vux.loading.hide()
                    that.isCloseModal2 = false;
                    that.$vux.toast.show("支付失败 ",'middle');
                    setTimeout(() => {
                        that.$vux.toast.hide()
                    }, 500);
                })
            },

            // 支付宝支付
            aliPay(){
                var that = this;
                that.disabled = true;
            	that.$vux.loading.show({
                	text:'加载中',
                })
                var params = {
                    orsid:that.orsid,
                    oid:that.oid,
                    price:that.orderDes.totalPrice
                }
                console.log(that.oid);
                that.$apily.appalipay(params).then(res =>{
                    // console.log(response.data);
                    // //return false;
                    // console.log(res)
                    if (res.payInfo) {
                        var payInfo = res.payInfo;
                        cordova.plugins.alipay.payment(payInfo, function (result) {
	                        //alert('支付结果：' + result)
	                        that.$vux.loading.hide()
	                        that.$vux.toast.show(result,'middle');
	                        if(result.resultStatus == '9000'){
	                            that.$vux.toast.show('支付成功！','middle');
	                        }else if(result.resultStatus == '8000'){
	                            that.$vux.toast.show('正在处理中！','middle');
	                        }else if(result.resultStatus == '4000'){
	                            that.$vux.toast.show('订单支付失败！','middle');
	                        }else if(result.resultStatus == '6001！'){
	                            that.$vux.toast.show('用户中途取消','middle');
	                        }else if(result.resultStatus == '6002'){
	                            that.$vux.toast.show('网络连接出错！','middle');
	                        }else{
	                            that.$vux.toast.show('未知错误！','middle');
	                        }
	                        that.isCloseModal2 = false;
	                        setTimeout(() => {
								// 获取订单详细信息
	                            that.getorderDes();
	                        }, 500);
                        }, function (reason) {
	                        that.$vux.loading.hide()
	                        that.isCloseModal2 = false;
	                        that.$vux.toast.show(reason.memo,'middle');
                        });
                    }else{
                        //console.log("唤起支付失败");
                        that.$vux.loading.hide()
                        that.isCloseModal2 = false;
                        that.$vux.toast.show("支付失败",'middle');
                    }
                }).catch((error) => {
                    that.isCloseModal2 = false;
                    that.$vux.toast.show("支付失败 ",'middle');
                })
            },

			// 关闭选择支付方式弹窗
            closeModal(){
				var that = this;
				that.isCloseModal2 = false;
			},
			// 关闭密码支付弹窗
			closeModal2(){
				var that = this;
				that.isShowModal2 = false;
			},
		},
		created(){
			var that = this;
			//获取用户信息
			that.getUser();
			// 获取订单详细信息
			that.getorderDes();
		}
	}
</script>

<style lang="less" scoped>
	.orderDes{
        min-height: calc(100vh - 0.88rem);
        padding-bottom: 0.2rem;
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
					width:72%;
					.status{
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
                        .qxOrder{
			            	border:0.02rem solid #999;
        				}
					}
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
				.refundBox{
					width:100%;
					.refund{
						padding:0.05rem;
						border:0.02rem solid #1CCFCF;
					}
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
        .payList{
			position:fixed;
			bottom:0;
			width:100%;
			.head{
				font-family: 'PingFang-Medium';
				img{
					top:0.36rem;
					right:0.3rem;
					width:0.28rem;
					height:0.28rem;
				}
			}
			.list{
				.list-item{
					.leftCont{
						img{
							width:0.6rem;
							height:0.6rem;
						}
					}
					.rightCont{
						img{
							margin-top:0.32rem;
							width:0.36rem;
							height:0.25rem;
						}
					}
				}
			}
			.list2{
				/*height:5.6rem;*/
				.price{
					font-size: 0.6rem;
					padding-bottom:0.6rem;
				}
				.passwordBox{
					margin:0 auto;
					width:5.8rem;
					.leftCont{
						width:15%;
					}
					.rightCont{
						font-family: 'PingFang-Medium';
						width:85%;
						input{
							width:100%;
							overflow: inherit;
						}
					}
				}
				.payment{
					margin:0 auto;
					width:5.8rem;
					margin-top:0.4rem;
					font-family: 'PingFang-Medium';
				}
			}
        }
	}
</style>