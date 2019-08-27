<template>
	<div class="orderList bg-f4f4f4">
		<x-header :left-options="{backText: ''}">我的订单</x-header>
		<tab v-model="index01" custom-bar-width="72%" prevent-default active-color="#1CCFCF" @on-before-index-change="switchTabItem">
	      	<tab-item>全部</tab-item>
	      	<tab-item>待付款</tab-item>
	      	<tab-item>待配送</tab-item>
	      	<tab-item>配送中</tab-item>
	      	<tab-item>已完成</tab-item>
    	</tab>
    	<div class="list" v-if="list.length > 0">
    		<div class="list-item mg-tp20 bd-rd10 pd-lr30 bg-fff" v-for="(item,index) in list">
    			<div class="orderStatus bd-bt-f4f4f4 pd-tb30 clearfix">
    				<div class="leftCont flex flex-ac pull-left">
    					<img class="block mg-rt20" src="@/assets/images/user/orderTime.png" alt="" />
    					<p class="ft-28 color-333">{{item.create_time}}</p>
    				</div>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="(item.status==1&&item.type==1)||(item.status==1&&item.type==2)||(item.status==1&&item.type==3)">待付款</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 1 && item.status == 2">等待商家配送</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 1 && item.status == 3">配送中</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 1 && item.status == 4">已完成</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 1 && item.status == 6">已取消</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.status == 7">已拒绝</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.status == 9">已退款</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.status == 10">退款中</p>
    				
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 2 && item.status == 3">等待到店核销</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 2 && item.status == 4">到店核销完成</p>
    				
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 3 && item.status == 2">已参团，等待成团</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 3 && item.status == 3">拼团成功！等待到店核销</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 3 && item.status == 4">拼团成功！到店核销完成</p>
    				<p class="color-1ccfcf ft-28 pull-right mg-tp5" v-if="item.type == 3 && item.status == 8">拼团失败</p>
    			</div>
    			<div class="proDes" v-if="item.type == 1 || item.type == 2">
    				<div class="list-item pd-tb30 bd-bt-f4f4f4" v-for="(item2,index) in item.order_info">
    					<router-link class="flex flex-as width-full" :to="{name:'refundDes',params:{id:item.id}}" v-if="item.status==7||item.status==9||item.status==10">
							<div class="leftCont">
								<img class="block bd-rd8" :src="item2.product_images" alt="" />
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
						</router-link>
	    				<router-link class="flex flex-as width-full" :to="{name:'orderDes',params:{id:item.id}}" v-else>
							<div class="leftCont">
								<img class="block bd-rd8" :src="item2.product_images" alt="" />
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
						</router-link>
					</div>
    			</div>
    			<div class="proDes" v-if="item.type == 3">
    				<div class="list-item pd-tb30 bd-bt-f4f4f4" v-for="(item2,index) in item.order_info">
	    				<router-link class="flex flex-as width-full" :to="{name:'refundDes',params:{id:item.id}}" v-if="item.status==7||item.status==9||item.status==10">
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
						</router-link>
						<router-link class="flex flex-as width-full" :to="{name:'groupOrderDes',params:{id:item.id}}" v-else>
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
						</router-link>
					</div>
    			</div>
    			<div class="footBox ft-24 pd-tb30">
					<div class="rightCont text-right flex flex-ac flex-je">
						<p class="color-1ccfcf inline-block ft-24 disPrice bd-rd5 mg-rt30" v-show="item.coupon_price">已优惠￥{{item.coupon_price}}</p>
						<p class="color-333 ft-28 mg-rt35">共{{item.total_sum}}件</p>
						<p class="color-333 ft-28" v-if="item.status == 1">应付总额：</p>
						<p class="color-333 ft-28" v-else>实付总额：</p>
						<p class="color-fc5920 ft-28">￥{{item.price}}</p>
					</div>
				</div>
				<div class="btnBox pd-tb30 bd-tp-f4f4f4">
					<div v-if="index01 == 0" class="ft-28 h60 text-center flex flex-ac flex-je">
						<div v-if="item.status == 1" class="flex flex-ac flex-je">
							<div class="qxOrder color-999 mg-rt30" @click="qxOrder(item.id)">取消订单</div>
							<div class="payment color-1ccfcf" @click="payWay(index,item.id)">付款</div>
						</div>
						<div v-if="item.status==7||item.status == 2" class="flex flex-ac flex-je">
							<div v-if="item.type == 3" class="flex flex-ac flex-je">
								<div class="qxOrder color-999 mg-rt30 ft-28" @click="refund(item.id)">退款</div>
								<div class="qxOrder">
									<router-link class="block" :to="{name:'groupOrderDes',params:{id:item.id}}">
										查看详情
									</router-link>
								</div>
							</div>
							<div v-else class="width-full flex flex-ac flex-je">
								<div class="qxOrder color-999 mg-rt30">
									<router-link class="block color-999 ft-28" :to="{name:'refund',params:{id:item.id}}">
										退款
									</router-link>
								</div>
								<div class="payment color-1ccfcf" @click="hint_ps(item.id,item.sid)">提醒配送</div>
							</div>
						</div>
						<div v-if="item.status == 3" class="flex flex-ac flex-je">
							<div class="payment color-1ccfcf" @click="comReceipt(item.id)" v-if="item.type == 1">确认收货</div>
							<div class="payment" v-if="item.type == 2">
								<router-link class="block color-1ccfcf" :to="{name:'orderDes',params:{id:item.id}}">
									查看详情
								</router-link>
							</div>
							<div class="payment" v-if="item.type == 3">
								<router-link class="block color-1ccfcf" :to="{name:'groupOrderDes',params:{id:item.id}}">
									查看详情
								</router-link>
							</div>
						</div>
						<div v-if="item.status == 8" class="flex flex-ac flex-je">
							<div class="payment">
								<router-link class="block color-1ccfcf" :to="{name:'groupOrderDes',params:{id:item.id}}">
									查看详情
								</router-link>
							</div>
						</div>
						<div class="qxOrder color-999" v-if="item.status == 6" @click="delOrder(item.id)">删除订单</div>
						<div class="flex flex-ac flex-je" v-if="item.status == 4">
							<div class="payment color-1ccfcf" v-if="item.type == 1&&item.order_info[0].shop_type == 1">
								<router-link class="block color-1ccfcf" :to="{name:'orderDes',params:{id:item.id}}">
                               		再次购买
                            	</router-link>
							</div>
                            <div class="payment" v-if="item.type == 1&&item.order_info[0].shop_type == 2">
                                <router-link class="block color-1ccfcf" :to="{name:'orderDes',params:{id:item.id}}">
                                	查看详情
                                </router-link>
                            </div>
							<div class="payment" v-if="item.type == 2">
								<router-link class="block color-1ccfcf" :to="{name:'orderDes',params:{id:item.id}}">
									查看详情
								</router-link>
							</div>
							<div class="payment" v-if="item.type == 3">
								<router-link class="block color-1ccfcf" :to="{name:'groupOrderDes',params:{id:item.id}}">
									查看详情
								</router-link>
							</div>
						</div>
						<!--<div v-if="item.status == 10" class="flex flex-ac flex-je">
							<div style="border-width:1px" class="payment" v-if="item.type == 1">
								<router-link class="block color-1ccfcf" :to="{name:'orderDes',params:{id:item.id}}">
									查看详情
								</router-link>
							</div>
						</div>-->
						<div class="payment color-1ccfcf" v-if="item.status==9||item.status==10">
							<router-link class="block color-1ccfcf" :to="{name:'refundDes',params:{id:item.id}}">
								查看详情
							</router-link>
						</div>
					</div>
					<div v-else-if="index01 == 1" class="ft-28 h60 text-center flex flex-ac flex-je">
						<div class="qxOrder color-999 mg-rt30" @click="qxOrder(item.id)">取消订单</div>
						<div class="payment color-1ccfcf" @click="payWay(index,item.id)">付款</div>
					</div>
					<div v-else-if="index01 == 2" class="ft-28 h60 text-center flex flex-ac flex-je">
						<div class="qxOrder color-999 mg-rt30">
							<router-link class="block color-999 ft-28" :to="{name:'refund',params:{id:item.id}}">
								退款
							</router-link>
						</div>
						<div class="payment color-1ccfcf" @click="hint_ps(item.id,item.sid)">提醒配送</div>
					</div>
					<div v-else-if="index01 == 3" class="ft-28 h60 text-center flex flex-ac flex-je">
						<div class="payment color-1ccfcf" @click="comReceipt(item.id)">确认收货</div>
					</div>
					<div v-else class="ft-28 h60 text-center flex flex-ac flex-je">
						<div class="payment" v-if="item.type == 1&&item.order_info[0].shop_type == 1" >
							<router-link class="block color-1ccfcf" :to="{name:'orderDes',params:{id:item.id}}">
                               	再次购买
                            </router-link>
						</div>
                        <div class="payment" v-if="item.type == 1&&item.order_info[0].shop_type == 2">
                            <router-link class="block color-1ccfcf" :to="{name:'orderDes',params:{id:item.id}}">
                               	再次购买
                            </router-link>
                        </div>
                        <div class="payment" v-if="item.type == 2">
                            <router-link class="block color-1ccfcf" :to="{name:'orderDes',params:{id:item.id}}">
                               	查看详情
                            </router-link>
                        </div>
                        <div class="payment" v-if="item.type == 3">
                            <router-link class="block color-1ccfcf" :to="{name:'groupOrderDes',params:{id:item.id}}">
                               	查看详情
                            </router-link>
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
	        <div v-else>
				<!--没有更多-->
	            <div class="loadMore pd-tb30 text-center">
	                <img class="block" src="@/assets/images/common/icon3.png" alt="" />
	                <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
	            </div>
			</div>
    	</div>
    	<div v-else>
    		<div class="styleNull">
				<img class="block" src="@/assets/images/user/orderNull.png" alt="" />
				<p class="ft-28 color-999 text-center mg-tp30">暂无订单~</p>
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
		    	<div class="h100 line-h100 payment bg-1ccfcf text-center ft-28 color-fff" @click="payment(curIndex)">确认</div>
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
		<v-backTop></v-backTop>
	</div>
