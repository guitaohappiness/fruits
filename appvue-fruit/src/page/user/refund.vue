<template>
	<div class="refund bg-f4f4f4">
		<x-header :left-options="{backText: ''}">申请退款</x-header>
		<div class="proDes bg-fff">
            <div v-for="(item,index) in proDes.list">
                <div class="flex flex-ac proInfo bd-bt-f4f4f4">
                    <div class="leftCont">
                        <img class="block bd-rd8" :src="item.product_images" alt="" />
                    </div>
                    <div class="rightCont">
                        <p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item.product_name}}</p>
                        <div class="clearfix mg-tp30">
                            <p class="ft-28 color-333 pull-left">
                                单价：<span class="ft-24">￥</span><span>{{item.product_fact_price}}</span>
                            </p>
                            <p class="pull-right ft-24 color-999 line-h35">×{{item.num}}</p>
                        </div>
                    </div>
                </div>
                </div>
                <div class="totalPrice flex flex-ac flex-je pd30">
                    <p class="color-1ccfcf inline-block ft-24 disPrice bd-rd5 mg-rt30" v-if="proDes.coupon_price">已优惠￥{{proDes.coupon_price}}</p>
                    <p class="ft-26 color-333 mg-rt30">共{{proDes.total_sum}}件</p>
                    <p class="ft-26 color-333">实付总额：<span class="price color-fc5920">￥{{proDes.price}}</span></p>
                </div>
            
		</div>
		<div class="reason mg-tp20 h90 line-h90 bd-bt-f4f4f4 bg-fff pd-lr30 clearfix" @click="refundReason">
			<div class="leftCont pull-left flex flex-ac">
				<span class="color-fc5920 ft-24">*</span>
				<p class="color-333 ft-28">退款原因</p>
			</div>
			<div class="rightCont pull-right flex flex-ac">
				<p class="ft-28 color-333 mg-rt10">{{reason}}</p>
				<img class="block" :class="reason?'':'mg-tp30'" src="@/assets/images/common/right_arrow.png" alt="" />
			</div>
		</div>
		<div class="reason h90 line-h90 bd-bt-f4f4f4 bg-fff pd-lr30 clearfix">
			<p class="leftCont pull-left color-333 ft-28">退款金额</p>
			<div class="rightCont pull-right color-333 ft-28">￥{{proDes.price}}</div>
		</div>
		<div class="describe bg-fff mg-tp20 pd-lr30 bd-bt-f4f4f4">
			<p class="pd-tb20 flex flex-vc">
				<span class="ft-28 color-333">退款原因描述</span>
			</p>
			<div class="userAdviceBox pd30 bg-f4f4f4 ft-28 color-333">
				<x-textarea :max='300' placeholder='请在此描述退款的原因' v-model='message'></x-textarea>
			</div>
		</div>
		<div class="uploadImg bg-fff">
			<p class="pd-tp20 pd-bt25 flex flex-ac">
				<span class="ft-28 color-333 mg-rt15">上传凭证</span>
				<span class="ft-22 color-999">(最多上传3张)</span>
			</p>
			<div class="list flex flex-ac">
				<div class="list-item inline-block bd-rd4 mg-rt20 relative" v-for="(item,index) in detailImg">
					<img class="block" :src="item">
					<img class="delete block" src="@/assets/images/common/deleteImg.png" alt="" data-index="index" @click="deleteImg(index)">
				</div>
				<input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" name="uploadImg" id="uploadImg" @change="uploadImg($event)" />
				<div class="addImg bd-rd4" v-if="detailImg.length < 3">
					<label for="uploadImg" class="flex flex-jc"> 
						<img src="@/assets/images/user/addImg.png" class="upload_img mg-tp30" alt="" />
						<span class="ft-24 color-999 block mg-tp10">添加图片</span>
					</label>
				</div>
				<div class="addImg bd-rd4" v-if="detailImg.length == 3">
					<div @click="imgs" class="flex flex-jc"> 
						<img src="@/assets/images/user/addImg.png" class="upload_img mg-tp30" alt="" />
						<span class="ft-24 color-999 block mg-tp10">添加图片</span>
					</div>
				</div>
			</div>
		</div>
		<x-button text="提交"  @click.native="submit"></x-button>
		
		<div class="black_cover" v-if="isShowModal">
			<div class="reasonBox bg-fff">
				<div class="ft-32 h100 line-h100 color-333 title pd-lr30 bd-bt-f4f4f4">
					<p class="pull-left">退款原因</p>
					<img class="block pull-right" @click="closeModal" src="@/assets/images/common/closeModal.png" alt="" />
				</div>
				<div class="list">
					<div class="list-item pd-lr30 bd-bt-f4f4f4 h90 line-h90 ft-28" v-for="(item,index) in reasonList" @click="chooseReason(index)">{{item}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'refund',
		data(){
			return{
				message:'', //退款原因描述
				detailImg:[], //凭证图片
				reasonList:[], //退款原因列表
				reason:'', //用户选择的退款原因
				isShowModal:false, //是否显示退款原因弹窗
				proDes:'', //退款商品信息
			}
		},
		methods:{
			// 上传图片凭证
			uploadImg:function(e){
				var that = this;
				that.$vux.loading.show({
					text:'上传中',
				})
                var file = e.target.files[0];
                var size = file.size;
				var maxsize = 10*1024*1024;//10M 
				console.log(file)
                if(size > maxsize ){
                    this.$vux.toast.text('单张图片不能大于10M', 'middle')
                    return false
                }
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    this.$vux.toast.text('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种', 'middle')
                    return false
                }

				let reader = new FileReader();
				let imgFile = '';
				reader.readAsDataURL(file);
				reader.onload = e => {
					imgFile = e.target.result;
					var param = new FormData();
					param.append("avatar", imgFile); 
					let config = {
						headers: {'Content-Type': 'multipart/form-data'}
					}
					that.$api.addimage(param,config).then(res =>{
						console.log(res)
						that.detailImg.push(res.data);
						setTimeout(() => {
							that.$vux.loading.hide();
						})
					})
				}

			},
			// 已上传三张图片后点击提示
			imgs(){
				var that = this;
				that.$vux.toast.text('最多上传三张图片！','middle');
			},
			// 删除某个已上传图片
			deleteImg(index){
				var that = this;
				that.detailImg.splice(index,1);
			},
			// 点击退款原因显示退款原因列表
			refundReason(){
				var that = this;
				that.isShowModal = true;
			},
			// 点击选择一个退款原因后关闭退款原因列表
			chooseReason(index){
				var that = this;
				that.reason = that.reasonList[index];
				that.isShowModal = false;
			},
			// 点击X关闭退款原因列表
			closeModal(){
				var that = this;
				that.isShowModal = false;
			},
			// 获取路由信息
			getParams(){
				var that = this;
				that.id = that.$route.params.id;
			},
			// 获取商品详情
			getProDes(){
				var that = this;
				var data = that.id;
				that.$api.refund(data).then(res => {
                    that.proDes = res.data;
				})
			},
			// 获取退款原因列表
			refundReasonList(){
				var that = this;
				var data = {
					oid:that.$router.app.__proto__.$oid,
				}
				that.$api.refundreason(data).then(res => {
					if(res.code == 1){
						that.reasonList = res.data;
					}
				})
			},
			// 提交退款信息按钮
			submit(){
				var that = this;
				if(that.reason == ''){
					that.$vux.toast.text('请选择退款原因！','middle');
				}
				else{
					that.$vux.loading.show({
						text:'提交申请中',
					})
					var data = that.id +'?proof_cause=' + that.reason + '&proof_img=' + that.detailImg + '&proof_content=' + that.message;
					that.$api.refundDes(data).then(res => {
						if(res.code == 1){
							that.$vux.toast.text('申请成功！','middle');
							that.$vux.loading.hide();
							setTimeout(() => {
								that.$router.replace({name: 'refundList'});
							},2000)
						}
					})
				}
			}
		},
		created(){
			var that = this;
			// 获取路由信息
			that.getParams();
			// 获取商品详情
			that.getProDes();
			// 获取退款原因列表
			that.refundReasonList();
		}
	}
