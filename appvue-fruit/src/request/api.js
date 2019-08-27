import request from '@/request/http'
 
const api = {
  	coupons      : data => {return request('storecoupon' , data  )},    //个人中心优惠券接口
  	couponss     : data => {return request('storencoupon', data  )},    //订单结算页可用优惠券接口
  	hxOrder      : data => {return request('storeorder'  , data  )},    //个人中心核销订单列表接口
  	special      : data => {return request('special'     , data  )},    //拼团特价商品列表接口
  	specialDes   : data => {return request('special/' +    data  )},    //拼团特价商品详情接口
  	groupbuy     : data => {return request('groupbuy'    , data  )},    //拼团限时团购商品列表接口
  	groupbuyDes  : data => {return request('groupbuy/' +   data  )},    //拼团限时团购商品详情接口
//	joinCart     : data => {return request('storecart'   , data ,'' , 'post')},
  	cartList     : data => {return request('storecart'   , data  )},    //购物车列表接口  
  	orderaddress1: data => {return request('orderaddress', data  )},    //订单结算页送货上门接口
  	orderaddress2: data => {return request('address'     , data  )},    //订单结算页进店取货接口
  	orderList    : data => {return request('storeorder'  , data  )},    //个人中心订单列表接口
  	orderDes     : data => {return request('storeorder/' + data  )},    //个人中心订单详情接口
  	deleteOrder  : data => {return request('storeorder/' + data , '' , 'put' )}, //删除订单接口
	submitOrder  : data => {return request('storeorder'  , data , 'post'     )}, //提交订单接口
  	refund       : data => {return request('refund/'     + data  )},    //退款&协商商品信息接口
  	refundDes    : data => {return request('refund/'     + data , '' , 'put' )}, //退款&协商申请退款接口
	addimage     : data => {return request('addimage'    , data , 'post'     )}, //base64图片转成网络图片接口
  	message      : data => {return request('storemessages' , data )},    //个人信息消息提醒接口
  	groupRefund  : data => {return request('refund'      , data , 'post'     )}, //拼团商品申请退款接口
    base64       : data => {return request('common'      , data   )},    //图片base64生成接口
    shopwindow   : data => {return request('shopwindow'  , data   )},     //橱窗
    randSid      : data => {return request('randsid'     , data   )},    //获取随机sid
    windowimg 	 : data => {return request('windowimg'   , data   )},    //用户推荐banner图
    refundreason : data => {return request('refundreason', data   )},    //退款原因
    
    //新增模块
    recharge     : data => {return request('recharge'    , data    )},    //钱包充值
    subRecharge  : data => {return request('recharge'    , data  , 'post'    )},    //提交充值
    rechargeDes  : data => {return request('detailed'    , data    )},    //充值明细
    rechargeDes2  : data => {return request('detailed/'  + data    )},    //充值明细
    rechargeVip  : data => {return request('vip'         , data    )},    //vip列表
    subVip       : data => {return request('vip'         , data  , 'post'    )},    //充值vip
    walletpay    : data => {return request('walletpay'   , data    )},    //钱包支付
    walletpay2   : data => {return request('walletpay'   , data  , 'post'    )},    //钱包支付
    vipequity    : data => {return request('vipequity/'  + data    )},    //会员说明
    vipList      : data => {return request('vip/'        + data    )},    //会员列表
    vipequity2   : data => {return request('vipequity'   , data    )},    //会员说明
    vipequity3   : data => {return request('vipequity'   , data  , 'post'    )},    //领取优惠券
    buyRecord    : data => {return request('vip/'        + data    )},    //会员购买记录
}
 
export default api