<template>
	<div class="search bg-f4f4f4">
		<x-header :left-options="{backText: ''}">
			<div class="searchBox mg-tp15 flex flex-ac ">
				<img class="block pd-lt35" src="@/assets/images/common/search.png" alt="" />
				<input class="block ft-28 color-333" @focus="showHis" v-model="inputVal" type="search" placeholder="请输入商品名称" />
			</div>
			<a slot="right" @click="searchResult()">搜索</a>
		</x-header>
		
		<div v-if="!isShowList">
			<div class="hotHis">
				<p class="ft-32 color-ccc">热门搜索</p>
				<div class="hisList ft-28 color-333 bd-bt-f4f4f4" v-if="hotList.length >0">
					<div class="list-item inline-block mg-tp30 mg-rt30 h60 pd-lr30 bd-rd10" @click="gethotList(index)" v-for="(item,index) in hotList">
						<!--<router-link class="ft-28 color-999 block pd-lr30" :to="{name:'proDetails'}">-->
							{{item.sname}}
						<!--</router-link>-->
					</div>
				</div>
                <div v-else class="ft-24 mg-tp30 color-999 text-center">暂无热门搜索哦~</div>
			</div>
			
			<div class="hotHis">
				<p class="ft-32 color-ccc">历史搜索</p>
				<div class="hisList ft-28 color-333" v-if="hisList.length >0">
					<div class="list-item inline-block mg-tp30 mg-rt30 h60 pd-lr30 bd-rd10" @click="gethisList(index)" v-for="(item,index) in hisList">
						<!--<router-link class="ft-28 color-999 block pd-lr30" :to="{name:'proDetails'}">-->
							{{item.sname}}
						<!--</router-link>-->
					</div>
				</div>
                <div v-else class="ft-24 mg-tp30 color-999 text-center">暂无历史搜索哦~</div>
			</div>
			
			<div class="clearHis h60 bd-rd10 flex flex-ac flex-jc" @click="clearHis">
				<img class="block mg-rt10" src="@/assets/images/common/deleteHis.png" alt="" />
				<p class="ft-28 color-999">清除历史搜索</p>
			</div>
		</div>
		<div v-else> 
			<!--列表-->
			<div class="proList" v-if="list1.length > 0">
	            <div class="list-item pd30 flex bg-fff bd-bt-f4f4f4 relative" v-for="(item,index) in list1">
	            	<router-link class="listLink flex flex-jc" :to="{name:'proDetails',params:{id:item.id}}">
	                    <div class="leftCont relative">
	                        <img class="block" :src="item.product_images" alt="" />
	                        <!--<div class="sale_null absolute bd-rd50 ft-26 flex flex-jc flex-ac color-fff" v-if="item.num == 0">
	                           	已售完
	                        </div>-->
	                        <!--<img class="hotIcon block absolute" src="@/assets/images/index/hotSale.png" alt="" />-->
	                    </div>
	                    <div class="rightCont">
	                        <p class="title ft-28 mult_line-ellipsis line-h40">
	                        	<span v-if="item.product_tag" class="inline-block h30 line-h30 bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8 mg-rt10">{{item.product_tag}}</span>
                                <span v-else class="inline-block h30 line-h30 bg-fc5920 ft-20 color-fff pd-lr10 bd-rd8 mg-rt10">优选</span>
	                            {{item.product_name}}
	                        </p>
	                        <p class="ft-24 limit flex flex-ac mg-tp10 flex">
	                            <span class="dian inline-block bd-rd8"></span>
	                            <span class="color-999 mg-rt20">销量</span>
	                            <span class="color-999">{{item.ordercount}}</span>
	                        </p>
	                        <p class="price mg-tp20 ft-22 color-fc5920">
	                        	￥<span class="ft-30 color-fc5920"><strong>{{item.product_fact_price}}</strong> </span>
	                        	<span class="ft-26 color-999 line-through">￥{{item.product_price}}</span>
	                        </p>
	                    </div>
	                </router-link>
	                <img @click="joinCart(index)" class="block absolute joinCart" src="@/assets/images/common/joinCart.png" alt="" />
	        	</div>
	        	<div class="loadMore text-center" v-if="isLoadMore">
	    			<group>
				      	<cell v-for="(type, index) in types" :key="type">
				       		<spinner :type="type"></spinner>
				       		<p class="ft-26 color-666">正在加载更多</p>
				      	</cell>
				    </group>
	    		</div>
				<div class="loadMore text-center" v-else>
		            <img class="block" src="@/assets/images/common/icon2.png" alt="" />
		            <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
		        </div>
	        </div>
	        <!--没有更多-->
	        <div v-else>
	    		<div class="styleNull">
	    			<img class="block" src="@/assets/images/user/orderNull.png" alt="" />
					<p class="text-center ft-28 color-999 mg-tp30">暂无商品~</p>
	    		</div>
	    	</div>
	    </div>
	    <v-backTop></v-backTop>
	</div>