</script>

<style lang="less" scoped>
	.refund{
		min-height: calc(100vh - 0.88rem);
		.proDes{
			.proInfo{
				padding:0.3rem 0.3rem 0.4rem 0.3rem;
				.leftCont{
					width:30%;
					img{
						width:1.68rem;
						height:1.68rem;
					}
				}
				.rightCont{
					width:70%;
				}
			}
			.totalPrice{
				.price{
					font-family: 'PingFang-Medium';
				}
				.disPrice{
					font-family: 'PingFang-Medium';
					padding:0.05rem 0.1rem;
					background:#E3F8F9;
				}
			}
		}
		.reason{
			.rightCont{
				img{
					width:0.16rem;
					height:0.3rem;
				}
			}
		}
		.describe{
			padding:0 0.3rem 0.3rem 0.3rem;
			.userAdviceBox{
				width:100%;
				height:1.8rem;
				box-sizing: border-box;
			}
		}
		.uploadImg{
			padding:0 0.3rem 0.2rem 0.3rem;
			.list{
				.list-item{
					width:1.3rem;
					height:1.3rem;
					border:0.01rem dashed #ccc;
					img{
						width:100%;
						height:100%;
					}
					.delete{
						position: absolute;
						top: -0.12rem;
						right: -0.12rem;
						width: 0.24rem;
						height: 0.24rem;
					}
				}
				.addImg{
					width:1.3rem;
					height:1.3rem;
					border:0.01rem dashed #ccc;
					.upload_img{
						width:0.42rem;
						height:0.32rem;
					}
					
				}
				#uploadImg{
					position:absolute;
					display:none;
				}
			}
		}
		.reasonBox{
			position:fixed;
			width:100%;
			// height:50%;
			bottom:0;
			.title{
				img{
					margin-top:0.36rem;
					width:0.28rem;
					height:0.28rem;
				}
			}
		}
	}
</style>