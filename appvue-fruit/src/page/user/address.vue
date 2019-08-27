<template>
	<div class="address bg-f4f4f4">
		<x-header :left-options="{backText: ''}">我的收货地址</x-header>
		<div class="addressInfo" v-if="way == 1">
			<div class="headBox flex flex-ac bd-bt-f4f4f4 bg-fff bd-rd10">
	    		<div class="storeIcon">
	    			<img class="block" src="@/assets/images/index/storeIcon.png" alt="" />
	    		</div>
	    		<div class="storeInfo">
	    			<p class="name color-333 ft-28">{{addressInfo.name}}<span class="ft-24 color-999 inline-block">（当前门店）</span></p>
	    			<p class="addressDes ft-24 color-333 mg-tp15 one-line-ellipsis">{{addressInfo.area}}{{addressInfo.address}}</p>
	    		</div>
	    	</div>
		</div>
		<div class="hintBox">
			<p class="hint ft-24 color-1ccfcf bd-rd10">
				商家的配送地址为商家方圆内{{addressInfo.km}}km，请注意选择的收货地址为商家配送范围之内！
			</p>
		</div>
		<div class="adsList pd-lr30 mg-tp20">
			<div class="list-item pd30 mg-bt20 bg-fff" v-for="(item,index) in adsList">
				<div class="name_phone clearfix">
					<p class="ft-28 color-333 pull-left">{{item.l_name}}</p>
					<p class="ft-28 color-333 pull-right">{{item.l_phone}}</p>
				</div>
				<p class="mg-tp20 color-999 ft-24 pd-bt30 bd-bt-f4f4f4">{{item.l_province}}{{item.l_city}}{{item.l_district}}{{item.l_address}}</p>
				<div class="clearfix pd-tp20">
					<div class="leftCont pull-left flex flex-ac flex-js" @click="defaultAds(index,item.id)">
						<img v-if="item.l_is_default" class="block mg-rt10" src="@/assets/images/common/delete.png" alt="" />
						<img v-else class="block mg-rt10" src="@/assets/images/common/delete_false.png" alt="" />
						<p class="ft-28 color-333">默认地址</p>
					</div>
                    
					<div class="rightCont pull-right flex flex-ac flex-je" @click="deleteAds(index,item.id)">
						<img class="block mg-rt10" src="@/assets/images/user/del_ads.png" alt="" />
						<p class="ft-26 color-333">删除</p>
					</div>
				</div>
			</div>
		</div>
        <!-- <div v-if="way==1&&adsList.length==0" class="noAd ft-28 pd30">
            <img class="block mg-rt10" src="@/assets/images/user/null.png" alt="" />
            <p>当前暂无配送范围内的地址，请点击下方按钮添加</p> 
        </div> -->
		<div class="add_ads bg-1ccfcf h90 line-h90">
			<router-link class="flex flex-ac flex-jc" :to="{name:'addAds'}">
				<img class="mg-rt20 block" src="@/assets/images/user/add_ads.png" alt="" />
				<p class="ft-32 color-fff">添加新地址</p>
			</router-link>
            
		</div>
        <div v-if="way==1&&outList.length>0" class="outAds pd30">
            <p class="ft-30 pd30 mg-bt10 mg-tp40">以下地址超出配送范围:</p>
            <div v-for="(item,index) in outList" class="outSide pd30">
                <div class="name_phone clearfix">
					<p class="ft-28 color-999 pull-left">{{item.l_name}}</p>
					<p class="ft-28 color-999 pull-right">{{item.l_phone}}</p>
				</div>
				<p class="mg-tp20 color-999 ft-24 pd-bt30 bd-bt-f4f4f4">{{item.l_province}}{{item.l_city}}{{item.l_district}}{{item.l_address}}</p>
            </div>
        </div>

        <!-- 删除地址弹窗 -->
        <div transfer-dom>
	        <x-dialog v-model="showDelete" hide-on-blur>
	          	<div class="modalContent">
	            	<div class="modalTop flex flex-je">
	              		<img class="block" @click="closeDelete" src="@/assets/images/common/closeModal.png" alt="" />
	            	</div>
	            	<div class="modalMiddle flex flex-ac flex-jc mg-tp30">
	            		<p class="ft-32">确定要删除该地址？</p>
	            	</div>
	            	<div class="loginBtn flex flex-ac flex-jc mg-tp30">
                        <p class="look ft-28 color-333" @click="closeDelete">不了</p> 
                        <p class="ft-28 color-333" @click="confirm">删除</p> 
	            	</div>
	          	</div>
	        </x-dialog>
      	</div>
	</div>
</template>

