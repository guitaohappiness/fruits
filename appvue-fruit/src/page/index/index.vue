<template>
	<div class="index bg-f4f4f4" v-if="isShowPage">
		<!--search-->
		<div class="bg-1ccfcf header flex flex-ac pd-lr30">
			<div class="leftCont flex flex-ac" @click="getLocation">
				<img class="img1 mg-rt10" src="@/assets/images/index/address.jpg" alt="" />
				<span class="ft-24 color-fff">{{myLocate}}</span>
				<img class="img2" src="@/assets/images/common/openMenu.png" alt="" />
			</div>
            <router-link class="searchLink" :to="{name:'search'}">
                <div class="searchBox flex flex-ac bg-fff relative">
                    <div class="s_icon flex flex-ac">
                        <img src="@/assets/images/common/search.png" alt="" />
                    </div>
                    <input type="text" class="text-center ft-28" placeholder="搜索店铺商品" />
                </div>
            </router-link>
			<div class="rightCont flex flex-je">
                <router-link :to="{name:'userMessage'}">
                    <div class="m_icon flex flex-je relative">
                        <span v-if="isShowMsg" class="dian inline-block absolute bd-rd50 bg-fc5920"></span>
                        <img class="block" src="@/assets/images/common/message_f.png" alt="" />
                    </div>
                </router-link>
				<span class="ft-24 color-fff mg-tp8 text-center">消息</span>
			</div>
		</div>
		<div class="scrollHeight">
			<!--banner-->
			<div class="indexSwiper bg-fff pd30">
				<swiper auto loop dots-position='center' :show-desc-mask='false' v-model='indexSwiper' @on-index-change="indexSwiperChange" height='3rem'>
					<swiper-item class="custom-bottom" v-for="(item, index) in swiperList" :key="index">
                        <router-link :to="{name:'proDetails',params:{id:item.id}}"><img class="block bd-rd10" :src="item.banner" /></router-link>
					</swiper-item>
				</swiper>
	        </div>
	        <!--list-->
	        <div class="t_list bg-fff flex flex-ac flex-jc bd-bt-f4f4f4">
	        	<div class="list-item" v-for="(item,index) in shopwindowList" :key="index"> 
	        		<router-link class="block" :to="{name:'giftBox',params:{id:item.id,name:item.name}}" v-if="index == 0">
	        			<img class="block" :src="item.img" alt="" />
                        <p class="ft-26 color-333 text-center">{{item.name}}</p>
	        		</router-link>
	        		
	        		<router-link class="block" :to="{name:'hotSale',params:{id:item.id,name:item.name}}" v-if="index == 1">
	        			<img class="block" :src="item.img" alt="" />
                        <p class="ft-26 color-333 text-center">{{item.name}}</p>
	        		</router-link>
	        		
	        		<router-link class="block" :to="{name:'freshCut',params:{id:item.id,name:item.name}}" v-if="index == 2">
	        			<img class="block" :src="item.img" alt="" />
                        <p class="ft-26 color-333 text-center">{{item.name}}</p>
	        		</router-link>

	        		<router-link class="block" :to="{name:'userRec',params:{id:item.id,name:item.name}}" v-if="index == 3">
	        			<img class="block" :src="item.img" alt="" />
                        <p class="ft-26 color-333 text-center">{{item.name}}</p>
	        		</router-link>
	        	</div>
	        </div>
	        
	        <!--钜惠来袭-->
	        <div class="benefits bg-fff pd-bt40 bd-bt-f4f4f4">
	        	<div class="flex flex-ac flex-jc title">
	        		<img class="block mg-rt10" src="@/assets/images/index/home-icon1.png" alt="" />
	        		<p class="ft-34"><b>钜/惠/来/袭</b></p>
	        	</div>
	        	<div class="benefitsList flex flex-ac">
	        		<div class="list-item bg1 bd-rd10">
	        			<router-link :to="{name:'memberCharge'}" class="block">
		        			<div class="contBox">
		        				<div class="ft-28 color-fff name">会员折扣</div>
		        				<div class="line"></div>
		        				<div class="ft-20 color-fff">购买立享折扣</div>
		        				<div class="ft-20 color-fff mg-tp5">专属权益优惠多多</div>
		        			</div>
		        		</router-link>
	        		</div>
	        		<div class="list-item bg2 bd-rd10">
	        			<router-link :to="{name:'wallet'}" class="block">
	        				<div class="contBox">
			        			<div class="ft-28 color-fff name">充值有礼</div>
		        				<div class="line"></div>
		        				<div class="ft-20 color-fff">你敢来我敢送</div>
		        				<div class="ft-20 color-fff mg-tp5">多充多送惊喜不断</div>
		        			</div>
	        			</router-link>
	        		</div>
	        	</div>
	        </div>
	        
	        <!--店长推荐-->
	        <div class="recommend bg-fff">
	        	<div class="flex flex-ac flex-jc title">
	        		<img class="block mg-rt10" src="@/assets/images/common/recommend.png" alt="" />
	        		<p class="ft-34"><b>店/长/推/荐</b></p>
	        	</div>
	        	<div class="store relative">
	        		<img class="block absolute storeBg" src="@/assets/images/index/storeBg.jpg" alt="" />
	        		<div class="flex flex-ac flex-jc storeInfo relative">
	        			<div class="storeImg flex flex-ac flex-je">
	        				<img class="block bd-rd50" :src="storeLogo" alt="" />
	        			</div>
	        			<div class="storeName">
	        				<p class="ft-28 color-fff one-line-ellipsis">{{myStore.name}}</p>
	        				<p class="ft-22 mg-tp20 color-fff one-line-ellipsis">{{location}}</p>
	        			</div>
	        			<div class="changeStore flex flex-ac flex-jc" @click="changeSt">
	        				<p class="ft-24 color-fff mg-rt10">切换门店</p>
	        				<img class="block" src="@/assets/images/common/arrow_right_f.png" alt="" />
	        			</div>
	        		</div>
	        	</div>
	        	<div class="recommendList bd-bt-f4f4f4 pd-tb30">
					<div class="list pd-lr30 clearfix" :style="{width:wLenth}">
						<div class="list-item pull-left" v-for="(item,index) in BambooList">
							<router-link class="block" :to="{name:'proDetails',params:{id:item.id}}">
								<div class="proImg mg-rt40">
									<!--<img class="block bd-rd8" :src="item.product_images" alt="" />-->                                    
                                    <div class="recommendImageContainer">
                                    <div class="coverImg" :style="{ backgroundImage: `url(${item.product_images})`}"></div>
                                    </div>                                   
									<div class="title mult_line-ellipsis ft-26 mg-tp30 line-h40">
										<span v-if="item.product_tag" class="bg-fc5920 bd-rd8 ft-20 color-fff pd-lr10">{{item.product_tag}}</span>
                                        <span v-else class="bg-fc5920 bd-rd8 ft-20 color-fff pd-lr10 h30 line-h30">优选</span>
										<span class="mult_line-ellipsis">{{item.product_name}}</span>
									</div>
									<p class="color-fc5920 ft-26">
										<span class="ft-22">￥</span><strong>{{item.product_fact_price}}</strong>
										<span class="ft-24 color-999 line-through">￥{{item.product_price}}</span>
									</p>
								</div>
							</router-link>
						</div>
					</div>
				</div>
	        </div>
	        <!--精品好物-->
	        <div class="goodShops">
	        	<div class="flex flex-ac flex-jc title pd-tp40 pd-bt40 bg-fff">
	        		<img class="block mg-rt10" src="@/assets/images/index/goodShops.png" alt="" />
	        		<p class="ft-34"><b>精/品/好/物</b></p>
	        	</div>
	        	<div class="tab_list bg-fff bd-bt-f4f4f4">
	        		<div class="list pd-lr30 clearfix" :style="{width:wLenth2}">
	        			<p class="ft-26 color-333 mg-rt30 text-center pull-left h40 line-h40 list-item" v-for="(item,index) in tab_list" :class="curIndex == index ? 'active':''" @click="tabFun(index)"><b>{{item.category_name}}</b></p>
	        		</div>
	        	</div>
	        	<div class="proList" v-if="goodShop.length > 0">
	        		<div class="list clearfix bg-fff">
	        			<div class="list-item pull-left relative" v-for="(item,index) in goodShop">
		        			<router-link :to="{name:'proDetails',params:{id:item.id}}" class="block">
		        				<!--<img class="proImg block bd-rd8" :src="item.product_images" alt="" />-->
                                <div class="coverImgContainer">
                                    <div class="coverImg" :style="{ backgroundImage: `url(${item.product_images})`}"></div>
                                </div>
			        			<div class="title one-line-ellipsis ft-26 color-333 mg-tp20 line-h40 h60">
			        				<span v-if="item.product_tag" class="bg-fc5920 bd-rd8 ft-20 color-fff pd-lr10 h30 line-h30">{{item.product_tag}}</span>
	                                <span v-else class="bg-fc5920 bd-rd8 ft-20 color-fff pd-lr10 h30 line-h30">优选</span>
			        				<span>{{item.product_name}}</span>
			        			</div>
			        			<p class="color-fc5920 ft-26 mg-tp20">
			        				<span class="ft-22">￥</span>{{item.product_fact_price}}<span class="mg-lt10 ft-24 color-999 line-through">￥{{item.product_price}}</span>
			        			</p>
		        			</router-link>
		        			<img @click="addCart(index)" class="joinCart absolute" src="@/assets/images/common/joinCart.png" alt="" />
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
			            <div class="loadMore text-center">
			                <img class="block" src="@/assets/images/common/icon4.png" alt="" />
			                <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
			            </div>
					</div>
	        	</div>
	        	<div v-else class="loadMore text-center">
                    <img class="block" src="@/assets/images/common/icon4.png" alt="" />
                    <p class="ft-20 mg-tp20 color-999">暂无商品~</p>
               	</div>
	        </div>
	   	</div>
        <!-- 优惠券弹窗 -->
	   	<div class="black_cover" v-if="isShowModal">
	   		<div class="couponModal relative">
                <img @click="closeModal" class="block closeModal absolute" src="@/assets/images/index/couponModalClose.png" alt="" />
	   			<img class="block couponBg" src="@/assets/images/index/couponBg.png" alt="" />
	   			<p v-if="!isCheck&&couponDetail" class="firstCp color-fff absolute text-center title line-h55">
	   				{{couponDetail.name}}送您一张优惠券，快来看看吧~
	   			</p>
                <p v-if="isCheck" class="firstCp color-fff absolute text-center title line-h55">
                    hi，初次见面送您一张优惠券，快来看看吧~
	   			</p>
	   			<p class="ft-28 color-333 absolute content flex flex-ac flex-jc">
	   				可在<span class="color-fc5920"><strong>&nbsp;我的-优惠券&nbsp;</strong></span>中查看
	   			</p>
	   			<p class="price absolute color-fff">
	   				<!-- <strong>20元</strong> -->
                       {{couponPrice}}元
	   			</p>
                   
	   			<div class="text absolute ft-32 color-fff">
	   				<p><strong>优惠券</strong></p>
	   				<p class="mg-tp10 ft-26">{{couponDetail.type_name}}</p>
	   			</div>
                <!-- <p class="limit absolute ft-24 color-fff">
                    <span>有效期</span> {{couponDetail.coupon_add_time}}~{{couponDetail.coupon_left_time}}
                </p> -->
	   			<img @click="getNow" class="block getCou absolute" src="@/assets/images/index/get.png" alt="" />
	   		</div>
	   	</div>
	   	<v-backTop></v-backTop>
		<!-- 底部导航 -->
		<v-footer :footer='footer' :indexCart='cartNum' :isIndex='isIndex' :isEmpty='empty'></v-footer>
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
    import backTop from '@/components/base/backTop.vue'
	import footer from '@/components/footer/footer.vue'
	export default {
		name:'index',
		data(){
			return{
				footer: { first: "active", second: "", third: "", fourth: "", fifth:""},  //页脚选中高亮
				indexSwiper:0, //轮播图下标
				swiperList:[], //轮播图列表
				wLenth:'100%',
				wLenth2:'100%',
				BambooList:[], //店长推荐商品列表
				tab_list:[], //精品好物标题列表
				goodShop:[], //精品好物商品列表
				shopwindowList:[],  //轮播图下商品主分类
                uid:'', //用户id
                oid:'', //行业id
				curIndex:0, //精品好物选项卡标题下标
                isShowModal:false, //是否显示优惠券弹窗
                couponDetail:'',  //优惠券信息
                couponPrice:'', //优惠券价格
                isCheck:'',
                myLocate:'....',  //我的位置
                myStore:'', //门店信息
                location:'', //门店位置信息
                tabId:'',//精品好物tab栏当前的id
                clickId:'',//当前选择的门店ID
                cartNum:0, //购物车商品数量
                empty:0, //购物车空的
				lng: '',
				lat: '',
                isIndex:true,
                storeLogo:'',  //当前门店logo
                paged:1, //分页
                isLoadMore:false,
                scrollWatch: true, //是否监听
                isShowMsg:'', //是否显示未读消息红点
                types:['ios-small'],
                isShowPage:true,  //是否有网络
			}
		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.oid = that.$router.app.__proto__.$oid;
                that.isCheck = that.$route.params.isCheck;

                //判断是否有用户信息
                if(window.localStorage.getItem("uid")){
                    that.uid = window.localStorage.getItem("uid")
                }
                else{
                    that.uid = 0
                }
                //判断是否有位置信息等缓存
                if(window.localStorage.getItem("lng")){
                    // that.$vux.loading.show({
                    //     text:'加载中'
                    // })
                    that.lng = window.localStorage.getItem("lng")
                    that.lat = window.localStorage.getItem("lat")
                    that.clickId = window.localStorage.getItem("clickId")
                    that.myLocate = window.localStorage.getItem("myLocate").substring(0,2)
                    //that.getStores()
                    setTimeout(() => {
						//获取门店详情
						that.getDetail()
						//获取首页商品列表
						that.getProducts()
						//获取首页商品分类列表
						that.getTypes()
						//获取购物车信息
						that.getCart()
						//获取商品主分类
                        that.shopwindow();
                        // that.getPosition();
                    }, 500);
                }
                else{
                    if(!window.localStorage.getItem("clickId")){
                        that.$vux.loading.show({
                            text:'获取定位信息',
						})
						//GPS定位
                        that.getPosition();
                        if(window.localStorage.getItem("uid")){
							//获取优惠券列表
                            that.getCoupon();
                        }
                    }
                    else{
						that.clickId = window.localStorage.getItem("clickId");
						//获取门店详情
						that.getDetail();
						//获取首页商品列表
						that.getProducts();
						//获取首页商品分类列表
						that.getTypes();
						//获取购物车信息
						that.getCart();
						//获取商品主分类
                        that.shopwindow();
                        // that.getPosition();
                    }
                }
            },

            //获取购物车信息
            getCart(){
                var that = this;
                
                var params = {
                    uid:that.uid,
                    oid:that.$router.app.__proto__.$oid
                }
                that.$apily.storecart(params).then(res =>{
                    if(res.code == 1){
                        var a = res.data
                        for(let i=0;i<a.length;i++){
                            if(a[i].shopid == that.clickId){
                                let cartList = a[i]
                                let goodList = a[i].list
                                that.cartNum = goodList.length
                            }
                        }
                    }
                })
            },
            
            //获取消息数量
            getMsg(){
                var that = this;
                var params = {
                    uid:that.uid,
                    oid:that.oid,
                }
                that.$apily.message(params).then(res =>{
                    if(res.code == 1){
                        if(res.data){
                           that.isShowMsg = res.data.message_count;
                        }
                    }
                })
            },

            //加入购物车
            addCart(index){
                var that = this;
                if(!that.uid){
                    that.$vux.toast.text("您还未登录哦！","middle");
                    
                }else{
                    var params = new FormData();
                    params.append("uid",that.uid);
                    params.append("pid",(that.goodShop)[index].id);
                    params.append("shopid",that.clickId);
                    params.append("num",1);
                    params.append("oid",that.oid);
                    params.append("shop_type",1);
                    that.$apily.storecart2(params).then(res =>{
                        if(res.code == 1){
                            if(that.cartNum == 0){
                                that.empty = 1
                            }
							that.$vux.toast.text("加入购物车成功！","middle");
							//获取购物车信息
                            that.getCart();
                        }
                        else{
                            that.$vux.toast.text("加入购物车失败！","middle");
                        }
                    })
                }
            },

            //获取位置信息
            getLct(){
                var that = this
                var params = {
                    lon:that.lng,
                    lat:that.lat,
                }
                that.$apily.location(params).then(res =>{
                	console.log(res)
                    window.localStorage.setItem("myLocate",res.data.area);
                    that.myLocate = res.data.area.substring(0,2);
                })
            },

            //获取门店列表
            getStores(){
                var that = this
                var m = that.lng + ',' + that.lat;
                var params = {
                    oid:that.oid,
                    uid:that.uid,
                    origin:m,
                }
                that.$apily.store(params).then(res =>{
                    if(res.code == 1){
                        var s = res.data
                        for(let i = 0;i<s.length;i++){
                            if(that.clickId){
                                if(s[i].id == that.clickId){
                                    that.myStore = s[i]
                                    that.location = s[i].location
									that.storeLogo = s[i].logo
									//获取首页商品列表
									that.getProducts();
									//获取首页商品分类列表
									that.getTypes();
									//获取购物车信息
									that.getCart();
									//获取商品主分类
                                    that.shopwindow();
                                }
                            }
                            //判断是否有关注的门店
                            else if(s[i].isCheck == 1){
                                that.myStore = s[i]
                                that.location = s[i].location
                                that.clickId = s[i].id
                                that.storeLogo = s[i].logo
								window.localStorage.setItem("clickId",that.clickId)
								//获取首页商品列表
								that.getProducts()
								//获取首页商品分类列表
								that.getTypes()
								//获取购物车信息
								that.getCart()
								//获取商品主分类
                                that.shopwindow();
                            }
                        }
                        if(!that.myStore){
                            that.myStore = s[0]
                            that.location = s[0].location
                            that.clickId = s[0].id
                            that.storeLogo = s[0].logo
							window.localStorage.setItem("clickId",that.clickId)
							//获取首页商品列表
							that.getProducts()
							//获取首页商品分类列表
							that.getTypes()
							//获取购物车信息
							that.getCart()
							//获取商品主分类
                            that.shopwindow();
                        }
                    }
                    setTimeout(() => {
                    	
                    },100)
                })

            },

            //获取门店详情
            getDetail(){
                var that = this;    
                var params = that.clickId
                that.$apily.store2(params).then(res =>{
                    if(res.code == 1){
                        that.myStore = res.data
                        that.location = res.data.address
                        that.storeLogo = res.data.logo;
                        window.localStorage.setItem('shopInfo',JSON.stringify(res.data));
                        setTimeout(() => {
                            that.$vux.loading.hide();
                        },500)
                    }
                })
            },

            //切换门店
            changeSt(){
                var that = this;
                that.$router.push({name:'changeStore'})
            },

            //获取首页商品列表
            getProducts(){
                var that = this;
                var params7 = {oid:that.oid,type:-7,sid:that.clickId}//轮播图
                var params6 = {oid:that.oid,type:-6,sid:that.clickId}//店长推荐
                
                that.$apily.products(params7).then(res =>{
                    if(res.code == 1){
                        that.swiperList = res.data
                    }
                })
                that.$apily.products(params6).then(res =>{
                    if(res.code == 1){
                        that.BambooList = res.data
			            that.wLenth = (that.BambooList.length * 2.2)  + ((that.BambooList.length - 1) * 0.4) + 'rem';
                    }
                })
                
            },

            //获取首页商品分类列表
            getTypes(){
                var that = this;
                var params = {
                    oid:that.oid
                }
                that.$apily.procategory(params).then(res =>{
                    that.tab_list = res.data
                    that.tabId = that.tab_list[0].id
                    that.wLenth2 = (that.tab_list.length * 1.2) + ((that.tab_list.length - 1) * 0.3) + 0.6 + 'rem';
                    //获取第一栏商品列表
                    // var params = {
                    //     oid:that.oid,cid:that.tabId,sid:that.clickId,paged:that.paged
                    // }
                    // that.$apily.products(params).then(res =>{
                    //     if(res.code == 1){
                    //         that.goodShop = res.data;
                    //     }
					// })
					that.tabFun(that.curIndex,that.paged);
                })
            },

			// 轮播图切换
			indexSwiperChange(index){
				var that = this;
				that.indexSwiper = index;
            },
            
            //点击精品好物的tab栏
			tabFun(index,paged){
                var that = this;
                var t = that.tab_list;
				that.$vux.loading.show({
					text:'加载中'
                })
                //切换tab栏的请求
               	if(that.curIndex!=index){
                   that.paged = 1;
                   that.goodShop = [];
                   that.scrollWatch = false;
               	}
               	else{
               		if(paged){
                		that.paged = paged;
                	}
               		else{
               			that.paged = 1;
               			that.goodShop = [];
               			that.scrollWatch = false;
               		}
               	}
                that.tabId = t[index].id
                var params = {
                    oid:that.oid,cid:that.tabId,sid:that.clickId,paged:that.paged
                }
                that.$apily.products(params).then(res =>{
                    if(res.code == 1 && res.data != ''){
                        var arr = res.data;
                        arr.forEach(item => {
		    				that.goodShop.push(item);
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
	                },500)
					if (that.scrollWatch) {
				 		window.addEventListener("scroll", that.handleScroll);
				 	}                    
                })
                that.curIndex = index;
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
							text: "加载中",
						});
						that.tabFun(that.curIndex,paged);
						console.log("触底加载更多");
					}
				}
			},
			// 点击左上角定位跳转页面
			getLocation(){
				var that = this;
				that.$router.push({name:'curLocation'})
            },
            
            //获取优惠券列表
            getCoupon(){
                var that = this;
                var params = {
                    uid:that.uid,
                    oid:that.oid,
                    isCheck:that.$route.params.isCheck,
                }
                that.$apily.storercoupon(params).then(res=>{
                    if(res.code==1){
                        if(res.data){
                            that.couponDetail = res.data;
                            that.couponPrice = res.data.coupon_price;
                            setTimeout(() => {
                            	that.isShowModal = true;
                            },500)
                        }
                    }
                })
			},
			// 点击关闭优惠券弹窗
			closeModal(){
				var that = this;
                that.isShowModal = false;
                if(that.couponDetail.oid){
                	var params = new FormData();
                	params.append("id",that.couponDetail.id)
                	params.append("uid",that.uid)
                	params.append("oid",that.oid)
                	params.append("receive_type",1)
	                that.$apily.getcoupon(params).then(res=>{
	                	
	                })
                }
                
            },
            //立即领取
            getNow(){
                var that = this;
                that.isShowModal = false;
                if(that.couponDetail.oid){
                	var params = new FormData();
                	params.append("id",that.couponDetail.id)
                	params.append("uid",that.uid)
                	params.append("oid",that.oid)
                	params.append("receive_type",'')
	                that.$apily.getcoupon(params).then(res=>{
	                    if(res.code==1){
	                        that.$vux.toast.text('领取成功！')
	                    }
	                })
                }
                
            },
            
            //GPS定位
            getPosition() {
                var that = this

//                 that.lat = '30.51585'
//                 that.lng = '114.344917'
//                 that.changeLat()

                var options = {
                    enableHighAccuracy: true,
                    timeout: 1000,
                    maximumAge: 3600000
                }
                var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

                function onSuccess(position) {
                    that.lat = position.coords.latitude
					that.lng = position.coords.longitude
					//经纬度转换
                    that.changeLat()
                };
                function onError(error) {
                    var data = {
                		oid:that.$router.app.__proto__.$oid,
                	}
                	that.$api.randSid(data).then(res => {
                		console.log(res);
                		if(res.code == 1){
                			setTimeout(() => {
		                        that.$vux.loading.hide();
		                        that.$vux.toast.text('获取定位失败!','middle');
		                        that.clickId = res.data.id;
		                        window.localStorage.setItem("clickId",that.clickId);
								window.localStorage.setItem("oid",res.data.oid);
								//获取门店详情
								that.getDetail()
								//获取首页商品列表
								that.getProducts()
								//获取首页商品分类列表
								that.getTypes()
								//获取购物车信息
								that.getCart()
								//获取商品主分类
		                        that.shopwindow();
                    		}, 500);
                		}
                		else{
                			setTimeout(() => {
		                        that.$vux.loading.hide();
		                        that.clickId = res.data.id;
								window.localStorage.setItem("clickId",that.clickId)
								//获取门店详情
								that.getDetail()
								//获取首页商品列表
								that.getProducts()
								//获取首页商品分类列表
								that.getTypes()
								//获取购物车信息
								that.getCart()
								//获取商品主分类
		                        that.shopwindow();
	                		}, 500);
                		}
                	})
                }
            },

            //经纬度转换
            changeLat(){
                var that = this;
                var m = that.lng + ',' + that.lat
                var params = {
                    type:3,
                    returnlat:m
                }
                that.$apily.location(params).then(res =>{
                    if(res.code == 1){
                        that.lng = res.data[0]
                        that.lat = res.data[1]
                        window.localStorage.setItem("lng",that.lng);
                        window.localStorage.setItem("lat",that.lat);
                    }
                    else{
                        that.$vux.toast.text('经纬度转换失败！');
                    }
                    setTimeout(() => {
						//获取位置信息
						that.getLct()
						//获取门店列表
                        that.getStores()
                        setTimeout(() => {
                            that.$vux.loading.hide();
                        }, 400);
                    }, 10);
                    
                })
			},
			//获取商品主分类
            shopwindow(){
            	var that = this;
            	var data = {
            		oid:that.oid,
            	}
            	that.$api.shopwindow(data).then(res => {
            		console.log(res);
            		that.shopwindowList = res.data;
            	})
            },
            //Cordova加载完毕
			onDeviceReady(){
				var that = this;
				//监听返回键按钮事件
				document.addEventListener("backbutton", that.eventBackButton, false);
			},
			eventBackButton(){
				var that = this;
				that.$vux.toast.text('再点击一次退出!','middle');
				//window.plugins.ToastPlugin.show_short('!再点击一次退出');
				document.removeEventListener("backbutton", that.eventBackButton, false); //注销返回键  
				document.addEventListener("backbutton", that.exitApp, false);//绑定退出事件
				//2秒后重新注册  
				var intervalID = window.setInterval(function(){  
				  	document.clearInterval(intervalID);  
				 	document.removeEventListener("backbutton", that.exitApp, false); // 注销返回键  
				  	document.addEventListener("backbutton", that.eventBackButton, false); //返回键  
				},2000);  
			},
			// 注销返回键
			exitApp(){
				navigator.app.exitApp();
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
					//获取消息数量
		       	 	that.getMsg();
			    }
			},
			checkConnection(){
				var that = this;
				// 电脑上调试需解开下面两行代码注释
			    that.getUser();
				that.getMsg();
				   
				var networkState = navigator.connection.type;
			    if (networkState === Connection.NONE) {
			      	that.isShowPage = false;
			      	that.$vux.toast.text('网络错误，请检查网络连接','bottom');
			    }
			    else{
					that.isShowPage = true;
					//获取用户信息
					that.getUser();
					//获取消息数量
		       	 	that.getMsg();
			    }
			}
       	},
		created(){
            var that = this;
            if(window.localStorage.getItem('groupIndex')){
				window.localStorage.removeItem('groupIndex');
            }
            //页面加载后添加各事件监听
            document.addEventListener("deviceready", that.onDeviceReady, false); 
            
            that.checkConnection();
            //监听状态
            document.addEventListener("offline", that.offline, false);
       	},
		components:{
			'v-footer':footer,
			'v-backTop':backTop,
		},
		destroyed() {
			var that = this;
			document.removeEventListener("backbutton", that.exitApp, false); // 注销返回键  
			document.removeEventListener("backbutton", that.eventBackButton, false); //返回键  
			that.scrollWatch = false;
			window.removeEventListener('scroll', that.handleScroll);
			document.removeEventListener("offline", that.offline, false);
		},
	}
