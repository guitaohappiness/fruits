<template>
    <div class="chat"
         id="chat">
        <x-header :left-options="{backText: ''}">{{storeName}}客服:{{ownerName}}</x-header>
        <img id="defaultImg"
             class="block bd-rd50"
             src="@/assets/images/user/default.png"
             alt="" />
        <!--聊天部分 start-->
        <div class="chat-pane">
            <div class="chat-pane-body pd-lr30">
                <div class="barrage"
                     id="barrage">
                    <PullToRefresh :down="1"
                                   :up="1"
                                   :pulldownOffset="60"
                                   :pullupOffset="60"
                                   :addNew="addNew"
                                   ref="scroll">
                        <ul class="chat-sms-list"
                            id="video_sms_list"
                            @click="closeinfo()"></ul>
                    </PullToRefresh>
                </div>
            </div>
        </div>
        <!--聊天部分 end-->

        <!-- 底部发送消息布局开始 -->
        <div class="send-footer bg-fff placeholder-b6b6b6">
            <div class="send-top pd-tp25 pd-bt25 pd-lt20 pd-rt20 width-full flex flex-vc flex-hc relative">
                <div class="left-form">
                    <form @submit.prevent="submit"
                          action="#">
                        <group>
                            <x-textarea name="chat"
                                        id="send_msg_text"
                                        :autosize="true"
                                        :rows="1"
                                        v-model="chatMsg"
                                        @keyup.enter.native="onSendTxMsg()"></x-textarea>
                        </group>
                        <!--<x-button class="formSend" action-type="submit">发送</x-button>-->
                    </form>
                </div>
                <!-- <div class="btn-send text-center mg-lt25  color-fff ft-24 bd-rd4 btn-send" @click="onSendTxMsg()">发送</div> -->
                <img class="emotion mg-lt15"
                     v-show="chatMsg == ''"
                     src="../../assets/mix-icon/add-face.png"
                     @click="showEmotion()">
                <img class="add mg-lt15"
                     v-show="chatMsg == ''"
                     src="../../assets/mix-icon/add-black.png"
                     @click="showCustominfo()">
                <p style="border:1px solid #999;"
                   v-show="chatMsg != ''"
                   class="ft-24 emotionSd text-center bd-rd20"
                   @click="onSendTxMsg()">发送</p>
                <div class="emotionCard">
                    <div class="video-discuss-emotion"
                         id="video-discuss-emotion"
                         style="display: none">
                        <div class="video-emotion-pane scrollHeight1">
                            <ul id="emotionUL">
                            </ul>
                        </div>
                        <!--<div class="emotionSd ft-24">
                            <p style="border-width:1px" @click="onSendTxMsg()">发送</p>
                            <span class="ft-24" style="border-width:1px" @click="onSendTxMsg()">发送</span> 
                        </div>-->
                    </div>
                </div>
            </div>
            <div class="send-bottom bd-tp-eee pd-tp25 pd-bt25 pd-lt30 pd-rt30 flex flex-vc flex-hs"
                 style="display: none">
                <input type="file"
                       accept="image/*"
                       name="img"
                       id="img"
                       @change="sendImage($event)">
                <label class="upImg color-333 ft-28"
                       for="img">
                    <img src="../../assets/mix-icon/upload03.png"
                         id="upd_pic">
                </label>
                <!--上传视频待更新-->
                <!--<input type="file" accept="video/*" id="video" name="video" @change="uploadVideoFile($event)">-->
                <!--<label class="upVideo mg-lt50 color-333 ft-28" for="video">-->
                <!--<img src="../assets/mix-icon/uploadV03.png">-->
                <!--</label>-->
            </div>
        </div>
        <!-- 底部发送消息布局结束 -->
    </div>
</template>

<script>
//用户端显示联系客服
import {
    loginWebIm,
    onSendMsg,
    getPrePageC2CHistoryMsgs,
    setSendUser,
    setToUser,
    initEmotionUL,
    showEmotionDialog,
    showCustomDialog,
    sendMsgToImage,
    initUnreadMsgCount,
    initRecentContactList,
    getLastC2CHistoryMsgs,
    hideDiscussSendBottom
} from "../../unit/webim_common.js";

