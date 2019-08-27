<template>
    <div class="wallet">
        <x-header :left-options="{backText: ''}">钱包</x-header>
        <div class="myBalance">
            <div class="headCont flex flex-ac">
                <div class="flex flex-ac flex-js leftCont">
                    <img class="block mg-rt10"
                         src="@/assets/images/user/balance.png"
                         alt="" />
                    <p class="ft-30 color-333 bold">我的余额</p>
                </div>
                <div class="rightCont flex flex-ac flex-je">
                    <router-link class="block ft-28 color-333 bold"
                                 :to="{name:'paymentList'}">
                        明细
                    </router-link>
                </div>
            </div>
            <div class="contentBox bd-rd20 mg-tp20">
                <div class="title flex flex-ac flex-jc">
                    <p class="ft-28 color-fff bold mg-rt15">我的余额</p>
                    <img class="block"
                         src="@/assets/images/user/prompt-white.png"
                         @click="useExplain"
                         alt="" />
                </div>
                <div class="money color-fff bold flex flex-jc">￥{{list.amount}}</div>
            </div>
        </div>
        <div class="recharge">
            <div class="headCont flex flex-ac mg-bt30">
                <div class="flex flex-ac flex-js leftCont">
                    <img class="block mg-rt10"
                         src="@/assets/images/user/charge.png"
                         alt="" />
                    <p class="ft-30 color-333 bold">在线充值</p>
                </div>
            </div>
            <div class="contentBox">
                <div class="list">
                    <div class="list-item flex flex-ac mg-tp15"
                         :class="curIndex == index ? 'activeColor2' : ''"
                         v-for="(item,index) in list.recharge_list"
                         @click="ChooseRecharge(index,item.id)">
                        <div class="relative leftCont pd-lt20 flex flex-ac flex-jc">
                            <img class="block"
                                 src="@/assets/images/user/wallet-img1.png"
                                 alt="" />
                            <span class="ft-32 color-fff bold absolute">￥{{item.recharge_amount}}</span>
                        </div>
                        <div class="ft-32 bold rightCont color-333">充值￥{{item.recharge_amount}}送￥{{item.give_amount}}</div>
                    </div>
                </div>
                <div class="chooseMoney mg-tp15"
                     @click="ChooseRecharge(6)">
                    <div class="flex flex-ac content"
                         :class="curIndex == 6 ? 'activeColor2' : ''">
                        <div class="relative leftCont pd-lt20 flex flex-ac flex-jc">
                            <img class="block"
                                 src="@/assets/images/user/wallet-img1.png"
                                 alt="" />
                            <span class="ft-32 color-fff bold absolute">自主充值</span>
                        </div>
                        <div class="rightCont flex flex-ac color-333">
                            <p class="ft-32 mg-rt10">其他金额</p>
                            <img v-if="curIndex != 6"
                                 class="block"
                                 src="@/assets/images/user/down.png"
                                 alt="" />
                            <img v-else
                                 class="block"
                                 src="@/assets/images/user/upward.png"
                                 alt="" />
                        </div>
                    </div>
                </div>
                <div class="otherMoneyBox mg-tp10"
                     v-if="curIndex == 6">
                    <div class="inputBox flex flex-ac">
                        <input type="number"
                               class="ft-28 color-333 h70 line-h70 pd-lt30"
                               v-model="rechargeVal"
                               placeholder="请输入充值金额，最低1元" />
                        <button class="ft-32 color-fff bg-1ccfcf text-center h70 line-h70"
                                @click="otherPay">立即充值</button>
                    </div>
                </div>
            </div>
        </div>
        <!--余额使用说明-->
        <div transfer-dom>
            <x-dialog v-model="showLogin">
                <div class="modalContent bg-fff bd-rd10">
                    <div class="modalTop color-333 ft-30 pd-bt30 bd-bt-eee bold">余额使用规则</div>
                    <div class="modalMiddle mg-tp30">
                        <p class="ft-28 color-333">1、使用APP充值，门店亦可消费使用，钱包余额不可提现。</p>
                        <p class="ft-28 color-333">2、发生退货或退款时使用钱包支付的金额将退回到“我的余额”账户中，不支持现金退款。</p>
                    </div>
                </div>
                <img class="block closeModal"
                     src="@/assets/images/user/closeModal.png"
                     @click="closeModal"
                     alt="" />
            </x-dialog>
        </div>
        <!--支付方式-->
        <div class="black_cover"
             v-if="isCloseModal2"
             @click="closeModal">
            <div class="payList bg-fff">
                <div class="clearfix head h100 line-h100 pd-lr30 bd-bt-f4f4f4">
                    <p class="pull-left ft-28 color-333">选择支付方式</p>
                    <img class="block pull-right"
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
                             v-if="curIndex2 == index">
                            <img class="block"
                                 src="@/assets/images/index/payWay.png"
                                 alt="" />
                        </div>
                    </div>
                </div>
                <button class="h100 line-h100 payment bg-1ccfcf text-center ft-28 color-fff width-full"
                        :disabled="disabled"
                        @click.stop="payment(curIndex2)">去支付</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wallet',
    data () {
        return {
            showLogin: false,//是否展示余额使用规则框
            isCloseModal2: false,//是否展示支付框
            isShowModal2: false,//钱包支付用，暂时用不到
            curIndex: 'hide',//在线充值栏的当前激活状态
            curIndex2: 0,//支付方式栏的激活状态
            list: [],//在线充值栏目所有品类的信息
            payList: [//支付方式信息
                { name: '微信', img: require('@/assets/images/index/wx.png') },
                { name: '支付宝', img: require('@/assets/images/index/zfb.png') },
            ],
            disabled: false,//支付方式的激活状态
            rechargeVal: '',//充值金额
            recharge_amount: '',//从list中获取的定额充值金额
            rs_id: '',//选择充值类目的ID
        }
    },
    methods: {
        //获取充值类目ID和用户信息
        getParams () {
            var that = this;
            that.$vux.loading.show({
                text: '加载中',
            })
            that.uid = window.localStorage.getItem('uid');
            that.oid = that.$router.app.__proto__.$oid;
            that.rechargeList();
        },
        //获取充值类目信息
        rechargeList () {
            var that = this;
            var data = {
                oid: that.oid,
                uid: that.uid,
            }
            that.$api.recharge(data).then(res => {
                console.log(res);
                if (res.code == 1) {
                    that.list = res.data;
                    setTimeout(() => {
                        that.$vux.loading.hide();
                    }, 500)
                }
            })
        },
        //获取用户想要的充值类目信息
        ChooseRecharge (index, id) {
            var that = this;
            if (that.curIndex == index) {
                that.curIndex = 'hide';
            }
            else {
                if (index != 6) {
                    that.isCloseModal2 = true;
                    that.curIndex = index;
                    that.rs_id = id;
                }
                else {
                    that.curIndex = index;
                }
            }
        },
        //充值任意金额
        otherPay () {
            var that = this;
            if (!that.rechargeVal) {
                that.$vux.toast.text('请输入充值的金额', 'middle');
            }
            else {
                console.log(that.rechargeVal)
                that.recharge_amount = that.rechargeVal;
                that.isCloseModal2 = true;
            }
        },
        //启用我的余额说明窗口
        useExplain () {
            var that = this;
            that.showLogin = true;
        },
        //关闭我的余额说明窗口
        closeModal () {
            var that = this;
            that.showLogin = false;
            that.isCloseModal2 = false;
        },
        //选择支付方式
        choosePay (index) {
            var that = this;
            that.curIndex2 = index;
        },
        payment (index) {
            var that = this;
            if (index == 0) {
                that.wePay();
            }
            else if (index == 1) {
                that.aliPay();
            }
        },
        //微信支付
        wePay () {
            var that = this;
            that.disabled = true;
            that.$vux.loading.show({
                text: '加载中',
            })
            var data = new FormData();
            data.append('oid', that.oid);
            data.append('uid', that.uid);
            data.append('recharge_amount', that.recharge_amount);
            data.append('rs_id', that.rs_id);
            that.$api.subRecharge(data).then(res => {
                if (res.code == 1) {
                    var data = {
                        orsid: res.data,
                        oid: that.oid,
                        pay_type: 3,
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
        //支付宝支付
        aliPay () {
            var that = this;
            that.disabled = true;
            that.$vux.loading.show({
                text: '加载中',
            })
            var data = new FormData();
            data.append('oid', that.oid);
            data.append('uid', that.uid);
            data.append('recharge_amount', that.recharge_amount);
            data.append('rs_id', that.rs_id);
            that.$api.subRecharge(data).then(res => {
                if (res.code == 1) {
                    var data = {
                        orsid: res.data,
                        oid: that.oid,
                        pay_type: 3,
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
    },
    //生命周期——创建时，获取用户参数
    created () {
        var that = this;
        that.getParams();
    }
}
</script>

<style lang="less" scoped>
.wallet {
    .myBalance {
        padding: 0.3rem 0.3rem 0.4rem 0.3rem;
        .headCont {
            .leftCont,
            .rightCont {
                width: 50%;
            }
            .leftCont {
                img {
                    width: 0.35rem;
                    height: 0.35rem;
                }
            }
        }
        .contentBox {
            width: 100%;
            height: 3.16rem;
            background: url("../../assets/images/user/wallet-bg.png");
            background-size: cover;
            .title {
                padding-top: 0.8rem;
                img {
                    width: 0.3rem;
                    height: 0.3rem;
                }
            }
            .money {
                margin-top: 0.65rem;
                font-size: 0.6rem;
            }
        }
    }
    .recharge {
        padding: 0 0.3rem 0.5rem 0.3rem;
        .headCont {
            .leftCont {
                img {
                    width: 0.35rem;
                    height: 0.35rem;
                }
            }
        }
        .contentBox {
            .list {
                .list-item {
                    width: 100%;
                    height: 1.1rem;
                    background: #eeeeee;
                    .leftCont {
                        margin-right: 0.7rem;
                        img {
                            width: 1.8rem;
                            height: 0.86rem;
                        }
                        span {
                            top: 0.15rem;
                        }
                    }
                }
            }
            .chooseMoney {
                .content {
                    width: 100%;
                    height: 1.1rem;
                    background: #eeeeee;
                    .leftCont {
                        margin-right: 0.7rem;
                        img {
                            width: 1.8rem;
                            height: 0.86rem;
                        }
                        span {
                            top: 0.15rem;
                        }
                    }
                    .rightCont {
                        img {
                            width: 0.35rem;
                            height: 0.21rem;
                        }
                    }
                }
            }
            .otherMoneyBox {
                width: 100%;
                height: 1.39rem;
                background: url("../../assets/images/user/drop-down.png");
                background-size: cover;
                img {
                    width: 100%;
                    height: 1.39rem;
                    z-index: -99;
                }
                .inputBox {
                    padding: 0 0.2rem;
                    padding-top: 0.3rem;
                    width: 100%;
                    height: 1.39rem;
                    input {
                        width: 70%;
                        border: 0.01rem solid #cccccc;
                    }
                    button {
                        width: 30%;
                    }
                }
            }
        }
    }
    .modalContent {
        padding: 0.4rem;
        width: 100%;
        height: 4.06rem;
        .modalTop {
            img {
                width: 0.28rem;
                height: 0.28rem;
            }
        }
        .modalMiddle {
            text-align: left !important;
            p {
                line-height: 0.4rem;
                margin-top: 0.15rem;
                &:nth-child(1) {
                    margin-top: 0;
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
                margin-top: 0.36rem;
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
        .payment {
            font-family: "PingFang-Medium";
        }
    }
    .closeModal {
        margin: 0 auto;
        margin-top: 0.4rem;
        width: 0.54rem;
        height: 0.54rem;
    }
    .activeColor {
        color: #fc5920;
    }
    .activeColor2 {
        background: #fde5ba !important;
        .rightCont {
            color: #fc5920;
        }
    }
}
</style>