</script>

<style lang="less" scoped>
    .recommendImageContainer{
        height:2rem;
    }
    .coverImgContainer{
        height:2.5rem;
    }
    div.coverImg{
        height:100%;
        background-size:cover;
        background-position:center;
    }
	.index{
		.header{
			position:fixed;
			top:0;
			width:100%;
			height:0.88rem;
			z-index:999;
			.leftCont{
				width:20%;
				.img1{
					width:0.34rem;
					height:0.40rem;
				}
				.img2{
					margin-left:0.05rem;
					width:0.24rem;
					height:0.14rem;
				}
            }
            .searchLink{
                width: 70%;
            }
			.searchBox{
                border-radius:0.29rem;
                a{  
                    height: 0.58rem;
                }
				.s_icon{
                    padding-left: 0.2rem;
					img{
						height:0.25rem;
					}
				}
				input{
					width:70%;
                    height:0.58rem;
                    line-height: 0.58rem;
                    border-radius:0.29rem;
                    text-align: left;
                    padding-left: 0.2rem;
				}
				input::placeholder{
					font-size: 0.24rem;
					color:#999;
					line-height: 0.58rem;
					background:#fff;
				}
			}
			.rightCont{
				width:10%;
				.m_icon{
					margin-top:0.05rem;
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
		.scrollHeight{
            padding-bottom: 1.3rem;
			.indexSwiper .vux-swiper-item img{
				width:100%;
				height:100%;
			}
			.t_list{
				padding:0.2rem 0.3rem 0.3rem 0.3rem;
				.list-item{
					font-family: 'PingFang-Medium';
					width:25%;
					img{
						margin:0 auto;
						width:0.8rem;
						height:0.8rem;
                    }
                    p{
                        margin-top: 0.1rem;
                        // color:#77787b;
                        font-size: 0.26rem
                    }
				}
			}
			.benefits{
				.title{
				padding:0.45rem 0 0.4rem 0;
					img{
						width:0.31rem;
					}
					p{
						font-family: 'PingFang-Medium';
						background:linear-gradient(to right,#fd4c23,#f9b626);
						-webkit-background-clip: text;
           				-webkit-text-fill-color: transparent;
					}
				}
				.benefitsList{
					margin:0 auto;
					width:92%;
					.list-item{
						width:45%;
						&.bg1{
							width:48%;
							height:1.71rem;
							background:url('../../assets/images/index/home-img1.png');
							background-size: 100%;
							background-repeat: no-repeat;
						}
						&.bg2{
							width:48%;
							height:1.71rem;
							background:url('../../assets/images/index/home-img2.png');
							background-size: 100%;
							background-repeat: no-repeat;
						}
						&:nth-child(1){
							margin-right:4%;
						}
						.contBox{
							height:1.71rem;
							font-family: 'PingFang-Medium';
							padding:0.5rem 0 0 0.55rem;
							.name{
								
							}
							.line{
								margin:0.05rem 0;
								width:0.3rem;
								height:0.04rem;
								background:#fff;
							}
						}
					}
					
				}
			}
			.recommend{
                /*margin-top: 0.1rem;*/
				.title{
				padding:0.45rem 0 0.4rem 0;
					img{
						width:0.31rem;
					}
					p{
						font-family: 'PingFang-Medium';
						background:linear-gradient(to right,#ff4192,#fe7967);
						-webkit-background-clip: text;
           				-webkit-text-fill-color: transparent;
					}
				}
				.store{
					margin:0 auto;
                    width:92%;
                    height: 1.5rem;
					.storeBg{
						width:100%;
					}
					.storeInfo{
						width:100%;
						height:1.46rem;
						z-index:99;
						.storeImg{
							width:20%;
							img{
								width:0.8rem;
								height:0.8rem;
								
							}
						}
						.storeName{
							padding-left:2%;
							width:54%;
						}
						.changeStore{
							width:24%;
							img{
								width:0.13rem;
								height:0.23rem;
							}
						}
					}
				}
				.recommendList{
					width:100%;
					overflow:hidden;
					overflow-x:scroll;
					-webkit-overflow-scrolling:touch;
					.list{
						overflow-y:hidden;
						box-sizing: content-box;
						.list-item{
							font-family: 'PingFang-Medium';
							.proImg{
								width:2.2rem;
								img{
									width:2.2rem;
									height:2rem;
								}
								.title{
                                    height: 0.8rem;
                                    color:#333;
                                    margin-bottom: 0.2rem;
                                    padding: 0;
									span{
                                        // display: inline-block;
                                        // height: 0.3rem;
                                        // line-height: 0.3rem;
                                        vertical-align: middle;
                                    }
                                    :last-child{
                                        display: inline;
                                    }
                                    
								}
								
							}
							&.list-item:last-child .proImg{
								margin-right:0;
							}
						}
					}
				}
			}
			.goodShops{
                /*margin-top: 0.1rem;*/
				.title{
					img{
						width:0.31rem;
						height:0.31rem;
					}
					p{
						font-family: 'PingFang-Medium';
						background:linear-gradient(to right,#ff830b,#fed754);
						-webkit-background-clip: text;
           				-webkit-text-fill-color: transparent;
					}
				}
				.tab_list{
                    width:100%;
                    height: 0.7rem;
					overflow: hidden;
                    overflow-x: scroll;
					-webkit-overflow-scrolling:touch;
					.list{
						overflow-y: hidden;
                        padding-bottom: 0.2rem;
						.list-item{
							width:1.2rem;
							&.list-item:last-child{
								margin-right:0;
							}
						}
					}
				}
				.proList{
					.list{
						padding-bottom:0.6rem;
						.list-item{
							font-family: 'PingFang-Medium';
							width:50%;
							.proImg{
								width:100%;
                                height: 2.5rem;
							}
							.title{
	                            span{
	                            // display: inline-block;
	                            // height: 0.3rem;
	                            // line-height: 0.3rem;
	                            vertical-align: middle;
	                            }
	                            :last-child{
	                                display: inline;
	                            }
							}
							&.list-item:nth-child(odd){
								padding:0.3rem 0.2rem 0 0.3rem;
							}
							&.list-item:nth-child(even){
								padding:0.3rem 0.3rem 0 0.15rem;
							}
							.joinCart{
								bottom:0;
								right:0.3rem;
								width:0.5rem;
								height:0.5rem;
							}
						}
					}
				}
				.loadMore{
	                padding:0.1rem 0 0.1rem 0;
	                img{
	                    width:1.2rem;
	                    margin: 0 auto;
	                }
            	}
			}	
		}
	}
	.active{
		font-family: 'PingFang-Medium';
		color:#1CCFCF;
		border-bottom:0.02rem solid #1CCFCF;
	}
	.couponModal{
		margin:0 auto;
		margin-top:35%;
		width:5.7rem;
        height:6.45rem;
        .firstCp{
            font-size: 0.37rem
        }
		.couponBg{
			width:100%;
		}
		.title{
			top:22%;
			left:10%;
			width:80%;
		}
		.content{
			width:100%;
			top:52%;
		}
		.price{
			font-size: 0.43rem;
			top:74%;
			left:27%;
		}
		.text{
			top:72%;
			left:56%;
        }
        .limit{
            top:85%;
			left:56%;
        }
		.closeModal{
			// bottom:-0.95rem;
			// left:calc(50% - 0.325rem);
			width:0.65rem;
            height:0.65em;
            top:-0.7rem;
            right: 0;
        }
        .getCou{
            bottom:-1.5rem;
            left:calc(20%);
            width: 3.5rem;
            height: 0.9rem;
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