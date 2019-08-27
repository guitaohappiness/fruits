<template>
    <div class="login">
    	
    	<x-header :left-options="{showBack: false}">注册</x-header>
    	
    	<div class="logo" @click="lookAround">
    		<img class="block" src="@/assets/images/common/logo.png" alt="">
    	</div>

    	<!-- 注册 -->
    	<div class="content">
    		<div class="title ft-36 text-center mg-bt30">
    			<router-link to="/login" class="ft-36 color-999 mg-rt50">登录</router-link>
    			<router-link to="/register" class="ft-36 color-1ccfcf mg-lt50">注册</router-link>
    		</div>
    		
        	<div class="login-cont ft-30 pd-tp50">
        		<form action="#" @submit.prevent="submit">
        			
        			<input class="h80 line-h80 bd-rd8 pd-lt30" type="tel" v-model="phone" placeholder="请输入手机号码" />
        			<div class="getCode flex flex-ac flex-jc mg-tp30">
        				<input class="h80 line-h80 bd-rd8 pd-lt30 ft-30 weui-vcode"  type="tel" v-model="code" placeholder="请输入短信验证码" />
        				<div class="flex flex-je getCodeBtn">
        					<button class="h80 line-h80 bd-rd8 color-fff" :class="sended ? 'bgColor' : ''" disabled v-if="sended">{{time}}s</button>
        					<button class="h80 line-h80 bd-rd8 color-fff" v-else @click="getCode">获取验证码</button>
        				</div>
        			</div>
        			<input class="h80 line-h80 bd-rd8 pd-lt30 mg-tp30" type="password" v-model="password" placeholder="请输入密码（长度为8-16位）" min="8" max="16" />
        			<input class="h80 line-h80 bd-rd8 pd-lt30 mg-tp30" type="password" v-model="r_password" placeholder="请确认密码" min="8" max="16" />
                    <!--<group ref="phone">
                        <x-input :show-clear="false" v-model="phone" name="mobile" placeholder="请输入手机号码" type="tel" is-type="china-mobile"></x-input> 
                    </group>
                    <group ref="code">
                        <x-input placeholder="请输入短信验证码" :show-clear="false" :required="false" class="weui-vcode" v-model="code" name="code" type="text" :max="6">           
                        	<x-button action-type="button" slot="right" mini class="time color-1ccfcf" disabled v-show="sended">{{time}}s</x-button>
                            <x-button action-type="button" slot="right" type="primary" class="bg-1ccfcf" v-show="!sended" mini @click.native="getCode">获取验证码</x-button>
                        </x-input>
                    </group>
        			<group ref="password">
                        <x-input :show-clear="false" v-model="password" name="password" type="password" placeholder="请输入密码（长度为8-16位）" :min="8" :max="16"></x-input>
                        <x-input :show-clear="false" v-model="r_password" name="r_password" type="password" placeholder="请确认密码" :min="8" :max="16"></x-input>
                    </group>-->
					
					<router-link class="block text-right ft-28 color-1ccfcf mg-tp10" to="/login">已注册，直接登录</router-link>
			    	<x-button class="btn mg-tp30" v-if="flag" action-type="submit">立即注册</x-button>
                    <x-button class="btn mg-tp30" disabled v-else>注册中</x-button>
                    <div class='rememberme flex flex-ac flex-jc ft-28 color-999 mg-tp30'>
                        <img class="block mg-rt10" src="@/assets/images/index/checked.png" @click='delberPsd()' v-if='rememberme'>
                        <img class="block mg-rt10" src="@/assets/images/index/checked_false.png" @click='delberPsd()' v-else>
                       	我已阅读并同意<router-link :to="{name:'protocol'}" class="color-1ccfcf">《注册协议》</router-link>
                    </div>
        		</form>
        	</div>
    	</div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';

