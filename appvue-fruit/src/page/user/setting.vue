<template>
	<div class="setting bg-f4f4f4">
		<x-header :left-options="{backText: ''}">设置</x-header>
		<div class="list">
			<div class="list-item bg-fff h100 line-h100 pd-lr30 bd-bt-f4f4f4 clearfix">
				<p class="ft-30 color-333 leftCont pull-left">关于</p>
				<p class="ft-30 color-999 rightCont pull-right">版本号{{version}}</p>
			</div>
			<div class="list-item bg-fff h100 line-h100 pd-lr30 bd-bt-f4f4f4 clearfix">
				<p class="ft-30 color-333 leftCont pull-left">清除缓存</p>
				<p class="ft-30 color-999 rightCont pull-right">50MB</p>
			</div>
			<div class="list-item bg-fff h100 line-h100 pd-lr30 clearfix">
				<p class="ft-30 color-333 leftCont pull-left">版本更新</p>
				<p class="ft-30 rightCont pull-right text-center bg-1ccfcf color-fff line-h50 h50 update bd-rd8" v-if="update">立即更新</p>
				<p class="ft-30 rightCont pull-right text-center bg-1ccfcf color-fff line-h50 h50 update bd-rd8" v-else>{{versionInfo}}</p>
			</div>
			<div class="list-item bg-fff h100 line-h100 mg-tp10 pd-lr30">
				<router-link :to="{name:'privacyAgree'}" class="block clearfix">
					<p class="ft-30 color-333 leftCont pull-left">隐私协议</p>
					<img class="block pull-right rightCont mg-tp35" src="@/assets/images/common/right_arrow.png" alt="" />
				</router-link>
			</div>
		</div>
		<!--退出登录-->
		<div class="fixdBtn bg-1ccfcf text-center h90 line-h90">
            <span class="block ft-32 color-fff" @click="logOut">退出登录</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:'setting',
		data(){
			return{
				uid:'', //用户id
				version:'', //版本号
                oid:'', //行业id
                update:'', //是否有新版本
                versionInfo:''//版本更新信息
			}
		},
		methods:{
			//获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid");
                that.oid = that.$router.app.__proto__.$oid;
			},
			//获取版本信息
			getVersion(){
				var that = this;
				that.version = that.__proto__.__proto__.appVersion;
				var params = {
					oid: that.oid,
					app_version:that.version,
					uid:that.uid
				}
				that.$apily.versions(params).then(res =>{
					console.log(res);
                    that.versionInfo = res.data.type_name;
					if(res.data.type == 1){
						that.update = true;
					}
					else{
						that.update = false;
					}
				})
           	},
            //退出登录
            logOut(){
                var that = this;
                that.$vux.confirm.show({
                	title: '提醒',
        			content: '你确定退出登录？',
                	onCancel:() => {
                		console.log('plugin cancel');
                	},
                	onConfirm:() => {
                		console.log('plugin confirm');
                		window.localStorage.removeItem("uid");
                		window.localStorage.removeItem("lng");
		                window.localStorage.removeItem("lat");
		                window.localStorage.removeItem("clickId");
		                window.localStorage.removeItem("myLocate");
		                that.$router.push({name:'login'});
                	}
                })
               
            }
		},
		mounted(){
			var that = this;
			//获取用户信息
			that.getUser()
			//获取版本信息
            that.getVersion();
		}
	}
</script>

<style lang="less" scoped>
	.setting{
		min-height: calc(100vh - 0.88rem);
		.list{
			.list-item .leftCont{
				font-family: PingFang-Medium;
			}
			.list-item img.rightCont{
				width:0.16rem;
				height:0.3rem;
			}
			.list-item .update{
				margin-top:0.25rem;
				padding:0 0.1rem;
			}
		}
		.fixdBtn{
			font-family: 'PingFang-Medium';
			position:fixed;
			bottom:0;
			width:100%;
		}
	}
</style>