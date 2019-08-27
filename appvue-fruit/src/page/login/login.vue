<template>
    <div class="login">
    	
    	<x-header :left-options="{showBack: false}">登录</x-header>
    	
    	<div class="logo" @click="lookAround">
    		<img class="block" src="@/assets/images/common/logo.png" alt="">
    	</div>

    	<!-- 登录 -->
    	<div class="content">
    		<div class="title ft-36 text-center mg-bt30">
    			<router-link to="/login" class="ft-36 color-1ccfcf mg-rt50">登录</router-link>
    			<router-link to="/register" class="ft-36 color-999 mg-lt50">注册</router-link>
    		</div>

        	<div class="login-cont ft-30 pd-tp50">
        		<form action="#" @submit.prevent="submit">
        			<input class="h80 line-h80 bd-rd8 pd-lt30" type="tel" v-model="phone" placeholder="请输入手机号码" />
		            <input class="h80 line-h80 bd-rd8 pd-lt30 mg-tp30" type="password" v-model="password" placeholder="请输入密码" />
        			
        			<!--<group ref="phone">
		                <x-input v-model="phone" :show-clear="false" name="mobile" placeholder="请输入手机号码" type="tel" is-type="china-mobile"></x-input>
		            </group>
        			<group ref="password">
        				<x-input v-model="password" :show-clear="false" name="password" type="password" placeholder="请输入密码" @keyup.enter.native="submit()"></x-input>
        			</group>-->
                    
                   <!--  <check-icon :value.sync="rememberme"  type="plain" class='rememberme'>记住密码</check-icon> -->
			    	<x-button class="btn mg-tp30" action-type="submit">登录</x-button>
                    <div class="clearfix mg-tp20">
                        <!-- <router-link @click="lookAround" class="block text-left pull-left ft-28 color-999" :to="{'name':'index',params:{look:'lookAround'}}">随意看看&nbsp;</router-link> -->
                        <span @click="lookAround" class="block text-left pull-left ft-28 color-1ccfcf">随意看看&nbsp;</span>
                        <router-link class="block text-right pull-left ft-28 color-999" to="/forgetPassword">|&nbsp;忘记密码</router-link>
                        <!-- 记住密码 -->
                        <!-- <checkIcon> 记住密码</checkIcon> -->
                        <div class='rememberme flex flex-ac ft-28 pull-right color-999' @click='delberPsd()'>
                            <img class="block mg-rt10" src="@/assets/images/index/checked.png" v-if='rememberme'>
                            <img class="block mg-rt10" src="@/assets/images/index/checked_false.png" v-else>
                           	记住密码
                        </div>
                    </div>
        		</form>

			    <!-- 第三方登录 -->
			    <div class="other-login text-center">
		            <div class="title ft-26 relative color-ccc">第三方登录</div>
		            <div class="login-style flex flex-ac flex-jc" @click="wxlogin()">
		                <div class="mg-tp30">
		                    <img src="@/assets/images/index/weichat_86px_86px.png" height="43" width="43">
		                </div>
		            </div>
		        </div>

        	</div>

    	</div>
    </div>
</template>