//导入下拉刷新消息组件需要的组件
import PullToRefresh from '@/components/pullToRefresh/index.vue'

export default {
    name: '',
    data () {
        return {
            serviceName: '小桃',//客服名字
            uid: '',//用户ID   
            sid: '',//客服ID
            adsList: [],//AddressList
            way: '',//AddressWay
            chatMsg: "",//聊天消息
            records: [],//所有vue组件都没有用到的无关数组
            to_uid: '',//对应uid的客服名字
            identifier: '',//获取发送者标识信息
            identifierNick: '',//获取发送者昵称
            userSig: '',//用户签名
            avatar: '',//头像
            nickname: '',//昵称
            storeName: '',//商店名
            ownerId: '',//商店所有者id
            ownerAvatar: '',//商店所有者头像
            ownerName: '',//商店所有者名字
            ownerSign: '',//商店所有者签名
            openInfo: false,//是否打开图片发送框
            openEmo: false,//是否打开表情框
        }
    },
    mounted () {
        var that = this;
        initEmotionUL(that); //初始化表情
        //获取用户信息
        this.getUser()
        //this.inIt(); //初始化
        //this.getMore()
    },
    methods: {
        //获取用户信息
        getUser () {
            var that = this;
            that.uid = window.localStorage.getItem("uid")
            if (!that.uid) {
                that.showLogin = true
            }
            else {
                var params = that.uid
                that.$apily.user(params).then(res => {
                    that.avatar = res.data.avatar
                    if (!that.avatar) {
                        var i = document.getElementById("defaultImg").src
                        that.avatar = i
                    }
                    that.nickname = res.data.nickname
                })
                var params1 = { uid: that.uid }
                that.$apily.txwebim(params1).then(res => {
                    console.log(res)
                    that.userSig = res.data.userSig
                    //获取门店详情
                    that.getDetail()
                })
            }
        },
        //获取门店详情
        getDetail () {
            var that = this;
            if (that.$route.params.id) {
                that.to_uid = that.$route.params.id;
                var params = that.to_uid
            }
            else {
                var params = window.localStorage.getItem("clickId")
            }
            that.$apily.store2(params).then(res => {
                if (res.code == 1) {
                    that.storeName = res.data.name
                    that.ownerId = res.data.shoper_id
                    that.ownerSign = res.data.sign
                    if (res.data.shoper_avatar) { that.ownerAvatar = res.data.shoper_avatar }
                    else {
                        var i = document.getElementById("defaultImg").src
                        that.ownerAvatar = i
                    }
                    that.ownerName = res.data.shoper_realname
                    that.inIt()
                }
            })
        },
        //关闭图片框
        closeinfo () {
            console.log('关闭')
            hideDiscussSendBottom()
            if (this.openInfo == true || this.openEmo == true) {
                this.openInfo = false
                this.openEmo = false
            }
        },
        // 初始化数据
        inIt () {
            let that = this;

            console.log(that.to_uid);
            console.log("客服ID");
            that.header = '客服:' + that.to_uid;
            that.loginTxWebim();  //登录
            that.myMessages()
        },
        //获取更多消息
        addNew () {
            console.log("addNew+addNew");
            return new Promise(resolve => {
                //获取历史消息
                this.getMore();
                resolve()
            })
        },
        //获取历史消息
        getMore () {
            var that = this
            let chatHeight = $("#video_sms_list").outerHeight();
            console.log("高度：", chatHeight);
            // getPrePageC2CHistoryMsgs("kissneckAdmin",chatHeight);
            getPrePageC2CHistoryMsgs('shopuser_' + JSON.stringify(that.ownerId), chatHeight);
        },
        //登录腾讯云通信方法
        loginTxWebim () {
            let that = this;
            //通过后台接口获取到云通信账号信息
            let sendUserInfo = {
                'identifier': that.uid,
                'identifierNick': that.nickname,
                'headurl': that.avatar,
                'userSig': that.userSig,
            };
            //通过接口信息获取要发送给哪个用户信息
            let toUserInfo = {
                'identifier': 'shopuser_' + JSON.stringify(that.ownerId),
                'identifierNick': that.ownerName,
                'headurl': that.ownerAvatar,
                'userSig': that.ownerSign,
            };
            setToUser(toUserInfo);
            setSendUser(sendUserInfo);
            loginWebIm();
        },
        // 发送消息按钮
        submit () {
            //发送IM消息
            that.onSendTxMsg()
        },
        //发送IM消息
        onSendTxMsg () {
            let that = this;
            let msg = $("#send_msg_text textarea").val(); //发送信息内容
            console.log("消息内容", msg);
            if (msg === "" || msg == null) {
                alert("发送消息不能为空...");
            }
            console.log(msg);
            console.log("发送一条消息！");
            onSendMsg(msg);
            that.chatMsg = '';
        },
        //回车键发送消息
        sendMsg (e) {
            let that = this;
            var e = event || window.event;
            if (e && e.keycode == 13) {
                //发送IM消息
                that.onSendTxMsg()
            }
        },
        // 打开表情
        showEmotion () {
            // console.log("表情合打开");
            showEmotionDialog();
            var o = this.openEmo
            this.openEmo = !o
            console.log(this.openEmo)
        },
        // 打开图片发送和视频发送框
        showCustominfo () {
            // console.log("文件发送合打开");
            showCustomDialog();
            var o = this.openInfo
            this.openInfo = !o
            console.log(this.openInfo)
        },
        //发送图片消息
        sendImage (event) {
            let that = this;
            let file = event.target.files[0];
            let size = file.size;
            let maxsize = 5 * 1024 * 1024;//2M
            // console.log(size);
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(event.target.value)) {
                that.$vux.toast.text('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种', 'middle');
                return false
            }
            if (size > maxsize) {
                that.$vux.toast.text('单张图片不能大于2M', 'middle');
                return false
            }
            sendMsgToImage(file);
        },
        //消息未读数
        myMessages () {
            initRecentContactList()
        }
    },
    components: {
        'PullToRefresh': PullToRefresh
    },
}
</script>

