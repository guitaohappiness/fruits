<template>
    <div class="bindMobile login bg-fff">
        <x-header :left-options="{backText: ''}">绑定手机</x-header>
        <div class="form-box login-cont bg-fff ft-30 pd-tp45">
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

                <!--<group ref="phone">
                    <x-input v-model="phone" :show-clear="false" name="mobile" placeholder="请输入手机号码" type="tel" is-type="china-mobile"></x-input> 
                </group>
                <group ref="code">
                    <x-input placeholder="请输入短信验证码" :show-clear="false" :required="false" class="weui-vcode" v-model="code" name="code" :max="6">
                        <x-button action-type="button" slot="right" mini class="time color-1ccfcf" disabled v-if="sended">{{time}}s</x-button>
                        <x-button action-type="button" slot="right" type="primary" class="color-fff bg-b22b28" mini v-else @click.native="getCode">获取验证码</x-button>
                    </x-input>
                </group>
                <group ref="password" v-if="isNew">
                    <x-input :show-clear="false" v-model="password" name="password" type="password" placeholder="请输入密码（长度为8-16位）" :min="8" :max="16"></x-input>
                    <x-input :show-clear="false" v-model="r_password" name="r_password" type="password" placeholder="请确认密码" :min="8" :max="16"></x-input>
                    <p class="my-p2">手机号未注册过,请设置密码</p>
                </group>
                <group ref="password" v-else>
                    <x-input :show-clear="false" v-model="password" name="password" type="password" placeholder="请输入密码（长度为8-16位）" :min="8" :max="16"></x-input>
                </group>-->
                
                <x-button class="btn bg-ffc118 mg-tp30" action-type="submit">确定</x-button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name:'bindMobile',
        data(){
            return {
                uid:'', //用户id
                phone: '', //手机号码
                code: '', //短信验证码
                sended: false, //倒计时显示
                time: 60, //倒计时总时长
                timer:null,
                password: '', //密码
                isNew:false,//手机号码是否为新号码
            }
        },

        components: {
        },
        created(){  
            //获取链接中的数据
            this.getParams()  
        },  

        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'getParams'
        },
        methods: {
            //获取链接中的数据
            getParams:function(){
                let that = this;
                // let routerParams = this.$route.params
                // that.isNew = this.$route.params.new
                that.uid = that.$route.params.uid;
            },
            
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
                    //that.$vux.toast.text('短信验证码已发送', 'middle');
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
               
                if(!reg.test(that.phone)){
                    that.$vux.toast.text('请输入有效的手机号码', 'middle')
                }else if(that.code.length != 6){
                    that.$vux.toast.text('请输入6位数短信验证码', 'middle')
                }if(that.password == ''){
                   	that.$vux.toast.text('请输入密码', 'middle')
               	}else if(that.password.length < 8){
                   	that.$vux.toast.text('请输入不少于8位数的密码', 'middle')
               	}else if(that.password.length > 16){
                   	that.$vux.toast.text('请输入不大于16位数的密码', 'middle')
               	}else{
                    // 判断是否为新手机号
                    var params = that.uid + '?mobile=' + that.phone + '&code=' + that.code + '&password=' + that.password + '&oid=' + that.$router.app.__proto__.$oid;
                    that.$apily.register2(params).then(res =>{
                        if(res.code == 1){
                            window.localStorage.setItem('uid', res.data.uid);
                            that.$vux.toast.text('绑定成功', 'middle')
                            setTimeout(() => {
                                that.$vux.toast.hide()
                                that.$router.push({name:'index',params:{isCheck:res.data.isCheck}});
                            }, 1000)
                        }
                        else if(res.code == 2){
                            that.$vux.toast.text(res.msg, 'middle')
                        }
                    }).catch((error) => {
                        that.$vux.toast.text('绑定失败了', 'middle')
                    })  
                }

            },
         
        },
        destroyed(){
            if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
                clearInterval(this.timer); //关闭
            }
        }
    }

</script>

<style lang="less" scoped>
	.login{
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
			.my-p2{
        		color:#dc7979;
    		}
		}
	}
</style>
