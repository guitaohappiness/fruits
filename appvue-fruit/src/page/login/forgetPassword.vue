<template>
    <div class="login">
        <x-header :left-options="{backText: ''}">找回密码</x-header>

        <!-- 找回密码 -->
        <div class="content">
            <div class="login-cont ft-30 pd-tp50">
                <form action="" @submit.prevent="submit">
                	
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
                        <x-input placeholder="请输入短信验证码" :show-clear="false" class="weui-vcode" v-model="code" type="text" name="code" :max="6" :required="false">
                            <x-button action-type="button" slot="right" mini class="time color-1ccfcf" disabled v-if="sended">{{time}}s</x-button>
                            <x-button action-type="button" slot="right" type="primary" class="bg-1ccfcf" mini v-else @click.native="getCode">获取验证码</x-button>
                        </x-input>
                    </group>
                    <group ref="password">
                        <x-input v-model="password" :show-clear="false" name="password" type="password" placeholder="请输入新密码（长度为8-16位）" :min="8" :max="16"></x-input>
                        <x-input v-model="r_password" :show-clear="false" name="r_password" type="password" placeholder="请确认新密码" :min="8" :max="16"></x-input>
                    </group>-->
 
                    <x-button class="btn bg-ffc118 mg-tp30" action-type="submit">确认</x-button>
                </form>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            phone: '', //手机号码
            code: '', //短信验证码
            sended: false, //倒计时显示
            time: 60, //倒计时总时长
            password: '', //密码
            r_password: '', //确认密码
        }
    },
    mounted(){
        
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
                    oid:that.$router.app.__proto__.$oid,
                }
                that.$apily.sms(params).then(res =>{
                    if(res.code == 1){
                        that.$vux.toast.text('短信验证码已发送', 'middle')
                    }else if(res.code == 2){
                        that.$vux.toast.text(res.msg, 'middle')
                    }
                    else{
                        that.$vux.toast.text('验证码发送失败', 'middle')
                    }
                })
                
            }
        },

        // 表单提交
        submit(){
            var that = this;
            var reg = /^1[3456789]\d{9}$/;  //电话号码
            that.$vux.loading.show({
                text:'修改密码中'
            })
            if(!reg.test(that.phone)){
                that.$vux.loading.hide()
                that.$vux.toast.text('请输入有效的手机号码', 'middle')
            }else if(that.code.length != 6){
                that.$vux.loading.hide()
                that.$vux.toast.text('请输入6位数短信验证码', 'middle')
            }else if(that.password == ''){
                that.$vux.loading.hide()
                that.$vux.toast.text('请输入新密码', 'middle')
            }else if(that.password.length < 8){
                that.$vux.loading.hide()
                that.$vux.toast.text('请输入不少于8位数的新密码', 'middle')
            }else if(that.password.length > 16){
                that.$vux.loading.hide()
                that.$vux.toast.text('请输入不大于16位数的新密码', 'middle')
            }else if(that.r_password != that.password){
                that.$vux.loading.hide()
                that.$vux.toast.text('两次输入密码不一致', 'middle')
            }else{
                var params = {
	                "mobile":that.phone,
	                "password":that.password,
	                "password2":that.r_password,
	                "code":that.code,
	                "type":3,
	                "oid":that.$router.app.__proto__.$oid,
                }
                that.$apily.login(params).then(res =>{
                    if(res.code == 1){
                        setTimeout(function(){
                            that.$vux.toast.text('密码修改成功', 'middle')
                            that.$vux.loading.hide();
                            setTimeout(function(){
                                that.flag = true;
                                that.$router.push({ path: 'login' })
                            },1000)
                        },1000)
                    }else if(res.code == 2){
                        setTimeout(function(){
                            that.$vux.loading.hide();
                            that.flag = true;
                            that.$vux.toast.text(res.msg, 'middle')
                        },1000)
                    }
                    else{
                        setTimeout(function(){
                            that.$vux.loading.hide();
                            that.flag = true;
                            that.$vux.toast.text('注册失败', 'middle')
                        },1000)
                    }
                    // that.$vux.loading.hide()
                    // that.$vux.toast.text('找回密码成功', 'middle')
                    // setTimeout(() => {
                    //     that.$vux.toast.hide()
                    //     that.$router.push({ path: 'login' })
                    // }, 1000)
                }).catch((error) => {
                    that.$vux.loading.hide()
                    that.$vux.toast.text('找回密码失败', 'middle')
                }) 
            }
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
