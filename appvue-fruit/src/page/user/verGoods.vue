<template>
    <div class="verGoods bg-f4f4f4">
        <x-header :left-options="{backText: ''}">待核销订单</x-header>
        <div class="list pd30"
             v-if="list.length > 0">
            <div class="list-item mg-tp20 bg-fff bd-rd10"
                 v-for="(item,index) in list">
                <div class="headBox pd30 bd-bt-f4f4f4 clearfix">
                    <div class="flex flex-ac leftCont pull-left">
                        <img class="block bd-rd50 mg-rt20"
                             :src="item.img"
                             alt="" />
                        <p class="ft-28 color-333">{{item.name}}</p>
                    </div>
                    <p class="ft-28 color-1ccfcf pull-right mg-tp15"
                       v-if="item.status == 3">等待到店核销</p>
                </div>
                <div class="contentBox">
                    <div class="hint flex flex-ac">
                        <span class="inline-block mg-rt10 color-1ccfcf ft-24 h30 bd-rd5">温馨提示</span>
                        <p class="color-333 ft-24">请于{{item.takeTime}}之前到店核销商品</p>
                    </div>
                    <div class="shopList">
                        <div class="list-item bd-bt-f4f4f4 pd-tb30"
                             v-for="(item2,index) in item.order_info">
                            <router-link class="flex flex-as"
                                         :to="{name:'verGoodDes',params:{id:item.id}}"
                                         v-if="item.type == 2">
                                <div class="leftCont">
                                    <img class="block"
                                         :src="item2.product_images"
                                         alt="" />
                                </div>
                                <div class="rightCont mg-tp15">
                                    <p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item2.product_name}}</p>
                                    <div class="clearfix mg-tp30">
                                        <p class="ft-28 color-333 pull-left">
                                            单价：<span class="ft-24">￥</span><span>{{item2.product_fact_price}}</span>
                                        </p>
                                        <p class="pull-right ft-24 color-999 line-h35">×{{item2.num}}</p>
                                    </div>
                                </div>
                            </router-link>
                            <router-link class="flex flex-as"
                                         :to="{name:'groupOrderDes',params:{id:item.id}}"
                                         v-if="item.type == 3">
                                <div class="leftCont">
                                    <img class="block"
                                         :src="item2.product_images"
                                         alt="" />
                                </div>
                                <div class="rightCont mg-tp15">
                                    <p class="ft-28 color-333 mult_line-ellipsis line-h35">{{item2.product_name}}</p>
                                    <div class="clearfix mg-tp30">
                                        <p class="ft-28 color-333 pull-left">
                                            单价：<span class="ft-24">￥</span><span>{{item2.product_fact_price}}</span>
                                        </p>
                                        <p class="pull-right ft-24 color-999 line-h35">×{{item2.num}}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="footBox ft-24 pd30">
                    <div class="rightCont text-right flex flex-ac flex-je">
                        <p class="color-1ccfcf inline-block ft-24 disPrice bd-rd5 mg-rt30"
                           v-if="item.coupon_price">已优惠￥{{item.coupon_price}}</p>
                        <p v-if="item.total_sum" class="color-333 ft-28 mg-rt35">共{{item.total_sum}}件</p>
                        <p v-if="!item.total_sum" class="color-333 ft-28 mg-rt35">老订单请在旁边确认件数</p>
                        <p class="color-333 ft-28">实付总额：</p>
                        <p class="color-fc5920 ft-28">￥{{item.price}}</p>
                    </div>
                </div>
            </div>
            <div class="loadMore text-center"
                 v-if="isLoadMore">
                <group>
                    <cell v-for="(type, index) in types"
                          :key="type">
                        <spinner :type="type"></spinner>
                        <p class="ft-26 color-666">正在加载更多</p>
                    </cell>
                </group>
            </div>
            <div class="loadMore text-center"
                 v-else>
                <img class="block"
                     src="@/assets/images/common/icon2.png"
                     alt="" />
                <p class="ft-20 mg-tp20 color-999">没有更多了，看看其他的吧~</p>
            </div>
        </div>
        <!--没有更多-->
        <div v-else>
            <div class="styleNull">
                <img class="block"
                     src="@/assets/images/user/orderNull.png"
                     alt="" />
                <p class="text-center ft-28 color-999 mg-tp30">暂无待核销订单~</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'verGoods',
    data () {
        return {
            uid: '',//获取userid
            paged: 1,//分页
            list: [],//存放未核销订单信息
            scrollWatch: true, //是否监听
            types: ['ios-small'],//页面展示类型
            isLoadMore: false,//是否能加载更多的优惠券
            totalNumber:0,//购买总计件数
        }
    },
    methods: {
        //获取用户参数
        getParams () {
            var that = this;
            that.uid = window.localStorage.getItem('uid');
        },
        //获取待核销订单列表
        getHxOrderList () {
            var that = this;
            that.$vux.loading.show({
                text: '加载中',
            })
            var data = {
                uid: that.uid,
                paged: that.paged,
                order_type: 1,
                oid: that.$router.app.__proto__.$oid,
            }
            //个人中心核销订单列表接口
            that.$api.hxOrder(data).then(res => {
                console.log("个人中心核销订单列表接口")
                console.log(res)
                if (res.code == 1 && res.data != '') {
                    var arr = res.data;
                    arr.forEach(item => {
                        that.list.push(item);
                        that.totalNumber++
                        console.log(`totalNumber is ${that.totalNumber}`)
                    })
                    if (that.paged == 1 && arr.length < 5) {
                        that.isLoadMore = false;
                        that.scrollWatch = false;
                    }
                    else {
                        that.isLoadMore = true;
                        that.scrollWatch = true;
                    }
                    that.paged++;
                }
                else {
                    that.isLoadMore = false;
                    that.scrollWatch = false;
                }
                //响应超时
                setTimeout(() => {
                    that.$vux.loading.hide();
                }, 500)

                if (that.scrollWatch) {
                    window.addEventListener("scroll", that.handleScroll);
                }
            })
        },
        //监听滚动
        handleScroll () {
            var that = this;
            if (that.scrollWatch) {
                //当前滚动条高度
                var scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                //console.log("当前滚动条高度："+scrollTop)

                //内容高度
                var bodyScrollHeight = document.body.scrollHeight;
                var documentScrollHeight = document.documentElement.scrollHeight;
                var allheight =
                    bodyScrollHeight - documentScrollHeight > 0
                        ? bodyScrollHeight
                        : documentScrollHeight;

                //可视页面高度
                var windowHeight =
                    document.documentElement.clientHeight || document.body.clientHeight;

                var bottom = allheight - windowHeight - scrollTop;
                if (parseInt(bottom) <= 0) {
                    that.$vux.loading.show({
                        text: "加载中"
                    });
                    that.getHxOrderList();
                    console.log("触底加载更多");
                }
            }
        },
    },
    //生命周期创建时自动获取用户参数和用户的优惠券列表
    created () {
        var that = this;
        that.getParams();
        that.getHxOrderList();
    },
    //生命周期销毁时，停止监听滚动
    destroyed () {
        var that = this;
        that.scrollWatch = false;
        window.removeEventListener('scroll', that.handleScroll);
    },
}
</script>

