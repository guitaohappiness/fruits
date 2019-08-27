<template>
	<div class="personalDes bg-f4f4f4">
		<x-header :left-options="{backText: ''}">个人资料<a slot="right" @click="submit">保存</a></x-header>
		<div class="userInfo">
			<div class="head bd-bt-eee bg-fff clearfix">
				<div class="pull-left ft-28 line-h100 color-333">头像</div>
				<div class="pull-right flex flex-ac" @click='upLoad'>
					<img class="upload_head mg-rt30 bd-rd50" v-if='avatar' :src="avatar" alt="" />
					<img class="upload_head mg-rt30 bd-rd50" v-else  src="@/assets/images/user/default.png" alt="">
					<img class="right_arrow" src="@/assets/images/common/right_arrow.png" alt="" />
				</div>
			</div>
			<div class="clearfix bg-fff bd-bt-eee nickName ft-28">
				<div class="pull-left color-333">昵称</div>
				<input class="pull-right" placeholder="请填写您的昵称" v-model="nickname" type="text" />
			</div>
        	<div class="clearfix bg-fff sex bd-bt-eee ft-28">
              	<div class="pull-left color-333">性别</div>
              	<radio class="pull-right ft-24 color-666 mg-rt15" :options="selectResult" v-model="selectStatus" @on-change="change_1"></radio>
        	</div>
        	<div class="clearfix bg-fff mobile bd-bt-eee ft-28 mg-tp10">
        		<div class="color-333 pull-left">手机号</div>
        		<div class="color-999 pull-right">{{mobile}}</div>
        	</div>
        	<div class="clearfix bg-fff mobile bd-bt-eee ft-28">
        		<div class="color-333 pull-left">微信</div>
        		<div class="pull-right flex flex-ac">
        			<p v-if="isCheck == 1" class="mg-rt30 color-999">已绑定微信</p>
                    <p v-else class="mg-rt30 color-999" @click="wxlogin">可绑定微信</p>
        			<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
        		</div>
        	</div>
		</div>
		<div :class="isShowModal?'black_cover':''">
			<div class="fixedBox" v-if="isShowModal">
			<!--<div class="fixedBox" :class="isShowModal?'animate_1':'animate_2'">-->
				<p class="h90 line-h90 bg-fff text-center ft-32 color-fdb05d bd-bt-eee" @click="photograph(1)">拍照</p>
				<p class="h90 line-h90 bg-fff text-center ft-32 color-666" @click="photograph(2)">从手机相册选择</p>
				<p class="h90 line-h90 mg-tp20 bg-fff text-center ft-32 color-666" @click='qxUpload'>取消</p>
			</div>
		</div>
	</div>
</template>