</template>

<script>
	import backTop from '@/components/base/backTop.vue'
	import { constants } from 'crypto'
	export default{
		name:'orderList',
		data(){
			return{
                uid:'', //用户id
                oid:'',//商家id
                orsid:'',//订单号
                sid:'', //门店id
                orderDes:'', //订单详细信息
                curIndex:0, //选择的支付方式下标
                totalPrice:0, //订单总价
				index01:0, //订单状态当前选中下标
                list:[], //订单列表
                isCloseModal2:false, //是否显示选择支付方式弹窗
                payList:[ //支付方式
					{name:'微信',img:require('@/assets/images/index/wx.png')},
					{name:'支付宝',img:require('@/assets/images/index/zfb.png')},
					{name:'钱包',img:require('@/assets/images/index/wallet-icon.png')},
                ],
                paged:1, //分页
				scrollWatch: true, //是否监听
				types:['ios-small'],
                isLoadMore:false,
                isShowModal2:false, //是否显示钱包支付弹窗
				disabled:false, //钱包立即支付按钮禁用
				password:'', //钱包密码输入框内容
			}
		},
		methods:{
			// 订单状态选项卡切换
			switchTabItem (index,paged) {
			 	var that = this;
		      	console.log('on-before-index-change', index);
		      	if(paged){
		      		that.paged = paged;
		      	}else{
		      		that.paged = 1;
		      		that.list = [];
		      	}
		      	
		      	console.log(window.localStorage.getItem('orderIndex'),index)
		      	
			    this.$vux.loading.show({
			       text: '加载中'
			    })
			    if(index == 0){
			    	var data = {
			    		status:'',
			    		uid:that.uid,
			    		paged:that.paged,
			    		oid:that.$router.app.__proto__.$oid,
			    	}
			    }
			    else{
			    	var data = {
			    		status:index,
			    		uid:that.uid,
			    		paged:that.paged,
			    		oid:that.$router.app.__proto__.$oid,
			    	}
			    }
			    
			    that.$api.orderList(data).then(res => {
			    	console.log(res);
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
			        	window.localStorage.setItem('orderIndex',index);
			      	}, 500)
			    	if (that.scrollWatch) {
						window.addEventListener("scroll", that.handleScroll);
					}
				})
		      	that.index01 = index;
			},
			// 取消订单按钮
		    qxOrder(id){
		    	var that = this;
		    	that.$vux.confirm.show({
		    		title:'提示',
		    		content:'确定要取消订单吗？',
		    		onConfirm(){
		    			that.$vux.loading.show({
					       text: '加载中'
					    })
		    			var data = id + "?type_status=1";
		    			that.$api.deleteOrder(data).then(res => {
		    				if(res.code == 1){
				    			setTimeout(() => {
						    		that.$vux.toast.text('操作成功！','middle');
								},1000)
								// 订单状态选项卡切换
				    			that.switchTabItem(that.index01);
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
			// 提醒配送按钮
		    hint_ps(id,sid){
		    	var that = this;
		    	this.$vux.loading.show({
			       text: '加载中'
			    })
                var data = new FormData();
                data.append("sid",sid);
                data.append("uid",that.uid);
                data.append("order_id",id);

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
			// 退款按钮
		    refund(id){
		    	var that = this;
		    	that.$vux.confirm.show({
		    		title:'提示',
		    		content:'确认退款吗？',
		    		onConfirm(){
		    			that.$vux.loading.show({
					       text: '加载中'
					    })
		    			var data = new FormData();
		    			data.append('id',id);
		    			that.$api.groupRefund(data).then(res => {
		    				if(res.code == 1){
				    			setTimeout(() => {
						    		that.$vux.toast.text('退款成功！','middle');
								},1000)
								// 订单状态选项卡切换
				    			that.switchTabItem(that.index01);
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
			// 确认收货按钮
		    comReceipt(id){
		    	var that = this;
		    	that.$vux.confirm.show({
		    		title:'提示',
		    		content:'确认收货吗？',
		    		onConfirm(){
		    			that.$vux.loading.show({
					       text: '加载中'
					    })
		    			var data = id + "?type_status=2";
		    			that.$api.deleteOrder(data).then(res => {
		    				if(res.code == 1){
				    			setTimeout(() => {
						    		that.$vux.toast.text('操作成功！','middle');
								},1000)
								// 订单状态选项卡切换
				    			that.switchTabItem(that.index01);
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
			// 删除订单按钮
		    delOrder(id){
		    	var that = this;
		    	console.log(id)
		    	that.$vux.confirm.show({
		    		title:'提示',
		    		content:'确定要删除订单吗？',
		    		onConfirm(){
		    			that.$vux.loading.show({
					       text: '加载中'
					    })
		    			var data = id + "?type_status=3";
		    			that.$api.deleteOrder(data).then(res => {
		    				if(res.code == 1){
		    					setTimeout(() => {
						    		that.$vux.toast.text('操作成功！','middle');
								},1000)
								// 订单状态选项卡切换
		    					that.switchTabItem(that.index01);
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
			// 获取缓存相关信息   
		    getParams(){
		    	var that = this;
		    	that.uid = window.localStorage.getItem('uid');
		    	if(window.localStorage.getItem('orderIndex')){
					that.index01 = parseInt(window.localStorage.getItem('orderIndex'));
					// 订单状态选项卡切换
					that.switchTabItem(that.index01);
				}
				else{
					that.index01 = parseInt(that.$route.params.type);
					// 订单状态选项卡切换
					that.switchTabItem(that.index01);
				}
            },

            //获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid");
                that.sid = window.localStorage.getItem("clickId");
                that.oid = that.$router.app.__proto__.$oid;
            },
            //支付
            payWay(index,id){
                var that = this;
                if(that.list[index].type == 3){
                	that.$router.push({name:'groupOrderDes',params:{id:id}});
                }
                else{
                	that.$router.push({name:'orderDes',params:{id:id}});
                }
                
                /*that.orderDes = (that.list)[id]
                that.orsid = (that.list)[id].order_num
                that.isCloseModal2 = true;
                that.totalPrice = that.orderDes.totalPrice;*/
			},
			// 关闭选择支付方式弹窗
            closeModal(){
				var that = this;
				that.isCloseModal2 = false;
			},
			// 关闭钱包支付弹窗
            closeModal2(){
				var that = this;
				that.isShowModal2 = false;
			},
			// 选择支付方式
            choosePay(index){
				var that = this;
                that.curIndex = index;
			},
			// 确认选择支付方式
            payment(index){
            	var that = this;
            	if(index == 0){
					// 微信支付
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
            //钱包
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
	                                if(that.orderDes.type != 1){
	                                    that.$router.push('/verGoods');
	                                }
	                                else{
										// 订单状态选项卡切换
	                                    that.switchTabItem (2,1);
	                                }
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
                console.log('微信')
                var params = {
                    	orsid:that.orsid,
                   		oid:that.oid,
                    	price:that.totalPrice,
                    }
                setTimeout(() => {
                    that.$vux.loading.hide();
                }, 1000);
                that.$apily.appwxpay(params).then(res =>{
                    if (res.data.sign && res.data.prepayid){
                        var params = {
                            mch_id: res.data.partnerid, // merchant id
                            prepay_id: res.data.prepayid, // prepay id returned from server
                            nonce: res.data.noncestr, // nonce string returned from server
                            timestamp: res.data.timestamp, // timestamp
                            sign: res.data.sign, // signed string
                        };
                        //console.log("插件参数：   ");
                        //console.log(params);
                        Wechat.sendPaymentRequest(params, function (result) {
                            console.log('支付结果：' + result)
                            // alert('支付结果：' + result)
                            that.isCloseModal2 = false;
                            that.$vux.toast.show(result,'middle');
                            setTimeout(() => {
                                that.$vux.toast.hide()
                                if(that.orderDes.type != 1){
                                    that.$router.push('/verGoods');
                                }
                                else{
									// 订单状态选项卡切换
                                    that.switchTabItem (2,1);
                                }
                            }, 500);
                        }, function (reason) {
                        	//console.log('支付失败' + reason)
                            that.isCloseModal2 = false;
                            that.$vux.toast.show("支付失败: " + reason,'middle');
                            setTimeout(() => {
                                that.$vux.toast.hide();
                            }, 500);
                        });
                    }else{
                        that.isCloseModal2 = false;
                        that.$vux.toast.show("支付失败 ",'middle');
                        setTimeout(() => {
                            that.$vux.toast.hide()
                        }, 500);
                    }
                }).catch((error) => {
                	// alert(error)
                    that.isCloseModal2 = false;
                    that.$vux.toast.show("支付失败 ",'middle');
                    setTimeout(() => {
                        that.$vux.toast.hide()
                    }, 500);
                });

            },

            // 支付宝支付
            aliPay(){
                var that = this;
                var params = {
                    orsid:that.orsid,
                    oid:that.oid,
                    price:that.totalPrice
                }
                setTimeout(() => {
                    that.$vux.loading.hide();
                }, 1000);
                console.log(that.oid);
                that.$apily.appalipay(params).then(res =>{
                    if (res.payInfo) {
                        var payInfo = res.payInfo;
                        cordova.plugins.alipay.payment(payInfo, function (result) {
                            that.isCloseModal2 = false;
                            that.$vux.toast.show(result,'middle');
                            if(result.resultStatus == '9000'){
                                that.$vux.toast.show('支付成功！','middle');
                                setTimeout(() => {
                                    that.$vux.toast.hide()
                                    if(that.orderDes.type != 1){
                                        that.$router.push('/verGoods');
                                    }
                                    else{
										// 订单状态选项卡切换
                                        that.switchTabItem (2,1);
                                    }
                                }, 500);
                            }else{
                                if(result.resultStatus == '8000'){
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
                                that.$vux.toast.hide()
                            }
                        }, function (reason) {
                            that.isCloseModal2 = false;
                            that.$vux.toast.show(reason.memo,'middle');
                            setTimeout(() => {
                                that.$vux.toast.hide()
                            }, 500);
                        });
                    }else{
                        //console.log("唤起支付失败");
                        that.isCloseModal2 = false;
                        that.$vux.toast.show("支付失败",'middle');
                        setTimeout(() => {
                            console.log("else")
                            that.$vux.toast.hide()
                        }, 500);
                    }
                }).catch((error) => {                  
                    that.isCloseModal2 = false;
                    that.$vux.toast.show("支付失败 ",'middle');
                    setTimeout(() => {
                        console.log("catch")
                        that.$vux.toast.hide()
                    }, 500);
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
							text: "加载中"
						});
						// 订单状态选项卡切换
						that.switchTabItem(that.index01,paged);
						console.log("触底加载更多");
					}
				}
			},
			//Cordova加载完毕
			onDeviceReady(){
				var that = this;
				//监听返回键按钮事件
				document.addEventListener("backbutton", that.eventBackButton, false);
			},
			 //注销返回键
			eventBackButton(){
				var that = this;
				that.$router.push({name:'user'});
				document.removeEventListener("backbutton", that.eventBackButton, false); //注销返回键  
			},
		},
		created(){
			var that = this;
			// 获取用户信息
			that.getUser()
			// 获取缓存相关信息  
			that.getParams();
			
			//页面加载后添加各事件监听
            //document.addEventListener("deviceready", that.onDeviceReady, false); 	
		},
		destroyed() {
			var that = this;
			document.removeEventListener("backbutton", that.exitApp, false); // 注销返回键  
			document.removeEventListener("backbutton", that.eventBackButton, false); //返回键  
			that.scrollWatch = false;
			window.removeEventListener('scroll', that.handleScroll);
		},
		components:{
            'v-backTop':backTop,
        }
	}
</script>

<style lang="less" scoped>
	.orderList{
		min-height:calc(100vh - 0.88rem);
		.list{
			width:93%;
			margin:0 auto;
			margin-top:0.2rem;
			/*padding-bottom:0.5rem;*/
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
                        padding-right: 0.2rem;
						img{
                            width:95%;
                            height: 1.5rem;
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
            padding-bottom:0.2rem;
            img{
                width:0.6rem;
                margin: 0 auto;
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
                margin-top: 0;
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