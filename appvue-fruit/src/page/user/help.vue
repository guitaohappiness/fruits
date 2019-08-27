<template>
    <div class="help bg-f4f4f4">
        <x-header :left-options="{backText: ''}">帮助中心</x-header>
        <div class="header">
            <img class="block"
                 src="@/assets/images/common/logo.png"
                 alt="" />
            <p class="ft-36 color-333 text-center mg-tp40">多门店移动商城</p>
            <p class="ft-32 color-333 text-center mg-tp20">当前版本:V{{version}}</p>
        </div>
        <div class="hot_question">
            <p class="ft-32 color-333 title pd-lr30 flex flex-ac line-h30"><span class="mg-rt10 h30 inline-block"></span>热点问题</p>
            <div class="list mg-tp25">
                <div class="list-item bg-fff pd-lr30 mg-tp10"
                     v-for="(item,index) in list"
                     @click="more(index)">
                    <div class="title h90 line-h90 bd-bt-f4f4f4 clearfix">
                        <p class="ft-28 color-333 pull-left">{{item.name}}</p>
                        <div class="h90 flex flex-ac flex-je">
                            <img class="block pull-right"
                                 src="@/assets/images/user/helpMore.png"
                                 alt="" />
                        </div>
                    </div>
                    <p class="ft-24 color-666 pd-tp20 pd-bt30 line-h40"
                       v-if="item.isChecked">{{content}}</p>
                </div>
            </div>
        </div>
        <div class="mg-tp50 pd-bt50">
            <a :href="'tel:' + tel">
                <div class="contact bg-1ccfcf h90 line-h90 text-center color-fff bd-rd10 flex flex-ac flex-jc">
                    <img class="block"
                         src="@/assets/images/common/phone.png"
                         alt="" />
                    <p class="ft-32 mg-lt30">联系门店</p>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'help',
    data () {
        return {
            oid: '',//行业ID
            list: [],//热点问题列表
            curIndex: '',//未使用
            content: '',//用于存放各种问题对应的答案
            tel: '',//电话号码
            version: '',//版本号
        }
    },
    methods: {
        //获取帮助信息
        getHelp () {
            var that = this;
            that.version = that.$router.app.__proto__.appVersion;
            that.oid = that.$router.app.__proto__.$oid;
            var params = {
                oid: that.oid,
                type: 1,
                sid: window.localStorage.getItem("clickId"),
            }
            that.$apily.options(params).then(res => {
                if (res.code == 1) {
                    that.list = res.data.list;
                    that.tel = res.data.phone;
                }
                that.list.forEach(item => {
                    that.$set(item, 'isChecked', false);
                })
            })

        },

        //获取答案
        more (index) {
            var that = this;
            var s = that.list
            var c = that.list[index].isChecked
            that.list.forEach(item => {
                that.$set(item, 'isChecked', false);
            })
            var params = s[index].id
            that.$apily.options2(params).then(res => {
                if (res.code == 1) {
                    that.content = res.data.description
                }
            })
            that.list[index].isChecked = !c;
        }
    },
    //挂载
    mounted () {
        var that = this;
        //获取帮助信息
        that.getHelp();
    }
}
</script>

<style lang="less" scoped>
.help {
    min-height: calc(100vh - 0.88rem);
    .header {
        font-family: "PingFang-Medium";
        background: url("../../assets/images/user/helpBg.png");
        width: 100%;
        height: 4.1rem;
        background-size: cover;
        img {
            margin: 0 auto;
            padding-top: 0.6rem;
            width: 1.5rem;
            height: 1.5rem;
        }
    }
    .hot_question {
        padding-top: 0.5rem;
        .title {
            font-family: "PingFang-Medium";
            span {
                border-left: 0.06rem solid #1ccfcf;
            }
        }
        .list {
            .list-item {
                img {
                    width: 0.25rem;
                    height: 0.25rem;
                }
            }
        }
    }
    .contact {
        margin: 0 auto;
        width: 92%;
        img {
            width: 0.38rem;
            height: 0.4rem;
        }
    }
}
</style>