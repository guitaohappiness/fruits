<template>
	<div class="backTop">
		<div class="fixed">
			<img @click='backTop' v-show="backToTop" src="@/assets/images/common/backTop.png" alt="" />
		</div>
	</div>
</template>

<script>
	export default{
		name:'backTop',
		data(){
			return{
				backToTop:false,
			}
		},
		methods:{
			scrollToTop(){
				var that = this;
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				var browserHeight = window.outerHeight;
				if (scrollTop > browserHeight) {
			        that.backToTop = true;
			    } else {
			        that.backToTop = false;
			    }
			    window.localStorage.setItem('scorllHeight',scrollTop);
			},
			backTop(){
				let back = setInterval(() => {
					if(document.body.scrollTop || document.documentElement.scrollTop){
						document.body.scrollTop -= 50;
						document.documentElement.scrollTop -= 50;
					}
					else{
						clearInterval(back);
					}
				})
			},
		},
		created(){
			var that = this;
			window.addEventListener("scroll", that.scrollToTop);
		},
		destroyed() {
			var that = this;
    		window.removeEventListener("scroll", that.scrollToTop);
  		}
	}
</script>

<style scoped> 
	.fixed {
		position: fixed;
		bottom:1.5rem;
		right: 0.3rem; 
		z-index: 99;
	}
	.fixed img {
		width: 0.6rem;
		height: 0.6rem;
	}
</style>