<!--<style scoped src="../../assets/css/chat.css">-->
<style scoped>
.pd-lr30 {
    padding: 0 0.3rem;
}
.relative {
    position: relative;
}
.bg-f4f4f4 {
    background-color: #f4f4f4; /* 浅灰色 */
}
#defaultImg {
    display: none;
}
.chat-sms-list {
    padding: 0.1rem 0.1rem 0.2rem;
    background-color: #f4f4f4;
}
/* .chat-sms-list2{
        padding: 0.1rem 0.1rem;
        margin-top: -7rem;
        background-color: #f4f4f4;
    } */
.chat {
    min-height: calc(100vh - 0.88rem);
}
.chat .send-footer textarea {
    padding: 0 !important;
    line-height: 0.3rem;
    max-height: 0.9rem;
    font-size: 0.26rem;
}
.send-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
}
.send-footer .send-top {
    align-items: center;
}

.send-footer .left-form {
    width: 80%;
    /*height: 0.67rem;*/
}

.left-form .formSend {
    display: none;
}

.send-footer input,
.send-footer textarea {
    border: 1px solid #cccccc;
    min-height: 0.67rem;
    line-height: 0.5rem;
    padding: 0 0.2rem;
}

img.add,
img.emotion {
    width: 0.55rem;
    height: 0.55rem;
}

.btn-send {
    display: block;
    width: 0.7rem;
    height: 0.45rem;
    line-height: 0.45rem;
    background: #ccc;
}

.send-bottom input {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    z-index: -1;
    opacity: 0;
}

.send-bottom img {
    width: 0.8rem;
    height: 0.8rem;
}

