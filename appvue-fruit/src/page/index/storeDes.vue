<template>
	<div class="storeDes">
		<x-header :left-options="{backText: ''}">门店信息</x-header>
		<!--商品主图-->
		<div class="mainImgBox">
			<div class="indexSwiper relative">
	          	<swiper 
	          		:show-desc-mask='false'
	          		v-model='indexSwiper' 
	          		@on-index-change="indexSwiperChange" 
		          	height='3.75rem'
		          	dots-position='center'
		          	loop
		          	dots-class='custom-bottom'
		          	:show-dots='false'>
		          	<swiper-item v-for="(item, index) in swiperList" :key="index">
	        			<img :src="item">
	      			</swiper-item>
		        </swiper>
		        <div class="absolute bottomBox">
					<div class="relative dots ft-24 color-fff" v-if="swiperList.length > 0">
	        			<img class="block" src="@/assets/images/group/dots.png" alt="" />
	        			<span class="absolute text-center inline-block">{{indexSwiper+1}}/{{swiperList.length}}</span>
		        	</div>
				</div>
       		</div>
		</div>
		<!--店铺名称-->
		<div class="storeName h100 line-h100 pd-lr30 bd-bt-f4f4f4 clearfix">
			<p class="pull-left ft-28 color-333">门店名称</p>
			<p class="pull-right ft-26 color-999">{{storeInfo.name}}</p>
		</div>
		<!--店铺地区-->
		<div class="storeArea h100 line-h100 pd-lr30 bd-bt-f4f4f4 clearfix">
			<p class="pull-left ft-28 color-333">店铺地区</p>
			<p class="pull-right ft-26 color-999">{{storeInfo.area}}</p>
		</div>
		<!--详细地址-->
		<div class="storeAds h100 line-h100 pd-lr30 bd-bt-f4f4f4 clearfix">
			<p class="pull-left ft-28 color-333">详细地址</p>
			<div class="pull-right ft-26 color-999 flex flex-ac flex-je" @click="storePosition">
				<img class="block mg-rt10" src="@/assets/images/group/address_icon.png" alt="" />
				<p class="one-line-ellipsis text-right">{{storeInfo.address}}</p>
			</div>
		</div>
		<!--营业时间-->
		<div class="storeAds h100 line-h100 pd-lr30 bd-bt-f4f4f4 clearfix">
			<p class="pull-left ft-28 color-333">营业时间</p>
			<p class="pull-right ft-26 color-999">{{storeInfo.workTime}}</p>
		</div>
		<!--营业执照-->
		<div class="storeAds h100 line-h100 pd-lr30 clearfix">
			<p class="pull-left ft-28 color-333">营业执照</p>
			<p class="pull-right ft-26 color-999">上传已认证</p>
		</div>
		<div class="imgArr pd-lr30 flex flex-ac">
			<img v-for="(item,index) in imgArr" class="block mg-rt50" :src="item" alt="" />
		</div>
	</div>
</template>

<script>
	export default{
		name:'storeDes',
		data(){
			return{
                id:'', //门店id
				indexSwiper:0, //轮播图下标
				swiperList:[], //轮播图列表
				imgArr:[], //营业执照图片
                storeInfo:[], //门店信息
			}
		},
		methods:{
            //获取路由参数
            getParams(){
                var that = this;
                that.id = that.$route.params.id;
            },

            //获取门店详情
            getDetail(){
                var that = this;    
                var params = that.id
                that.$apily.store2(params).then(res =>{
                    if(res.code == 1){
                        setTimeout(() => {
                            that.$vux.loading.hide()
                        }, 500);
                        that.storeInfo = res.data
                        that.swiperList = res.data.img
                        that.imgArr = res.data.license
                    }
                })
            },

            //查看详细地址
            storePosition(){
                var that = this;   
                that.$router.push({name:'storeMap',params:{id:that.id}})
            },

			// 轮播图切换
			indexSwiperChange(index){
				var that = this;
				that.indexSwiper = index;
			},
        },
        mounted(){
            var that = this;
            that.$vux.loading.show({
                text:"加载中"
			})
			//获取路由参数
			that.getParams()
			//获取门店详情
            that.getDetail()
        }
	}
</script>

<style lang="less" scoped>
	.storeDes{
		.mainImgBox{
			.indexSwiper{
				.bottomBox{
					bottom:0.2rem;
					right:0.3rem;
					.dots{
						line-height: 0.36rem;
						span{
							width:100%;
							bottom:0;
							left:0;
						}
						img{
							width:0.72rem;
							height:0.36rem;
						}
					} 
				}
			}
		}
		.storeAds{
			>div{
				width:60%;
				img{
					width:5%;
				}
			}
		}
		.imgArr{
			img{
				width:2rem;
				height:2.8rem;
			}
			img:last-child{
				margin-right:0;
			}
		}
	}
</style>