<script>
	export default {
		data(){
			return{
				phone: '', //手机号码
				password: '', //密码
	            rememberme: false,//记住密码
                uid:'', //用户id
                oid:'', //行业id
			}
		},
		mounted(){
            // 页面加载时调用获取cookie值
			var that = this
			//读取cookie
            that.getCookie()
            that.oid = that.$router.app.__proto__.$oid;
            
            //页面加载后添加各事件监听
            document.addEventListener("deviceready", that.onDeviceReady, false); 
		},
		destroyed() {
			var that = this;
			document.removeEventListener("backbutton", that.exitApp, false); // 注销返回键  
			document.removeEventListener("backbutton", that.eventBackButton, false); //返回键  
		},
		methods:{
			//Cordova加载完毕
			onDeviceReady(){
				var that = this;
				//监听返回键按钮事件
				document.addEventListener("backbutton", that.eventBackButton, false);
			},
			eventBackButton(){
				var that = this;
				document.removeEventListener("backbutton", that.eventBackButton, false); //注销返回键  
				document.addEventListener("backbutton", that.exitApp, false);//绑定退出事件
			},
			exitApp(){
				navigator.app.exitApp();
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
	        //提交
	        submit(){
	            var that = this;
	            that.$vux.loading.show({
                    text:'登录中'
                });
	            var phone = that.phone
	            var password = that.password;
	            var rememberme =  that.rememberme;  //记住账号密码复选框状态
	            //判断复选框是否被勾选 勾选则调用配置cookie方法
	            if(rememberme == true){
	                //传入账号名，密码，和保存天数3个参数
	                that.setCookie(phone,password,7);
	            }else{
	                //清空Cookie
	                that.clearCookie();
	            }
	            var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
	            if(!myreg.test(phone)){
	                that.$vux.loading.hide()
	                that.$vux.toast.text('请输入有效的电话号码', 'middle')
	                return false
	            }else if(!password){
	                that.$vux.loading.hide()
	                that.$vux.toast.text('请输入密码', 'middle')
	                return false
	            }else{
                    var params = {
                        type:2,
                        mobile:phone,
                        password:password,
                        oid:that.oid,
                    }
                    // params.append("type",2)
                    // params.append("mobile",phone)
                    // params.append("password",password)
                    that.$apily.login(params).then(res =>{
                        if(res.code == 1){
                            
                            setTimeout(() => {
                                that.$vux.toast.text('登录成功', 'middle')
                                that.$vux.loading.hide()
                                setTimeout(() => {
                                    that.$vux.toast.hide()
                                    window.localStorage.setItem('uid', res.data.uid);
                                    that.$router.push({ name: 'index',params:{isCheck:res.data.isCheck}})
                                }, 1000)
                            }, 1000)
                        }
                        else if(res.code == 2){
                            setTimeout(() => {
                                that.$vux.loading.hide()
                                that.$vux.toast.text(res.msg, 'middle')
                            }, 1000)
                        }
                        else{
                            setTimeout(() => {
                                that.$vux.loading.hide()
                                that.$vux.toast.text('登录失败！', 'middle')
                            }, 1000)
                        }
                    })
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
	
	       //设置cookie
	        setCookie(c_name,c_pwd,exdays) {
	            var exdate = new Date();//获取时间
	            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
	            //字符串拼接cookie
	            window.document.cookie = "phone" + "=" + c_name +";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "password" + "=" + c_pwd +";path=/;expires=" + exdate.toGMTString();
				//读取cookie
	            this.getCookie()
	        },
	
	        //读取cookie
	        getCookie:function () {
	            if (document.cookie.length>0) {
	              var arr = document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
	              for(var i = 0;i < arr.length;i++){
	                var arr2 = arr[i].split('=');//再次切割
	                //判断查找相对应的值
	                if(arr2[0] == 'phone'){
	                  this.phone = arr2[1];//保存到保存数据的地方
	                  this.rememberme = true
	                }else if(arr2[0] == 'password'){
	                  this.password = arr2[1];
	                  this.rememberme = true
	                }
	              }
	            }
	        },
	
	        //清除cookie
	        clearCookie:function () {
	            this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
	        },
	
	        // 微信授权登入
	        wxlogin(){
	            var that = this;
	            //that.$router.push({name:'bindMobile'});
	            //return false;
	            Wechat.auth(function (response) {
	                var params = {
                        oid:that.oid,
                        code:response.code
                    }
                    // params.append("code",response.code)
                    that.$apily.wxlogin(params).then(res =>{
                        if(res.status == 1){
                            window.localStorage.setItem('uid', res.data.uid);
                            that.$vux.toast.show({
                                text: '登录成功',
                                type:'text',
                                position:'middle',
                                'isShowMask':true,
                                width: '2.5em',
                                onShow () {
                                    that.$vux.loading.hide()
                                },
                                onHide () {
                                    that.$router.push({name:'index',params:{isCheck:res.data.isCheck}})
                                }
                            })
                        }
                        //新用户未绑定手机号
                        else if(res.status == 2){
                        	that.$router.push({ name: 'bindMobile', params: {uid: res.data.uid}})
                        }
                        //登陆过未绑定成功的
                        else if(res.status == 3){
                        	that.$router.push({ name: 'bindMobile', params: {uid: res.data.uid}})
                        }
	                }).catch((error) => {
	                    that.$vux.toast.text('登录失败', 'middle')
	                })
	            });
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
    			.rememberme{
   					display: flex;
   					justify-content: flex-end;
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
