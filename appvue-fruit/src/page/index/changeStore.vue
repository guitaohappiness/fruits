<template>
	<div class="changeStore bg-f4f4f4">
		<x-header :left-options="{backText: ''}">附近门店</x-header>
		<div class="storeList">
			 <div class="list-item bg-fff mg-tp20" v-for="(item,index) in storeList">
			 	<div class="storeName bd-bt-f4f4f4 flex flex-ac" @click="changeStr(index)">
                    <img v-show="item.isClick" class="selectSt" src="@/assets/images/index/selectStore.png" alt="">
			 		<div class="leftCont">
			 			<div class="name flex flex-ac">
			 				<img class="block mg-rt10" src="@/assets/images/index/nearStore.png" alt="" />
			 				<p class="ft-30 color-333">{{item.name}}</p>
			 			</div>
			 			<p class="address ft-26 color-999 mg-tp20 one-line-ellipsis">{{item.location}}</p>
			 		</div>
			 		<div class="rightCont flex flex-ac flex-je">
			 			<img class="block" src="@/assets/images/group/address_icon.png" alt="" />
			 			<p class="ft-28 color-999" v-if="typeof(item.km)=='object'">未知距离</p>
                        <p class="ft-28 color-999" v-else>{{item.km}}km</p>
			 		</div>
			 	</div>
				<div class="moreMenu h70 line-h70 flex flex-ac">
			 		<div class="lookStore h70 line-h70 flex flex-ac flex-jc" @click="lookStore(index)">
			 			<img class="block mg-rt10" src="@/assets/images/index/lookStore.png" alt="" />
			 			<p class="ft-24 color-333">查看</p>
			 		</div>
                     <router-link  class="lookStore h70 line-h70 flex flex-ac flex-jc " :to="{name:'storeService',params:{id:item.id}}">
                        <img class="block mg-rt10" src="@/assets/images/index/nearStore_kf.png" alt="" />
                        <p class="ft-24 color-333">客服</p>
                     </router-link>
			 		<div class="lookStore h70 line-h70 flex flex-ac flex-jc" @click="collect(index)">
			 			<img v-if="item.isCheck" class="block mg-rt10" src="@/assets/images/index/collect.png" alt="" />
			 			<img v-else class="block mg-rt10" src="@/assets/images/index/collect_false.png" alt="" />
			 			<p class="ft-24 color-333">关注</p>
			 		</div>
				</div>
			 </div>
		</div>
		<!--没有更多-->
        <div class="loadMore text-center">
            <img class="block" src="@/assets/images/common/icon2.png" alt="" />
            <p class="ft-20 mg-tp10 color-999">没有更多了，看看其他的吧~</p>
        </div>
	</div>
</template>

<script>
	export default{
		name:'changeStore',
		data(){
			return{
                uid:'', //用户id
                lng:'',
                lat:'',
                clickId:'', //当前门店id
				storeList:[], //附近门店列表
			}
		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid")
                if(!that.uid){
                    that.uid = 0;
                }
            },

            //获取路由参数
            getParams(){
                var that = this;
                that.lng = window.localStorage.getItem("lng");
                that.lat = window.localStorage.getItem("lat");
                that.clickId = window.localStorage.getItem("clickId");
            },

            //获取门店列表
            getStores(){
                var that = this
                var m = that.lng + ',' + that.lat;
                var params = {
                    oid:that.$router.app.__proto__.$oid,
                    uid:that.uid,
                    origin:m,
                }
                that.$apily.store(params).then(res =>{
                    if(res.code == 1){
                        that.$vux.loading.hide();
                        that.storeList = res.data
                        
                        var s = res.data
                        var a,b,pick,click
                        //收藏置顶
                        for(let i=0;i<s.length;i++){
                            if(s[i].isCheck == 1){
                                pick = s[i]
                                s.splice(i,1)
                                s.unshift(pick)
                                break
                            }
                        }
                        //当前选择置顶
                        for(let i=0;i<s.length;i++){
                            if(s[i].id == that.clickId){
                                s[i].isClick = true
                                click = s[i]
                                s.splice(i,1)
                                s.unshift(click)
                                break
                            }
                        }
                        that.storeList = s
                        var s2 = that.storeList
                        s2.forEach(item=>{
                            item.km = item.km.toFixed(2)
                        })
                        that.storeList = s2
                    }
                })

            },

            //关注/取消关注门店
            collect(index){
                var that = this
                if(that.uid == 0){
                    that.$vux.toast.text('您还未登录哦!')
                }
                else{
                    var s = that.storeList
                    var params = new FormData
                    params.append("fid",s[index].id)
                    params.append("oid",that.$router.app.__proto__.$oid)
                    params.append("uid",that.uid)
                    that.$apily.follow(params).then(res =>{
                        if(res.code == 1){
                            that.$vux.toast.text('关注成功！','middle')
                            that.storeList[index].isCheck = !that.storeList[index].isCheck ;
                        }
                        else if(res.code == 2){
                            that.$vux.toast.text(res.msg,'middle')
                            that.storeList[index].isCheck = 0 ;
                        }
                    })
                }
            },

            //切换门店进入首页
            changeStr(index){
                var that = this;
                that.$vux.loading.show({
                	text:'正在切换',
                })
                var s = that.storeList;
                window.localStorage.setItem('clickId',s[index].id);
                setTimeout(() => {
                	that.$vux.loading.hide();
                	that.$router.push({name:'index'});
                },500)
            },

            // 点击查看门店信息
			lookStore(index){
                var that = this;
                var s = that.storeList
				that.$router.push({name:'storeDes',params:{id:s[index].id}})
			}
        },
        mounted(){
            var that = this;
            that.$vux.loading.show({
                text:'加载中'
            })
            //获取用户信息
            that.getUser();
            //获取路由参数
            that.getParams();
            //获取门店列表
            that.getStores();
        }
	}
</script>

<style lang="less" scoped>
	.changeStore{
		min-height: calc(100vh - 0.88rem);
		.storeList{
			.list-item{
				&.list-item:first-child{
					margin-top:0;
				}
				.storeName{
                    position: relative;
                    padding:0.4rem 0.3rem 0.2rem 0.3rem;
                     .selectSt{
                        width:0.6rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
					.leftCont{
						width:75%;
						.name{
							font-family: 'PingFang-Medium';
							img{
								width:0.4rem;
								height:0.4rem;
							}
						}
					}
					.rightCont{
						width:25%;
						img{
							width:0.2rem;
                            height:0.28rem;
                            margin-right: 0.1rem
                        }
                        p{
                            color:#1ccfcf;
                        }
                        
					}
				}
				.moreMenu{
					.lookStore{
						border-right:0.04rem solid #f4f4f4;
						&.lookStore:last-child{
							border-right:none;
						}
						width:33.333%;
						img{
							width:0.3rem;
							height:0.3rem;
						}
					}	
				}
			}
		}
		.loadMore{
            padding:0.3rem 0 0.1rem 0;
            img{
                width:1rem;
                margin: 0 auto;
            }
        }
	}
</style>