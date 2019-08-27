<template>
	<div class="memberExplain bg-fff">
		<x-header :left-options="{backText: ''}">会员说明</x-header>
		<div class="explainList">
			<div class="list-item mg-tp30" v-for="(item,index) in list">
				<div class="title flex flex-ac">
					<img class="block mg-rt10" src="@/assets/images/user/members-icon8.png" alt="" />
					<p class="ft-30 color-333">{{item.name}}</p>
				</div>
				<div class="content mg-tp20 ft-28 color-333">{{item.description}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'memberExplain',
		data(){
			return{
				list:[], //会员条例说明
			}
		},
		methods:{
			// 获取行业id相关信息
			getParams(){
				var that = this;
				that.oid = that.$router.app.__proto__.$oid;
				// 获取会员条例说明
				that.getDes();
			},
			// 获取会员条例说明
			getDes(){
				var that = this;
				var data = that.oid;
				that.$api.vipequity(data).then(res => {
					console.log(res);
					if(res.code == 1){
						that.list = res.data;
					}
				})
			}
		},
		created(){
			var that = this;
			// 获取行业id相关信息
			that.getParams();
		}
	}
</script>

<style lang="less" scoped>
	.memberExplain{
		min-height:calc(100vh - 0.88rem);
		.explainList{
			padding:0.4rem 0.3rem 0 0.3rem;
			.list-item{
				.title{
					font-family: 'PingFang-Medium';
					img{
						width:0.22rem;
						height:0.22rem;
					}
				}
				.content{
					padding-left:0.37rem;
					word-break: break-all;
				}
				&:nth-child(1){
					margin-top:0;
				}
			}
		}
	}
</style>