export default {
	data(){
		return{
			phone: '', //手机号码
            code: '', //短信验证码
            sended: false, //倒计时显示
            time: 60, //倒计时总时长
			password: '', //密码
            r_password: '', //确认密码
            uid:'', //用户id
            flag:true,
            rememberme:true, //复选框图片切换
		}
	},
	methods:{
        // 获取短信验证码
        getCode: function(){
            var that = this;
            var phone = that.phone;
            var reg = /^1[3456789]\d{9}$/;  //电话号码
            if(!reg.test(phone)){
                that.$vux.toast.text('请输入有效的手机号码', 'middle')
            }else{
            	that.sended = true;
            	var timer = setInterval(function () {
                    if(that.time == 0){
                        that.sended = false;
                        that.time = 60;
                        clearInterval(timer);
                    }else {
                        that.time = that.time - 1;
                    }
                },1000)
                var params = {
                    phone: phone,
                    action:1,
                    oid:that.$router.app.__proto__.$oid,
                }
                that.$apily.sms(params).then(res =>{
                    that.$vux.toast.text('短信验证码已发送', 'middle');
                    
                    if(res.code == 1){
                    	
                    }else if(res.code == 2){
                        that.$vux.toast.text(res.msg, 'middle');
                    }
                    else{
                        that.$vux.toast.text('验证码发送失败', 'middle');
                    }
                })
                
                //that.$vux.toast.text('短信验证码已发送', 'middle')
            }
        },
        // 图标切换
        delberPsd(){
            var that = this;
            if(that.rememberme){
                that.rememberme = false;
            }else{
                that.rememberme = true;
            } 
        },

        // 表单提交
        submit(){
            if(this.flag){
                var that = this;
                that.$vux.loading.show({
                    text:'注册中'
                });
                var reg = /^1[3456789]\d{9}$/;  //电话号码
                if(!reg.test(that.phone)){
                    that.$vux.loading.hide()
                    that.$vux.toast.text('请输入有效的手机号码', 'middle')
                }else if(that.code.length != 6){
                    that.$vux.loading.hide()
                    that.$vux.toast.text('请输入6位数短信验证码', 'middle')
                }else if(that.password == ''){
                    that.$vux.loading.hide()
                    that.$vux.toast.text('请输入密码', 'middle')
                }else if(that.password.length < 8){
                    that.$vux.loading.hide()
                    that.$vux.toast.text('请输入不少于8位数的密码', 'middle')
                }else if(that.password.length > 16){
                    that.$vux.loading.hide()
                    that.$vux.toast.text('请输入不大于16位数的密码', 'middle')
                }else if(that.r_password != that.password){
                    that.$vux.loading.hide()
                    that.$vux.toast.text('两次输入密码不一致', 'middle')
                }else if(!that.rememberme){
                    that.$vux.loading.hide()
                    that.$vux.toast.text('协议内容未勾选', 'middle')
                }
                else{
                    //提交注册表单到后台
                    that.flag = false;
                    var params = new FormData
                    params.append("code",that.code)
                    params.append("mobile",that.phone)
                    params.append("password",that.password)
                    params.append("password2",that.r_password)
                    params.append("type",1)
                    params.append("oid",that.$router.app.__proto__.$oid)
                    setTimeout(() => {
                        that.$apily.register(params).then(res =>{
                            if(res.code == 1){
                                that.$vux.loading.hide();
                                that.$vux.toast.text('注册成功', 'middle')
                                setTimeout(function(){
                                    that.flag = true;
                                	window.localStorage.setItem('uid',res.data.uid);
                                	that.$router.push({name:'index',params:{isCheck:res.data.isCheck}});
                                },1000)
                            }else if(res.code == 2){
                                that.$vux.loading.hide();
                                that.flag = true;
                                that.$vux.toast.text(res.msg, 'middle')
                            }
                            else{
                                that.$vux.loading.hide();
                                that.flag = true;
                                that.$vux.toast.text('注册失败', 'middle')
                            }
                        })
            		}, 1000)
                }
            }
        },
        //随意看看
            lookAround(){
                var that = this
                window.localStorage.setItem("look",1)
                window.localStorage.removeItem("uid")
                window.localStorage.removeItem("lng")
                window.localStorage.removeItem("lat")
                window.localStorage.removeItem("clickId")
                window.localStorage.removeItem("myLocate")
                that.$router.push({name:'index'})
            },
	},
}
</script>

<style lang="less" scoped>
 	.login{
		.logo{
			margin:0.5rem 0 1rem 0;
			img{
				margin:0 auto;
				width:1.5rem;
				height:1.5rem;
			}
		}
		.content{
			.title{
				font-family: "PingFang-Medium";
			}
			.login-cont{
				width: 6rem;
    			margin: 0 auto;
    			input{
    				width:100%;
    				border:0.02rem solid #d9d9d9;
    				&::placeholder{
    					color:#999;
    				}
    			}
    			.btn{
    				color:#fff!important;
    				background:#1CCFCF!important;
    			}
    			.getCode{
    				input{
    					width:60%;
    				}
    				.getCodeBtn{
    					width:40%;
    					button{
    						width: 1.98rem;
						    text-align: center;
						    padding: 0;
						    font-size: .3rem;
						    background:#1CCFCF;
						    &.bgColor{
						    	background: #f7f7f7;
						    	color:#1CCFCF;
						    }
	    				}
    				}
    				
    			}
    			.rememberme{
   					img {
    					width: 0.3rem;
    					height: 0.3rem;
					}
				}
    			.other-login {
    				margin: 1.3rem auto 0.3rem;
    				.title::before {
    					content: '';
					    position: absolute;
					    top: 50%;
					    left: 0;
					    width: calc(50% - 1rem);
					    border-top: 1px solid #eeeeee;
					}
					.title::after {
					    content: '';
					    position: absolute;
					    top: 50%;
					    right: 0;
					    width: calc(50% - 1rem);
					    border-top: 1px solid #eeeeee;
					}
					.login-style a {
    					margin-top: 0.3rem;
					}
				}
			}
		}
		
	}
</style>
