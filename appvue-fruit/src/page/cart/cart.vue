<template>
	<div class="cart bg-f4f4f4" v-if="isShowPage">
		<x-header :left-options="{showBack: false}">
			购物车
			<a slot="right" @click="edit" v-if="!editChange">编辑</a>
			<a slot="right" @click="edit" v-else>完成</a>
		</x-header>
		<!-- <div class="scrollHeight"> -->
        <div :class="{ 'scrollHeight3': goodList.length>0, 'scrollHeight2': goodList.length==0 }">
			<!--商品列表-->
			<div class="shopCart" v-if="goodList.length > 0">
                <div class="storeName bd-bt-f4f4f4 pd-lr30 h100 line-h100 flex flex-ac bg-fff">
                    
                        <img @click="selectAll" v-if="allChecked" class="block mg-rt30" src="@/assets/images/common/delete.png" alt="" />
                        <img @click="selectAll" v-else class="block mg-rt30" src="@/assets/images/common/delete_false.png" alt="" />
                    
                    <p class="ft-30 color-333"><b> {{cartList.shopname}}</b></p>
                </div>
                <div v-for="(item,index) in goodList" :key="index">
                    <div class="proList ft-30 pd-lr30">
                        <div class="list-item pd-tp30 pd-bt10 bd-bt-f4f4f4 flex flex-ac relative">
                            <div class="checkBox" @click="selectIndex(index)">
                                <img class="block" v-if="item.checked" src="@/assets/images/common/delete.png" alt="" />
                                <img class="block" v-else src="@/assets/images/common/delete_false.png" alt="" />
                            </div>
                            <router-link :to="{name:'proDetails',params:{id:item.pid}}" class="rightCont flex flex-jc flex-ac">
                                <div class="rightDetail flex flex-jc">
                                    <div class="imgBox">
                                        <img class="block bd-rd8" :src="item.product_images" alt="" />
                                    </div>
                                    <div class="proInfo">
                                        <p class="title color-333 ft-26 line-h40 h80 mult_line-ellipsis">{{item.product_name}}</p>
                                        <div class="flex flex-ac">
                                            <p class="ft-24 color-333 flex flex-js price">
                                                单价：<span class="ft-22 color-fc5920 pro_price">￥<span class="ft-26"><strong>{{item.price}}</strong> </span></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                            <div class="limitNum absolute">
                                <div class="chooseNum h50 pull-right flex flex-jc flex-ac bd-rd8">
                                    <!-- <span class="ft-34 text-center" @click="subtract(index)">-</span>
                                    <span class="ft-26 color-333 text-center">{{item.num}}</span>
                                    <span class="add ft-34 text-center" @click="plus(index)">+</span> -->
                                    <div class="ft-34 text-center " @click="subtract(index)">-</div>
                                    <div class="ft-26 color-333 text-center">{{item.num}}</div>
                                    <div class="add ft-34 text-center" @click="plus(index)">+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
            <!--没有更多-->
            <div class="loadMore text-center" v-else>
                <img class="block" src="@/assets/images/user/null.png" alt="" />
                <p class="ft-24 mg-tp50 mg-bt50 color-999">购物车空空如也~</p>
            </div>
			<!--商品推荐-->
			<div class="pro_rec mg-tp30 bg-fff" v-if="BambooList.length>0">
				<div class="h100 line-h100 flex flex-jc flex-ac title mg-tp10">
					<img class="block mg-rt10" src="@/assets/images/common/recommend.png" alt="" />
					<p class="ft-34"><b> 商/品/推/荐</b></p>
				</div>
				<div class="recommendList pd-bt30 mg-tp20">
					<div class="list pd-lr30 clearfix" :style="{width:wLenth}">
						<div class="list-item pull-left" v-for="(item,index) in BambooList">
							<router-link class="block" :to="{name:'proDetails',params:{id:item.id}}">
								<div class="proImg mg-rt40">
									<!--<img class="block bd-rd8" :src="item.product_images" alt="" />-->
                                    <div class="coverImgContainer">
                                        <div class="coverImg" :style="{ backgroundImage: `url(${item.product_images})`}"></div>
                                    </div>
									<p class="title one-line-ellipsis ft-26 color-333 mg-tp20 line-h35 h35">{{item.product_name}}</p>
									<p class="color-999 ft-24 mg-tp30">
										<span class="ft-22 color-fc5920">￥<span class="ft-28"><strong>{{item.product_fact_price}}</strong></span></span>
										<span class="line-through">￥{{item.product_price}}</span>
									</p>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
            <!--没有更多-->
            <!-- <div class="loadMore1 text-center" v-if="BambooList.length==0">
                <img class="block noMore" src="@/assets/images/common/loadMore.png" alt="" />
                <p class="ft-20 mg-tp20 pd-bt10 color-999">没有更多了，看看其他的吧~</p>
            </div> -->
		</div>
		<!--结算-->
		<div class="payOrder bg-fff flex flex-ac h100 line-h100" v-if="goodList.length > 0">
        <!-- <div :class="goodList.length>0?payOrder:payOrder2" v-if="goodList.length > 0"> -->
			<div class="leftCont pd-lt30 ft-28 flex flex-ac flex-js">
				<img @click="selectAll" v-if="allChecked && goodList.length > 0" class="block mg-rt30" src="@/assets/images/common/delete.png" alt="" />
				<img @click="selectAll" v-else class="block mg-rt30" src="@/assets/images/common/delete_false.png" alt="" />
				全选
			</div>
			<div class="rightCont ft-28 flex flex-ac flex-je" v-if="!editChange">
				<span class="color-333">合计：</span>
				<span class="color-fc5920 mg-rt30">￥<strong>{{total_price}}</strong></span>
				<div class="account color-fff text-center" :class="activeClass?'active_bg':''" @click="toOrder">去结算</div>
			</div>
			<div class="rightCont ft-28 flex flex-ac flex-je" v-else>
				<div class="pro_del text-center bg-1ccfcf color-fff" @click="deleteAll">删除</div>
			</div>
		</div>
		<div class=""></div>
		<!-- 底部导航 -->
		<v-footer :footer='footer' :isCart='isCart' :cartNum='cartNum'></v-footer>
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
	import footer from '@/components/footer/footer.vue'
	export default {
		name:'cart',
		data(){
			return{
                uid:'', //用户id
                storeId:'', //当前门店id
				editChange:false, //编辑or完成
				allChecked:false, //全部选中
				total_price:'0.00', //商品总价
                activeClass:false, //选中样式
                allList:[], //购物车全部门店商品列表
                goodList:[], //当前门店购物车商品列表
                cartList:[], //当前门店购物相关信息
                checkList:[],
				wLenth:'100%',
                BambooList:[], //商品推荐列表
                cartNum:0, //购物车商品数量
                isCart:true, //是否是购物车
                shopInfo:{}, //门店信息
				footer: { first: "", second: "", third: "active", fourth: "", fifth:""}, //页脚选中高亮
				isShowPage:true, //是否有网络
			}
		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.$vux.loading.show({
	                text:"加载中"
	            })
                that.uid = window.localStorage.getItem("uid")
                that.storeId = window.localStorage.getItem("clickId")
				that.shopInfo = JSON.parse(window.localStorage.getItem('shopInfo'));
				console.log(that.shopInfo)
            },

            //获取购物车信息
            getCart(){
				var that = this;
				if(!that.uid){
					that.$vux.loading.hide()
				}
                var params = {
                    uid:that.uid,
                    oid:that.$router.app.__proto__.$oid
                }
                that.$apily.storecart(params).then(res =>{
                    if(res.code == 1){
                        that.allList = res.data
						var a = that.allList
						console.log(a)
                        for(let i=0;i<a.length;i++){
                            if(a[i].shopid == that.storeId){
                                that.cartList = a[i]
                                that.goodList = a[i].list
                                that.cartNum = (that.goodList).length
                                window.localStorage.setItem("cartNum",that.cartNum)
                                that.goodList.forEach(item =>{
                                	that.$set(item,'checked',false);
                                })
                            }
                        }
                    }
                })
                setTimeout(() => {
                    that.$vux.loading.hide()
                }, 500);
			},
			
			//商品推荐列表
			bestGoods(){
				var that = this;
				var params = {oid:that.$router.app.__proto__.$oid,type:-5,sid:that.storeId}
				that.$apily.products(params).then(res =>{
                    if(res.code == 1){
						that.BambooList = res.data
						that.wLenth = (that.BambooList.length * 2.2)  + ((that.BambooList.length - 1) * 0.4) + 'rem';
                    }
                })
			},

			// 右上角编辑、完成按钮
			edit(){
				var that = this;
                that.editChange = !that.editChange;
			},
			//全选
			selectAll(){
                var that = this;
                that.checkList = that.goodList
				that.allChecked = !that.allChecked;
				if(that.allChecked){
					that.goodList.forEach(item => {
						item.checked = true;
						that.activeClass = true;
					})
				}
				else{
					that.goodList.forEach(item => {
						item.checked = false;
						that.activeClass = false;
					})
				}
				//计算总价
				that.totalPrice();
				
			},
			//单选
			selectIndex(index){
                var that = this;
                var checked = that.goodList[index].checked;
                that.goodList[index].checked = !checked;
                var checked_length = that.goodList.filter(item => item.checked === true);
                that.checkList = checked_length;
				if(checked_length.length == that.goodList.length){
					that.allChecked = true;
				}
				else{
					that.allChecked = false;
				}
				if(checked_length.length > 0){
					that.activeClass = true;
				}
				else{
					that.activeClass = false;
				}
				//计算总价
				that.totalPrice();
			},
			//计算总价
			totalPrice(){
				var that = this;
				var total = 0;
				that.goodList.forEach(item => {
					if(item.checked){
						total += item.num * item.price;
					}
				})
				
				that.total_price = total.toFixed(2);
			},
			//商品减
			subtract(index){
                var that = this;
                var a = that.goodList
				if(a[index].num > 1){
                    a[index].num--;
                    var params = a[index].cart_id + '?num=' + a[index].num

                    that.$apily.storecart3(params).then(res =>{
                        
                    })
                    
				}
				else{
					that.$vux.confirm.show({
						title:'温馨提示',
						content:'确认移出购物车？',
						onConfirm () {
							//计算总价
                            that.totalPrice();
                            var params = a[index].cart_id  
                            that.$apily.storecart4(params).then(res =>{
                                if(res.code == 1){
                                    a.splice(index,1);
                                    that.cartNum = that.cartNum - 1
                                    window.localStorage.setItem("cartNum",that.cartNum)
                                    
                                }
                            })
						},
					})
				}
				//计算总价
                that.totalPrice();
                
			},
			//商品加
			plus(index){
                var that = this;
                var a = that.goodList
				that.goodList[index].num++;
				//计算总价
                that.totalPrice();
                var params = a[index].cart_id + '?num=' + a[index].num
                that.$apily.storecart3(params).then(res =>{
                    
                })
            },
			
			// 删除选中商品
			deleteAll(){
                var that = this;
                var a = that.goodList
				var checked_len = that.goodList.filter(item => item.checked == true);
				if(checked_len.length == 0){
					that.$vux.toast.text('请选择删除商品！','middle');
				}else{
                    if(!that.allChecked){
                        that.$vux.confirm.show({
                            title:'温馨提示',
                            content:'确认删除该商品？',
                            onConfirm () {
                                var c = that.checkList
                                var idList = []
                                var deleteList = []
                                for(let i=0;i<c.length;i++){
                                    idList.push(c[i].cart_id)
                                    deleteList.push(i)
                                }
                                idList = idList.join()
                                // that.totalPrice();
                                var params = idList
                                that.$apily.storecart4(params).then(res =>{
                                    if(res.code == 1){
                                        for(let i=0;i<deleteList.length;i++){
                                            a.splice(deleteList[i],1);
                                        }
                                        for(let i=0;i<a.length;i++){
                                            a[i].checked = false
                                        }
                                        that.$vux.toast.text('删除成功！','middle')
                                        that.cartNum = that.cartNum - 1;
                                        window.localStorage.setItem("cartNum",that.cartNum)
                                    }
                                })
                            }
                        })
                    }
                    else{
                        that.$vux.confirm.show({
                            title:'温馨提示',
                            content:'确认清空购物车？',
                            onConfirm () {
                                var idList = []
                                for(let i=0;i<a.length;i++){
                                    idList.push(a[i].cart_id)
                                }
                                var params = idList
                                that.$apily.storecart4(params).then(res =>{
                                    if(res.code == 1){
                                        a.splice(0,a.length);
                                        that.$vux.toast.text('清空购物车成功！','middle')
                                        that.cartNum =0
                                    }
                                })
                            }
                        })
                    }
				}
			},

			// 去结算按钮
			toOrder(){
                var that = this;
                for(let i=0;i<that.checkList.length;i++){
                    var product_images = [];
                    product_images.push(that.checkList[i].product_images)
                    that.checkList[i].product_images = product_images
                }
                that.checkList.forEach(item => {
                	that.$set(item,'id',item.pid);
                	that.$set(item,'name',that.shopInfo.name);
                	that.$set(item,'logo',that.shopInfo.logo);
                })
                
                window.localStorage.setItem("proArr",JSON.stringify(that.checkList))
				// var checked_len = that.goodList.filter(item => item.checked == true);
				if(that.checkList.length == 0){
					that.$vux.toast.text('请选择结算商品！','middle');
				}else{
					that.$router.push({name:'subOrder',params:{type:3}})
				}
				
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
					//获取用户信息
					that.getUser();
					//获取购物车信息
					that.getCart();
					//商品推荐列表
					that.bestGoods();
			    }
			},
			// 检查网络连接
			checkConnection(){
				var that = this;
				// 电脑上调试需解开下面三行代码注释
				that.getUser()
				that.getCart()
				that.bestGoods()

				var networkState = navigator.connection.type;
			    if (networkState === Connection.NONE) {
			      	that.isShowPage = false;
			      	that.$vux.toast.text('网络错误，请检查网络连接','bottom');
			    }
			    else{
					that.isShowPage = true;
					//获取用户信息
					that.getUser()
					//获取购物车信息
					that.getCart()
					//商品推荐列表
					that.bestGoods()
			    }
			}
		},
		created(){
            var that = this;
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
    .coverImgContainer{
        height:2rem;
    }
    div.coverImg{
        height:100%;
        background-size:cover;
        background-position:center;
    }
	.cart{
        min-height: calc(100vh - 1.88rem);
        padding-bottom: 1.3rem;
        .scrollHeight2{
            /*height:100vh;
			overflow-y: scroll;
            padding-bottom:1.3rem;*/
            .loadMore{
                min-height:calc(100vh - 8rem);
                padding:1.6rem 0 1.2rem 0;
                img{
                    width: 3rem;
                    margin-top:2rem;
                    // width:1rem;
                    // height:1rem;
                    margin: 0 auto;
                }
                .noMore{
                    width: 1rem;
                    height: 0.28rem
                }
                
                
            }
            .loadMore1{
                padding:0.3rem 0 0.2rem 0;
                img{
                    width: 2.5rem;
                    margin-top: 0.2rem;
                    // width:1rem;
                    // height:1rem;
                    margin: 0 auto;
                }
                .noMore{
                    width: 1rem;
                    height: 0.28rem
                }
                
                
            }
			.pro_rec{
				.title{
					font-family: 'PingFang-Medium';
					img{
						width:0.31rem;
						height:0.31rem;
					}
					p{
						font-family: 'PingFang-Medium';
						background:linear-gradient(to right,#ff4192,#fe7967);
						-webkit-background-clip: text;
           				-webkit-text-fill-color: transparent;
					}
					
				}
				.recommendList{
					width:100%;
					overflow:hidden;
					overflow-x:scroll;
					-webkit-overflow-scrolling:touch;
					.list{
						box-sizing: content-box;
						.list-item{
							.proImg{
								width:2.2rem;
								img{
									width:2.2rem;
									height:2rem;
								}
							}
							&.list-item:last-child .proImg{
								margin-right:0;
							}
						}
					}
				}
			}
        }
		.scrollHeight3{ 
			// min-height:calc(100vh - 2.88rem);
			// overflow-y: scroll;
            padding-bottom:1.3rem;
            .loadMore{
                    padding:0.3rem 0 0.2rem 0;
                    margin-top: 1rem;
                    img{
                        width: 4rem;
                        margin-top:2rem;
                        // width:1rem;
                        // height:1rem;
                        margin: 0 auto;
                    }
                    .noMore{
                        width: 1rem;
                        height: 0.28rem
                    }
                    
                    
                }
                .loadMore1{
                    padding:0.3rem 0 0.2rem 0;
                    img{
                        width: 2.5rem;
                        margin-top: 0.2rem;
                        // width:1rem;
                        // height:1rem;
                        margin: 0 auto;
                    }
                    .noMore{
                        width: 1rem;
                        height: 0.28rem
                    }
                    
                    
                }
			.shopCart{
                min-height:calc(100vh - 8rem);
				.storeName{
					font-family: 'PingFang-Medium';
					img{
						width:0.38rem;
						height:0.38rem;
					}
				}
				.proList{
                    background-color: #fff;
					.list-item{
						.checkBox{
							width:10%;
							img{
								width:0.38rem;
								height:0.38rem;
							}
						}
						.rightCont{
                            width:90%;
                            .rightDetail{
                                width: 100%;
                                padding: 0.2rem 0
                            }
							.imgBox{
                                width:30%;
								img{
                                    width:95%;
                                    height: 1.5rem;
								}
							}
							.proInfo{
                                width:70%;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
								.title,.pro_price{
									font-family: 'PingFang-Medium';
								}
							}
						}
						.limitNum{
							width:50%;
							bottom:0.1rem;
							right:0;
							.chooseNum{
                                width:1.75rem;
                                // height: 0.48rem;
                                border:0.02rem solid #ccc;
                                // box-sizing: content-box;
                                .add{
                                    color:#1ccfcf
                                }
								div{
                                    width:33.333%;
                                    height: 0.46rem;
                                    // line-height: 0.48rem;
									&:nth-child(1){
										border-right:0.02rem solid #ccc;
									}&:nth-child(2){
                                        border-right:0.02rem solid #ccc;
                                        line-height:0.46rem;
									}
								}
								
							}
						}
					}
                }
                
			}
			.pro_rec{
				.title{
					font-family: 'PingFang-Medium';
					img{
						width:0.31rem;
						height:0.31rem;
					}
					p{
						font-family: 'PingFang-Medium';
						background:linear-gradient(to right,#ff4192,#fe7967);
						-webkit-background-clip: text;
           				-webkit-text-fill-color: transparent;
					}
					
				}
				.recommendList{
					width:100%;
					overflow:hidden;
					overflow-x:scroll;
					-webkit-overflow-scrolling:touch;
					.list{
						box-sizing: content-box;
						.list-item{
							.proImg{
								width:2.2rem;
								img{
									width:2.2rem;
									height:2rem;
								}
							}
							&.list-item:last-child .proImg{
								margin-right:0;
							}
						}
					}
				}
			}
		}
		.payOrder{
			position:fixed;
            bottom:0.98rem;
			width:100%;
            // background-color:#fff;
            // display: flex;
            // align-items: center;
            // height: 1rem;
            // line-height: 1rem;
			.leftCont{
				width:30%;
				img{
					width:0.38rem;
					height:0.38rem;
				}
			}
			.rightCont{
				width:70%;
				.account{
					width:2rem;
					height:1rem;
					background:#ccc;
				}
				.pro_del{
					width:2rem;
					height:1rem;
				}
				.active_bg{
					background:#1CCFCF;
				}
			}
        }
        .payOrder2{
            position: relative;
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