</template>

<script>
	import backTop from '@/components/base/backTop.vue'
	export default{
		name:'search',
		data(){
			return{
                uid:'', //用户id
                clickId:'', //当前门店id
                oid:'', //行业id
                paged:1, //分页
				hotList:[], //热门搜索列表
				hisList:[], //历史搜索列表
				inputVal:'', //搜索内容
				list1:[], //搜索内容相关商品列表
                isShowList:false, //是否显示搜索商品列表
                scrollWatch:true,
                isLoadMore:false,
                types:['ios-small'],
			}
		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid")
                that.clickId = window.localStorage.getItem("clickId")
                that.oid = that.$router.app.__proto__.$oid
            },
            //获取热门搜索
            getHot(){
                var that = this
                var params = {
                    uid:that.uid,
                    oid:that.oid,
                    type:1,
                    sid:that.clickId,
                }
                that.$apily.storesearch(params).then(res =>{
                    if(res.code == 1){
                        that.hotList = res.data.hot;
                        that.hisList = res.data.his;
                    }
                })
            },
            
            //清除历史搜索
			clearHis(){
				var that = this;
                var params = that.uid
                that.$apily.storesearch2(params).then(res =>{
                    if(res.code == 1){
                        that.hisList = [];
                        that.$vux.toast.text('清除成功！','middle')
                    }
                })
            },
            
            //点击搜索
			searchResult(paged){
                var that = this;
                if(paged){
                	that.paged = paged;
                }
                else{
                	that.paged = 1;
                	that.list1 = [];
                }
                that.$vux.loading.show({
                    text:'加载中'
                })
				if(that.inputVal){
					that.isShowList = true;
				}
				else{
					that.$vux.toast.text('请输入关键词！','middle');
                }
                var params = {
                    uid:that.uid,
                    oid:that.oid,
                    _search: that.inputVal,
                    get search() {
                      return this._search;
                    },
                    set search(value) {
                      this._search=value;
                    },
                    type:2,
                    sid:that.clickId,
                    paged:that.paged,
                }
                that.$apily.storesearch(params).then(res =>{
                    if(res.code == 1 && res.data != ''){
                    	var arr = res.data;
                    	arr.forEach(item => {
                    		that.list1.push(item);
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
	                    that.$vux.loading.hide()
	                }, 500);
	                if (that.scrollWatch) {
				 		window.addEventListener("scroll", that.handleScroll);
				 	}
                })
			},
			// 获取热门搜索商品列表
			gethotList(index,paged){
                var that = this;
                if(paged){
                	that.paged = paged;
                }
                else{
                	that.paged = 1;
                	that.list1 = [];
                }
                that.$vux.loading.show({
                    text:'加载中'
                })
                let h = that.hotList;
                that.isShowList = true;
                that.inputVal = h[index].sname;
                var params = {
                    uid:that.uid,
                    oid:that.oid,
                    search:h[index].sname,
                    type:2,
                    sid:that.clickId,
                    paged:that.paged,
                }
                that.$apily.storesearch(params).then(res =>{
                	if(res.code == 1 && res.data != ''){
                    	var arr = res.data;
                    	arr.forEach(item => {
                    		that.list1.push(item);
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
	                    that.$vux.loading.hide()
	                }, 500);
	                if (that.scrollWatch) {
				 		window.addEventListener("scroll", that.handleScroll);
				 	}
                })
			},
			// 获取历史搜索商品列表
			gethisList(index,paged){
                var that = this;
                if(paged){
                	that.paged = paged;
                }
                else{
                	that.paged = 1;
                	that.list1 = [];
                }
                that.$vux.loading.show({
                    text:'加载中'
                })
                that.isShowList = true;
                let h = that.hisList;
                that.inputVal = h[index].sname;
                var params = {
                    uid:that.uid,
                    oid:that.oid,
                    search:h[index].sname,
                    type:2,
                    sid:that.clickId,
                    paged:that.paged,
                }
                that.$apily.storesearch(params).then(res =>{
                	if(res.code == 1 && res.data != ''){
                    	var arr = res.data;
                    	arr.forEach(item => {
                    		that.list1.push(item);
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
	                    that.$vux.loading.hide()
	                }, 500);
	                
	                if (that.scrollWatch) {
				 		window.addEventListener("scroll", that.handleScroll);
				 	}
                })
            },
            
            //加入购物车
			joinCart(index){
                var that = this;
                var l = that.list1
                if(!that.uid){
                    that.$vux.toast.text("您还未登录哦！","middle")
                }else{
                    var params = new FormData();
                    params.append("uid",that.uid);
                    params.append("pid",l[index].id);
                    params.append("shopid",that.clickId);
                    params.append("num",1);
                    params.append("oid",that.oid);
                    params.append("shop_type",1);
                    that.$apily.storecart2(params).then(res =>{
                        if(res.code == 1){
                            that.$vux.toast.text("加入购物车成功！","middle")
                        }
                        else{
                            that.$vux.toast.text("加入购物车失败！","middle")
                        }
                    })
                }
            	// that.$vux.toast.text('添加购物车成功！','middle');
			},
			// 搜索框获取焦点
           	showHis(){
           		var that = this;
                that.isShowList = false;
                var params = {
                    uid:that.uid,
                    oid:that.oid,
                    type:1,
                }
                that.$apily.storesearch(params).then(res =>{
                    if(res.code == 1){
                        that.hotList = res.data.hot;
                        that.hisList = res.data.his;
                    }
                })
                   
			},
			// 监听滚动条
           	handleScroll() {
				var that = this;
				var paged = that.paged;
				if (that.scrollWatch) {
					//当前滚动条高度
					var scrollTop =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop;
					//console.log("当前滚动条高度："+scrollTop)

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
						//点击搜索
						that.searchResult(paged);
						// 获取热门搜索商品列表
						that.gethotList(that.inputVal,paged);
						// 获取历史搜索商品列表
						that.gethisList(that.inputVal,paged);
						console.log("触底加载更多");
					}
				}
			},
        },
        mounted(){
			var that = this
			//获取用户信息
			that.getUser();
			//获取热门搜索
            that.getHot();
        },
        destroyed() {
			var that = this;
			that.scrollWatch = false;
			window.removeEventListener('scroll', that.handleScroll);
		},
		components:{
            'v-backTop':backTop,
        }
	}
</script>

<style lang="less" scoped>
	.search{
		min-height: calc(100vh - 0.88rem);
		.vux-header {
			font-family: 'PingFang-Medium';
			.searchBox{
				margin-left:10%;
				width:75%;
                border-radius:0.29rem;
                height:0.58rem;
                background-color: #fff;
				input{
					padding-left:0.2rem;
					width:70%;
                    height:0.58rem;
                    line-height: 0.58rem;
                    border-radius:0.29rem;
                    text-align: left
				}
				input::placeholder{
					font-size:0.24rem;
					color:#999;
				}
				img{
					height:0.25rem;
				}
			}
		}
		.hotHis{
			padding:0.4rem 0.3rem 0 0.3rem;
			.hisList{
				padding-bottom:0.5rem;
				.list-item{
					border:0.02rem solid #ccc;
					line-height:0.58rem;
				}
			}	
		}
		.clearHis{
			width:3.2rem;
			margin:0 auto;
			border:0.02rem solid #ccc;
			margin-top:2rem;
			line-height:0.58rem;
			img{
				width:0.27rem;
				height:0.25rem;
			}
		}
		.proList .list-item{
            .listLink{
                width: 100%
            }
            .leftCont{
                width:36%;
                img{
                    width:2.2rem;
                    height:2.2rem;
                }
                .sale_null{
                    width:1.1rem;
                    height:1.1rem;
                    background:rgba(0,0,0,.3);
                    bottom:0.55rem;
                    left:0.55rem;
                    font-family: 'PingFang-Medium';
                }
                .hotIcon{
                	top:0;
                	left:0;
                	width:0.76rem;
                	height:0.73rem;
                }
                .qh_time{
                    background:rgba(0,0,0,.3);
                    bottom:0;
                    font-family: 'PingFang-Medium';
                }
            }
            .rightCont{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width:64%;
                font-family: 'PingFang-Medium';
                .limit{
                    .dian{
                        margin-right:0.03rem;
                        width:0.1rem;
                        height:0.1rem;
                        background:#ccc;
                    }
                }
                .end_time{
                    span.times{
                        width:0.4rem;
                    }
                    span.dian{
                        margin:0 0.05rem;
                    }
                }
                .price{
                    p.joinGroup{
                        border:0.02rem solid #FC5920;
                        border-radius: 0.2rem;
                    }
                    p.joinGroup2{
                        border:0.02rem solid #999;
                        border-radius: 0.2rem;
                    }
                }
            }
            .joinCart{
            	right:0.4rem;
            	bottom:0.6rem;
                width:0.39rem;
                height:0.39rem;
            }
        }
        .loadMore{
            padding:0.3rem 0 0.3rem 0;
            img{
                width:1rem;
                height:0.28rem;
                margin: 0 auto;
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
	}
	
</style>