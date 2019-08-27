<template>
	<div class="addAds">
		<x-header :left-options="{backText: ''}">添加收货地址<a slot="right"><button :disabled="isDisabled" @click="toAddress">保存</button></a></x-header>
		<form action="#" @submit.prevent="submit">
			<group>
   				<x-input placeholder="收件人姓名(请使用真实姓名)" v-model="name" :show-clear="false"></x-input>
  			</group>
  			<group>
   				<x-input placeholder="手机号码" v-model="mobile" is-type="china-mobile" :show-clear="false"></x-input>
  			</group>
  			<div class="address flex flex-ac relative">
  				<div class="leftCont flex flex-js">
  					<group class="width">
    					<x-address title="" raw-value:true :list="addressData" placeholder="所在地区" v-model="location" @on-hide="logHide" @on-show="logShow" @on-shadow-change="onShadowChange"></x-address>
  					</group>
  				</div>
  				<div class="rightCont absolute flex flex-je pd-rt30">
  					<img class="block" src="@/assets/images/common/right_arrow.png" alt="" />
  				</div>
  			</div>
  			<group>
   				<x-input placeholder="街道、小区门牌等详细地址" v-model="detail" :show-clear="false"></x-input>
  			</group>
		</form>
	</div>
</template>

<script>
	import { ChinaAddressV4Data  } from 'vux'  //省市区三级联动
	export default{
		name:'addAds',
		data(){
			return{
                uid:'', //用户id
				name:'', //收件人姓名输入框内容
				mobile:'', //手机号码输入框内容
                location:[], //所在地区信息
                myAddress:[],
				detail:'', //街道详细信息输入框内容
				addressData: ChinaAddressV4Data, //省市区三级联动
				isDisabled:false, //右上角保存禁用
			}
		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid");
            },
			submit(){
				var that = this;
			},
			logHide (str) {
   			},
		    logShow (str) {
		    },
		    onShadowChange (ids, names) {
                var that = this
                that.myAddress = []
                for(let i=0;i<3;i++){
                
                that.myAddress.push(names[i]) 
				}
			},
			// 保存提交地址信息按钮
   			toAddress(){
                var that = this;
   				if(!that.name || !that.mobile || !that.location || !that.detail){
   					that.$vux.toast.text('有未填项！','middle');
                   }
                else{
                    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
                    if(!myreg.test(that.mobile)){
                        that.$vux.loading.hide()
                        that.$vux.toast.text('请输入有效的电话号码', 'middle')
                        return false;
                    }
                    else{
                    	that.$vux.loading.show({
                    		text:'添加地址中',
                    	})
                        var params = new FormData();
                        params.append("uid",that.uid);
                        params.append("name",that.name);
                        params.append("mobile",that.mobile);
                        params.append("area",that.myAddress);
                        params.append("areaDetail",that.detail);
                        that.$apily.address2(params).then(res =>{
                            if(res.code == 1){
                            	that.isDisabled = true;
                            	that.$vux.loading.hide();
                                setTimeout(function(){
                                	that.$vux.toast.text('地址添加成功！','middle');
                                    that.$router.go(-1);
                                },1500)
                            }
                        })
                    }
                }
   				
   			}
        },
        mounted(){
			var that = this
			//获取用户信息
            that.getUser()
        }
	}
</script>

<style lang="less">
	.addAds{
		min-height: calc(100vh - 0.88rem);
		.address{
			.leftCont{
				width:100%;
				.width{
					width:100%;
				}
			}
			.rightCont{
				top:0.35rem;
				right:0;
				img{
					width:0.16rem;
					height:0.3rem;
				}
			}
		}
	}
</style>