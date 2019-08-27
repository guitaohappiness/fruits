
<template>
    <div id="scrollList"
         class="wrap-pull"
         ref="wrap"
         @scroll="scrollEvent">
        <div :class="pullDownCls"
             ref="pullDownEl">
            <span class="icon"></span>
            <span :class="pullDownLabelCls">{{pullDownState}}</span>
        </div>
        <slot></slot>
        <div :class="pullUpCls"
             ref="pullUpEl"
             v-if="hasMore">
            <span class="icon"></span>
            <span :class="pullUpLabelCls">{{pullUpState}}</span>
        </div>
    </div>
</template>

<script>
const scrollCls = 'scroll',//滚动
    pullDownCls = 'pullDown',//下拉量
    pullDownLabelCls = 'pullDownLabel',//下拉标记
    pullUpCls = 'pullUp',//上拉量
    pullUpLabelCls = 'pullUpLabel';//上拉标记
//上拉提示信息
const lableUp = {
    initial: '上拉加载更多',
    suspend: '松开加载更多',
    loading: '加载中',
    complete: '加载完成',
};
//下拉提示信息
const lableDown = {
    initial: '下拉刷新',
    suspend: '松开刷新',
    loading: '刷新中',
    complete: '刷新完成',
};
//导出模块
export default {
    //下拉刷新
    name: 'PullToRefresh',
    props: [
        'down',//下拉
        'up',//松手标记
        'pullupOffset',//上拉量
        'pulldownOffset',//下拉量
        'addNew',//获取历史聊天记录
        'addMore',//获取新的聊天记录
        'hasMore',//是否有更多记录的状态，布尔值
    ],
    data () {
        return {
            msg: 'PullToRefresh',//提示信息
            pullDownState: lableDown.initial,//下拉状态
            pullUpState: lableUp.initial,//上拉状态
            pullDownCls,//下拉量
            pullDownLabelCls,//下拉标记
            pullUpCls,//上拉量
            pullUpLabelCls,//上拉标记
        };
    },
    components: {},
    methods: {
        //滚动事件
        scrollEvent (e) {
            this.$emit('scroll', e);
        },
        //获取开始点击时，距离聊天最历史消息的高度
        touchStart (ev) {
            let self = this;
            let touch = ev.touches[0];
            let scrollObj = self.scrollObj;
            self.pullFlag = 0;
            if (self.down) {
                this.pullDownEl.style.webkitTransitionDuration = '0s';
                this.pullDownCls = pullDownCls;
                this.pullDownState = lableDown.initial;
            }
            if (self.up && this.pullUpEl) {
                this.pullUpEl.style.webkitTransitionDuration = '0s';
            }
            self.startY = touch.screenY;

            self.startPageY = scrollObj.scrollTop;

            console.log("组件获取高度11");
            console.log(self.startPageY);
            console.log("组件获取高度22");

            sessionStorage.setItem('testScrollTop', self.startPageY)

            self.maxY = scrollObj.scrollHeight - scrollObj.clientHeight;
        },
        //开始下拉，获取下拉量和下拉设定量
        touchMove (ev) {
            let self = this,
                len = this.pulldownOffset || 80,
                offsetDefault = this.pullupOffset || 20;
            let offsetY, touch;
            touch = ev.touches[0];
            offsetY = (touch.screenY - self.startY) / 2;
            console.log('pulldown', self.down, offsetY, len);
            if (self.down && self.startPageY == 0 && offsetY > 0) {
                ev.preventDefault();
                if (offsetY > len) {
                    offsetY = len;
                    self.pullDownState = lableDown.suspend;
                    self.pullDownCls = 'pullDown flip';
                    self.pullFlag = 1;
                }
                self.pullDownEl.style.height = offsetY + 'px';
            } else if (
                self.up &&
                self.startPageY >= self.maxY - offsetDefault &&
                offsetY < 0
            ) {
                ev.preventDefault();
                self.pullFlag = 2;
                self.pullUpCls = 'pullUp flip';
                self.pullUpState = lableUp.suspend;
            }
        },
        //下拉结束，即松手时，判断是否满足下拉完成条件并且有没有新内容
        touchEnd (ev) {
            let self = this;

            if (self.down && self.pullFlag == 1) {
                self.pullDownCls = 'pullDown loading';
                self.pullDownState = lableDown.loading;
                // console.log('loadData');
                self.addNew().then(function () {
                    self.pullDownEl.style.webkitTransitionDuration = '0.5s';
                    self.pullDownEl.style.height = 0;
                    self.pullDownCls = 'pullDown ok';
                    self.pullDownState = lableDown.complete;
                });
            } else if (self.up && self.pullFlag == 2) {
                self.pullUpCls = 'pullUp loading';
                self.pullUpState = lableUp.loading;
                if (self.hasMore) {
                    self.addMore().then(function () {
                        self.pullUpCls = 'pullUp';
                        self.pullUpState = lableUp.initial;
                    });
                }
            } else if (self.down) {
                self.pullDownEl.style.webkitTransitionDuration = '0.5s';
                self.pullDownEl.style.height = 0;
            }
            self.pullFlag = 0;
        },
    },
    //页面初始化完成后，初始化本组件并且监听滑动事件
    mounted () {

        this.scrollObj = this.$refs.wrap;
        this.pullDownEl = this.$refs.pullDownEl;
        this.pullUpEl = this.$refs.pullUpEl;

        this.scrollObj.addEventListener('touchstart', this.touchStart.bind(this));
        this.scrollObj.addEventListener('touchmove', this.touchMove.bind(this));
        this.scrollObj.addEventListener('touchend', this.touchEnd.bind(this));

    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./PullToRefresh.css";
</style>