.video-sms-text img {
    width: 0.2rem;
}

.barrage {
    z-index: 101;
    height: calc(100vh - 1.5rem);
    position: relative;
    padding-top: 0.6rem;
    padding-bottom: 1.5rem;
    overflow-y: scroll;
}
/* .barrage2 {
        z-index: 101;
        height: calc(100vh - 4rem);
        position: relative;
        padding-top: 0.6rem;
        padding-bottom: 1.5rem;
        overflow-y: scroll;
    }
    .barrage2 {
        z-index: 101;
        height: calc(100vh - 5rem);
        position: relative;
        padding-top: 0.6rem;
        padding-bottom: 1.5rem;
        overflow-y: scroll;
    } */

.barrage ul {
    overflow-y: scroll;
}
.video-sms-time {
    width: 2rem;
    margin: auto;
    font-size: 0.2rem;
}
.getMore {
    width: 3rem;
    position: absolute;
    left: 50%;
    margin-left: -1.5rem;
    top: 0rem;
    height: 0.6rem;
    font-size: 0.32rem;
    line-height: 0.6rem;
    text-align: center;
    background: #fff;
    border-radius: 1.5rem;
}
.wrap-pull {
    top: 0 !important;
    background: #f4f4f4 !important;
}
.barrage {
    padding: 0 !important;
}
.chat-pane-body {
    padding: 0 !important;
}
.barrage {
    /* height: calc(100vh - 1.8rem)!important; */
}
/* .barrage ul{
        padding: 0.1rem 0.1rem
    } */
</style>
<style>
/*私聊部分样式*/
#video_sms_list li {
    margin-bottom: 0.4rem;
}

#video_sms_list .video-sms-pane {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 1rem;
}

#video_sms_list .video-sms-text {
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    border-radius: 5px;
    /* padding: 0.06rem 0.15rem; */
    padding: 0.2rem;
}

#video_sms_list .video-sms-text .message-inner {
    word-wrap: break-word;
    overflow: hidden;
}
/*图片放大*/
#message-img-boos {
    display: none;
}

#video_sms_list .video-sms-box {
    width: auto;
    max-width: calc(100% - 3rem);
    line-height: 0.4rem;
}

.chat #video_sms_list .video-sms-text img {
    margin-bottom: -0.12rem;
}

#video_sms_list .video-sms-text span {
    font-size: 0.24rem;
    color: #ffffff;
    line-height: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

#video_sms_list span.user-name-org {
    color: #ff7906;
}

#video_sms_list span.user-name-white {
    color: #ffffff;
}

#video_sms_list span {
    color: #333333 !important;
    font-size: 0.27rem;
}

#video_sms_list .infos-right .video-sms-bigbox {
    align-items: center;
    margin-top: 0.1rem;
    text-align: right;
    max-width: 50%;
}

#video_sms_list .infos-left .video-sms-bigbox {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 0.1rem;
}

.chat #video_sms_list .video-sms-user {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 100%;
}

.chat #video_sms_list .video-sms-pane {
    display: flex;
    align-items: center;
}
.chat #video_sms_list .infos-left .video-sms-pane {
    justify-content: flex-start;
}

.chat #video_sms_list .infos-right .video-sms-pane {
    justify-content: flex-end;
}

/* .chat #video_sms_list .infos-left .video-sms-box{
        /* margin-left: 1.1rem; 
    } */

.chat #video_sms_list .infos-left .video-sms-user {
    margin-right: 0.2rem;
}

.chat #video_sms_list .infos-left .video-sms-text {
    position: relative;
    /*background-color: rgba(178,43,40,0.6);*/
    background-color: #fff;
    border-radius: 0.1rem;
    margin-left: 0.1rem;
    font-size: 0.24rem;
    color: black;
}

.chat #video_sms_list .infos-left .video-sms-text:before {
    content: "";
    position: absolute;
    border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
    border-style: solid;
    /*border-color:transparent rgba(178,43,40,0.6) transparent transparent;*/
    border-color: transparent rgb(255, 255, 255) transparent transparent;
    left: -0.2rem;
    top: 50%;
    transform: translateY(-50%);
}

