<template>
	<div class="subOrder bg-f4f4f4">
		<x-header  :left-options="{backText: ''}">
			订单提交
		</x-header>
		<tab v-model="index01" prevent-default @on-before-index-change="switchTabItem" custom-bar-width="32%" active-color="#1CCFCF">
	     	<tab-item selected>送货上门</tab-item>
	      	<tab-item>进店取货</tab-item>
	    </tab>
	    <div class="scrollHeight">
		    <div class="addAddress bg-fff bd-rd10" v-if="index01 == 0">
		    	<div class="addBox block " v-if="addressList" @click="shooseAds">
			    	<div class="leftCont flex flex-ac">
			    		<div class="left">
			    			<img class="block" src="@/assets/images/user/nearStore.png" alt="" />
			    		</div>
			    		<div class="right ft-28">
			    			<div class="clearfix">
			    				<p class="pull-left">{{addressList.l_name}}</p>
			    				<p class="pull-right">{{addressList.l_phone}}</p>	
			    			</div>
			    			<p class="ft-24 color-999 mg-tp20 one-line-ellipsis">
			    				{{addressList.l_province}}{{addressList.l_city}}{{addressList.l_district}}{{addressList.l_address}}
			    			</p>
			    		</div>
			    	</div>
			    	<div class="rightCont flex flex-ac">
			    		<img class="block mg-tp5" src="@/assets/images/common/right_arrow.png" alt="" />
			    	</div>
			    </div>
		    	<div class="block clearfix" @click="shooseAds" v-else>
			    	<div class="pull-left leftCont flex flex-ac">
			    		<div class="left">
			    			<img class="block mg-rt20" src="@/assets/images/user/nearStore.png" alt="" />
			    		</div>
			    		<div class="right">
			    			<p class="ft-28 color-333">没有地址信息，请点击后添加地址</p>
			    		</div>
			    	</div>
			    	<div class="pull-right rightCont flex flex-je">
			    		<img class="block mg-tp5" src="@/assets/images/common/right_arrow.png" alt="" />
			    	</div>
			    </div>
		    </div>
		    <div class="takeStore bg-fff pd30 bd-rd10" v-else>
		    	<div class="headBox pd-bt30 flex flex-ac bd-bt-f4f4f4">
		    		<div class="storeIcon">
		    			<img class="block" src="@/assets/images/index/storeIcon.png" alt="" />
		    		</div>
		    		<div class="storeInfo">
		    			<p class="name color-333 ft-28">{{addressInfo.name}}</p>
		    			<p class="address ft-24 color-999 mg-tp15 one-line-ellipsis">{{addressInfo.area}}{{addressInfo.address}}</p>
		    		</div>
		    	</div>
		    	<div class="footBox pd-tp15 flex flex-ac">
		    		<div class="storePhone">
		    			<img class="block" src="@/assets/images/index/storePhone.png" alt="" />
		    		</div>
		    		<p class="ft-28 color-333">核销号码：{{addressInfo.address_phone}}</p>
		    	</div>
		    </div>
		    <div class="dateTime bg-fff bd-rd10 flex" @click="chooseTime" v-if="index01 == 0">
		    	<div class="ft-28 color-333 leftCont flex flex-js">送货时间</div>
		    	<div class="rightCont flex flex-je">
		    		<span class="ft-28 color-999 mg-rt30" v-if="!timeIdx2">{{addressInfo.day_name}}-{{addressInfo.period_time[0]}}</span>
		    		<span class="ft-28 color-999 mg-rt30" v-else>{{addressInfo.day_name}}-{{addressInfo.period_time[timeIdx2]}}</span>
		    		<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
		    	</div>
		    </div>
		    <div class="proDes bg-fff pd-lr30 bd-rd10">
		    	<div class="orderStatus bd-bt-f4f4f4 pd-tb20 clearfix">
					<div class="leftCont flex flex-ac pull-left">
						<img class="block mg-rt20 bd-rd50" :src="proList[0].logo" alt="" />
						<p class="ft-28 color-333">{{proList[0].name}}</p>
					</div>
	    		</div>
	    		<div class="prolist">
					<div class="list-item pd-tb30 bd-bt-f4f4f4" v-for="(item,index) in proList">
	    				<router-link class="flex flex-as width-full" :to="{name:'proDetails',params:{id:item.id}}" v-if="item.shop_type == 1">
							<div class="leftCont">
                                <div>
								    <img v-if="item.video" class="block bd-rd8" :src="item.product_images[1]" alt="" />
                                    <img v-else class="block bd-rd8" :src="item.product_images[0]" alt="" />
                                </div>
                                <!--<img v-if="type==2" class="block bd-rd8" :src="item.product_images[0]" alt="" />
                                <img v-if="type==3" class="block bd-rd8" :src="item.product_images" alt="" />-->
							</div>
							<div class="rightCont mg-tp15">
								<p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item.product_name}}</p>
								<div class="clearfix mg-tp30">
									<p class="ft-28 color-333 pull-left">
										单价：<span class="ft-24">￥</span>
										<span v-if="item.present_price">{{item.present_price}}</span>
										<span v-else>{{item.price}}</span>
									</p>
									<p class="pull-right ft-24 color-999 line-h35" v-if="item.buyNum">×{{item.buyNum}}</p>
									<p class="pull-right ft-24 color-999 line-h35" v-else>×{{item.num}}</p>
								</div>
							</div>
						</router-link>
						<router-link class="flex flex-as width-full" :to="{name:'specialDes',params:{id:item.id}}" v-if="item.shop_type == 2">
							<div class="leftCont">
								<img v-if="item.video" class="block bd-rd8" :src="item.product_images[1]" alt="" />
                                <img v-else class="block bd-rd8" :src="item.product_images[0]" alt="" />
							</div>
							<div class="rightCont mg-tp15">
								<p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item.product_name}}</p>
								<div class="clearfix mg-tp30">
									<p class="ft-28 color-333 pull-left">
										单价：<span class="ft-24">￥</span>
										<span v-if="item.present_price">{{item.present_price}}</span>
										<span v-else>{{item.price}}</span>
									</p>
									<p class="pull-right ft-24 color-999 line-h35" v-if="item.buyNum">×{{item.buyNum}}</p>
									<p class="pull-right ft-24 color-999 line-h35" v-else>×{{item.num}}</p>
								</div>
							</div>
						</router-link>
					</div>
	    		</div>
				<div class="footBox ft-24 pd-tb30">
					<div class="rightCont text-right flex flex-ac flex-je">
						<p class="color-333 ft-28 mg-rt35">共{{proList.totalSum}}件</p>
						<p class="color-333 ft-28">商品总额：</p>
						<p class="color-fc5920 ft-28">￥{{proList.totalPrice}}</p>
					</div>
				</div>
				<div class="coupons pd-tb30 bd-bt-f4f4f4 clearfix">
					<div class="ft-28 color-333 pull-left">优惠券</div>
					<div class="pull-right rightCont flex flex-ac">
						<p class="color-333 ft-28 mg-rt20" @click="chooseCoupon" v-if="disPrice">-￥{{disPrice}}</p>
						<div v-else>
							<p class="color-999 ft-28 mg-rt20" @click="chooseCoupon" v-if="couponList.count > 0">有<span class="color-1ccfcf">{{couponList.count}}</span>张可用优惠券</p>
							<p class="color-999 ft-28 mg-rt20" v-else>无可用</p>
						</div>
						
						<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
					</div>
				</div>
				<div class="coupons pd-tb30 clearfix">
					<div class="ft-28 color-333 pull-left">会员卡</div>
					<div class="ft-28 pull-right rightCont" v-if="addressInfo.level">{{addressInfo.discount}}折</div>
					<div class="ft-28 pull-right rightCont" v-else>暂无折扣</div>
				</div>
		    </div>
		    <div class="remark pd-lr30 bg-fff h90 line-h90 bd-rd10 flex flex-ac flex-jc">
		    	<div class="ft-28 color-333 leftCont">备注</div>
		    	<div class="rightCont">
		    		<group>
		    			<x-input :show-clear="false" :max="45" v-model="note" text-align="right" placeholder="请输入备注或留言，45字以内"></x-input>
		    		</group>
		    	</div>
		    </div>
		    <div class="agreement flex flex-ac">
		    	<img class="block mg-rt10" @click="agreement" v-if="!isSure" src="@/assets/images/index/checked_false.png" alt="" />
		    	<img class="block mg-rt10" @click="agreement" v-else src="@/assets/images/index/checked.png" alt="" />
		    	<router-link :to="{name:'privacyAgree',params:{type:5}}"><p class="color-999 ft-24">我已同意<span class="color-1ccfcf">《购买协议》</span></p></router-link>
		    </div>
		    
		    <div transfer-dom>
		        <x-dialog v-model="showScrollBox" hide-on-blur>
		          	<div class="modalContent">
		            	<div class="modalTop">
		              		<p class="ft-28 color-333 text-center">订单金额不满足送货上门服务哦！</p>
		              		<p class="ft-28 color-333 mg-tp25">您可以进店自取或重新下单</p>
		            	</div>
		            	<div class="btnBox flex flex-ac">
		            		<p class="ft-32 h90 line-h90 color-333" @click='roger(1)'>取消</p>
		            		<p class="ft-32 h90 line-h90 color-1ccfcf" @click='roger(2)'>进店自取</p>
		            	</div>
		          	</div>
		        </x-dialog>
      		</div>
		</div>
	    
	    <div class="fixdBtn">
	    	<p class="hint ft-24 color-1ccfcf h50 line-h50 text-center" v-if="index01 == 0">商家规定：满{{addressInfo.amount}}才能送货上门哦！</p>
	    	<p class="hint ft-24 color-1ccfcf h50 line-h50 text-center" v-else>温馨提示：请于{{addressInfo.takeTime}}之前到店核销商品</p>
	    	<div class="h90 bg-fff flex flex-ac clearfix">
	    		<div class="leftCont flex flex-ac pd-lt30">
	    			<p class="ft-28 color-333 mg-rt20" v-if="dis_totalPrice">合计：<span class="color-fc5920">￥{{dis_totalPrice}}</span></p>
	    			<p class="ft-28 color-333 mg-rt20" v-else>合计：<span class="color-fc5920">￥{{proList.totalPrice}}</span></p>
	    			<div class="yh_price inline-block ft-24 color-1ccfcf bd-rd5" v-if="member_price">已优惠￥{{member_price}}</div>
	    		</div>
	    		<div class="rightCont ft-32 flex flex-je line-h90">
	    			<p class="payMent text-center color-fff" v-if="index01 == 0" :class="isAddress?'toPay':''" @click="payWay">去支付</p>
	    			<p class="payMent payment2 text-center color-fff" v-if="index01 == 1" @click="payWay">去支付</p>
	    		</div>
	    	</div>
	    </div>
	    <div class="black_cover" v-if="isCloseModal">
		    <div class="couponList bg-fff">
		    	<div class="clearfix head h100 line-h100 pd-lr30 bd-bt-f4f4f4">
		    		<p class="pull-left ft-28 color-333">优惠券</p>
		    		<img class="block pull-right" @click="closeModal" src="@/assets/images/common/closeModal.png" alt="" />
		    	</div>
		    	<div class="list">
		    		<div class="list-item mg-bt20 relative" @click="checkedCoupon(index)" v-for="(item,index) in couponList.list">
		    			<div class="couponBg absolute"></div>
						<div class="topBox flex flex-ac">
							<p class="price ft-30 text-center">￥<span>{{item.coupon_price}}</span></p>
							<div class="discount pd-lt30">
								<div class="flex flex-ac">
									<p class="ft-24 color-fff bg-1ccfcf mg-rt20">优惠券</p>
									<p class="ft-28 color-333">{{item.name}}</p>
								</div>
								<p class="ft-28 disNum mg-tp30 color-666">
									<span class="mg-rt20">全场满</span>
									<span class="color-1ccfcf">{{item.coupon_condition}}减{{item.coupon_price}}</span>
								</p>
							</div>
						</div>
						<div class="fotBox flex flex-ac pd-lt30">
							<p class="ft-24 color-333">有效期：{{item.coupon_start_time}}至{{item.coupon_left_time}}</p>
						</div>
						<img class="block absolute" v-if="couponIndex == index" src="@/assets/images/index/chooseCoupon.png" alt="" />
		    		</div>
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
		    	<div class="h100 line-h100 ft-32">
		    		<button class="h100 line-h100 payment bg-1ccfcf text-center color-fff width-full" :disabled="disabled" @click.stop="payment(curIndex)">去支付</button>
		    	</div>
			</div>
		</div>
		<div class="black_cover" v-if="isShowModal">
			<div class="ModalBox bg-fff bd-rd10">
				<div class="headcontent h90 line-h90 relative">
					<p class="ft-32 color-333 bold text-center">请选择送达时间</p>
					<img class="block absolute" src="@/assets/images/common/closeModal.png" @click="closeModal_time" alt="" />
				</div>
				<div class="screenBox ft-28 color-333 flex">
					<div class="leftCont flex flex-ac">
						<p class="text-center width-full">{{addressInfo.day_name}}</p>
					</div>
					<div class="rightCont flex flex-ac">
						<p class="text-center pd-bt25 width-full" :class="timeIdx==index? 'active':''" v-for="(item,index) in addressInfo.period_time" @click="comfirmTime(index)">{{item}}</p>
					</div>
				</div>
				<x-button action-type="button" class="footBtn width-full text-center h90 line-h90" @click.native="comBtn_tt">确定</x-button>
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
		name:'subOrder',
		data(){
			return{
                uid:'', //用户id
                oid:'',//商家id
                orsid:'',//订单号
				sid:'',
				sub_type:1, //配送方式
				addressInfo:{ //门店信息
					period_time:[],
				},
				addressList:[], //送货地址信息
				proList:[], //商品详细信息
				index01:0, //送货上门、进店取货选项卡选中下标
				timeIdx:0, //送达时间下标
				timeIdx2:0, //送达时间下标
				curIndex:2, //支付方式下标
				isAddress:false, //支付按钮颜色控制
				showScrollBox:false, //显示订单金额不足提示弹窗
				disPrice:0,
				dis_totalPrice:0, //商品总价
				member_price:'', //已优惠价格
				couponList:[], //优惠券列表
				payList:[ //支付方式
					{name:'微信',img:require('@/assets/images/index/wx.png')},
					{name:'支付宝',img:require('@/assets/images/index/zfb.png')},
					{name:'钱包',img:require('@/assets/images/index/wallet-icon.png')},
				],
				couponIndex:-1, //用户选择优惠券下标
				isSure:true, //购买协议复选框图片切换
				isCloseModal:false, //是否显示优惠券弹窗
				isCloseModal2:false, //是否显示支付弹窗
				order_info:[], //订单信息
				note:'', //留言输入框内容
				isShowModal:false, //是否显示送达时间弹窗
				isShowModal2:false, //是否显示钱包支付弹窗
				disabled:false, //支付按钮禁用
				password:'', //钱包支付密码输入框内容
			}
		},
		methods:{
			// 送货上门、到点自取选项卡选择
			switchTabItem(index){
				var that = this;
				console.log('on-before-index-change', index)
			    this.$vux.loading.show({
			    	text: '加载中',
			    })
			    if(index == 0){
					that.sub_type = 1;
					// 获取门店信息
					that.getAddressList1();
					// 获取用户收货地址
		    		that.getAddressList2();
			    }
			    else{
					that.sub_type = 2;
					// 获取门店信息
			    	that.getAddressList1();
			    }
			    setTimeout(() => {
			        that.$vux.loading.hide();
			    }, 1000)
			    
			    this.index01 = index;
			},
			// 获取用户收货地址
			getAddressList2(){
				var that = this;
				var data = {
					uid:that.uid,
					type:1,
					origin:that.lng + ',' + that.lat,
					oid:that.oid,
				}
				that.$api.orderaddress2(data).then(res => {
					that.addressList = res.data;
					console.log(that.addressList)
					if(that.addressList){
						that.isAddress = true;
						that.addressList = that.addressList[0];
					}
				})
				
			},
			// 获取门店信息
			getAddressList1(){
				var that = this;
				var data = {
					uid:that.uid,
					sid:that.sid,
					sub_type:that.sub_type,
					oid:that.oid,
				}
				that.$api.orderaddress1(data).then(res => {
                    console.log(res)
					that.addressInfo = res.data;
					if(that.addressInfo.level){
						that.dis_totalPrice = ((parseFloat(that.proList.totalPrice) - that.disPrice) * (that.addressInfo.discount / 10)).toFixed(2);
						that.member_price = (parseFloat(that.proList.totalPrice) - that.dis_totalPrice).toFixed(2);
					}
				})
			},
			// 获取优惠券列表
			getCouponList(){
				var that = this;
				var proArr = [];
				that.proList.forEach(item => {
					var proObj = {
						id:item.id,
						product_fact_price:item.present_price,
						num:item.buyNum,
					}
					proArr.push(proObj);
				})
				var data = {
					uid:that.uid,
					order_info:JSON.stringify(proArr),
					sum:parseInt(that.proList.totalPrice),
					sid:that.sid,
				}
				that.$api.couponss(data).then(res => {
					that.couponList = res.data;
				})
            },
            //获取当前门店详情
            getStore(){
                var that = this;
                var params = that.sid 
                that.$apily.store2(params).then(res =>{
                    console.log(res)
                    if(res.code == 1){
                        that.lng = res.data.lon
                        that.lat = res.data.lat
			            that.switchTabItem(that.index01);
                    }
                })

			},
			// 购买协议复选框点击
			agreement(){
				var that = this;
				that.isSure = !that.isSure;
			},
			// 送货上门、进店取货去支付按钮
			payWay(){
				var that = this;
				if(!that.isAddress && that.index01 == 0){
					that.$vux.toast.text('请选择收货地址！','middle');
				}
				else if(!that.isSure){
					that.$vux.toast.text('协议内容未勾选！','middle');
				}
				else{
					if(parseFloat(that.proList.totalPrice) < parseFloat(that.addressInfo.amount)){
						that.showScrollBox = true;
					}
					else{
						that.isCloseModal2 = true;
						// var data = new FormData();
						// data.append('uid',that.uid);
						// data.append('oid',that.$router.app.__proto__.$oid);
						// data.append('sum',that.proList.totalPrice);
						// data.append('sid',that.sid);
						// data.append('price',(that.proList.totalPrice - that.disPrice).toFixed(2));
						// data.append('source',2);
						// data.append('order_info',JSON.stringify(that.order_info));
						// data.append('note',that.note);
						// data.append('total_sum',that.proList.totalSum);
						// if(that.index01 == 0){
						// 	data.append('period_time',that.addressInfo.period_time[that.timeIdx2]);
						// 	data.append('day_name',that.addressInfo.day_name);
						// 	data.append('type',1);
						// 	data.append('address_info',JSON.stringify(that.addressList));
						// }
						// else{
						// 	data.append('type',2);
						// 	data.append('address_info',that.addressInfo.address_phone);
						// }
						// if(that.couponIndex != -1){
						// 	data.append('coupon_id',that.couponList.list[that.couponIndex].id);
						// }
						// else{
						// 	data.append('coupon_id','');
						// }
		
						// that.$api.submitOrder(data).then(res => {
                        //     console.log(res);
                        //     if(res.code == 1){
                        //         that.orsid = res.data
                        //         that.isCloseModal2 = true;
                        //     }
                        //     else{
                        //         that.$vux.toast.show(res.msg,'middle');
                        //     }
						// })
						
					}
					
				}
			},
			// 点击可用优惠券
			chooseCoupon(){
				var that = this;
				that.isCloseModal = true;
			},
			// 关闭优惠前弹窗
			closeModal(){
				var that = this;
				that.isCloseModal = false;
				that.isCloseModal2 = false;
				that.isShowModal2 = false;
			},
			// 关闭钱包支付弹窗
			closeModal2(){
				var that = this;
				that.isShowModal2 = false;
			},
			// 点击选择优惠券
			checkedCoupon(index){
				var that = this;
				if(that.addressInfo.level){
					if(that.couponIndex == index){
						that.couponIndex = -1;
						that.disPrice = 0;
						that.dis_totalPrice = ((parseFloat(that.proList.totalPrice) + that.disPrice) * (that.addressInfo.discount / 10)).toFixed(2);
						that.member_price = (parseFloat(that.proList.totalPrice) - that.dis_totalPrice).toFixed(2);
					}
					else{
						that.couponIndex = index;
						that.disPrice = that.couponList.list[index].coupon_price;
						that.dis_totalPrice = ((parseFloat(that.proList.totalPrice) - that.disPrice) * (that.addressInfo.discount / 10)).toFixed(2);
						that.member_price = (parseFloat(that.proList.totalPrice) - that.dis_totalPrice).toFixed(2);
					}
				}
				else{
					if(that.couponIndex == index){
						that.couponIndex = -1;
						that.disPrice = 0;
						that.dis_totalPrice = (parseFloat(that.proList.totalPrice) + that.disPrice).toFixed(2);
						that.member_price = (parseFloat(that.proList.totalPrice) - that.dis_totalPrice).toFixed(2);
					}
					else{
						that.couponIndex = index;
						that.disPrice = that.couponList.list[index].coupon_price;
						that.dis_totalPrice = (parseFloat(that.proList.totalPrice) - that.disPrice).toFixed(2);
						that.member_price = (parseFloat(that.proList.totalPrice) - that.dis_totalPrice).toFixed(2);
					}
				}
			},
			// 点击送货时间显示选择送达时间弹窗
			chooseTime(){
				var that = this;
				that.isShowModal = true;
			},
			// 关闭送达时间弹窗
			closeModal_time(){
				var that = this;
				that.isShowModal = false;
			},
			// 送达时间确定按钮
			comBtn_tt(){
				var that = this;
				that.timeIdx2 = that.timeIdx;
				that.isShowModal = false;
			},
			// 送达时间选择
			comfirmTime(index){
				console.log(index)
				var that = this;
				that.timeIdx = index;
			},
			// 关闭金额不足配送弹窗
			roger(status){
				var that = this;
				that.showScrollBox = false;
				if(status == 2){
					that.index01 = 1;
					that.switchTabItem(that.index01);
				}
			},
			// 选择支付方式
			choosePay(index){
				var that = this;
                that.curIndex = index;
			},
			// 去支付按钮
            payment(index){
				var that = this;
				var data = new FormData();
				data.append('uid',that.uid);
				data.append('oid',that.$router.app.__proto__.$oid);
				data.append('sum',that.proList.totalPrice);
				data.append('sid',that.sid);
				data.append('price',(that.proList.totalPrice - that.disPrice).toFixed(2));
				data.append('source',2);
				data.append('order_info',JSON.stringify(that.order_info));
				data.append('note',that.note);
				data.append('total_sum',that.proList.totalSum);
				if(that.index01 == 0){
					data.append('period_time',that.addressInfo.period_time[that.timeIdx2]);
					data.append('day_name',that.addressInfo.day_name);
					data.append('type',1);
					data.append('address_info',JSON.stringify(that.addressList));
				}
				else{
					data.append('type',2);
					data.append('address_info',that.addressInfo.address_phone);
				}
				if(that.couponIndex != -1){
					data.append('coupon_id',that.couponList.list[that.couponIndex].id);
				}
				else{
					data.append('coupon_id','');
				}

				that.$api.submitOrder(data).then(res => {
					console.log(res);
					if(res.code == 1){
						that.orsid = res.data
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
					}
					else{
						that.$vux.toast.show(res.msg,'middle');
					}
				})
            },
            //钱包
            wallet(){
            	var that = this;
            	that.disabled = true;
            	that.$vux.loading.show({
                	text:'加载中',
				})
				console.log(that.orsid)
				console.log(that.oid)
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
			// 钱包弹窗立即支付按钮
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
								that.$vux.loading.hide();
            					that.$vux.toast.text(res.msg,'middle');
            					setTimeout(() => {
            						if(that.index01 == 0){
	                                	that.$router.replace({name: 'orderList',params:{type:0}});
	                                }
	                                else{
	                                	that.$router.replace({name: 'verGoods'});
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
                that.$vux.loading.show({
                	text:'加载中',
                })
                setTimeout(() => {
                    that.$vux.loading.hide();
                }, 1000);
                let payPrice = '';
                if(that.dis_totalPrice){
                    payPrice = that.dis_totalPrice
                }
                else{
                    payPrice = that.proList.totalPrice
                }
                console.log(payPrice)
                console.log(that.oid)
                var params = {
                	orsid:that.orsid,
                	price:payPrice,
                	oid:that.oid,
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
                                if(that.index01 == 0){
                                	that.$router.replace({name: 'orderList',params:{type:0}});
                                }
                                else{
                                	that.$router.replace({name: 'verGoods'});
                                }
                            	
                        	}, 500);
                        }, function (reason) {
                        	//console.log('支付失败' + reason);
                            that.isCloseModal2 = false;
                            that.$vux.toast.show("支付失败: " + reason,'middle');
                            setTimeout(() => {
                                that.$vux.toast.hide();
                            	that.$router.replace({name: 'orderList',params:{type:0}});
                        	}, 500);
                        });
                    }else{
                        that.isCloseModal2 = false;
                        that.$vux.toast.show("支付失败 ",'middle');
                        setTimeout(() => {
                            that.$vux.toast.hide()
                            that.$router.replace({name: 'orderList',params:{type:0}});
                        }, 500);
                    }
                }).catch((error) => {
                	// alert(error)
                    that.isCloseModal2 = false;
                    that.$vux.toast.show("支付失败 ",'middle');
                    setTimeout(() => {
                    	that.$vux.toast.hide()
                        that.$router.replace({name: 'orderList',params:{type:0}});
                    }, 500);
                })
            },

            // 支付宝支付
            aliPay(){
                var that = this;
                that.$vux.loading.show({
                	text:'加载中',
                })
                setTimeout(() => {
                    that.$vux.loading.hide();
                }, 1000);
                let payPrice = '';
                if(that.dis_totalPrice){
                    payPrice = that.dis_totalPrice
                }
                else{
                    payPrice = that.proList.totalPrice
                }
                var params = {
                    orsid:that.orsid,
                    oid:that.oid,
                    price:payPrice
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
	                            that.$vux.toast.hide();
	                            if(that.index01 == 0){
	                            	that.$router.replace({name: 'orderList',params:{type:0}});
	                            }
	                            else{
	                            	that.$router.replace({name: 'verGoods'});
	                            }
	                            
	                        }, 500);
                        }, function (reason) {
                        	that.isCloseModal2 = false;
                        	that.$vux.toast.show(reason.memo,'middle');
                        	setTimeout(() => {
                            	that.$vux.toast.hide();
                            	that.$router.replace({name: 'orderList',params:{type:0}});
                        	}, 500);
                        });
                    }else{
                        //console.log("唤起支付失败");
                        that.isCloseModal2 = false;
                        that.$vux.toast.show("支付失败",'middle');
                        setTimeout(() => {
                            that.$vux.toast.hide()
                            that.$router.replace({name: 'orderList',params:{type:0}});
                        }, 500);
                    }
                }).catch((error) => {
                    that.isCloseModal2 = false;
                    that.$vux.toast.show("支付失败 ",'middle');
                    setTimeout(() => {
                    that.$vux.toast.hide()
                        that.$router.replace({name: 'orderList',params:{type:0}});
                    }, 500);
                })
			},
			// 点击收货地址跳转页面
			shooseAds(){
				var that = this;
				that.$router.push({name:'address',params:{way:1,type:that.type}});
			},
			// 获取路由、缓存等信息
			getParams(){
                var that = this;
                that.oid = that.$router.app.__proto__.$oid
				that.type = that.$route.params.type;
				that.uid = window.localStorage.getItem('uid');
				that.proList = JSON.parse(window.localStorage.getItem('proArr'));
                console.log(that.proList)
                console.log(that.type)
				that.sid = window.localStorage.getItem("clickId");
				if(that.type == 1){
					that.proList.forEach(item => {
						var data = {
							id:item.id,
							product_images:item.video?item.product_images[1]:item.product_images[0],
							product_name:item.product_name,
							product_price:item.original_price,
							product_fact_price:item.present_price,
							num:item.buyNum,
							shop_type:item.shop_type,
						};
						that.order_info.push(data);
					})
					var totalSum = 0;
					var totalPrice = 0;
					that.proList.forEach((item,index) => {
						that.$set(that.proList,'totalSum', totalSum += item.buyNum);
						that.$set(that.proList,'totalPrice', (totalPrice += item.buyNum * item.present_price).toFixed(2));
                    })
                    console.log(that.proList)
                }
                else if(that.type == 2){
                    that.proList.forEach(item => {
						var data = {
							id:item.id,
							product_images:item.video?item.product_images[1]:item.product_images[0],
							product_name:item.product_name,
							product_price:item.original_price,
                            product_fact_price:item.present_price,
                            num:item.buyNum,
                            shop_type:item.shop_type,
						};
						that.order_info.push(data);
					})
					var totalSum = 0;
					var totalPrice = 0;
					that.proList.forEach((item,index) => {
						that.$set(that.proList,'totalSum', totalSum += item.buyNum);
						that.$set(that.proList,'totalPrice', (totalPrice += item.buyNum * item.present_price).toFixed(2));
                    })
                    console.log(that.proList)
                }
				else{
					that.proList.forEach(item => {
						var data = {
							id:item.pid,
							cartid:item.cart_id,
							product_images:item.video?item.product_images[1]:item.product_images[0],
							product_name:item.product_name,
							product_fact_price:item.price,
							num:item.num,
							shop_type:item.shop_type,
						};
						
						that.order_info.push(data);
						console.log(that.order_info)
					})
					var totalSum = 0;
					var totalPrice = 0;
					that.proList.forEach((item,index) => {
						that.$set(that.proList,'totalSum', totalSum += item.num);
						that.$set(that.proList,'totalPrice', (totalPrice += item.num * item.price).toFixed(2));
					})
				}
				//获取当前门店详情
				that.getStore();
				// 获取优惠券列表
				that.getCouponList();
			}
		},
		created(){
			var that = this;
			if(window.localStorage.getItem('orderIndex')){
				window.localStorage.removeItem('orderIndex');
			}
			// 获取路由、缓存等信息
			that.getParams();
		},
	}
