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
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.status == 2">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_wait.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">已参团，等待成团</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">本次拼团为{{orderDes.quorum}}人团，邀请好友一起团哦！</p>
					<!--<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20" @click="shareBtn">
						<span class="h50 inline-block">分享好友</span>
					</div>-->
				</div>
			</div>
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.status == 3">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_wait.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">拼团成功！等待到店核销</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">感谢您的信任，欢迎下次光临~</p>
					<!--<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20" @click="shareBtn">
						<span class="h50 inline-block">分享好友</span>
					</div>-->
				</div>
			</div>
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.status == 4">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_com.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">拼团成功！到店核销完成</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">感谢您的信任，欢迎下次光临~</p>
					<!--<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20" @click="shareBtn">
						<span class="h50 inline-block">分享好友</span>
					</div>-->
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
			<div class="absolute bd-rd10 hx_status bg-fff flex flex-ac" v-if="orderDes.status == 8">
				<div class="leftCont">
					<img class="block" src="@/assets/images/user/order_close.jpg" alt="" />
				</div>
				<div class="rightCont">
					<p class="ft-32 color-333 status">拼团失败</p>
					<p class="ft-26 color-333 mg-tp10 line-h40">您支付的订单金额已原路返回您的账户</p>
					<div class="btn ft-28 color-1ccfcf text-center flex flex-je pd-tp20">
						<span class="h50 inline-block" @click="buyAgain">重新购买</span>
					</div>
				</div>
			</div>
		</div>
		<div class="finish_time pd30 bg-fff mg-tp30">
			<div v-if="orderDes.status == 1||orderDes.status == 2">
				<p class="ft-28 end_time flex flex-ac" v-if="timeObj.countDown > 0">
					<span class="h30 line-h30 pd-lt10 line">距结束：</span>
					<span class="bg-1ccfcf times bd-rd8 color-fff h35 line-h35 text-center">
						{{timeObj.hourStr}}
					</span>
					<span class="dian h35 line-h35">:</span>
					<span class="bg-1ccfcf times bd-rd8 color-fff h35 line-h35 text-center">
						{{timeObj.minStr}}
					</span>
					<span class="dian h35 line-h35">:</span>
					<span class="bg-1ccfcf times bd-rd8 color-fff h35 line-h35 text-center">
						{{timeObj.secStr}}
					</span>
				</p>
				<p class="ft-24 end_time flex flex-ac mg-tp10" v-else>
					<span class="h30 line-h30 pd-lt10 line">距结束：</span>
	                <span class="bg-999 times bd-rd8 color-fff h35 line-h35 text-center">
						00
					</span>
	                <span class="dian">:</span>
	                <span class="bg-999 times bd-rd8 color-fff h35 line-h35 text-center">
						00
					</span>
	                <span class="dian">:</span>
	                <span class="bg-999 times bd-rd8 color-fff h35 line-h35 text-center">
						00
					</span>
	            </p>
			</div>
			<p class="ft-28 end_time flex flex-ac" v-if="orderDes.status == 3||orderDes.status == 4">
				<span class="h30 line-h30 pd-lt10 line">拼团成功</span>
			</p>
			<p class="ft-28 end_time flex flex-ac" v-if="orderDes.status == 6">
				<span class="h30 line-h30 pd-lt10 line">订单已取消</span>
			</p>
			<p class="ft-28 end_time flex flex-ac" v-if="orderDes.status == 8">
				<span class="h30 line-h30 pd-lt10 line">拼团失败</span>
			</p>
			<div class="flex flex-ac joined mg-tp20" v-if="orderDes.status == 1||orderDes.status == 2">
				<img class="block mg-rt10 bd-rd8" v-for="(item,index) in orderDes.avatar" v-if="item == '' || item == null" src="@/assets/images/user/default.png" alt="" />
                <img class="block mg-rt10 bd-rd8" v-for="(item,index) in orderDes.avatar" v-if="item != '' && item != null" :src="item" alt="" />
				<img class="block mg-rt10" v-for="(item,index) in orderDes.group_num" v-if="index < 6" src="@/assets/images/group/groupNum.png" alt="" />
				<p class="mg-lt20 ft-24 color-333">还差<span class="color-fc5920">{{orderDes.group_num}}人</span>成团</p>
			</div>
			<div class="flex flex-ac joined mg-tp20" v-if="orderDes.status == 3||orderDes.status == 4">
				<img class="block mg-rt10 bd-rd8" v-for="(item,index) in orderDes.avatar" v-if="item == '' || item == null" src="@/assets/images/user/default.png" alt="" />
				<img class="block mg-rt10 bd-rd8" v-for="(item,index) in orderDes.avatar" v-if="item != '' && item != null" :src="item" alt="" />
				<img class="block mg-rt10" v-for="(item,index) in orderDes.group_num" v-if="index < 6" src="@/assets/images/group/groupNum.png" alt="" />
				<p class="mg-lt20 ft-24 color-333">总共<span class="color-fc5920">{{orderDes.quorum}}人</span>成团</p>
			</div>
			<div class="flex flex-ac joined mg-tp20" v-if="orderDes.status == 8">
				<img class="block mg-rt10 bd-rd8" v-for="(item,index) in orderDes.avatar" v-if="item == '' || item == null" src="@/assets/images/user/default.png" alt="" />
				<img class="block mg-rt10 bd-rd8" v-for="(item,index) in orderDes.avatar" v-if="item != '' && item != null" :src="item" alt="" />
				<img class="block mg-rt10" v-for="(item,index) in orderDes.group_num" v-if="index < 6" src="@/assets/images/group/groupNum.png" alt="" />
				<p class="mg-lt20 ft-24 color-333">只有<span class="color-fc5920">{{orderDes.quorum - orderDes.group_num}}人</span>成团</p>
			</div>
		</div>
		<div class="proDes bg-fff mg-tp20">
			<div class="list-item" v-for="(item,index) in orderDes.order_info">
				<router-link class="block" :to="{name:'groupDetails',params:{id:item.id,sid:sid}}">
					<div class="flex flex-ac proInfo bd-bt-f4f4f4">
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
					</div>
				</router-link>
			</div>
			<div class="totalPrice h90 line-h90 flex flex-ac flex-je pd-lr30">
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
				<div class="clearfix mg-tp20" v-if="orderDes.status == 2||orderDes.status == 3||orderDes.status == 4||orderDes.status == 8">
					<p class="color-666 ft-26 pull-left">交易流水号</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.paynumber}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">下单时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.create_time}}</p>
				</div>
				<div class="clearfix mg-tp20" v-if="orderDes.status == 2||orderDes.status == 3||orderDes.status == 4||orderDes.status == 8">
					<p class="color-666 ft-26 pull-left">付款时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.paytime}}</p>
				</div>
				<div class="clearfix mg-tp20" v-if="orderDes.status == 3||orderDes.status == 4">
					<p class="color-666 ft-26 pull-left">拼团时间</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.group_time}}</p>
				</div>
				<div class="clearfix mg-tp20">
					<p class="color-666 ft-26 pull-left">备注</p>
					<p class="color-333 ft-26 pull-right">{{orderDes.note}}</p>
				</div>
			</div>
		</div>
        <div class="black_cover" v-if="isCloseModal2">
			<div class="payList bg-fff">
				<div class="clearfix head h100 line-h100 pd-lr30 bd-bt-f4f4f4">
		    		<p class="pull-left ft-28 color-333">选择支付方式</p>
		    		<img class="block pull-right" @click="closeModal" src="@/assets/images/common/closeModal.png" alt="" />
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
        <shareModal :isShareModal='isShareModal' @qxShareModal='closeShare' @post='closeShare' :argInfos='argInfos' :proId='id'></shareModal>
	</div>	
