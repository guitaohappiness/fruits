<template>
    <div class="coupons">
        <x-header :left-options="{backText: ''}">优惠券</x-header>
        <div class="couponList pd-lr30">
            <!-- 优惠券 -->
            <div class="list-item mg-tp20 relative"
                 v-for="(item,index) in couponList"
                 :key="index">
                <div class="couponBg absolute"
                     v-if="item.coupon_status == 1"></div>
                <div class="couponBg2 absolute"
                     v-else></div>
                <div class="topBox flex flex-ac">
                    <p class="price ft-30 text-center">￥<span>{{item.coupon_price}}</span></p>
                    <div class="discount pd-lt30">
                        <div class="flex flex-ac">
                            <p class="ft-24 color-fff bg-1ccfcf text-center"
                               v-if="item.coupon_status == 1">优惠券</p>
                            <p class="ft-24 color-fff bg-878787 text-center"
                               v-else-if="item.coupon_status == 2">优惠券</p>
                            <p class="ft-24 color-fff bg-878787 text-center"
                               v-else>优惠券</p>
                            <p class="ft-28 color-333 one-line-ellipsis">{{item.name}}</p>
                        </div>
                        <p class="ft-26 disNum mg-tp20 color-666">
                            <span class="color-1ccfcf"
                                  v-if="item.coupon_status == 1">{{item.type_name}}</span>
                            <span class="color-999"
                                  v-else-if="item.coupon_status == 2">{{item.type_name}}</span>
                            <span class="color-999"
                                  v-else>{{item.type_name}}</span>
                        </p>
                        <p class="ft-28 disNum mg-tp20 color-666">
                            <span class="mg-rt20">全场满</span>
                            <span class="color-1ccfcf"
                                  v-if="item.coupon_status == 1">{{item.coupon_condition}}减{{item.coupon_price}}</span>
                            <span class="color-999"
                                  v-else-if="item.coupon_status == 2">{{item.coupon_condition}}减{{item.coupon_price}}</span>
                            <span class="color-999"
                                  v-else>{{item.coupon_condition}}减{{item.coupon_price}}</span>
                        </p>
                    </div>
                </div>
                <div class="fotBox flex flex-ac pd-lt30">
                    <p class="ft-24 color-333">有效期：{{item.coupon_start_time}}至{{item.coupon_left_time}}</p>
                </div>
                <!-- FOOTER -->
                <img class="block absolute"
                     v-if="item.coupon_status == 2"
                     src="@/assets/images/user/coupon_sy.png"
                     alt="" />
                <img class="block absolute"
                     v-if="item.coupon_status == 3"
                     src="@/assets/images/user/coupon_gq.png"
                     alt="" />
            </div>
        </div>
        <div class="pd-bt50"
             v-if="isMore">
            <div class="more text-center color-fff ft-32 h90 line-h90 bd-rd10 bg-1ccfcf"
                 @click="couponMore">
                查看更多
            </div>
        </div>
        <!--没有更多-->
        <div class="loadMore text-center"
             v-else>
            <img class="block"
                 src="@/assets/images/common/icon3.png"
                 alt="" />
            <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'coupons',
    data () {
        return {
            uid: '',//存放userid
            couponList: [],//存放用户的优惠券列表
            paged: 1,//分页
            isMore: true,//查看更多||没有更多
        }
    },

    methods: {
        //获取更多优惠券信息
        couponMore () {
            var that = this;
            that.getCouponList();
        },
        //获取用户参数
        getParams () {
            var that = this;
            that.uid = window.localStorage.getItem('uid');
        },
        //获取优惠券列表
        getCouponList () {
            var that = this;
            that.$vux.loading.show({
                text: '加载中',
            })
            var data = {
                uid: that.uid,
                paged: that.paged,
            };
            that.$api.coupons(data).then(res => {
                if (res.code == 1) {
                    that.paged++;
                    var arr = res.data;
                    arr.forEach(item => {
                        that.couponList.push(item);
                    })
                    if (arr.length >= 5) {
                        that.isMore = true;
                    }
                    else {
                        that.isMore = false;
                    }
                }
                else {
                    that.isMore = false;
                }
            })
            //获取超时
            setTimeout(() => {
                that.$vux.loading.hide();
            }, 500);
        }
    },
    //生命周期被创建时，获取用户参数和用户的优惠券列表
    created () {
        var that = this;
        that.getParams();
        that.getCouponList();
    }
}
</script>

<style lang="less" scoped>
.coupons {
    min-height: calc(100vh - 1.08rem);
    .couponList {
        .list-item {
            .couponBg {
                background: url("../../assets/images/user/couponBg_1.png");
                width: 6.9rem;
                height: 2.34rem;
                background-size: cover;
                z-index: -99;
            }
            .couponBg2 {
                background: url("../../assets/images/user/couponBg_2.png");
                width: 6.9rem;
                height: 2.34rem;
                background-size: cover;
                z-index: -99;
            }
            .topBox {
                height: 1.7rem;
                .price {
                    font-family: "PingFang-Medium";
                    width: 28%;
                    span {
                        font-size: 0.6rem;
                    }
                }
                .discount {
                    width: 72%;
                    div {
                        p:nth-child(1) {
                            width: 25%;
                            padding: 0.05rem 0.08rem;
                        }
                        p:nth-child(2) {
                            margin-left: 5%;
                            width: 70%;
                            font-family: "PingFang-Medium";
                        }
                    }
                    .disNum {
                        span {
                            font-family: "PingFang-Medium";
                        }
                    }
                }
            }
            .fotBox {
                height: 0.64rem;
            }
            > img {
                bottom: 0;
                right: 0;
                width: 1.52rem;
                height: 1.07rem;
            }
        }
    }
    .bg-878787 {
        background: #878787;
    }
    .more {
        width: 92%;
        margin: 0 auto;
        margin-top: 0.8rem;
    }
    .loadMore {
        padding: 0.8rem 0 0.5rem 0;
        img {
            width: 0.6rem;
            margin: 0 auto;
        }
    }
}
</style>