<script>
	export default{
		name:'',
		data(){
			return{
                uid:'', //用户id
                sid:'', //门店id
                adsList:[], //符合配送距离地址列表
                inList:[],
                outList:[], //超出配送范围地址列表
                way:'',
                id:'', //配送地址下标
                showDelete:false, //显示删除地址弹窗
                addressInfo:{}, //门店详细信息
			}
		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid");
				that.sid = window.localStorage.getItem("clickId");
				that.type = that.$route.params.type;
				that.way = that.$route.params.way;
				that.oid  = that.$router.app.__proto__.$oid;
			},
			// 获取门店详细信息
            getShopInfo(){
            	var that = this;
            	var data = {
            		uid:that.uid,
            		sid:that.sid,
            		sub_type:2,
            		oid:that.oid,
            	}
            	that.$api.orderaddress1(data).then(res => {
            		console.log(res);
            		that.addressInfo = res.data;
            	})
            },
            //获取用户所有地址
        	getAddress(){
                var that = this
                if(that.way == 1){
                    //获取可用地址
                	var params = {
	                    uid:that.uid,
						type:1,
						origin:that.lng + ',' + that.lat,
						oid:that.oid,
	                }
	                that.$apily.address(params).then(res =>{
	                    if(res.code == 1){
                            if(res.data){
                                that.inList = []
                                let I = that.inList
                                that.adsList = res.data;
                                that.adsList.forEach(item => {
                                    //that.$set(item,'checked',false);
                                    I.push(item.id)
                                    that.inList = I.join()
								})
								console.log(that.adsList)
								console.log(that.inList)
								//获取不可用地址
                                that.outAds();
                            }
                            else{
								that.inList = ''
								//获取不可用地址
                                that.outAds()
                            }
	                    }
                    })
                    
                }
                else{
                	var params = {
	                    uid:that.uid,
	                    oid:that.oid,
	                }
	                that.$apily.address(params).then(res =>{
	                    if(res.code == 1){
	                        that.adsList = res.data;
	                    }
	                })
	            }
            },
            //获取不可用地址
            outAds(){
                var that = this;
                var params2 = {
                    uid:that.uid,
                    ids:that.inList,
                    oid:that.oid,
                }
                that.$apily.address(params2).then(res =>{
                    if(res.code == 1){
                        that.outList = res.data;
                    }
                })
			},
			// 选择切换地址
			defaultAds(index,id){
                var that = this;
                var params = that.adsList[index].id + '?uid=' + that.uid;
                that.$apily.address4(params).then(res =>{
                    if(res.code == 1){
                        that.adsList.forEach((item,index) => {
                            item.l_is_default = false;
                        })
                        that.adsList[index].l_is_default = true;
                    }
                    if(that.way == 1){
						that.$vux.toast.text('地址切换成功！','middle');
					 	setTimeout(() => {
					 		that.$vux.loading.hide();
					 		that.$router.replace({name:'subOrder',params:{type:that.type}});
					 	},1500)
					}
                    else{
                    	that.$vux.toast.text('地址切换成功！','middle');
                    }
                    
                })
				
			},
			// 删除配送地址
			deleteAds(index){
                var that = this;
                that.showDelete = true;
                that.id = index;
				
			},
			// 关闭删除地址弹窗
            closeDelete(){
                var that = this;
                that.showDelete = false;
			},
			// 确定删除地址按钮
            confirm(){
                var that = this;
                var index = that.id
                var params = that.adsList[index].id
                that.$apily.address3(params).then(res =>{
                    if(res.code == 1){
                        that.adsList.splice(index,1);
                        that.showDelete = false;
                        that.$vux.toast.text('删除成功！','middle');
                    }
                })
            },
            //获取当前门店详情
            getStore(){
                var that = this;
                var params = that.sid 
                that.$apily.store2(params).then(res =>{
                    if(res.code == 1){
                        that.lng = res.data.lon;
						that.lat = res.data.lat;
						//获取用户所有地址
			            that.getAddress();
                    }
                })
            },

		},
		created(){
			var that = this;
			//获取用户信息
			that.getUser();
			// 获取门店详细信息
			that.getShopInfo();
			//获取当前门店详情
            that.getStore();
            
		}
	}
</script>

<style lang="less" scoped>
	.address{
		min-height:calc(100vh - 0.88rem);
		.hintBox{
			width:6.9rem;
			margin:0 auto;
			padding-top:0.3rem;
			.hint{
				background:#DAEFF0;
                padding:0.2rem 0.3rem;
                line-height: 0.5rem
			}
		}
		.addressInfo{
			width:6.9rem;
			margin:0 auto;
			padding-top:0.3rem;
			.headBox{
				padding:0.2rem 0.3rem;
				.storeIcon{
					width:10%;
					img{
						width:0.38rem;
						height:0.38rem;
					}
				}
				.storeInfo{
					width:90%;
					.name{
						font-family: 'PingFang-Medium';
					}
				}
			}
			.footBox{
				.storePhone{
					width:10%;
					img{
						width:0.34rem;
						height:0.44rem;
					}
				}
			}
			
		}
		.adsList{
			.list-item{
				.name_phone{
					font-family: 'PingFang-Medium';
				}
				.leftCont{
					font-family: 'PingFang-Medium';
					img{
						width:0.4rem;
						height:0.4rem;
					}
					
				}
				.rightCont{
					margin-top: 0.06rem;
					img{
						width:0.26rem;
						height:0.26rem;
					}
				}
				&.list-item:last-child{
					margin-bottom:0;
				}
			}
		}
		.add_ads{
			font-family: 'PingFang-Medium';
			width:92%;
			margin:0 auto;
			margin-top:0.6rem;
			border-radius:0.45rem;
			img{
				width:0.26rem;
				height:0.26rem;
			}
        }
        .modalContent{
			padding: 0.4rem;
			background:url('../../assets/images/user/ewmBg.png');
			width:100%;
			height: 3rem;
			.modalTop{
				img{
					width:0.28rem;
					height:0.28rem;
				}
			}
			.loginBtn{
				margin-top: 0.5rem;
				justify-content: space-around;
				p{
					padding: 0.2rem 0.4rem;
					border-radius: 0.1rem;
					background-color: #1ccfcf;
					color: #fff
				}
				.look{
					background-color: #99a1a1;
				}
			}
        }
        .noAd{
            text-align: center;
            img{
                margin: auto;
                margin-bottom: 0.5rem;
                height: 2rem
            }
        }
        .outAds{
            .outSide{
                background-color: #fff;
                margin-bottom: 0.2rem;
            }
            .rightCont{
					margin-top: 0.06rem;
					img{
						width:0.26rem;
						height:0.26rem;
					}
				}
        }
	}
</style>