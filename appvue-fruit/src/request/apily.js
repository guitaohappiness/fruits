import request from '@/request/http'
 
const api = {
    //登录注册
      login : data => {return request('login', data)},
      login2 : data => {return request('login', data, "post")},
      wxlogin:data => {return request('wxlogin',data)},
      wxlogin2:data => {return request('wxbind',data)},
      sms : data => {return request('sms', data)},
      register : data => {return request('register', data,"post")},
      register2 : data => {return request('register/' + data,'',"put")},

      //首页
      location : data => {return request('location', data)},
      store : data => {return request('store', data)},
      products : data => {return request('products', data)},
      procategory : data => {return request('procategory', data)},
      message : data => {return request('storemessages', data)},//商店消息
      remind:data => {return request('storemessages', data, "post")},//提醒配送
      readMsg:data => {return request('order/'+ data)},//已读消息
      storercoupon : data => {return request('storercoupon', data)},//优惠券列表接口
      getcoupon : data => {return request('storercoupon', data,"post")},//优惠券领取接口
      

      //我的定位
      location2 : data => {return request('location', data)},

      //门店列表
      follow : data => {return request('follow', data, "post")},
      store2 : data => {return request('store/'+ data)},

      //搜索
      storesearch : data => {return request('storesearch', data)},
      storesearch2 : data => {return request('storesearch/'+ data,'', "DELETE")},//清除历史搜索

      //商品详情
      products2 : data => {return request('products/'+ data)},
      share : data => {return request('share', data, "post")},
      options3 : data => {return request('options' , data)},

      //订单详情
      appwxpay : data => {return request('wxappay', data)},
      appalipay : data => {return request('aliappay', data)},

      //购物车
      storecart : data => {return request('storecart', data)},//获取
      storecart2: data => {return request('storecart', data, "post")},//添加
      storecart3: data => {return request('storecart/'+ data,'', "put")},//编辑
      storecart4: data => {return request('storecart/1?ids='+ data,'', "DELETE")},//删除

      //个人中心
      user : data => {return request('user/'+ data)},
      user2 : data => {return request('user/'+data,'' ,"put")},
      storeorder : data => {return request('storeorder', data)},
      storecoupon : data => {return request('storecoupon', data)},
      options : data => {return request('options', data)},
      options2 : data => {return request('options/'+ data)},
      versions : data => {return request('versions', data)},
      address : data => {return request('address', data)},
      address2 : data => {return request('address', data, "post")},//添加地址
      address3 : data => {return request('address/'+ data, '',"DELETE")},//添加地址
      address4 : data => {return request('address/'+ data, '',"put")},//修改默认地址
      addimage : data => {return request('addimage', data, "post")},//头像处理
      qrcode : data => {return request('qrcode',data)},
      txwebim : data => {return request('txwebim',data)},



}
 
export default api