<script>
import { setTimeout } from 'timers';
	export default{
		name:'personalDes',
		data(){
			return{
				selectResult:['男', '女'], //性别
				selectStatus:'女', //用户性别
				isShowModal:false, //是否显示上传相片弹窗
				nickname:'', //用户昵称
                avatar:'', //用户头像
                mobile:'', //用户手机号
                uid:'', //用户id
                isCheck:'', //用户是否绑定微信 1为绑定
			}
		},
		created(){
			var that = this
			//获取用户信息
			that.getUser()
		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid")
                var params =  that.uid 
                that.$apily.user(params).then(res =>{
                    that.avatar = res.data.avatar
                    that.nickname = res.data.nickname
                    that.mobile = res.data.mobile
                    if(res.data.gender){
                    that.selectStatus = res.data.gender}
                    that.isCheck = res.data.isCheck
                })
            },

            // 微信授权登入
	        wxlogin(){
	            var that = this;
	            Wechat.auth(function (response) {
	                var params = {
	                	uid:that.uid,
                        code:response.code,
                        oid:that.$router.app.__proto__.$oid,
                   	}
                    that.$apily.wxlogin2(params).then(res =>{
                        if(res.code == 1){
                            setTimeout(() => {
                            	that.$vux.toast.show({
	                                text: res.msg,
	                                type:'text',
	                                position:'middle',
	                                'isShowMask':true,
	                                width: '2.5em',
	                                onShow () {
	                                    that.$vux.loading.hide();
	                                    that.isCheck = 1;
	                                },
	                                onHide () {
	                                    console.log("onHide");
	                                    that.isCheck = 1;
	                                }
	                            })
                            },500)
                        }
                        //新用户未绑定手机号
                        else if(res.code == 2){
                            setTimeout(() => {
                            	that.$vux.toast.show({
	                                text: res.msg,
	                                type:'text',
	                                position:'middle',
	                                'isShowMask':true,
	                                width: '2.5em',
	                                onShow () {
	                                    that.$vux.loading.hide();
	                                },
	                                onHide () {
	                                    console.log("onHide");
	                                }
	                            })
                            },500)
                        }
                        //登陆过未绑定成功的
                        else if(res.code == 3){
                            setTimeout(() => {
                            	that.$vux.toast.show({
	                                text: res.msg,
	                                type:'text',
	                                position:'middle',
	                                'isShowMask':true,
	                                width: '2.5em',
	                                onShow () {
	                                    that.$vux.loading.hide();
	                                },
	                                onHide () {
	                                    console.log("onHide");
	                                }
	                            })
                            },500)
                        }
	                }).catch((error) => {
	                    console.log(error)
	                    that.$vux.toast.text('绑定失败', 'middle');
	                })
	            });
	        },

			// 性别选择
			change_1 (val, label) {
			    var that = this;
			    that.selectStatus = val;
			},
			// 点击头像显示上传头像弹窗
    		upLoad(){
    			var that = this;
    			that.isShowModal = true;
			},
			// 取消上传头像弹窗
    		qxUpload(){
    			var that = this;
    			that.isShowModal = false;
			},
			// 右上角保存信息按钮
			submit(){
                var that = this;
				if(!that.nickname){
					that.$vux.toast.text('请输入昵称！','middle');
				}else{
                    
                    that.$vux.loading.show({
                        text:'正在修改'
                    })
                    var params = that.uid + '?gender=' + that.selectStatus + '&nickname=' + that.nickname + '&avatar=' + that.avatar
                    
                    that.$apily.user2(params).then(res =>{
                        console.log(res)
                        setTimeout(() =>{
                            that.$vux.loading.hide();
                            if(res.code == 1){
                                that.$vux.toast.text(res.msg,'middle');
                                setTimeout(() =>{
                                    that.$router.push({name:'user'});
                                },1000) 
                            }
                            else{
                                that.$vux.toast.text(res.msg,'middle');
                            }
                        },1000) 
                    })
				}
            },
 
			// 点击拍照或从手机上选择相片
			photograph(e){
				this.isShowModal = false;
				// 插件调取相册或相机
				this.cameraTakePicture(e)
			},
			// 插件调取相册或相机
			cameraTakePicture(mySourceType) {
				navigator.camera.getPicture(this.onSuccess, this.onFail, {
					quality: 50,
					destinationType: Camera.DestinationType.DATA_URL,
					encodingType: Camera.EncodingType.JPEG,
					sourceType: mySourceType,
				})
			},
			  // 插件调取相册或相机成功的回调函数
			onSuccess(e){
				var that = this
				console.log(e)
                that.avatar = 'data:image/jpeg;base64,'+e;
				var param = new FormData();
				param.append("avatar", that.avatar); 
				let config = {
					headers: {'Content-Type': 'multipart/form-data'}
				}
				that.$apily.addimage(param,config)
				.then(res =>{
					console.log(res)
                    that.avatar = res.data
				})
			},
			// 插件调取相册或相机失败的回调函数
			onFail(error){
				console.log(error)
			},
		}
	}
</script>

<style lang="less" scoped>
	.personalDes{
		min-height: calc(100vh - 0.88rem);
		.userInfo{
            /deep/.weui-cell{
                padding: 0
            }
            /deep/.weui-cell:before{
                    border-top: 0px
                }
			.head{
				padding:0.28rem 0.3rem;
				.upload_head{
					width:1rem;
					height:1rem;
				}
				.right_arrow{
					width:0.17rem;
					height:0.3rem;
				}
			}
			.nickName,.sex,.mobile{
				padding:0.36rem 0.3rem;
			}
			.nickName input{
				/* direction: rtl; */
				text-align: right;
			}
			.nickName input::placeholder{
				font-size:0.28rem;
				color:#ccc;
			}
			.mobile img{
				width:0.16rem;
				height:0.3rem;
			}
		}
		.fixedBox{
			position:fixed;
			bottom:0rem;
			width:100%;
			/*margin-bottom:-4rem;*/
			z-index: 999;
			/*transition:all 3s;*/
		}
	}
	
</style>