<style lang="less" scoped>
.verGoods {
    min-height: calc(100vh - 0.88rem);
    .list {
        .list-item {
            &.list-item:first-child {
                margin-top: 0;
            }
            .headBox {
                font-family: "PingFang-Medium";
                .leftCont {
                    img {
                        width: 0.6rem;
                        height: 0.6rem;
                    }
                }
            }
            .contentBox {
                padding: 0.3rem 0.3rem 0 0.3rem;
                .hint {
                    span {
                        border: 0.02rem solid #1ccfcf;
                        padding: 0 0.05rem;
                        line-height: 0.28rem;
                    }
                }
                .shopList {
                    .list-item {
                        .leftCont {
                            width: 30%;
                            img {
                                width: 1.68rem;
                                height: 1.68rem;
                            }
                        }
                        .rightCont {
                            width: 70%;
                        }
                    }
                }
            }
            .footBox {
                width: 100%;
                .rightCont {
                    width: 100%;
                    .disPrice {
                        font-family: "PingFang-Medium";
                        padding: 0.05rem 0.1rem;
                        background: #e3f8f9;
                    }
                    p:last-child {
                        font-family: "PingFang-Medium";
                    }
                }
            }
        }
    }
    .loadMore {
        padding-bottom: 0.2rem;
        img {
            width: 0.6rem;
            margin: 0 auto;
        }
    }
    .styleNull {
        padding-top: 2.7rem;
        img {
            margin: 0 auto;
            width: 2.53rem;
            height: 1.77rem;
        }
    }
}
</style>