</script>

<style lang="less" scoped>
	.subOrder{
		min-height: calc(100vh - 0.88rem);
		.scrollHeight{
			overflow-y: scroll;
			padding-bottom:2rem;
			.addAddress{
				width:6.9rem;
				margin:0 auto;
				margin-top:0.2rem;
                padding:0.4rem 0.2rem;
                .addBox{
                    display: flex;
                    justify-content: space-between;
                    align-items: center
                }
				.leftCont{
					width:85%;
					.left{
						width:10%;
						img{
							width:0.34rem;
							height:0.44rem;
						}
					}
					.right{
						width:90%;
					}
					
				}
				.rightCont{
                    text-align: right;
					// width:15%;
					img{
						width:0.16rem;
						height:0.3rem;
					}
				}
			}
			.takeStore{
				width:6.9rem;
				margin:0 auto;
				margin-top:0.2rem;
				.headBox{
					.storeIcon{
						width:10%;
						img{
							width:0.38rem;
							height:0.38rem;
						}
					}
					.storeInfo{
						width:90%;
						.name{
							font-family: 'PingFang-Medium';
						}
					}
				}
				.footBox{
					.storePhone{
						width:10%;
						img{
							width:0.34rem;
							height:0.44rem;
						}
					}
				}
				
			}
			.dateTime{
				width:6.9rem;
				margin:0 auto;
				margin-top:0.2rem;
				padding:0.4rem 0.2rem;
				.leftCont{
					width:50%;
				}
				.rightCont{
					width:50%;
					img{
						width:0.16rem;
						height:0.3rem;
					}
				}
			}
			.proDes{
				width:6.9rem;
				margin:0 auto;
				margin-top:0.2rem;
				.orderStatus{
					font-family: 'PingFang-Medium';
					.leftCont{
						img{
							width:0.6rem;
							height:0.6rem;
						}
					}
				}
				.prolist{
					.list-item{
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
				}
				.coupons{
					.rightCont{
						img{
							width:0.16rem;
							height:0.3rem;
						}
					}
				}
			}
			.remark{
				width:6.9rem;
				margin:0 auto;
				margin-top:0.2rem;
				.leftCont{
					width:20%;
				}
				.rightCont{
					width:80%;
				}
			}
			.agreement{
				width:6.9rem;
				margin:0 auto;
				margin-top:0.2rem;
				img{
					width:0.3rem;
					height:0.3rem;
				}
			}
			.modalContent{
				.modalTop {
					font-family: 'PingFang-Medium';
					padding: 1rem 0.6rem 0.5rem 0.6rem;
					border-bottom: 0.02rem solid #eeeeee;
				}
				.btnBox{
					p{
						width:50%;
						
					}
					p:first-child{
						border-right:0.02rem solid #eeeeee;
					}
				}
			}
			
		}
		.fixdBtn{
			position: fixed;
			bottom:0;
			width:100%;
			.hint{
				background:#DAEFF0;
			}
			.leftCont{
				width:70%;
				.yh_price{
					padding:0.05rem 0.1rem;
					background:#E5F9F8;
				}
			}
			.rightCont{
				width:30%;
				.payMent{
					width:2rem;
					background:#ccc;
				}
				.payment2{
					background:#1CCFCF!important;
				}
			}
		}
		.couponList{
			position:fixed;
			bottom:0;
			width:100%;
			height:6.5rem;
			overflow: hidden;
			.head{
				font-family: 'PingFang-Medium';
				img{
					margin-top:0.36rem;
					width:0.28rem;
					height:0.28rem;
				}
			}
			.list{
				margin:0 auto;
				width:92%;
				height:5.5rem;
				overflow-y: scroll;
				.list-item{
					width:100%;
					height: 2.45rem;
					.couponBg{
						width:100%;
						height:2.45rem;
						background:url('../../assets/images/user/couponBg_1.png');
						background-size:cover;
						z-index:-99;
					}
					.topBox{
						height:1.7rem;
						.price{
							font-family: 'PingFang-Medium';
							width:28%;
							span{
								font-size:0.6rem;
							}
						}
						.discount{
							width:72%;
							div{
								p:nth-child(1){
									padding:0.05rem 0.08rem;
								}
								p:nth-child(2){
									font-family: 'PingFang-Medium';
								}
							}
							.disNum{
								span{
									font-family: 'PingFang-Medium';
								}
							}
						}
					}
					.fotBox{
						height:0.74rem;
					}
					>img{
						right:0;
						top:0;
						width:0.9rem;
						height:0.9rem;
					}
				}
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
				.list-item:last-child{
					padding-bottom:0.4rem;
					border-bottom: none;
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
			.payment{
				font-family: 'PingFang-Medium';
			}
		}
		.toPay{
			background:#1CCFCF!important;
		}
		.ModalBox{
			position:fixed;
			bottom:0;
			width:100%;
			height:4.5rem;
			z-index:1027;
			.headcontent{
				img{
					top:0.31rem;
					right:0.3rem;
					width:0.28rem;
					height:0.28rem;
				}
			}
			.screenBox{
				height:2.7rem;
				.leftCont,.rightCont{
					width:50%;
					height:2.7rem;
					overflow: hidden;
			    	overflow-y: scroll;
				}
			}
			.footBtn{
				background:#1CCFCF;
				color:#fff;
				font-size: 0.32rem;
				border-radius: 0;
			} 
		}
		.active{
			color:#1CCFCF;
		}
	}
</style>