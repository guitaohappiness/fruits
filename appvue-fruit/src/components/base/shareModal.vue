<template>
	<div class="shareModal">
		<div :class="isShareModal?'black_cover':''">
			<div class="footerBox bg-fff" v-if="isShareModal">
			<!--<div class="footerBox bg-fff" :class="isShareModal?'animate_1':'animate_2'">-->
				<div class="head flex flex-ac flex-jc pd-tp40">
					<span class="line bd-bt-eee"></span>
					<p class="ft-34 color-333 title mg-lt20 mg-rt20">分享到</p>
					<span class="line bd-bt-eee"></span>
				</div>
				<div class="content mg-tp50">
					<div class="list flex flex-ac flex-jc">
						<div class="list-item text-center" @click="wechatShare()">
							<img class="block" src="@/assets/images/group/shareWay1.png" alt="" />
							<p class="ft-28 color-333 mg-tp20">微信</p>
						</div>
						<div class="list-item text-center" @click="freiendsShare()">
							<img class="block" src="@/assets/images/group/shareWay2.png" alt="" />
							<p class="ft-28 color-333 mg-tp20">朋友圈</p>
						</div>
						<div class="list-item text-center" @click="qqShare()">
							<img class="block" src="@/assets/images/group/shareWay3.png" alt="" />
							<p class="ft-28 color-333 mg-tp20">QQ</p>
						</div>
						<div class="list-item text-center" @click="qqZoneShare()">
							<img class="block" src="@/assets/images/group/shareWay4.png" alt="" />
							<p class="ft-28 color-333 mg-tp20">空间</p>
						</div>
						<div class="list-item text-center" @click="drawPoster()">
							<img class="block" src="@/assets/images/group/shareWay5.png" alt="" />
							<p class="ft-28 color-333 mg-tp20">海报</p>
						</div>
					</div>
				</div>
				<div class="qxBtn color-fff bd-rd8 ft-32 text-center h90 line-h90" @click="qxShare">取消</div>
			</div>
		</div>
        <!-- 未登录的弹窗 -->
		<div transfer-dom>
	        <x-dialog v-model="showPoster" hide-on-blur>
	          	<div class="modalContent2">
                    <div class="imgList">
                        <img crossorigin="anonymous" id="shareBg" src="@/assets/images/common/postbg.png" alt="">
                        <img id="userPic" :src="avatar" alt="">
                        <img crossorigin="anonymous" id="userPic1" src="@/assets/images/user/head.png" alt="">
                        <img id="proPic" :src="proImg" alt="">
                        <img crossorigin="anonymous" id="share" src="@/assets/images/common/share.png" alt="">
                        <img crossorigin="anonymous" id="code" :src="myCode" alt="">
                        <!--<img id="canvasPic" :src="finalUrl" alt="">-->
                         <!-- <img :src="product" alt="">
                        <img :src="qrcode" alt=""> -->
                    </div>
	            	<canvas id="myCanvas" width="300" height="420"></canvas>
                    <!-- <a :href="finalUrl"><div class="savePic ft-28 text-center color-fff">保存图片</div></a> -->
                    <div class="savePic ft-28 text-center color-fff" @click="saveImage">保存图片</div>
	          	</div>
	        </x-dialog>
      	</div>
	</div>
</template>

