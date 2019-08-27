<template>
    <div class="memberCharge bg-fff">
        <x-header :left-options="{backText: ''}">vip会员</x-header>
        <div class="memberBgBox flex flex-ac">
            <div class="flex flex-ac contentBox mg-tp20">
                <div class="headBox">
                    <img v-if="memberList.avatar"
                         class="block bd-rd50"
                         :src="memberList.avatar"
                         alt="" />
                    <img v-else
                         class="block bd-rd50"
                         src="@/assets/images/user/default.png"
                         alt="" />
                </div>
                <div class="memberUser mg-tp20">
                    <p class="uname">{{memberList.nickname}}</p>
                    <p class="ft-28 date mg-tp10 one-line-ellipsis"
                       v-if="memberList.level">{{memberList.member_end_time}}到期</p>
                    <p class="ft-28 date mg-tp10 one-line-ellipsis"
                       v-else>{{memberList.title}}</p>
                    <div class="mg-tp20">
                        <router-link :to="{name:'memberRecord'}"
                                     class="flex flex-ac record">
                            <img class="block mg-rt10"
                                 src="@/assets/images/user/prompt-golden.png"
                                 alt="" />
                            <p class="ft-28">会员购买记录</p>
                        </router-link>
                    </div>
                </div>
                <div class="memberLv flex flex-je">
                    <div v-if="memberList.level">
                        <img class="block"
                             :src="memberList.img"
                             alt="" />
                        <p class="text ft-24 mg-tp10">{{memberList.title}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="memberType bg-fff pd-tp30">
            <div class="pd-lr30">
                <p class="title ft-32 color-333 bold pd-lt10">选择会员类型</p>
            </div>
            <div class="memberList mg-tp20">
                <div class="list pd-lr30 flex"
                     :style="{width:wLenth}">
                    <div class="list-item bd-rd8 mg-rt15"
                         :class="curIndex == index ? 'activeBg' : ''"
                         v-for="(item,index) in memberList.vip_list"
                         @click="buyMemberType(index,item.id)">
                        <div class="header flex flex-ac pd-lt10">
                            <img v-if="item.current_price"
                                 class="block"
                                 src="@/assets/images/user/members-label.png"
                                 alt="" />
                            <p class="ft-28 color-333 mg-lt45"
                               :class="item.current_price ? '' : 'pd-lt25 mg-lt45'">{{item.title}}</p>
                        </div>
                        <p class="ft-28 color-333 text-center">{{item.time}}个月</p>
                        <div class="price ft-34 mg-tp20 text-center"
                             v-if="item.current_price">
                            <span class="color-fc5920 mg-rt5">￥{{item.current_price}}</span>
                            <span class="ft-20 color-333 line-through">￥{{item.original_price}}</span>
                        </div>
                        <div class="price ft-34 mg-tp20 text-center"
                             v-else>
                            <span class="color-fc5920">￥{{item.original_price}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buyBtn flex flex-ac flex-jc">
                <button class="color-333 ft-32"
                        @click="payMentBtn">立即购买</button>
            </div>
        </div>
        <div class="btbt20"></div>
        <div class="privilege pd-bt50">
            <div class="headBox flex">
                <p class="title ft-32 color-333 bold pd-lt10 text-left">会员权益</p>
                <div class="explain ft-26 color-333 bold pd-lt10 flex flex-je">
                    <router-link class="flex flex-ac"
                                 :to="{name:'memberExplain'}">
                        <p class="mg-rt10">会员说明</p>
                        <img class="block"
                             src="@/assets/images/user/prompt-golden.png"
                             alt="" />
                    </router-link>
                </div>
            </div>
            <div class="tabListBox bd-rd10">
                <div class="tabList flex">
                    <div class="list-item ft-28 color-999 bg-f4f4f4 h80 line-h80 text-center"
                         :class="curIndex2 == index ? 'activeBg2' : ''"
                         v-for="(item,index) in tabList"
                         @click="tabFun(index,item.level)">{{item.name}}</div>
                </div>
                <div class="privilegeList flex pd-bt50">
                    <div class="list-item pd-tp40"
                         v-for="(item,index) in privilegeList">
                        <img class="block"
                             :src="item.vip_img"
                             alt="" />
                        <p class="ft-26 color-666 text-center mg-tp10">{{item.discount_title}}</p>
                    </div>
                </div>
                <div class="monthGift pd-lr30">
                    <p class="ft-28 color-333 title text-center">>>>>>每月大礼包<<<<<</p> <div
                               class="monthGiftList mg-tp30 pd-bt35 flex flex-ac">
                            <div class="list-item mg-tp20"
                                 :class="item.status != 1 ? '' : 'activeBg3'"
                                 v-for="(item,index) in monthGiftList">
                                <div class="content ft-20 flex flex-ac">
                                    <div class="leftCont color-fff pd-lt10">
                                        <div class="price">
                                            <span class="ft-26 bold inline-block">￥</span>
                                            <span class="price2 inline-block">{{item.coupon_price}}</span>
                                        </div>
                                        <p class="ft-20">满{{item.coupon_condition}}元使用</p>
                                    </div>
                                    <div class="rightCont flex flex-ac flex-jc">
                                        <button class="ft-26 color-999 bold"
                                                :disabled="item.status != 1 ? true : false"
                                                :class="item.status != 1 ? '' : 'activeBg3'"
                                                @click="getCoupons(item.id)">立即领取</button>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
        </div>
    </div>
    <!--支付方式-->
    <div class="black_cover"
         v-if="isCloseModal2"
         @click="closeModal">
        <div class="payList bg-fff">
            <div class="clearfix head h100 line-h100 pd-lr30 bd-bt-f4f4f4 relative">
                <p class="pull-left ft-28 color-333">选择支付方式</p>
                <img class="block pull-right absolute"
                     @click.stop="closeModal"
                     src="@/assets/images/common/closeModal.png"
                     alt="" />
            </div>
            <div class="list pd-lr30">
                <div class="list-item bd-bt-f4f4f4 pd-tb30 clearfix"
                     v-for="(item,index) in payList"
                     @click.stop="choosePay(index)">
                    <div class="leftCont flex flex-ac pull-left">
                        <img class="block mg-rt20"
                             :src="item.img"
                             alt="" />
                        <p class="ft-28 color-333">{{item.name}}</p>
                    </div>
                    <div class="rightCont pull-right"
                         v-if="curIndex3 == index">
                        <img class="block"
                             src="@/assets/images/index/payWay.png"
                             alt="" />
                    </div>
                </div>
            </div>
            <div class="h100 line-h100 ft-32">
                <button class="h100 line-h100 payment bg-1ccfcf text-center color-fff width-full"
                        :disabled="disabled"
                        @click.stop="payment(curIndex3)">去支付</button>
            </div>
        </div>
    </div>
    <!--钱包支付-->
    <div class="black_cover"
         v-if="isShowModal">
        <div class="payList bg-fff">
            <div class="clearfix head h100 line-h100 pd-lr30 bd-bt-f4f4f4 relative">
                <p class="pull-left ft-32 color-333 text-center width-full">请输入支付密码</p>
                <img class="block pull-right absolute"
                     @click.stop="closeModal2"
                     src="@/assets/images/common/closeModal.png"
                     alt="" />
            </div>
            <div class="list2 pd-lr30">
                <p class="pd-tb30 ft-28 color-333 text-center">{{payInfo.name}}</p>
                <p class="color-333 bold price text-center">￥{{payInfo.price}}</p>
                <div class="passwordBox bd-bt-eee">
                    <div class="h60 line-h60 flex flex-ac">
                        <div class="leftCont color-333 ft-32">密码</div>
                        <div class="rightCont flex flex-ac">
                            <input type="password"
                                   v-model="password"
                                   maxlength="16"
                                   class="ft-36" />
                        </div>
                    </div>
                </div>
                <button class="h80 line-h80 payment bg-1ccfcf text-center ft-32 color-fff block bd-rd8"
                        :disabled="disabled"
                        @click.stop="payment2()">立即支付</button>
                <p class="mg-tp30 color-666 ft-28 text-center pd-bt40">支付密码为手机号登录密码</p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'memberCharge',//VIP会员页面
    data () {
        return {
            memberList: [],//会员信息
            wLenth: '100%',//选择会员类型卡片的宽度
            curIndex: 'hide',//会员类型当前激活信息
            curIndex2: 0,//会员权益下面的会员类型TAB栏当前激活信息
            curIndex3: 0,//支付方式TAB栏激活信息
            isCloseModal2: false,//钱包支付框显示
            isShowModal: false,//支付框显示
            disabled: false,//各种支付方式的默认激活状态
            tabList: [],//各会员权益栏的TAB对象
            payInfo: {},//存放支付宝支付的返回数据
            password: '',//钱包支付秘钥
            privilegeList: [],//会员权益
            monthGiftList: [],//每月大礼包
            payList: [//支付方法
                { name: '微信', img: require('@/assets/images/index/wx.png') },
                { name: '支付宝', img: require('@/assets/images/index/zfb.png') },
                { name: '钱包', img: require('@/assets/images/index/wallet-icon.png') },
            ],
        }
    },
    methods: {
        //存放用户想购买会员的类型
        buyMemberType (index, id) {
            var that = this;
            if (that.curIndex == index) {
                that.curIndex = 'hide';
            }
            else {
                that.curIndex = index;
                that.id = id;
            }
        },
        //立即购买按钮，调出购买框
        payMentBtn () {
            var that = this;
            if (that.curIndex != 'hide') {
                that.isCloseModal2 = true;
            }
            else {
                that.$vux.toast.text('请选择会员类型', 'middle');
            }
        },
        //会员权益TAB栏点击切换时间
        tabFun (index, level) {
            var that = this;
            var data = {
                oid: that.oid,
                uid: that.uid,
                level: level,
            }
            that.$api.vipequity2(data).then(res => {
                console.log(res);
                if (res.code == 1) {
                    that.privilegeList = res.data.vip_equity_list;
                    that.monthGiftList = res.data.coupon_list;
                    setTimeout(() => {
                        that.$vux.loading.hide();
                    }, 500)
                }
            })
            that.curIndex2 = index;
            that.level = level;
        },
        //领取优惠券
        getCoupons (id) {
            var that = this;
            console.log(id);
            that.$vux.loading.show({
                text: '加载中',
            })
            var data = new FormData();
            data.append('oid', that.oid);
            data.append('uid', that.uid);
            data.append('id', id);
            data.append('level', that.level);
            that.$api.vipequity3(data).then(res => {
                console.log(res);
                if (res.code == 1) {
                    that.$vux.loading.hide();
                    that.$vux.toast.text(res.msg, 'middle');
                    setTimeout(() => {
                        that.$vux.toast.hide();
                        that.getParams();
                    }, 500)
                }
                else if (res.code == 2) {
                    that.$vux.loading.hide();
                    that.$vux.toast.text(res.msg, 'middle');
                    setTimeout(() => {
                        that.$vux.toast.hide();
                        //that.getParams();
                    }, 500)
                }
                else {
                    that.$vux.loading.hide();
                    that.$vux.toast.text(res.msg, 'middle');
                    setTimeout(() => {
                        that.$vux.toast.hide();
                        //that.getParams();
                    }, 500)
                }
            })
        },
        //关闭支付框
        closeModal () {
            var that = this;
            that.isCloseModal2 = false;
            that.isShowModal = false;
        },
        //关闭钱包支付框
        closeModal2 () {
            var that = this;
            that.isShowModal = false;
        },
        //选择支付方式，存放参数
        choosePay (index) {
            var that = this;
            that.curIndex3 = index;
        },
        //根据上面的参数，来调用相应的支付方式
        payment (index) {
            var that = this;
            if (index == 0) {
                that.wePay();
            }
            else if (index == 1) {
                that.aliPay();
            }
            else {
                that.wallet();
            }
        },
        //调用微信支付
        wePay () {
            var that = this;
            that.disabled = true;
            that.$vux.loading.show({
                text: '加载中',
            })
            var data = new FormData();
            data.append('oid', that.oid);
            data.append('uid', that.uid);
            data.append('id', that.id);
            that.$api.subVip(data).then(res => {
                console.log(res);
                if (res.code == 1) {
                    var data = {
                        orsid: res.data,
                        oid: that.oid,
                        pay_type: 2,
                    }
                    that.$apily.appwxpay(data).then(res => {
                        if (res.data.sign && res.data.prepayid) {
                            var params = {
                                mch_id: res.data.partnerid, // merchant id
                                prepay_id: res.data.prepayid, // prepay id returned from server
                                nonce: res.data.noncestr, // nonce string returned from server
                                timestamp: res.data.timestamp, // timestamp
                                sign: res.data.sign, // signed string
                            };
                            //console.log("插件参数：");
                            //console.log(params);
                            Wechat.sendPaymentRequest(params, function (result) {
                                console.log('支付结果：' + result)
                                // alert('支付结果：' + result)
                                that.$vux.loading.hide();
                                that.$vux.toast.show(result, 'middle');
                                setTimeout(() => {
                                    that.isCloseModal2 = false;
                                    that.disabled = false;
                                    that.$vux.toast.hide();
                                    that.curIndex = 'hide';
                                    that.getParams();
                                }, 500);
                            }, function (reason) {
                                //console.log('支付失败' + reason);
                                that.$vux.loading.hide();
                                that.$vux.toast.show("支付失败: " + reason, 'middle');
                                setTimeout(() => {
                                    that.isCloseModal2 = false;
                                    that.disabled = false;
                                    that.$vux.toast.hide();
                                    that.curIndex = 'hide';
                                    that.getParams();
                                }, 500);
                            });
                        } else {
                            that.$vux.loading.hide();
                            that.$vux.toast.show("支付失败 ", 'middle');
                            setTimeout(() => {
                                that.isCloseModal2 = false;
                                that.disabled = false;
                                that.$vux.toast.hide();
                                that.curIndex = 'hide';
                                that.getParams();
                            }, 500);
                        }
                    }).catch((error) => {
                        // alert(error)
                        that.$vux.loading.hide();
                        that.$vux.toast.show("支付失败 ", 'middle');
                        setTimeout(() => {
                            that.isCloseModal2 = false;
                            that.disabled = false;
                            that.$vux.toast.hide();
                            that.curIndex = 'hide';
                            that.getParams();
                        }, 500);
                    })
                }
            })
        },
        //调用支付宝支付
        aliPay () {
            var that = this;
            that.disabled = true;
            that.$vux.loading.show({
                text: '加载中',
            })
            var data = new FormData();
            data.append('oid', that.oid);
            data.append('uid', that.uid);
            data.append('id', that.id);
            that.$api.subVip(data).then(res => {
                console.log(res.data)
                if (res.code == 1) {
                    var data = {
                        orsid: res.data,
                        oid: that.oid,
                        pay_type: 2,
                    }
                    that.$apily.appalipay(data).then(res => {
                        if (res.payInfo) {
                            var payInfo = res.payInfo;
                            cordova.plugins.alipay.payment(payInfo, function (result) {
                                //alert('支付结果：' + result)
                                that.$vux.loading.hide()
                                that.$vux.toast.show(result, 'middle');
                                if (result.resultStatus == '9000') {
                                    that.$vux.toast.show('支付成功！', 'middle');
                                } else if (result.resultStatus == '8000') {
                                    that.$vux.toast.show('正在处理中！', 'middle');
                                } else if (result.resultStatus == '4000') {
                                    that.$vux.toast.show('订单支付失败！', 'middle');
                                } else if (result.resultStatus == '6001！') {
                                    that.$vux.toast.show('用户中途取消', 'middle');
                                } else if (result.resultStatus == '6002') {
                                    that.$vux.toast.show('网络连接出错！', 'middle');
                                } else {
                                    that.$vux.toast.show('未知错误！', 'middle');
                                }
                                setTimeout(() => {
                                    that.isCloseModal2 = false;
                                    that.disabled = false;
                                    that.$vux.toast.hide();
                                    that.curIndex = 'hide';
                                    that.getParams();
                                }, 500);
                            }, function (reason) {
                                setTimeout(() => {
                                    that.$vux.loading.hide();
                                    that.isCloseModal2 = false;
                                    that.disabled = false;
                                    that.$vux.toast.show(reason.memo, 'middle');
                                }, 500);
                            });
                        } else {
                            //console.log("唤起支付失败");
                            setTimeout(() => {
                                that.$vux.loading.hide();
                                that.isCloseModal2 = false;
                                that.disabled = false;
                                that.$vux.toast.show("支付失败", 'middle');
                            }, 500);
                        }
                    }).catch((error) => {
                        setTimeout(() => {
                            that.$vux.loading.hide();
                            that.isCloseModal2 = false;
                            that.disabled = false;
                            that.$vux.toast.show("支付失败 ", 'middle');
                        }, 500);
                    })
                }
            })
        },
        //调用钱包支付
        wallet () {
            var that = this;
            that.disabled = true;
            that.$vux.loading.show({
                text: '加载中',
            })
            var data = new FormData();
            data.append('oid', that.oid);
            data.append('uid', that.uid);
            data.append('id', that.id);
            that.$api.subVip(data).then(res => {
                if (res.code == 1) {
                    var data = {
                        order_num: res.data,
                        oid: that.oid,
                    }
                    that.$api.walletpay(data).then(res => {
                        console.log(res);
                        if (res.code == 1) {
                            that.payInfo = res.data;
                            setTimeout(() => {
                                that.disabled = false;
                                that.$vux.loading.hide();
                                that.isShowModal = true;
                            })
                        }
                    })
                }
            })

        },
        //钱包支付逻辑
        payment2 () {
            var that = this;
            that.disabled = true;
            if (that.password) {
                that.$vux.loading.show({
                    text: '支付中',
                })
                var data = new FormData();
                data.append('oid', that.oid);
                data.append('uid', that.uid);
                data.append('id', that.id);
                that.$api.subVip(data).then(res => {
                    if (res.code == 1) {
                        var data = new FormData();
                        data.append('orsid', res.data);
                        data.append('oid', that.oid);
                        data.append('pay_type', 2);
                        data.append('uid', that.uid);
                        data.append('password', that.password);
                        that.$api.walletpay2(data).then(res => {
                            console.log(res);
                            if (res.code == 1) {
                                setTimeout(() => {
                                    that.disabled = false;
                                    that.isCloseModal2 = false;
                                    that.isShowModal = false;
                                    that.$vux.loading.hide();
                                    that.$vux.toast.text(res.msg, 'middle');
                                    setTimeout(() => {
                                        that.getParams();
                                    }, 1000)
                                }, 500)
                            }
                            else {
                                setTimeout(() => {
                                    that.$vux.loading.hide();
                                    that.disabled = false;
                                    that.$vux.toast.text(res.msg, 'middle');
                                }, 500)
                            }
                        })
                    }
                })
            }
            else {
                that.disabled = false;
                that.$vux.toast.text("请输入支付密码 ", 'middle');
            }
        },
        //超时后重新获得参数
        getParams () {
            var that = this;
            that.$vux.loading.show({
                text: '加载中',
            })
            that.uid = window.localStorage.getItem('uid');
            that.oid = that.$router.app.__proto__.$oid;
            that.getDetail();
            that.vipList();
        },
        //获取详细会员信息和具体信息
        getDetail () {
            var that = this;
            var data = {
                uid: that.uid,
                oid: that.oid,
            }
            that.$api.rechargeVip(data).then(res => {
                console.log(res);
                if (res.code == 1) {
                    that.memberList = res.data;
                    that.wLenth = (that.memberList.vip_list.length * 2.6) + ((that.memberList.vip_list.length - 1) * 0.15) + 'rem';
                    if (res.data.level) {
                        that.tabFun(that.memberList.level - 1, that.memberList.level);
                    }
                    else {
                        that.tabFun(0, 1);
                    }
                }
            })
        },
        //获取会员类型
        vipList () {
            var that = this;
            var data = that.oid;
            that.$api.vipList(data).then(res => {
                console.log(res);
                if (res.code == 1) {
                    that.tabList = res.data;
                }
            })
        }
    },
    // 生命周期事件，获取参数
    created () {
        var that = this;
        that.getParams();
    }
}
</script>

<style lang="less" scoped>
.memberCharge {
    min-height: calc(100vh - 0.88rem);
    .memberBgBox {
        width: 100%;
        height: 2.74rem;
        background: url("../../assets/images/user/members-bg.png");
        background-size: cover;
        .contentBox {
            margin: 0 auto;
            width: 80%;
            .headBox {
                width: 25%;
                img {
                    width: 1.2rem;
                    height: 1.2rem;
                }
            }
            .memberUser {
                width: 55%;
                font-family: "PingFang-Medium";
                .uname {
                    font-size: 0.38rem;
                    color: #936549;
                }
                .date {
                    color: #bd957c;
                }
                .record {
                    width: 80%;
                    color: #bd9277;
                    img {
                        width: 0.3rem;
                        height: 0.3rem;
                    }
                }
            }
            .memberLv {
                width: 20%;
                img {
                    margin: 0 auto;
                    width: 0.7rem;
                    height: 0.55rem;
                }
                .text {
                    color: #bd9277;
                }
            }
        }
    }
    .memberType {
        .title {
            border-left: 0.04rem solid #fcce7c;
        }
        .memberList {
            width: 100%;
            overflow: hidden;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            .list {
                box-sizing: content-box;
                .list-item {
                    font-family: "PingFang-Medium";
                    width: 2.6rem;
                    height: 1.7rem;
                    background: #eee;
                    border: 0.01rem solid #ccc;
                    background-size: cover;
                    .header {
                        height: 0.59rem;
                        img {
                            width: 0.28rem;
                            height: 0.59rem;
                        }
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        .buyBtn {
            margin: 0 auto;
            width: 5.96rem;
            height: 1.06rem;
            margin-top: 0.75rem;
            margin-bottom: 0.4rem;
            background-image: url("../../assets/images/user/members-button.png");
            background-size: cover;
            font-family: "PingFang-Medium";
            button {
                width: 5.96rem;
                height: 1.06rem;
            }
        }
    }
    .privilege {
        margin: 0 auto;
        width: 92%;
        .headBox {
            padding: 0.25rem 0 0.2rem 0;
            .title {
                width: 50%;
                border-left: 0.04rem solid #fcce7c;
            }
            .explain {
                width: 50%;
                color: #d48643;
                img {
                    width: 0.3rem;
                    height: 0.3rem;
                }
            }
        }
        .tabListBox {
            box-shadow: 0 0 0.08rem #999;
            .tabList {
                .list-item {
                    font-family: "PingFang-Medium";
                    width: 33.333%;
                    &:first-child {
                        border-radius: 0.1rem 0 0 0;
                    }
                    &:last-child {
                        border-radius: 0 0.1rem 0 0;
                    }
                }
            }
            .privilegeList {
                .list-item {
                    width: 33.333%;
                    img {
                        margin: 0 auto;
                        width: 0.8rem;
                        height: 0.8rem;
                    }
                }
            }
            .monthGift {
                .title {
                    font-family: "PingFang-Medium";
                }
                .monthGiftList {
                    width: 100%;
                    .list-item {
                        width: 48%;
                        background: url("../../assets/images/user/members-img2.png");
                        background-size: cover;
                        .content {
                            width: 100%;
                            .leftCont {
                                /*padding-left:0.24rem;*/
                                width: 60%;
                                height: 1.14rem;
                                .price {
                                    .price2 {
                                        font-size: 0.6rem;
                                    }
                                }
                            }
                            .rightCont {
                                width: 40%;
                                height: 1.14rem;
                            }
                        }
                        &:nth-child(odd) {
                            margin-right: 4%;
                        }
                        &:nth-child(1),
                        &:nth-child(2) {
                            margin-top: 0;
                        }
                    }
                }
            }
        }
    }
    .payList {
        position: fixed;
        bottom: 0;
        width: 100%;
        .head {
            font-family: "PingFang-Medium";
            img {
                top: 0.36rem;
                right: 0.3rem;
                width: 0.28rem;
                height: 0.28rem;
            }
        }
        .list {
            .list-item {
                .leftCont {
                    img {
                        width: 0.6rem;
                        height: 0.6rem;
                    }
                }
                .rightCont {
                    img {
                        margin-top: 0.32rem;
                        width: 0.36rem;
                        height: 0.25rem;
                    }
                }
            }
            .list-item:last-child {
                padding-bottom: 0.4rem;
                border-bottom: none;
            }
        }
        .list2 {
            /*height:5.6rem;*/
            .price {
                font-size: 0.6rem;
                padding-bottom: 0.6rem;
            }
            .passwordBox {
                margin: 0 auto;
                width: 5.8rem;
                .leftCont {
                    width: 15%;
                }
                .rightCont {
                    font-family: "PingFang-Medium";
                    width: 85%;
                    input {
                        width: 100%;
                        overflow: inherit;
                    }
                }
            }
            .payment {
                margin: 0 auto;
                width: 5.8rem;
                margin-top: 0.4rem;
                font-family: "PingFang-Medium";
            }
        }
        .payment {
            font-family: "PingFang-Medium";
        }
    }
    .activeBg {
        background-image: url("../../assets/images/user/members-img1.png") !important;
        border: 0.01rem solid #fff1d8 !important;
        background-size: cover !important;
    }
    .activeBg2 {
        background: #fff !important;
        color: #d48643 !important;
    }
    .activeBg3 {
        background: url("../../assets/images/user/members-img3.png") !important;
        background-size: cover !important;
        color: #fc5920 !important;
    }
    .btbt20 {
        border: 0.1rem solid #f4f4f4;
    }
}
</style>