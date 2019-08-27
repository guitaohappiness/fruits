<template>
	<div class="privacyAgree">
		<x-header :left-options="{backText: ''}">{{title}}</x-header>
        <div v-if="agree">
            <div class="agree" v-html="agree"></div>
        </div>
        <div class="loadMore text-center" v-else>
            <img class="block" src="@/assets/images/common/loadMore.png" alt="" />
            <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
        </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				oid:'', //行业id
                agree:'', //隐私协议内容（富文本）
                type:3,
                title:'隐私协议',
			}
		},
		methods:{
            //获取路由参数
            getParams(){
                var that = this
                if(that.$route.params.type==5){
                    that.type = 5
                    that.title = '购买协议'
                }
            },
			//获取隐私协议
			getAgree(){
                var that = this
                that.oid = that.$router.app.__proto__.$oid
                var params = {
                    oid: that.oid,
                    type:that.type
                }
				that.$apily.options(params).then(res =>{
					if(res.code == 1){
						that.agree = res.data
					}
				})
			}
		},
		created(){
            var that = this
            //获取路由参数
            that.getParams()
            //获取隐私协议
			that.getAgree()
		}
	}
</script>

<style lang="less" scoped>
.agree{
    padding: 0.2rem;
    font-size: 0.26rem;
}
.agree /deep/ p{
    margin: 0.2rem 0;
    font-size: 0.26rem;
    line-height: 0.5rem
}
	.loadMore{
            padding:0.8rem 0 0.5rem 0;
            img{
                width:1rem;
                height:0.28rem;
                margin: 0 auto;
            }
            
        }
</style>