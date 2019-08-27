import Vue from 'vue'
import Router from 'vue-router'



//footer分类导航
import index from '@/page/index/index' //底部导航-首页
import category from '@/page/category/category' //底部导航-分类
import group from '@/page/group/group' //底部导航-来拼
import cart from '@/page/cart/cart' //底部导航-购物车
import user from '@/page/user/user' //底部导航-我的（个人中心）

//登录
import login from '@/page/login/login' //登录
import register from '@/page/login/register' //注册
import forgetPassword from '@/page/login/forgetPassword' //忘记密码
import bindMobile from '@/page/login/bindMobile' //绑定手机
import protocol from '@/page/login/protocol' //协议说明

//首页
import proDetails from '@/page/index/proDetails' //商品详情
import hotSale from '@/page/index/hotSale' //热销水果
import freshCut from '@/page/index/freshCut' //水果拼盘
import giftBox from '@/page/index/giftBox' //礼品礼盒
import userRec from '@/page/index/userRec' //用户推荐
import curLocation from '@/page/index/curLocation' //我的定位
import changeStore from '@/page/index/changeStore' //附近门店
import storeDes from '@/page/index/storeDes' //门店信息
import storeMap from '@/page/index/storeMap' //门店地图
import search from '@/page/index/search' //搜索

//来拼
import groupDetails from '@/page/group/groupDetails' //来拼详情
import specialDes from '@/page/group/specialDes' //特价详情

//购物车
import subOrder from '@/page/cart/subOrder' //订单提交(普通订单)
import groupOrder from '@/page/cart/groupOrder' //订单提交(团购订单)

//我的
import setting from '@/page/user/setting' //设置
import privacyAgree from '@/page/user/privacyAgree' //隐私协议
import userMessage from '@/page/user/userMessage' //消息通知
import help from '@/page/user/help' //帮助中心
import address from '@/page/user/address' //收货地址
import addAds from '@/page/user/addAds' //添加收货地址
import coupons from '@/page/user/coupons' //优惠券
import personalDes from '@/page/user/personalDes' //个人资料
import verGoods from '@/page/user/verGoods' //核销商品
import verGoodDes from '@/page/user/verGoodDes' //核销商品详情
import orderList from '@/page/user/orderList' //我的订单
import orderDes from '@/page/user/orderDes' //订单详情(普通订单)
import groupOrderDes from '@/page/user/groupOrderDes' //订单详情(团购订单)
import refund from '@/page/user/refund' //申请退款
import refundList from '@/page/user/refundList' //退款/协商
import refundDes from '@/page/user/refundDes' //退款详情
import storeService from '@/page/user/storeService' //退款详情

//新增模块
import wallet from '@/page/user/wallet' //钱包
import paymentList from '@/page/user/paymentList' //明细
import paymentDes from '@/page/user/paymentDes' //收支明细
import memberCharge from '@/page/user/memberCharge' //vip会员
import memberExplain from '@/page/user/memberExplain' //会员说明
import memberRecord from '@/page/user/memberRecord' //会员购买记录

//样式文件
import '@/assets/css/common.css'
import '@/assets/css/normalize.css'
import '@/assets/css/txj.css'

Vue.use(Router);

export default new Router({
    routes: [

        { path:'/', name:'index',meta: { requireAuth: true }, component:index },

        //footer分类导航
        { path:'/index', name:'index', meta: { requireAuth: true },component:index },  //首页
        { path:'/category', name:'category', component:category },  //分类
        { path:'/group', name:'group', component:group },  //来拼
        { path:'/cart', name:'cart', component:cart },  //购物车
        { path:'/user', name:'user', component:user },  //我的

        //登录
        { path:'/login', name:'login', component:login },  //登录
        { path:'/register', name:'register', component:register },  //注册
        { path:'/forgetPassword', name:'forgetPassword', component:forgetPassword },  //忘记密码
        { path:'/bindMobile/:uid', name:'bindMobile', component:bindMobile },  //绑定手机
        { path:'/protocol', name:'protocol', component:protocol },  //协议说明

        //首页
        { path:'/proDetails/:id', name:'proDetails', component:proDetails },  //商品详情
        { path:'/hotSale/:id/:name', name:'hotSale', component:hotSale },  //热销水果
        { path:'/freshCut/:id/:name', name:'freshCut', component:freshCut },  //水果拼盘
        { path:'/giftBox/:id/:name', name:'giftBox', component:giftBox },  //礼品礼盒
        { path:'/userRec/:id/:name', name:'userRec', component:userRec },  //用户推荐
        { path:'/curLocation', name:'curLocation', component:curLocation },  //我的定位
        { path:'/changeStore', name:'changeStore', component:changeStore },  //附近门店
        { path:'/storeDes/:id', name:'storeDes', component:storeDes },  //门店信息
        { path:'/storeMap/:id', name:'storeMap', component:storeMap },  //门店地图
        { path:'/search', name:'search', component:search },  //搜索

        //来拼
        { path:'/groupDetails/:id/:sid', name:'groupDetails', component:groupDetails },  //来拼详情
        { path:'/specialDes/:id', name:'specialDes', component:specialDes },  //特价详情

        //购物车
        { path:'/subOrder/:type', name:'subOrder', component:subOrder },  //提交订单(普通订单)
        { path:'/groupOrder', name:'groupOrder', component:groupOrder },  //提交订单(团购订单)

        //我的
        { path:'/setting', name:'setting', component:setting },  //设置
        { path:'/privacyAgree', name:'privacyAgree', component:privacyAgree },  //隐私协议
        { path:'/userMessage', name:'userMessage', component:userMessage },  //消息通知
        { path:'/help', name:'help', component:help },  //帮助中心
        { path:'/address/:way/:type', name:'address', component:address },  //收货地址
        { path:'/addAds', name:'addAds', component:addAds },  //添加收货地址
        { path:'/coupons', name:'coupons', component:coupons },  //优惠券
        { path:'/personalDes', name:'personalDes', component:personalDes },  //个人资料
        { path:'/verGoods', name:'verGoods', component:verGoods },  //核销商品
        { path:'/verGoodDes/:id', name:'verGoodDes', component:verGoodDes },  //核销商品详情
        { path:'/orderList/:type', name:'orderList', component:orderList },  //我的订单
        { path:'/orderDes/:id', name:'orderDes', component:orderDes },  //订单详情(普通订单)
        { path:'/groupOrderDes/:id', name:'groupOrderDes', component:groupOrderDes },  //订单详情(团购订单)
        { path:'/refund/:id', name:'refund', component:refund },  //申请退款
        { path:'/refundList', name:'refundList', component:refundList },  //退款/协商
        { path:'/refundDes/:id', name:'refundDes', component:refundDes },  //退款详情
        { path:'/storeService/', name:'storeService', component:storeService},  //联系门店客服
        
        //新增模块
        { path:'/wallet', name:'wallet', component:wallet},  //钱包
        { path:'/paymentList', name:'paymentList', component:paymentList},  //明细
		{ path:'/paymentDes/:id', name:'paymentDes', component:paymentDes},  //收支明细
		{ path:'/memberCharge', name:'memberCharge', component:memberCharge},  //vip会员
		{ path:'/memberExplain', name:'memberExplain', component:memberExplain},  //会员说明
		{ path:'/memberRecord', name:'memberRecord', component:memberRecord},  //会员购买记录
    ]
})
