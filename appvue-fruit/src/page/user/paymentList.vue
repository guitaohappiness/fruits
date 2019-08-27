<template>
	<div class="paymentList bg-f4f4f4">
		<x-header :left-options="{backText: ''}">明细</x-header>
		<!--tab-->
        <div class="tabList h100 line-h100">
            <tab default-color="#666" prevent-default active-color="#1CCFCF" :line-width="0" v-model='curIndex' @on-before-index-change="switchTabItem">
                <tab-item>
                    <div class="line h50 line-h50 mg-tp25 flex flex-jc">
                        <p class="rentOut ft-30">全部</p>
                    </div>
                </tab-item>
                <tab-item>
                    <div class="line h50 line-h50 mg-tp25 flex flex-jc">
                        <p class="sell ft-30">收入</p>
                    </div>
                </tab-item>
                <tab-item>
                    <div class="h50 line-h50 mg-tp25 flex flex-jc">
                        <p class="sell ft-30">支出</p>
                    </div>
                </tab-item>
            </tab>
        </div>
        <div class="mg-tp10 payList">
        	<div class="list" v-if="list.length > 0">
        		<div class="list-item bg-fff pd-lr30" v-for="(item,index) in list">
        			<router-link :to="{name:'paymentDes',params:{id:item.id}}" class="flex flex-ac bd-bt-eee">
        				<div class="leftCont flex flex-js">
	        				<div>
	        					<p class="ft-28 color-333">{{item.note}}</p>
	        					<p class="ft-24 color-999 mg-tp20">{{item.create_time}}</p>
	        				</div>
	        			</div>
	        			<div class="rightCont flex flex-je">
	        				<p class="ft-32 color-fc5920 bold" v-if="item.type == 1">+{{item.amount}}</p>
	        				<p class="ft-32 color-333 bold" v-else>-{{item.amount}}</p>
	        			</div>
        			</router-link>
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
        	<div v-else class="loadMore text-center">
                <img class="block" src="@/assets/images/common/icon4.png" alt="" />
                <p class="ft-20 mg-tp20 color-999">暂无明细~</p>
           	</div>
        </div>
	</div>
</template>

<script>
	export default {
		name:'paymentList',
		data(){
			return{
				curIndex:0, //收支状态选中下标
				list:[], //收支列表信息
				paged:1, //分页
				scrollWatch: true, //是否监听
				types:['ios-small'],
				isLoadMore:false,
			}
		},
		methods:{
			// 收支选项卡选择
			switchTabItem(index,paged){
                var that = this;
                if(paged){
		      		that.paged = paged;
		      	}else{
		      		that.paged = 1;
		      		that.list = [];
		      	}
                that.$vux.loading.show({
                    text: '加载中'
                });
                console.log('on-before-index-change', index);
                if(index){
                	var data = {
	                	oid:that.oid,
	                	uid:that.uid,
	                	status:index,
	                	paged:that.paged,
	                }
                }
                else{
                	var data = {
	                	oid:that.oid,
	                	uid:that.uid,
	                	status:'',
	                	paged:that.paged,
	                }
                }
                
                that.$api.rechargeDes(data).then(res => {
                	console.log(res);
                	if(res.code == 1 && res.data.length > 0){
			    		var arr = res.data;
			    		arr.forEach(item => {
		    				that.list.push(item);
		    			})
			    		
			    		if(that.paged == 1 && arr.length < 10){
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
                },500)
                that.curIndex = index;
			},
			// 获取缓存相关信息
            getParams(){
            	var that = this;
            	that.uid = window.localStorage.getItem('uid');
            	that.oid = that.$router.app.__proto__.$oid;
            	if(window.localStorage.getItem('orderIndex')){
					that.curIndex = parseInt(window.localStorage.getItem('orderIndex'));
					// 收支选项卡选择
					that.switchTabItem(that.curIndex);
				}
            	else{
					// 收支选项卡选择
            		that.switchTabItem(0);
            	}
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
						// 收支选项卡选择
						that.switchTabItem(that.curIndex,paged);
						console.log("触底加载更多");
					}
				}
			},
		},
		created(){
			var that = this;
			// 获取缓存相关信息
			that.getParams();
		},
		destroyed() {
			var that = this;
			that.scrollWatch = false;
			window.removeEventListener('scroll', that.handleScroll);
		},
	}
</script>

<style lang="less" scoped>
	.paymentList{
		min-height:calc(100vh - 0.88rem);
		.tabList{
            font-family: 'PingFang-Medium';
            .line{
                border-right:0.02rem solid #eee;
            }
            .rentOut,.sell{
                width:40%;
            }
        }
        .payList{
        	.list{
        		.list-item{
        			a{
        				padding:0.42rem 0 0.4rem 0;
        				.leftCont{
	        				width:70%;
	        			}
	        			.rightCont{
	        				width:30%;
	        			}
        			}
        		}
        	}
        }
        .loadMore{
            padding-bottom:0.2rem;
            img{
                width:0.6rem;
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