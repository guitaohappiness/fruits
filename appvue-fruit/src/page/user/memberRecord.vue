<template>
	<div class="memberRecord bg-f4f4f4">
		<x-header :left-options="{backText: ''}">会员购买记录</x-header>
		<div class="mg-tp10 payList">
        	<div class="list" v-if="list.length > 0">
        		<div class="list-item bg-fff pd-lr30" v-for="(item,index) in list">
        			<div class="flex flex-ac bd-bt-eee">
        				<div class="leftCont flex flex-js">
	        				<div>
	        					<p class="ft-28 color-333">{{item.note}}</p>
	        					<p class="ft-24 color-999 mg-tp20">购买金额￥{{item.price}}</p>
	        				</div>
	        			</div>
	        			<div class="rightCont flex flex-je">
	        				<div>
	        					<p class="ft-28 color-333 text-right" v-if="item.m_status != 3">剩余<span class="color-fc5920">{{item.remain_time}}</span>天</p>
	        					<p class="ft-24 color-999 mg-tp20 text-right">{{item.m_status_name}}</p>
	        				</div>
	        			</div>
        			</div>
        		</div>
				<div class="loadMore text-center" v-if="isLoadMore">
		            <img class="block" src="@/assets/images/common/icon2.png" alt="" />
		            <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
		        </div>
        	</div>
        </div>
	</div>
</template>

<script>
	export default{
		name:'memberRecord',
		data(){
			return{
				list:[], //购买记录列表
				paged:1, //分页
				types:['ios-small'],
				isLoadMore:true,
			}
		},
		methods:{
			// 获取缓存等相关信息
			getParams(){
				var that = this;
				that.uid = window.localStorage.getItem('uid');
				that.oid = that.$router.app.__proto__.$oid;
				// 获取购买记录列表
            	that.recordList();
			},
			// 获取购买记录列表
			recordList(){
				var that = this;
				var data =  that.oid + '/edit?uid=' + that.uid;
				that.$api.buyRecord(data).then(res => {
					console.log(res);
					if(res.code == 1){
						that.list = res.data;
					}
				})
			}
		},
		created(){
			var that = this;
			// 获取缓存等相关信息
			that.getParams();
		}
	}
</script>

<style lang="less" scoped>
	.memberRecord{
		min-height:calc(100vh - 0.88rem);
		.payList{
        	.list{
        		.list-item{
        			>div{
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