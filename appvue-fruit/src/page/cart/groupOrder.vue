<template>
	<div class="subOrder bg-f4f4f4">
		<x-header  :left-options="{backText: ''}">
			订单提交
		</x-header>
	    <div class="scrollHeight">
		    <div class="takeStore bg-fff pd30 bd-rd10">
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
		    <div class="proDes bg-fff pd-lr30 bd-rd10">
		    	<div class="orderStatus bd-bt-f4f4f4 pd-tb20 clearfix">
					<div class="leftCont flex flex-ac pull-left">
						<img class="block mg-rt20 bd-rd50" :src="addressInfo.logo" alt="" />
						<p class="ft-28 color-333">{{addressInfo.name}}</p>
					</div>
	    		</div>
	    		<div class="prolist">
					<div class="list-item pd-tb30 bd-bt-f4f4f4" v-for="(item,index) in proList">
	    				<router-link class="flex flex-as width-full" :to="{name:'groupDetails',params:{id:item.id,sid:sid}}">
							<div class="leftCont">
								<img class="block bd-rd8" :src="item.product_images[1]" alt="" />
							</div>
							<div class="rightCont mg-tp15">
								<p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item.product_name}}</p>
								<div class="clearfix mg-tp30">
									<p class="ft-28 color-333 pull-left">
										单价：<span class="ft-24">￥</span><span>{{item.present_price}}</span>
									</p>
									<p class="pull-right ft-24 color-999 line-h35">×{{item.buyNum}}</p>
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
		    </div>
		    <div class="remark pd-lr30 bg-fff h90 line-h90 bd-rd10 flex flex-ac flex-jc">
		    	<div class="ft-28 color-333 leftCont">备注</div>
		    	<div class="rightCont">
		    		<group>
		    			<x-input :show-clear="false" :max="45" text-align="right" v-model="note" placeholder="请输入备注或留言，45字以内"></x-input>
		    		</group>
		    	</div>
		    </div>
		    <div class="agreement flex flex-ac">
		    	<img class="block mg-rt10" @click="agreement" v-if="!isSure" src="@/assets/images/index/checked_false.png" alt="" />
		    	<img class="block mg-rt10" @click="agreement" v-else src="@/assets/images/index/checked.png" alt="" />
		    	<router-link :to="{name:'privacyAgree',params:{type:5}}"><p class="color-999 ft-24">我已同意<span class="color-1ccfcf">《购买协议》</span></p></router-link>
		    </div>
		</div>
	    
	    <div class="fixdBtn">
	    	<p class="hint ft-24 color-1ccfcf h50 line-h50 text-center">温馨提示：若拼团成功，取货时请到店核销商品！</p>
	    	<div class="h90 bg-fff flex flex-ac clearfix">
	    		<div class="leftCont flex flex-ac pd-lt30">
	    			<p class="ft-28 color-333 mg-rt20">合计：<span class="color-fc5920 bold">￥{{proList.totalPrice}}</span></p>
	    		</div>
	    		<div class="rightCont ft-32 flex flex-je line-h90">
	    			<p class="payMent text-center color-fff" :class="isSure?'toPay':''" @click="payWay">去支付</p>
	    		</div>
	    	</div>
	    </div>
		<div class="black_cover" v-if="isCloseModal">
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
		name:'subOrder',
		data(){
			return{
                uid:'', //用户id
                oid:'', //行业id
                orsid:'',//订单号
				sid:'', //门店id
				addressInfo:{}, //门店信息
				curIndex:2, //支付方式下标
				payList:[ //支付方式列表
					{name:'微信',img:require('@/assets/images/index/wx.png')},
					{name:'支付宝',img:require('@/assets/images/index/zfb.png')},
					{name:'钱包',img:require('@/assets/images/index/wallet-icon.png')},
				],
				isSure:true, //购买协议复选框图片切换
				isCloseModal:false, //是否显示选择支付方式弹窗
				order_info:[], //订单信息
				note:'', //留言输入框内容
				isShowModal2:false, //是否显示钱包支付弹窗
				disabled:false, //立即支付按钮禁用
				password:'', //钱包支付密码输入框内容
			}
		},
		methods:{
			// 购买协议复选框点击
			agreement(){
				var that = this;
				that.isSure = !that.isSure;
			},
			// 订单去支付按钮
			payWay(){
				var that = this;
				if(!that.isSure){
					that.$vux.toast.text('协议内容未勾选！','middle');
				}
				else{
					var data = new FormData();
					data.append('uid',that.uid);
					data.append('oid',that.$router.app.__proto__.$oid);
					data.append('groupId',that.proList[0].id);
					data.append('sum',that.proList.totalPrice);
					data.append('sid',that.sid);
					data.append('price',(parseInt(that.proList.totalPrice)).toFixed(2));
					data.append('source',2);
					data.append('address_info',that.addressInfo.address_phone);
					data.append('order_info',JSON.stringify(that.order_info));
					data.append('note',that.note);
					data.append('total_sum',that.proList.totalSum);
					data.append('type',3);
					that.$api.submitOrder(data).then(res => {
                        if(res.code == 1){
                            that.isCloseModal = true;
                            that.orsid = res.data
                        }
                        else if(res.code == 2){
                            that.$vux.toast.text(res.msg,'middle');
                        }
                        else if(res.code == 3){
                            that.$vux.toast.text(res.msg,'middle');
                        }
                        else{
                            that.$vux.toast.text('参团失败！','middle');
                        }
					})
				}
			},
			// 关闭支付方式弹窗
			closeModal(){
				var that = this;
				that.isCloseModal = false;
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
			// 获取缓存相关信息
			getParams(){
				var that = this;
				that.oid = that.$router.app.__proto__.$oid;
				that.uid = window.localStorage.getItem('uid');
				that.sid = window.localStorage.getItem("clickId");
				that.proList = JSON.parse(window.localStorage.getItem('proArr'));
				
				that.proList.forEach(item => {
					var data = {
						id:item.id,
						product_images:item.product_images[1],
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
				
				console.log(that.order_info)
			},
			// 获取门店信息
			getAddressList(){
				var that = this;
				var data = {
					uid:that.uid,
					sid:that.sid,
					sub_type:2,
					oid:that.oid,
				}
				that.$api.orderaddress1(data).then(res => {
					that.addressInfo = res.data;
				})
			},
			// 选择支付方式支付按钮
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
					//钱包支付
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
            					that.$api.orderDes(data).then( res => {
                                    if(res.status = 2){                                      
                                        setTimeout(() => {
                                            that.$router.replace({name: 'orderList',params:{type:0}});
                                        },1000)
                                    }else{
                                        that.$router.replace({name: 'verGoods'});
                                    }
                                })
            				// 	that.$vux.toast.text(res.msg,'middle');
            				// 	setTimeout(() => {
            				// 		that.$router.replace({name: 'verGoods'});
            				// 	},1000)
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
                let payPrice = that.proList.totalPrice
                console.log(payPrice)
                console.log(that.orsid)
                var params = {
                    orsid:that.orsid,
                    oid:that.oid,
                    price:that.proList.totalPrice
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
                            	that.$vux.toast.hide();
                            	var data = '27?' + 'orsid=' + that.orsid;
                            	that.$api.orderDes(data).then(res => {
                            		if(res.code == 1){
                            			if(res.data.status == 3){
                            				that.$router.replace({name:'verGoods'});
                            			}
                            			else{
                            				that.$router.replace({name: 'orderList',params:{type:0}});
                            			}
                            		}
                            	})
                        	}, 500);
                        }, function (reason) {
                        	//console.log('支付失败' + reason)
                            that.isCloseModal2 = false;
                            that.$vux.toast.show("支付失败: " + reason,'middle');
                            setTimeout(() => {
                            	that.$vux.toast.hide()
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
                let payPrice = that.proList.totalPrice;
                var params = {
                    orsid:that.orsid,
                    oid:that.oid,
                    price:that.proList.totalPrice
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
                            	that.$vux.toast.hide()
                            	var data = '27?' + 'orsid=' + that.orsid;
                            	that.$api.orderDes(data).then(res => {
                            		if(res.code == 1){
                            			if(res.data.status == 3){
                            				that.$router.replace({name:'verGoods'});
                            			}
                            			else{
                            				that.$router.replace({name: 'orderList',params:{type:0}});
                            			}
                            		}
                            	})
                        	}, 500);
                        }, function (reason) {
                        	that.isCloseModal2 = false;
                        	that.$vux.toast.show(reason.memo,'middle');
	                        setTimeout(() => {
	                            that.$vux.toast.hide()
	                            that.$router.replace({name: 'orderList',params:{type:0}});
	                        }, 500);
                        });
                    }else{
                        //console.log("唤起支付失败");
                        that.isCloseModal2 = false;
                        that.$vux.toast.show("payInfo为空",'middle');
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
		},
		created(){
			var that = this;
			if(window.localStorage.getItem('orderIndex')){
				window.localStorage.removeItem('orderIndex');
			}
			// 获取缓存相关信息
			that.getParams();
			// 获取门店信息
			that.getAddressList();
		}
	}
</script>

<style lang="less" scoped>
	.subOrder{
		min-height: calc(100vh - 0.88rem);
		.scrollHeight{
			/*height:calc(100vh - 3.2rem);
			overflow-y: scroll;*/
			padding-bottom:1.3rem;
			padding-top: 0.2rem;
			.takeStore{
				width:6.9rem;
				margin:0 auto;
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
				margin:0.5rem 0 0 0.3rem;
				img{
					width:0.3rem;
					height:0.3rem;
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
	}
</style>