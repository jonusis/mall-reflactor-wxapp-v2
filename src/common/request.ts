import Taro from "@tarojs/taro";
// 包裹一层，并且返回供外部调用
// amd cmd;模块发展的演变的过程；
// promise就是一个表示未来的事情；
export default class Request{
    private static Instance:Request = new Request();
    private static preHttp:string = 'http://localhost:8080';
    public static GetInstance = ():Request => {
        return this.Instance;
    }
    public static GetPreHttp = ():string => {
        return this.preHttp;
    }
    Fetch = (url:string,data:object = {},method:any = "GET"): Promise<any> => {
        const header = { "content-type": "application/json"};
        return Taro.request({
          url: Request.preHttp + url,
          data,
          method,
          header
        }).then(res => {
          if (res.statusCode === 200) {
            return res;
          } else {
            // 异常
            Taro.showToast({
              title: ` ${res.data.message}`,
              icon: "none",
              duration: 1000
            });
            throw new Error(`服务端错误: ${res.statusCode}`);
          }
        });
    }
}
0






// 请求样例： 
// POST  'https://localhost:8080/v1/DialogMessage/'
// body:{
//     question:'今天星期几'
// }
// 返回样例
// {
//     data:{
//         id: utfvsed314fcvert54gvresdgv
//         type: 2
//         content: '今天星期5' 
//     }
//     state: {
//         code:200
//         text:'请求成功'
//     }
// }