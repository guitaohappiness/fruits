<template>
	<div class="user bg-f4f4f4" v-if="isShowPage">
		<div class="scrollHeight">
			<div class="bg-1ccfcf header pd-lr30 relative">
				<div class="leftCont pull-left flex flex-ac">
					<router-link class="block" :to="{name:'setting'}">
                        <img class="block" src="@/assets/images/user/setting.png" alt="" />
					</router-link>
				</div>
				<p class="text-center ft-36 color-fff">我的</p>
				<div class="rightCont flex flex-ac">
					<router-link :to="{name:'userMessage'}">
						<div class="m_icon absolute">
							<span v-if="isShowMsg" class="dian inline-block absolute bd-rd50 bg-fc5920"></span>
							<img class="block" src="@/assets/images/common/message_f.png" alt="" />
						</div>
					</router-link>
				</div>
			</div>
			<div class="userInfo relative">
				<div class="userInfoBox absolute bd-rd10 flex">
					<div class="userName flex flex-ac">
						<router-link class="block" :to="{name:'personalDes'}">
						    <img v-if="userInfo.avatar" class="block bd-rd50" :src="userInfo.avatar" alt="" />
							<img v-else class="block bd-rd50" src="@/assets/images/user/default.png" alt="" />
                            <img id="defaultImg" class="block bd-rd50" src="@/assets/images/user/default.png" alt="" />
						</router-link>
                        <div v-if="uid">
                        	<p v-if="userInfo.nickname" class="ft-34 color-333">{{userInfo.nickname}}</p>
                            <p v-else class="ft-34 color-333">{{userInfo.mobile}}</p>
                            <div class="memberLv ft-20 mg-tp10 text-center pd-lr10" :class="userInfo.level != 0 ? 'width' : ''">{{userInfo.title}}</div>
                        </div>
                        <div v-else>
                            <router-link class="block" :to="{name:'login'}">
                                <p class="ft-32 color-333">登录/注册</p>
                            </router-link>
                        </div>
					</div>
					<div class="ewm flex flex-je">
						<div>
							<img class="block" @click="openewm" src="@/assets/images/user/ewm.png" alt="" />
							<p class="ft-26 color-333 bold mg-tp10">核销码</p>
						</div>
					</div>
				</div>
				<img class="block lookMember absolute" src="@/assets/images/user/lookMember.png" @click="lookMember" alt="" />
			</div>
			<div class="nearStore">
				<router-link class="flex flex-ac" :to="{name:'changeStore'}">
					<div class="adsIcon">
						<img class="block" src="@/assets/images/user/nearStore.png" alt="" />
					</div>
					<p class="ft-26 color-333 storeName">附近店铺：{{storeName}}</p>
					<div class="rightIcon flex flex-je">
						<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
					</div>
				</router-link>
			</div>
			<div class="myBalance bg-fff bd-rd10 pd-lr30">
				<div class="order bd-bt-f4f4f4 h100 line-h100">
					<div class="leftCont flex flex-ac">
						<img class="block mg-rt20" src="@/assets/images/user/money.png" alt="" />
						<p class="ft-28 color-333">我的资金</p>
					</div>
				</div>
				<div class="list flex flex-ac flex-jc pd-tb30">
					<div class="list-item flex flex-jc">
						<div class="text-center">
							<p class="ft-36 color-333">￥{{userInfo.wallet_amount}}</p>
							<p class="ft-26 color-333 mg-tp20">余额</p>
						</div>
					</div>
					<div class="list-item flex flex-jc">
						<div class="text-center width-full">
							<router-link :to="{name:'wallet'}" class="block">
								<img class="block" src="@/assets/images/user/wallet.png" alt="" />
								<p class="ft-26 color-333 mg-tp20">钱包/充值</p>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="myOrder ft-28 bg-fff bd-rd10 pd-lr30">
				<div class="order bd-bt-f4f4f4 h100 line-h100">
					<div class="leftCont pull-left flex flex-ac">
						<img class="block mg-rt20" src="@/assets/images/user/order.png" alt="" />
						<p class="ft-28 color-333">我的订单</p>
					</div>
					
					<div class="rightCont pull-right">
						<router-link class="flex flex-ac" :to="{name:'orderList',params:{type:0}}">
							<p class="ft-26 color-999 mg-rt20">查看全部订单</p>
							<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
						</router-link>
					</div>
				</div>
				<div class="list flex flex-ac flex-jc pd-tb30">
					<div class="list-item text-center relative">
						<router-link :to="{name:'orderList',params:{type:1}}" class="block">
							<span class="orderNum absolute bg-fc5920 bd-rd50 text-center line-h30 color-fff" v-if="L1">{{L1}}</span>
							<img class="block" src="@/assets/images/user/order_status1.png" alt="" />
							<p class="ft-24 color-333 mg-tp20">待付款</p>
						</router-link>
					</div>
					<div class="list-item text-center relative">
						<router-link :to="{name:'orderList',params:{type:2}}" class="block">
							<span class="orderNum absolute bg-fc5920 bd-rd50 text-center line-h30 color-fff" v-if="L2">{{L2}}</span>
							<img class="block" src="@/assets/images/user/order_status2.png" alt="" />
							<p class="ft-24 color-333 mg-tp20">待配送</p>
						</router-link>
					</div>
					<div class="list-item text-center relative">
						<router-link :to="{name:'orderList',params:{type:3}}" class="block">
							<span class="orderNum absolute bg-fc5920 bd-rd50 text-center line-h30 color-fff" v-if="L3">{{L3}}</span>
							<img class="block" src="@/assets/images/user/order_status3.png" alt="" />
							<p class="ft-24 color-333 mg-tp20">配送中</p>
						</router-link>
						
					</div>
					<div class="list-item text-center relative">
						<router-link :to="{name:'refundList'}" class="block">
							<span class="orderNum absolute bg-fc5920 bd-rd50 text-center line-h30 color-fff" v-if="L4">{{L4}}</span>
							<img class="block" src="@/assets/images/user/order_status4.png" alt="" />
							<p class="ft-24 color-333 mg-tp20">退款/协商</p>
						</router-link>
					</div>
				</div>
			</div>
			<div class="userList ft-28 bg-fff pd-lr30 bd-rd10">
				<div class="store_hx h100 line-h100 clearfix">
					<router-link class="block clearfix" :to="{name:'verGoods'}">
						<div class="leftCont flex flex-ac pull-left">
							<img class="block mg-rt20" src="@/assets/images/user/store_hx.png" alt="" />
							<p class="ft-28 color-333">待核销订单</p>
						</div>
						<div class="flex rightCont mg-tp35 pull-right">
                            <span v-if="offList>0" class="dian pd-lr10 bg-fc5920 bd-rd20 ft-24 text-center line-h35 mg-rt20 color-fff">{{offList}}</span>
							<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
						</div>
					</router-link>
				</div>
			</div>
			<div class="userList userList2 ft-28 bg-fff pd-lr30 bd-rd10">
				<div class="store_hx h100 line-h100 clearfix">
					<router-link class="block clearfix" :to="{name:'coupons'}">
						<div class="leftCont flex flex-ac pull-left">
							<img class="block mg-rt20" src="@/assets/images/user/coupon.png" alt="" />
							<p class="ft-28 color-333">我的优惠券</p>
						</div>
						<div class="rightCont mg-tp35 pull-right">
							<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
						</div>
					</router-link>
				</div>
			</div>
			<div class="userList userList2 ft-28 bg-fff pd-lr30 bd-rd10">
				<div class="store_hx h100 line-h100 bd-bt-f4f4f4">
					<router-link class="block clearfix" :to="{name:'address',params:{way:2,type:1}}">
						<div class="leftCont flex flex-ac pull-left">
							<img class="block mg-rt20" src="@/assets/images/user/address.png" alt="" />
							<p class="ft-28 color-333">常用地址</p>
						</div>
						<div class="rightCont mg-tp35 pull-right">
							<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
						</div>
					</router-link>
				</div>
				<div class="store_hx h100 line-h100 bd-bt-f4f4f4 clearfix">
                    <!--这里的ID为门店账号ID，需从接口中获取-->
                    <router-link class="block clearfix" :to="{name:'storeService'}">
                        <div class="leftCont flex flex-ac pull-left">
                            <img class="block mg-rt20" src="@/assets/images/user/store_kf.png" alt="" />
                            <p class="ft-28 color-333">门店客服</p>
                        </div>
                        <div class="rightCont mg-tp35 flex flex-ac pull-right">
                            <span class="dian pd-lr10 bg-fc5920 bd-rd20 ft-24 text-center line-h35 mg-rt20 color-fff" v-if="unRead">{{unRead}}</span>
                            <img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
                        </div>
                    </router-link>
				</div>
				<div class="store_hx h100 line-h100">
					<router-link class="block clearfix" :to="{name:'help'}">
						<div class="leftCont flex flex-ac pull-left">
							<img class="block mg-rt20" src="@/assets/images/user/help.png" alt="" />
							<p class="ft-28 color-333">帮助中心</p>
						</div>
						<div class="rightCont mg-tp35 pull-right">
							<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
						</div>
					</router-link>
				</div>
			</div>
		</div>
		<div transfer-dom>
	        <x-dialog v-model="showScrollBox" hide-on-blur>
	          	<div class="modalContent">
	            	<div class="modalTop flex flex-je">
	              		<img class="block" @click="closeModal" src="@/assets/images/common/closeModal.png" alt="" />
	            	</div>
	            	<div class="modalMiddle flex flex-ac flex-jc mg-tp30">
	            		<img class="block" :src="myCode" alt="" />
	            	</div>
	            	<div class="modalMiddle2 flex flex-ac flex-jc mg-tp30" @click="reFresh">
	            		<img class="block mg-rt10" src="@/assets/images/user/refresh.png" alt="" />
	            		<p class="ft-28 color-fff">点击刷新</p>
	            	</div>
	          	</div>
	          	<div class="hint pd-tp50 pd-bt50 text-center ft-28 color-333">
	            	请在提货时向店长出示专属二维码
	            </div>
	        </x-dialog>
      	</div>
		
		<!-- 未登录的弹窗 -->
		<div transfer-dom>
	        <x-dialog v-model="showLogin">
	          	<div class="modalContent2">
	            	<div class="modalTop flex flex-je">
	              		<img class="block" @click="closeLogin" src="@/assets/images/common/closeModal.png" alt="" />
	            	</div>
	            	<div class="modalMiddle flex flex-ac flex-jc mg-tp30">
	            		<p class="ft-36 ">请登录后再体验哦~</p>
	            	</div>
	            	<div class="loginBtn flex flex-ac flex-jc mg-tp30">
	            		<router-link :to="{name:'index'}">
							<p class="look ft-28 color-333">再看看</p> 
						</router-link>
						<div class="ft-28 color-333" @click="goLogin">
							<p class="ft-28 color-333">去登录</p> 
						</div>
	            	</div>
	          	</div>
	        </x-dialog>
      	</div>
        <ul id="video_sms_list"></ul>
        <div v-transfer-dom>
		    <confirm v-model="isShowModal"
		    	title="提示"
		      	confirm-text="立即更新"
		      	:show-cancel-button="false"
		      	@on-confirm="update"
		      >
		        <p class="text-center ft-28 color-999">版本更新</p>
		    </confirm>
    	</div>
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
    import {
        loginWebIm,
        onSendMsg,
        getPrePageC2CHistoryMsgs,
        setSendUser,
        setToUser,
        initEmotionUL,
        showEmotionDialog,
        showCustomDialog,
        sendMsgToImage,
        initUnreadMsgCount,
        initRecentContactList,
        unreadNum
    } from "../../unit/webim_common.js";
	import footer from '@/components/footer/footer.vue'
	export default {
		name:'user',
		data(){
			return{
                uid:'', //用户id
                userInfo:{}, //用户信息
				storeName:'',  //门店名称
				showScrollBox:false, //核销码弹窗显示
                showLogin:false, //显示去登录弹窗
                isShowModal:false, //是否显示版本更新弹窗
                isShowMsg:"", //是否显示未读消息红点
                L1:'', //待付款订单数量
                L2:'', //待配送订单数量
                L3:'', //配送中订单数量
                L4:'', //退款/协商商品数量
                unRead:0, //门店客服未读消息数量
                offList:[], //待核销订单数量
                myCode:'', //核销二维码图片地址
                ownerId:'',
                ownerAvatar:'',
                ownerName:'',
                userSig:'',
				footer: { first: "", second: "", third: "", fourth: "active", fifth:""}, //页脚选中高亮
				isShowPage:true, //是否有网络
			}
		},
		methods:{

            //获取用户信息
            getUser(){
                var that = this;
				that.uid = window.localStorage.getItem("uid")
				if(!that.uid){
					that.showLogin = true;
				}
				else{
				 	that.$vux.loading.show({
				 		text:'加载中',
				 	})
					var params =  that.uid;
					that.$apily.user(params).then(res =>{
						that.userInfo = res.data;
                    })
                    var params1 =  {
                    	uid:that.uid,
                    }
                    that.$apily.txwebim(params1).then(res =>{
						that.userSig = res.data.userSig;
						//获取门店详情
                        that.getDetail();
                    })
				}
			},
			//获取门店详情
            getDetail(){
				var that = this;
                var params = window.localStorage.getItem("clickId");
                that.$apily.store2(params).then(res =>{
                    if(res.code == 1){
                        that.storeName = res.data.name;
                        that.ownerId = res.data.shoper_id;
                        if(res.data.shoper_avatar){
                        	that.ownerAvatar = res.data.shoper_avatar;
                        }
                        else{
                            var i = document.getElementById("defaultImg").src;
                            that.ownerAvatar = i
                        }
						that.ownerName = res.data.shoper_realname;
						// 初始化数据
                        that.inIt();
                        setTimeout(() => {
                            that.$vux.loading.hide()
                        }, 500);
                    }
                })
            },

            //获取订单信息
            getOrders(){
                var that = this;
                var params = {
                    uid: that.uid,
                    oid:that.$router.app.__proto__.$oid,
                }
                that.$apily.storeorder(params).then(res =>{
                    that.L1 = res.data.PendingPayment_count;
                    that.L2 = res.data.dispatching_count
                    that.L3 = res.data.distribution_count;
                    that.L4 = res.data.refund_count;
                    that.offList = res.data.writeOff_count;
                })
            },

			// 点击关闭核销码
			closeModal(){
				var that = this;
				that.showScrollBox = false;
			},

			// 点击关闭去登录弹窗
			closeLogin(){
				var that = this;
				that.$router.push({name:'index'});
			},

			// 点击核销码显示核销码信息
			openewm(){
				var that = this;
                that.showScrollBox = true;
                var params1 = {
                    uid:that.uid
                }
                var params2 = {
                    param:JSON.stringify(params1)
                }
                that.$apily.qrcode(params2).then(res =>{
                    if(res.code == 1){
                        that.myCode = res.data
                    }
                })
                
            },
            //点击刷新
            reFresh(){
                var that = this;
                that.$vux.loading.show({
                    text:'正在刷新'
                })
                var params1 = {
                    uid:that.uid
                }
                var params2 = {
                    param:JSON.stringify(params1)
                }
                that.$apily.qrcode(params2).then(res =>{
                    if(res.code == 1){
                        that.myCode = res.data
                    }
                    setTimeout(() => {
                        that.$vux.loading.hide();
                    },500)
                })
            },

            //获取消息数量
            getMsg(){
                var that = this;
                var params = {
                    uid:that.uid,
                    oid:that.$router.app.__proto__.$oid,
                }
                that.$apily.message(params).then(res =>{
                    if(res.code == 1){
                        if(res.data){
                           that.isShowMsg = res.data.message_count;
                        }
                    }
                })
            },

			// 点击去登录按钮
            goLogin(){
                var that = this;
                window.localStorage.removeItem('look')
                that.$router.push({name:'login'})
            },


            // 初始化数据
            inIt () {
                let that = this;
                that.loginTxWebim();  //登录
                // that.myMessages()
            },

            //登录腾讯云通信方法
            loginTxWebim(){
                let that = this;
                //通过后台接口获取到云通信账号信息
                let userSig        = "";
                //发送用户也就是登录用户，目前只是测试，后期登录部分需要跟实际业务登录一起绑定处理。
                let sendUserInfo = {
                    'identifier':that.uid,
                    'identifierNick':that.nickname,
                    'headurl':that.avatar,
                    'userSig':that.userSig,

                };
                //通过接口信息获取要发送给哪个用户信息
                let toUserInfo = {
                    // 'identifier':'shopuser_' + JSON.stringify(that.ownerId),
                    // 'identifierNick':that.ownerName,
                    // 'headurl':that.ownerAvatar
                };
                setToUser(toUserInfo);
                setSendUser(sendUserInfo);
                loginWebIm();
                setTimeout(() => {
                    that.unRead = unreadNum()
                }, 1000);
            },

            //消息未读数
            myMessages(){
                // initRecentContactList()
                // initUnreadMsgCount()
                setTimeout(() => {
                    // initUnreadMsgCount()
                    let m = initUnreadMsgCount()
                    let arr = []
                    arr.forEach(item => {
                        if(item._impl.id == 'shopuser_' + JSON.stringify(that.ownerId)){
                            this.unread == item._impl.unread
                        }
                    });
                    // this.unRead = m.unread()
                    // console.log(this.unRead)
                    console.log(m)
                }, 1000);
                
			},
			// 获取APP版本信息
            getVersion(){
				var that = this;
				var version = that.$router.app.__proto__.appVersion;
				var params = {
					oid: that.$router.app.__proto__.$oid,
					app_version:version,
					uid:window.localStorage.getItem('uid'),
				}
				that.$apily.versions(params).then(res =>{
					console.log(res);
					if(res.data.type == 1){
						that.isShowModal = true;
						that.version = res.data.android;
					}
				})
			},
			// 点击更新跳转地址更新APP版本
			update(){
				var that = this;
				window.location.href = that.version;
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
				    if(window.localStorage.getItem('uid')){
						// 获取APP版本信息
						that.getVersion();
					}
					//获取用户信息
					that.getUser();
					//获取订单信息
					that.getOrders();
					//获取消息数量
		            that.getMsg();
			    }
			},
			// 检查网络连接
			checkConnection(){
				var that = this;
				// 电脑上调试需解开下面三行代码注释
				that.getUser();
				that.getOrders();
				that.getMsg();
					
				var networkState = navigator.connection.type;
			    if (networkState === Connection.NONE) {
			      	that.isShowPage = false;
			      	that.$vux.toast.text('网络错误，请检查网络连接','bottom');
			    }
			    else{
			    	that.isShowPage = true;
			    	if(window.localStorage.getItem('uid')){
						// 获取APP版本信息
						that.getVersion();
					}
					//获取用户信息
					that.getUser();
					//获取订单信息
					that.getOrders();
					//获取消息数量
		            that.getMsg();
			    }
			},

			// 点击会员立即查看跳转页面
			lookMember(){
				var that = this;
				that.$router.push({name:'memberCharge'});
			}
		},
		created(){
			var that = this;
			if(window.localStorage.getItem('orderIndex')){
				window.localStorage.removeItem('orderIndex');
            }
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
		},
		destroyed() {
			var that = this;
			document.removeEventListener("offline", that.offline, false);
		},
	}
