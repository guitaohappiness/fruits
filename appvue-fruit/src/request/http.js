import axios from 'axios'

const service = axios.create({
  	baseURL: 'https://api.dylm.kissneck.com/api/v1/',// 接口的域名地址
  	//baseURL:'https://api.dylm.dev.kissneck.com/api/v1/',// 接口的域名地址(测试)
  	headers: {
  	  	'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  	}
})

export default function request(url, data = {}, method = 'get') {
  return new Promise((resolve, reject) => {
    const options = {
      	url,
      	method,
    }
    if (method.toLowerCase() === 'get') {
      	options.params = data;
    } 
    else {
      	options.data = data;
    }
    service(options).then(res => {
        console.log('返回数据', res)
        resolve(res.data)
    })
    .catch(error => {
        reject()
        console.error(error)
    })
  })
}