<template>
	<div class="userMessage bg-f4f4f4">
		<x-header :left-options="{backText: ''}">消息通知</x-header>
		<div class="list" v-if="msgList.length > 0">
			<div class="list-item ft-20" v-for="(item,index) in msgList" @click="readMsg(index)">
				<div v-if="item.order_status==7||item.order_status==9||item.order_status==10">
                    <div class="text-center">
						<p class="date inline-block pd-lr10 h40 line-h40 bd-rd4 color-fff">{{item.createTime}}</p>
					</div>
					<div class="msgType bd-rd10 mg-tp30 bg-fff pd30">
						<div class="msgTitle">
							<p class="title ft-28" v-if="item.order_status==7">您有一条订单已拒绝</p>
							<p class="title ft-28" v-if="item.order_status==9">您有一条订单已退款</p>
							<p class="title ft-28" v-if="item.order_status==10">您有一条订单退款中</p>
							<p class="cont2 flex flex-je flex-ac ft-24" v-if="item.read == 1">
                                <span class="dian inline-block bd-rd50 bg-fc5920"></span>
                               	未读消息
                            </p>
						</div>
						<div class="flex pd-tp20">
							<div class="leftCont">
								<img :src="item.content" alt="" />
							</div>
							<div class="rightCont flex flex-as line-h40 ft-24">
								{{item.title}}
							</div>
						</div>
					</div>
				</div>
				<div v-else>
                    <div v-if="item.order_type==1||item.order_type==2">
						<div class="text-center">
							<p class="date inline-block pd-lr10 h40 line-h40 bd-rd4 color-fff">{{item.createTime}}</p>
						</div>
						<div class="msgType bd-rd10 mg-tp30 bg-fff pd30">
                            <div class="msgTitle">
                                <p class="title ft-28" v-if="item.order_status==1&&item.order_type==1">您有一条订单待付款</p>
                                <p class="title ft-28" v-if="item.order_status==2&&item.order_type==1">您有一条订单待配送</p>
                                <p class="title ft-28" v-if="item.order_status==3&&item.order_type==1">您的订单正在配送中</p>
                                <p class="title ft-28" v-if="item.order_status==4&&item.order_type==1">您有一条订单已完成</p>
                                <p class="title ft-28" v-if="item.order_status==1&&item.order_type==2">您有一条订单待付款</p>
                                <p class="title ft-28" v-if="item.order_status==3&&item.order_type==2">您有一条订单待核销</p>
                                <p class="title ft-28" v-if="item.order_status==4&&item.order_type==2">您有一条订单已核销</p>
                                <p class="title ft-28" v-if="item.order_status==9">您有一条订单已退款</p>
                                <p class="title ft-28" v-if="item.order_status==10">您有一条订单退款中</p>
                                <p class="cont2 flex flex-je flex-ac ft-24" v-if="item.read == 1">
                                    <span class="dian inline-block bd-rd50 bg-fc5920"></span>
                                   	未读消息
                                </p>
                            </div>
							<div class="flex pd-tp20">
								<div class="leftCont">
									<img :src="item.content" alt="" />
								</div>
								<div class="rightCont flex flex-as line-h40 ft-24">
									{{item.title}}
								</div>
							</div>
						</div>
                    </div>
                    <div v-if="item.order_type==3">
                        <router-link class="block" :to="{name:'groupOrderDes',params:{id:item.order_id}}">
                            <div class="text-center">
                                <p class="date inline-block pd-lr10 h40 line-h40 bd-rd4 color-fff">{{item.createTime}}</p>
                            </div>
                            <div class="msgType bd-rd10 mg-tp30 bg-fff pd30">
                            	<div class="msgTitle">
                            		<p class="title ft-28" v-if="item.order_status==1&&item.order_type==3">您有一条订单待付款</p>
	                                <p class="title ft-28" v-if="item.order_status==2&&item.order_type==3">您有一条订单待成团</p>
	                                <p class="title ft-28" v-if="item.order_status==3&&item.order_type==3">您有一条订单拼团成功，别忘了到店核销哦！</p>
	                                <p class="title ft-28" v-if="item.order_status==4&&item.order_type==3">您有一条订单已核销</p>
	                                <p class="title ft-28" v-if="item.order_status==8&&item.order_type==3">您有一条订单拼团失败</p>
	                                <p class="title ft-28" v-if="item.order_status==9">您有一条订单已退款</p>
	                                <p class="title ft-28" v-if="item.order_status==10">您有一条订单退款中</p>
	                                <p class="cont2 flex flex-je flex-ac ft-24" v-if="item.read == 1">
                                    	<span class="dian inline-block bd-rd50 bg-fc5920"></span>
                                   		未读消息
                                	</p>
                            	</div>
                                <div class="flex pd-tp20">
                                    <div class="leftCont">
                                        <img :src="item.content" alt="" />
                                    </div>
                                    <div class="rightCont flex flex-as line-h40 ft-24">
                                        {{item.title}}
                                    </div>
                                </div>
                            </div>
                        </router-link>
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
			<div class="loadMore text-center" v-else>
	            <img class="block" src="@/assets/images/common/icon2.png" alt="" />
	            <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
	        </div>
		</div>
		<!--没有更多-->
        <div v-else>
    		<div class="styleNull">
    			<img class="block" src="@/assets/images/user/orderNull.png" alt="" />
				<p class="text-center ft-28 color-999 mg-tp30">暂无消息~</p>
    		</div>
    	</div>
    	<v-backTop></v-backTop>
	</div>