</script>

<style lang="less" scoped>
	.user{
		min-height:calc(100vh - 0.88rem);
		.scrollHeight{
			height:calc(100vh - 1.86rem);
			overflow-y: scroll;
			.header{
				width:100%;
				position:fixed;
				top:0;
				height:0.88rem;
				font-family: 'PingFang-Medium';
				line-height:0.88rem;
				z-index:99;
				.leftCont{
					img{
						width:0.4rem;
						height:0.36rem;
					}
					height:0.88rem;
					line-height:0.88rem;
				}
				.rightCont{
					.m_icon{
						top:0.24rem;
						right:0.3rem;
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
			.userInfo{
				background:url('../../assets/images/user/bgImg.png');
				width:100%;
				height:3.32rem;
                background-size:cover;
				.userInfoBox{
					width:calc(100% - 0.6rem);
					top:0.58rem;
					left:0.3rem;
					.userName{
						margin-top:-0.4rem;
						width:70%;
						font-family: 'PingFang-Medium';
						img{
							margin:0 0.3rem 0 0.2rem;
							width:1.7rem;
							height:1.7rem;
						}
						.memberLv{
							height:0.35rem;
							line-height: 0.35rem;
							background:rgba(25,25,25,.2);
							border-radius:0.16rem;
							color:#fff1db;
							&.width{
								width:1.32rem;
							}
						}
						
					}
					.ewm{
						width:30%;
						img{
							margin: 0 auto;
							/*margin-top:0.4rem;*/
							width:0.5rem;
							height:0.5rem;
						}
					}
				}
				.lookMember{
					right:0.7rem;
					bottom:0.25rem;
					width:1.7rem;
					height:0.67rem;
				}
			}
			.nearStore{
				width:100%;
				padding:0.25rem 0.3rem 0.3rem 0.3rem;
				.adsIcon{
					width:10%;
					img{
						width:0.34rem;
						height:0.44rem;
					}
				}
				.storeName{
					width:80%;
				}
				.rightIcon{
					width:10%;
					img{
						width:0.16rem;
						height:0.3rem;
					}
				}
			}
			.myBalance{
				margin:0 auto;
				width:92%;
				.order{
					.leftCont{
						font-family: 'PingFang-Medium';
						img{
							width:0.44rem;
							height:0.44rem;
						}
					}
					.rightCont{
						img{
							margin-top:-0.05rem;
							width:0.16rem;
							height:0.3rem;
						}
					}
				}
				.list{
					.list-item{
						font-family: 'PingFang-Medium';
						width:50%;
						img{
							margin:0 auto;
							width:0.44rem;
							height:0.44rem;
						}
						&:nth-child(1){
							border-right:0.02rem solid #f4f4f4;
						}
					}
				}
			}
			.myOrder{
				margin:0 auto;
				margin-top:0.1rem;
				width:92%;
				.order{
					.leftCont{
						font-family: 'PingFang-Medium';
						img{
							width:0.44rem;
							height:0.44rem;
						}
					}
					.rightCont{
						img{
							margin-top:-0.05rem;
							width:0.16rem;
							height:0.3rem;
						}
					}
				}
				.list{
					.list-item{
						font-family: 'PingFang-Medium';
						width:25%;
						img{
							margin:0 auto;
							width:0.44rem;
							height:0.44rem;
						}
						.orderNum{
							width: 0.3rem !important;
						    height: 0.3rem !important;
						    right: 0.4rem !important;
						    top: -0.1rem !important;
						    font-size: 0.12rem !important;
						}
					}
				}
			}
			.userList{
				margin:0 auto;
				margin-top:0.1rem;
				width:92%;
				font-family: 'PingFang-Medium';
				.store_hx{
					width:100%;
					.leftCont{
						img{
							width:0.44rem;
							height:0.44rem;
						}
					}
					.rightCont{
						img{
							width:0.16rem;
							height:0.3rem;
						}
					}
				}
			}
			.userList2{
				margin-top:0.1rem;
			}
		}
		.modalContent{
			padding:0.4rem;
			background:url('../../assets/images/user/ewmBg.png');
			width:100%;
			height:5.25rem;
			background-size:cover;
			.modalTop{
				img{
					width:0.28rem;
					height:0.28rem;
				}
			}
			.modalMiddle{
				img{
					width:70%;
				}
			}
			.modalMiddle2{
				img{
					width:0.36rem;
					height:0.32rem;
				}
			}
		}
		.modalContent2{
			padding: 0.4rem;
			background:url('../../assets/images/user/ewmBg.png');
			width:100%;
			height: 3rem;
			.modalTop{
				img{
					width:0.28rem;
					height:0.28rem;
				}
			}
			.loginBtn{
				margin-top: 0.5rem;
				justify-content: space-around;
				p{
					padding: 0.2rem 0.4rem;
					border-radius: 0.1rem;
					background-color: #1ccfcf;
					color: #fff
				}
				.look{
					background-color: #99a1a1;
				}
			}
		}
		.hint{
			font-family: 'PingFang-Medium';
        }
        #defaultImg{
            display: none;
        }
        #video_sms_list{
            display: none;
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