<script>
import { request } from 'http';
	export default{
		name:'shareModal',
		data(){
			return{
                uid:'',
                sid:'',
                showPoster:false,
                showSelect:'',
                avatar:'',
                userPic:'',
                nickname:'',
                proDetails:'',
                proImg:'',
                proPic:'',
                fact_price:'',
                price:'',
                finalUrl:'',
                myCode:'',

			}
		},
		props:{
			isShareModal:{
				type:Boolean,
			},
			argInfos: {
      			type: Object,
            },
            proId:{
                
            },
            type:{

            }

		},
		methods:{
            //绘制海报
            drawImg(){
                var that = this;
                var c = document.getElementById('myCanvas')
                var ctx = c.getContext("2d")
                ctx.textAlign = "center"
                var bgPic = document.getElementById('shareBg')
                ctx.drawImage(bgPic,0,0,300,440)
                // var img = new Image()
                // img.crossOrigin = ''
                // img.onload = function(){
                //     ctx.drawImage(this,0,0,300,440)
                //     ctx.getImageData(0, 0, this.width, this.height);
                // }
                // img.src = that.avatar
                if(that.avatar){
                    var userPic = document.getElementById('userPic')
                }
                else{
                    var userPic = document.getElementById('userPic1')
                }
                that.drawCircular(ctx,45,45,125,100,userPic)
                ctx.font="0.21rem PingFang-Rrgular";
                ctx.fillStyle = '#999';
                ctx.fillText('¥'+that.price,100,310);
                //删除线
                
                ctx.moveTo(80,305);
                ctx.lineTo(120,305);
                ctx.stroke()
                ctx.fillStyle = '#333';
                if(!that.uid){
                	if(that.type == 1){
                    ctx.fillText("你的好友给你分享了特价商品！",150,165);
	                }else if(that.type == 2){
	                    ctx.fillText("你的好友喊你一起来拼团啦！",150,165);
	                }else{
	                    ctx.fillText("你的好友给你分享了热销商品！",150,165);
	                }
                }
                else{
                	if(that.type == 1){
                    ctx.fillText("你的好友" + that.nickname + '给你分享了特价商品！',150,165);
	                }else if(that.type == 2){
	                    ctx.fillText("你的好友"+that.nickname+'喊你一起来拼团啦！',150,165);
	                }else{
	                    ctx.fillText("你的好友"+that.nickname+'给你分享了热销商品！',150,165);
	                }
                }
                
                that.proPic = document.getElementById('proPic')
                that.drawCircular(ctx,80,80,108,180,that.proPic);
                if(that.proDetails.product_name.length > 18){
                	that.proDetails.product_name = that.proDetails.product_name.substr(0,18) + '...';
                }
                ctx.textAlign = "left"
                ctx.fillText(that.proDetails.product_name,60,280);
                
                //ctx.fillStyle = line-through
                var share = document.getElementById('share')
                ctx.drawImage(share,85,345,20,20)
                var code = document.getElementById('code')
                ctx.drawImage(code,120,330,60,60)
                ctx.textAlign = "center"
                ctx.fillText('扫码享更多优惠',150,410);
                ctx.fillStyle = '#FC5920';
                ctx.font="0.25rem PingFang-Rrgular";
                ctx.fillText('¥'+that.fact_price,50,310);
                //标签红色背景
                ctx.lineWidth=10;
                ctx.lineJoin="round";
                ctx.fillStyle = '#FC5920';
                ctx.fillRect(30,268,25,15);

                // ctx.fillStyle = '#FC5920';
                // ctx.fillRect(30,270,20,10);
                //标签
                ctx.font="0.16rem PingFang-Rrgular";
                ctx.fillStyle = '#FFF';
                if(that.type == 1){
                    ctx.fillText('特价',43,279);
                }else if(that.type == 2){
                    ctx.fillText(that.proDetails.quorum + '人团',43,279);
                }else{
                    ctx.fillText(that.proDetails.product_tag,43,279);
                }
                
                // ctx.beginPath();
                // ctx.moveTo(30,270);
                // ctx.lineTo(50,270);
                // ctx.lineTo(50,280);
                // ctx.lineTo(30,280);
                // ctx.closePath(); // draws last line of the triangle
                // ctx.fillRect(30,350,300,200)
                // ctx.stroke();
				/*var param = new FormData();
				param.append("avatar", that.finalUrl); 
				let config = {
					headers: {'Content-Type': 'multipart/form-data'}
				}
                that.$apily.addimage(param,config).then(res => {
					console.log(res)
					that.finalUrl = res.data;
				})*/
                // console.log("画布内容");
            },
            //處理為圓形
            drawCircular(ctx,width, height, x, y, url) {
                var avatarurl_width = width;
                var avatarurl_heigth = height;
                var avatarurl_x = x;
                var avatarurl_y = y;
                ctx.save();
                ctx.beginPath();
                ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
                ctx.clip();
                ctx.drawImage(url, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
                ctx.restore();
            },
            //保存本地
            saveImage(){
            	var that = this;
	            console.log(window.canvas2ImagePlugin);
	            window.canvas2ImagePlugin.saveImageDataToLibrary(
	            	function(msg){
	            		that.showPoster = false;
	            		that.$vux.toast.text('已保存到相册', 'middle');
	            		console.log(msg)
	            	},
		            function (err) {
			            console.log(err);
			            //that.showPoster = false;
			            //that.$vux.toast.text('下载失败', 'middle');
			        },
			        document.getElementById('myCanvas')
		        );
            },
            //获取用户信息
            getUser(){
                var that = this;
                var userPic = document.getElementById('userPic')
                that.uid = window.localStorage.getItem("uid")
                that.sid = window.localStorage.getItem("clickId")
                var params =  that.uid 
                that.$apily.user(params).then(res =>{
                    that.avatar = res.data.avatar
                    that.nickname = res.data.nickname
                    //通过接口生成base64图片
                    that.$api.base64({action:'base64',attr:(that.avatar)}).then(res =>{
                        if(res.code === 1){
                            that.avatar = res.data;
                        }
                    });
                })
            },
            //获取商品详情
            getGood(){
                var that = this;
                console.log(that.type)
                if(that.type==1){
                    that.getProductDes()
                }
                else if(that.type==2){
                    that.getgroupDes()
                }
                else{
                    var params = that.proId
                    that.$apily.products2(params).then(res =>{
                        if(res.code == 1){
                            that.proDetails = res.data;
                            //that.proImg = (res.data.product_images)[0];
                            that.fact_price = res.data.product_fact_price;
                            that.price = res.data.product_price;
                            //通过接口生成base64图片
                            that.$api.base64({action:'base64',attr:(res.data.product_images)[0]}).then(res =>{
                                if(res.code === 1){
                                    that.proImg = res.data;
                                }
                            });
                        }
                    })
                }
            },
            //获取特价商品详情
            getProductDes(){
				var that = this;
				var data = that.proId + '?sid=' + window.localStorage.getItem('clickId');
				that.$api.specialDes(data).then(res => {
					if(res.code == 1){
                        that.proDetails = res.data
                        that.proImg = (res.data.product_images)[0]
                        that.fact_price = res.data.present_price
                        that.price = res.data.original_price
                        //通过接口生成base64图片
                        that.$api.base64({action:'base64',attr:(that.proImg)}).then(res =>{
                            if(res.code === 1){
                                that.proImg = res.data;
                            }
                        });
                    }
				})
            },
            //获取拼团详细
            getgroupDes(){
				var that = this;
				if(that.uid){
					var data = that.proId + '?sid=' + that.sid + '&uid=' + that.uid;
				}
				else{
					var data = that.proId + '?sid=' + that.sid;
				}
				that.$api.groupbuyDes(data).then(res => {
					if(res.code == 1){
						that.proDetails = res.data;
						that.proImg = (res.data.product_images)[0]
                        that.fact_price = res.data.present_price
                        that.price = res.data.original_price
                        //通过接口生成base64图片
                        that.$api.base64({action:'base64',attr:(that.proImg)}).then(res =>{
                            if(res.code === 1){
                                that.proImg = res.data;
                            }
                        });
					}
				})
            },
            //获取商品二维码
            getCode(){
                var that = this
                var params1 = {
                    uid:that.uid
                }
                if(that.type==1){
                    var params2 = {
                        param:JSON.stringify(params1),
                        type:1,
                        weburl: that.__proto__.__proto__.baseUrl +'/#/specialDes/' + that.proId + '?',
                    }
                }
                else if(that.type==2){
                    var params2 = {
                        param:JSON.stringify(params1),
                        type:1,
                        weburl:that.__proto__.__proto__.baseUrl + '/#/groupDetails/' + that.proId + '/'  + that.sid + '?',
                    }
                }
                else{
                    var params2 = {
                        param:JSON.stringify(params1),
                        type:1,
                        weburl:that.__proto__.__proto__.baseUrl + '/#/proDetails/' + that.proId + '?',
                    }
                }
                that.$apily.qrcode(params2).then(res =>{
                    if(res.code == 1){
                        let c = res.data
                        that.myCode = res.data;
                        //通过接口生成base64图片
                        that.$api.base64({action:'base64',attr:(c)}).then(res =>{
                            if(res.code === 1){
                                console.log(res)
                                that.myCode = res.data;
                            }
                        });
                    }
                })
            },
			qxShare(){
				var that = this;
				that.$emit('qxShareModal',that.isShareModal);
			},
			//微信分享
		    wechatShare() {
		    	var that = this;
		    	that.$vux.loading.show({
		    		text:'加载中',
		    	})
		      	console.log("转发微信开始");
		      	console.log(that.argInfos);
			    Wechat.share(
			        {
			          	message: {
			            	title: that.argInfos.name,
			            	description: that.argInfos.description,
			            	mediaTagName: "测试分享",
			            	thumb:that.argInfos.thumb,
			            	media: {
			              		type: Wechat.Type.WEBPAGE, // webpage
			              		webpageUrl: that.argInfos.url // webpage
			            	}
			          	},
			          	scene: Wechat.Scene.SESSION // share to Timeline
			        },
			        function() {
			          	console.log("Success");
			          	that.$vux.loading.hide();
			        },
			        function(reason) {
			          	console.log("Failed: " + reason);
			          	that.$vux.loading.hide();
			        }
			    );
			},
			//朋友圈分享
		    freiendsShare() {
		      	console.log("转发朋友圈开始");
		      	var that = this;
		      	that.$vux.loading.show({
		    		text:'加载中',
		    	})
		     	console.log(that.argInfos);
			    Wechat.share(
			        {
			          	message: {
			            	title: that.argInfos.name,
			            	description: that.argInfos.description,
			            	mediaTagName: "测试分享",
			            	thumb:that.argInfos.thumb,
			            	media: {
			              		type: Wechat.Type.WEBPAGE, // webpage
			              		webpageUrl: that.argInfos.url // webpage
			            	}
			          	},
			          	scene: Wechat.Scene.TIMELINE // share to Timeline
			        },
			        function() {
			          // alert("Success");
			          that.$vux.loading.hide();
			        },
			        function(reason) {
			          // alert("Failed: " + reason);
			          that.$vux.loading.hide();
			        }
			    );
		    },
		    //qq分享
		    qqShare() {
		      	console.log("转发QQ开始");
		      	var that = this;
		      	that.$vux.loading.show({
		    		text:'加载中',
		    	})
		      	var args = {};
		      	args.client = QQSDK.ClientType.QQ; //QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
		      	args.scene = QQSDK.Scene.QQ; //QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
		      	args.url = that.argInfos.url;
		      	args.title = that.argInfos.name;
		      	args.description = that.argInfos.description;
		     	args.image = that.argInfos.thumb;
			    QQSDK.shareNews(
			        function() {
			          // alert("shareNews success");
			          //分享次数
			          // that.addLnum();
			          that.$vux.loading.hide();
			        },
			        function(failReason) {
			          // alert(failReason);
			          that.$vux.loading.hide();
			        },
			        args
			    );
		    },
		    //qq空间分享
		    qqZoneShare() {
		      	console.log("转发qq空间开始");
		      	var that = this;
		      	that.$vux.loading.show({
		    		text:'加载中',
		    	})
		      	var args = {};
		      	args.scene = QQSDK.Scene.QQZone; //QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
		      	args.url = that.argInfos.url;
		      	args.title = that.argInfos.name;
		      	args.description = that.argInfos.description;
		      	args.image = that.argInfos.thumb; //if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
		      	QQSDK.shareNews(
			        function() {
			          console.log("11");
			          // alert("share success");
			          //分享次数
			          // that.addLnum();
			          that.$vux.loading.hide();
			        },
			        function(failReason) {
			          console.log("000");
			          // alert(failReason);
			          that.$vux.loading.hide();
			        },
		        	args
		      	);
		    },
		    drawPoster(){
		    	var that = this;
		    	that.$vux.loading.show({
		    		text:'正在生成...'
                })
                // var params = new FormData();
                // params.append("shareimg",'');
                // that.$apily.share(params).then(res =>{
                // })
		    	setTimeout(() => {
                    that.$vux.loading.hide();
                    that.showPoster = true;
                    that.$emit('post',that.isShareModal);
                    that.drawImg()
//		    		that.$router.push({name:'index'})
		    	},500)
            },
            
        },
        mounted(){
            var that = this;
            var userPic = document.getElementById('userPic');
            userPic.crossOrigin = "Anonymous";
            that.getUser();
            setTimeout(() => {
                that.getGood()
                that.getCode()
            }, 1000);
            
        }
	}
</script>

<style lang="less" scoped>
	.footerBox{
		position:fixed;
		bottom:0rem;
		width:100%;
		height:4.7rem;
		/*margin-bottom:-6rem;*/
		z-index: 999;
		/*transition:all 3s;*/
		overflow-y: scroll;
   	 	padding-bottom: 0.3rem;
	}
	.footerBox .head .title{
		font-family: 'PingFang-Medium';
	}
	.footerBox .head .line{
		width:2.27rem;
		height:0.02rem;
	}
	.footerBox .content .list-item{
		width:20%;
	}
	.footerBox .content .list-item img{
		margin-left:calc(50% - 0.4rem);
		width:0.8rem;
		height:0.8rem;
	}
	.qxBtn{
		margin-left:3%;
		width:94%;
		background:#fdb05d;
		margin-top:0.6rem;
		font-family: 'PingFang-Medium';
	}
    .modalContent2{
            //background-color: #1ccfcf;
            position: relative;
			width:100%;
            height: 9.2rem;
            background-color: rgb(204, 252, 252);
            .imgList{
                display: none
            }
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
            .savePic{
                position: absolute;
                bottom: -0.02rem;
                width: 100%;
                padding: 0.3rem;
                background-color: #1ccfcf
            }
    }
    // canvas{
    //     // width: 100%;
    //     // height: 6rem;
    //     // background:url('../../assets/images/common/postbg.png');
    //     // background-size: 100%;
    //     // img{
            
    //     // }
    // }
	/*.footerBox.animate_1{
		transition:all 1s;
		margin-bottom:0rem;
	}
	.footerBox.animate_2{
		transition:all 1s;
		margin-bottom:-6rem;
	}*/
</style>