.chat .infos-left .userInfos {
    font-size: 0.24rem;
    text-align: left;
}

.chat #video_sms_list .infos-right .video-sms-user {
    margin-left: 0.2rem;
}
/* .chat #video_sms_list .infos-right .video-sms-box{
        /* margin-right: 1.1rem; 
    } */
.chat #video_sms_list .infos-right .video-sms-text {
    position: relative;
    background-color: #60ccce;
    border-radius: 0.1rem;
    font-size: 0.24rem;
    color: #fff;
}

.chat #video_sms_list .infos-right .video-sms-text:before {
    content: "";
    position: absolute;
    border-width: 0.1rem 0.1rem 0.1rem 0.1rem;
    border-style: solid;
    /*border-color:transparent transparent transparent rgba(178,43,40,0.6) ;*/
    border-color: transparent transparent transparent rgb(255, 255, 255);
    right: -0.2rem;
    top: 50%;
    transform: translateY(-50%);
}

.chat .infos-right .userInfos {
    font-size: 0.24rem;
    text-align: right;
}

.chat #video_sms_list .message-video-box {
    position: relative;
    display: block;
    background-color: rgba(0, 0, 0, 0.7);
}

.chat #video_sms_list .message-video-box .icon-play {
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-40%, -50%);
    z-index: 100;
}

.chat #video_sms_list .message-video-box img {
    display: block;
    object-fit: cover;
}

.chat #video_sms_list .message-video-box p {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #ffffff;
    line-height: 0.4rem;
    padding: 0rem 0.2rem;
}

/*   haidaozy  add */
#emotionUL {
}
#emotionUL li {
    width: 0.67rem;
    height: 0.67rem;
    float: left;
    font-size: 0.24rem;
    margin-top: 0.2rem;
    margin-right: 0.33rem;
}

#emotionUL li:nth-child(7n) {
    margin-right: 0;
}

#emotionUL li img {
    width: 0.47rem !important;
    height: 0.47rem;
}

.send-top .emotionCard {
    position: relative;
    padding: 0 0.2rem;
}

.video-discuss-emotion {
    height: 3rem;
    overflow-x: hidden;
    overflow-y: scroll;
}

.scrollHeight1 {
    min-height: calc(100vh - 1.6rem);
    max-height: calc(100vh);
    overflow-y: scroll;
    padding-bottom: 0.2rem;
}

.emotionSd {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    width: 15%;
    margin: auto;
    padding-top: 0.1rem;
    height: 0.6rem;
    background-color: #fff;
}

.video-discuss-emotion p {
    float: right;
    padding: 0.1rem 0.2rem;
    border: 0.1rem solid #999;
    border-radius: 0.1rem;
}

.chat .send-footer textarea {
    padding: 0;
    line-height: 0.3rem;
    max-height: 0.9rem;
    font-size: 0.26rem;
}

.chat .send-footer .weui-cells {
    border: 1px solid #cccccc;
    margin-top: 0;
    padding: 0.15rem 0.2rem;
}

.chat .send-footer .weui-cell {
    padding: 0;
}

.chat .max-img-box,
.chat .max-video-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 500;
}

.chat .max-img-box .bigImg,
.chat .max-video-box .bigVideo {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100vw;
    z-index: 501;
}

.chat .max-img-box .cancel,
.chat .max-video-box .cancel {
    color: #ffffff;
    position: fixed;
    bottom: 0.5rem;
    right: 0.3rem;
    z-index: 1000;
    width: 1.2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.3rem;
    text-align: center;
}

.video-sms-time {
    width: 2rem;
    margin: auto;
    font-size: 0.24rem;
    text-align: center;
    color: #999999;
}
.infos-right .chat-content {
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    justify-content: flex-end;
}
.infos-left .chat-content {
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    /* justify-content: flex-start */
}
</style>