<template>
	<div class="footer bg-fff bd-tp-eee ft-20">
		<ul class="flex">
			<li class="footer-item text-center flex flex-jc flex-ac" :class="footer.first">
				<router-link to='/index'>
					<img src="@/assets/images/footer/index.png" class="block">
          			<img src="@/assets/images/footer/index_active.png" class="block">
          			<p>首页</p>
				</router-link>
			</li>
			<li class="footer-item text-center flex flex-jc flex-ac" :class="footer.fifth">
				<router-link to='/category'>
					<img src="@/assets/images/footer/category.png" class="block">
          			<img src="@/assets/images/footer/category_active.png" class="block">
          			<p class="pd-rt10">分类</p>
				</router-link>
			</li>
			<li class="footer-item text-center flex flex-jc flex-ac" :class="footer.second">
				<router-link to='/group'>
					<img src="@/assets/images/footer/group.png" class="block">
          			<img src="@/assets/images/footer/group_active.png" class="block">
          			<p class="pd-rt10">来拼</p>
				</router-link>
			</li>
			<li class="footer-item text-center flex flex-jc flex-ac relative" :class="footer.third">
				<!-- 购物车首页显示数量的方法 -->
				<span v-if="num>0 && !isCart" class="dian absolute inline-block bg-fc5920 color-fff bd-rd50 line-h30 text-center">
                    <span v-if="isIndex">
                        {{indexCart}}
                    </span>
                    <span v-else>
                        {{num}}
                    </span>
              	</span>
                <span v-if="isIndex && isEmpty==1 || num>0 && isIndex && isEmpty!=1" class="dian absolute inline-block bg-fc5920 color-fff bd-rd50 line-h30 text-center">
                    <span v-if="indexCart > 0">
                        {{indexCart}}
                    </span>
                </span>
                <!-- 购物车页面的数量 -->
                <span v-if="isCart && cartNum>0" class="dian absolute inline-block bg-fc5920 color-fff bd-rd50 line-h30 text-center">
                    {{cartNum}}
                </span>
				<router-link to='/cart'>
					<img src="@/assets/images/footer/cart.png" class="block">
          			<img src="@/assets/images/footer/cart_active.png" class="block">
          			<p class="pd-lt10">购物车</p>
				</router-link>
			</li>
			<li class="footer-item text-center flex flex-jc flex-ac" :class="footer.fourth">
				<router-link to='/user'>
					<img src="@/assets/images/footer/user.png" class="block">
          			<img src="@/assets/images/footer/user_active.png" class="block">
          			<p>我的</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'vfooter',
		data(){
			return{
                uid:'',
                clickId:'',
                num:'',
			}
		},
		props:{
		    footer:{
              type:Object,
           	},
            indexCart:{
                type:Number
            },
            cartNum:{
                type:Number
            },
            isIndex:{
            	
            },
            isEmpty:{
                
            },
            isCart:{

            },
  		},
		methods:{
            //获取用户信息
            getUser(){
                var that = this;
                that.uid = window.localStorage.getItem("uid")
                that.clickId = window.localStorage.getItem("clickId");
                that.getCart();
            },
			//获取购物车信息
            getCart(){
				var that = this;
                var params = {
                    uid:that.uid,
                    oid:that.$router.app.__proto__.$oid,
                }
                that.$apily.storecart(params).then(res =>{
                    if(res.code == 1){
                        var a = res.data
                        for(let i=0;i<a.length;i++){
                            if(a[i].shopid == that.clickId){
                                let cartList = a[i]
                                let goodList = a[i].list
                                that.num = goodList.length
                            }
                        }
                    }
                })
			},
        },
        mounted(){
            var that = this
            that.getUser();
        }
	}
</script>

<style lang="less" scoped>
	.dian{
		width:0.3rem!important;
		height:0.3rem!important;
		right:0.4rem!important;
		top:0.05rem!important;
		font-size:0.18rem!important;
    }
    
</style>