</template>

<script>
import shareModal from '@/components/base/shareModal.vue'
	export default{
		name:'verGoodDes',
		data(){
			return{
                sid:'', //门店id
                orsid:'', //订单号
                oid:'', //行业id
				orderDes:{}, //订单详细信息
				timeObj:{}, //拼团倒计时时间
                isCloseModal2:false, //是否显示支付方式弹窗
                payList:[ //支付方式
					{name:'微信',img:require('@/assets/images/index/wx.png')},
					{name:'支付宝',img:require('@/assets/images/index/zfb.png')},
					{name:'钱包',img:require('@/assets/images/index/wallet-icon.png')},
                ],
                isShareModal:false, //是否显示分享弹窗
                argInfos:{}, //分享相关信息
                isShowModal2:false, //是否显示钱包支付弹窗
                disabled:false, //钱包立即支付按钮禁用
				password:'', //钱包支付密码输入框内容
			}
		},
		methods:{
			// 获取倒计时,时间处理
			getGroupTime(){
				var that = this;
				
				var formatDateTime = function (date) {
			      	var y = date.getFullYear();
			      	var m = date.getMonth() + 1;
			      	m = m < 10 ? ('0' + m) : m;
			      	var d = date.getDate();
			      	d = d < 10 ? ('0' + d) : d;
			      	var h = date.getHours();
			      	h = h < 10 ? ('0' + h) : h;
			      	var minute = date.getMinutes();
			      	minute = minute < 10 ? ('0' + minute) : minute;
			      	var second = date.getSeconds();
			      	return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;
			    };
			    
				var end_time = that.orderDes.endTime;
				end_time = end_time.replace(/\-/g, "/");
				let now_time  = new Date();
				now_time = formatDateTime(now_time);
				let endTime = new Date(end_time).getTime();
                let nowTime = new Date(now_time).getTime();
                let total_micro_second = endTime - nowTime;
                that.timeObj = that.dateFormat(total_micro_second);
                
                setTimeout(function () {
					// 获取倒计时,时间处理
      				that.getGroupTime();
    			}, 1000)
			},
			// 格式化时间，时间转换
			dateFormat: function (micro_second) {
//				console.log(micro_second)
                //总秒数
                let second = Math.floor(micro_second / 1000);
                //天数
                let day = Math.floor(second / 3600 / 24);
                //小时
                let hour = Math.floor(second / 3600 % 24);
                let hourStr = hour.toString();
                if (hourStr.length === 1) {
                    hourStr = '0' + hourStr;
                }
                //分钟
                let min = Math.floor(second / 60 % 60);
                let minStr = min.toString();
                if (minStr.length === 1) {
                    minStr = '0' + minStr;
                }
                //秒
                let sec = Math.floor(second % 60);
                let secStr = sec.toString();
                if (secStr.length === 1) {
                    secStr = '0' + secStr;
                }
                let timeObj = {};  //声明一下
                timeObj.hourStr = parseInt(hourStr) + day*24;
                //timeObj.hourStr = hourStr;
                timeObj.minStr  = minStr;
                timeObj.secStr  = secStr;
                timeObj.countDown = second;
                return timeObj;
			},
			// 获取路由、缓存相关信息
            getParams(){
            	var that = this;
            	that.id = that.$route.params.id;
            	that.oid = that.$router.app.__proto__.$oid;
            	that.sid = window.localStorage.getItem("clickId");
			},
			// 获取订单详情
            getorderDes(){
            	var that = this;
            	var data = that.id;
				that.$api.orderDes(data).then(res => {
					that.orderDes = res.data;
					that.address_info = res.data.address_info[0];
					// 获取倒计时,时间处理
					that.getGroupTime();
				})
            },
            //分享
			shareBtn(){
				var that = this;
                that.isShareModal = true;
                var args ={url:'',name:'',description:'',thumb:''};
				args.url = "https://saas.dev.kissneck.com/wap/#/groupDetails/" + that.id + '/' + that.sid;
    			var proDes = that.orderDes;
				args.name = proDes.order_info[0].product_name;
				args.description = proDes.order_info[0].product_name;
				args.thumb = proDes.order_info[0].product_images;
                that.argInfos = args;
                console.log(args)
			},
			// 关闭分享弹窗
            closeShare(msg){
                var that = this;
                var that = this;
				that.isShareModal = !msg;
            },
            //支付
            payWay(){
                var that = this;
                var data = new FormData();
                that.orsid = that.orderDes.order_num;
                console.log(that.orsid)
                that.isCloseModal2 = true;
			},
			// 关闭钱包支付弹窗
			closeModal2(){
				var that = this;
				that.isShowModal2 = false;
			},
			// 点击选择支付方式
            choosePay(index){
				var that = this;
                that.curIndex = index;
			},
			// 重新购买按钮
            buyAgain(){
                var that = this;
                let order = that.orderDes;
                let info = order.order_info;
                that.$router.push({name:'groupDetails',params:{id:info[0].id,sid:order.sid}});
			},
			// 选择支付方式后去支付按钮
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
            // 钱包支付
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
								that.isShowModal = false;
            					that.$vux.toast.text(res.msg,'middle');
            					setTimeout(() => {
									that.$vux.loading.hide();
									// 获取订单详情
            						that.getorderDes();
            					},500)
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
                            that.isCloseModal2 = false;
                            that.$vux.toast.show(result,'middle');
                            setTimeout(() => {
								that.$vux.toast.hide()
								// 获取订单详情
                                that.getorderDes();
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
                            that.$vux.toast.hide();
                        }, 500);
                    }
                }).catch((error) => {
                // alert(error)
                    that.isCloseModal2 = false;
                    that.$vux.toast.show("支付失败 ",'middle');
                    setTimeout(() => {
                        that.$vux.toast.hide();
                    }, 500);
                })
            },

            // 支付宝支付
            aliPay(){
                var that = this;
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
								// 获取订单详情
	                            that.getorderDes();
	                        }, 500);
                        }, function (reason) {
	                        that.isCloseModal2 = false;
	                        that.$vux.toast.show(reason.memo,'middle');
                        });
                    }else{
                        //console.log("唤起支付失败");
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
		},
		created(){
			var that = this;
			// 获取路由、缓存相关信息
			that.getParams();
			// 获取订单详情
			that.getorderDes();
        },
        components:{
            'shareModal':shareModal,
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
					}
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
					min-width:0.4rem;
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
				.refundBox{
					width:100%;
					.refund{
						padding:0.05rem;
						border:0.02rem solid #1CCFCF;
					}
				}
			}
			.totalPrice{
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
					margin-top:0.36rem;
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
		}
	}
</style>