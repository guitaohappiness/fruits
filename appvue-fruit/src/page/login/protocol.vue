<template>
	<div class="protocol">
		<x-header :left-options="{backText: ''}">协议说明</x-header>
        <div v-html="agree" class="agree"></div>
	</div>
</template>

<script>
    export default{
        data(){
            return{
                oid:'', //行业id
                agree:'', //协议内容（富文本）
            }
        },
        methods:{
            //获取隐私协议
			getAgree(){
                var that = this
                that.oid = that.$router.app.__proto__.$oid
				var params = {
					oid: that.oid,
					type:2
				}
				that.$apily.options(params).then(res =>{
					if(res.code == 1){
						that.agree = res.data
					}
				})
			}
        },
        mounted() {
            var that = this;
            //获取隐私协议
            that.getAgree()
        }
    }   
</script>

<style lang="less" scoped>
.agree{
    padding: 0.4rem 0.2rem;
    /deep/ div{
        font-size: 0.28rem;
        line-height: 0.5rem;
    }
}
</style>