</template>

<script>
	import backTop from '@/components/base/backTop.vue'
	export default{
		name:'userMessage',
		data(){
			return{
				uid:'', //用户id
				paged:1, //分页
				msgList:[], //消息列表
				scrollWatch: true, //是否监听
				types:['ios-small'],
				isLoadMore:false,
			}
		},
		methods:{
			// 获取缓存信息
			getParams(){
				var that = this;
                that.uid = window.localStorage.getItem('uid');
			},
			// 获取消息通知列表信息
			getMsgList(){
				var that = this;
				var data = {
                    uid:that.uid,
                    sid:that.sid,
                    paged:that.paged,
                    oid:that.$router.app.__proto__.$oid,
				}
				that.$api.message(data).then(res => {
					if(res.code == 1 && res.data.list != ''){
						var arr = res.data.list;
		    			arr.forEach(item => {
		    				that.msgList.push(item);
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
			},
			// 点击一条消息进入订单详情
            readMsg(index){
                var that = this
                console.log(index)
                let a = that.msgList[index]
                var params = a.order_id + '?read_id=' + a.id;
                
                that.$api.orderDes(params).then(res =>{
                	
                })
                if(a.order_status==7||a.order_status==9||a.order_status==10){
                	that.$router.push({name:'refundDes',params:{id:a.order_id}})
                }
                else if(a.order_type==1||a.order_type==2){
                    that.$router.push({name:'orderDes',params:{id:a.order_id}})
                }
                else if(a.order_type==3){
                    that.$router.push({name:'groupOrderDes',params:{id:a.order_id}})
                }
                
            },
			//监听滚动
			handleScroll() {
				var that = this;
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
					console.log(parseInt(bottom));
					if (parseInt(bottom) <= 0) {
						that.$vux.loading.show({
							text: "加载中"
						});
						// 获取消息通知列表信息
						that.getMsgList();
					}
				}
			},
		},
		components:{
            'v-backTop':backTop,
        },
		created(){
			var that = this;
			// 获取缓存信息
			that.getParams();
			// 获取消息通知列表信息
			that.getMsgList();
		},
		destroyed() {
			var that = this;
			that.scrollWatch = false;
			window.removeEventListener('scroll', that.handleScroll);
		},
	}
</script>

<style lang="less" scoped>
	.userMessage{
		min-height:calc(100vh - 0.88rem);
		.list{
			.list-item{
				padding:0.4rem 0.3rem;
				.date{
					background:rgba(0,0,0,.3);
				}
				.msgType{
					width:6.9rem;
					.title{
                        font-family: 'PingFang-Medium';
                        width: 70%;
                        line-height: 0.5rem;
					}
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
		.loadMore{
            padding-bottom: 0.2rem;
            img{
                width:1rem;
                margin: 0rem auto;
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
        .msgTitle{
            display: flex;
            justify-content: space-between;
            .title{
                flex-basis:60%;
            }
        }
        .cont2{
            flex-basis: 30%;
            .dian{
                margin-right:0.05rem;
                width:0.12rem;
                height:0.12rem;
            }
        }
	}
</style>