interface OrderBuyDetailBto{
    uid:string;
    Content: string;
    code: string; //药品编码
    answer: string;
}
export class OrderBuyDetailDto{
    uid:string;
    Content: string;
    code: string; //药品编码
    answer: string;
    constructor(orderBuy:OrderBuyDetailBto){
        this.uid = orderBuy.uid;
        this.Content = orderBuy.Content;
        this.code = orderBuy.code;
        this.answer = orderBuy.answer;
    }
}

export interface OrderBuyArrayBto{
    id:string;
    datetime: string;
    time:string;
    numNeed:number;
    numExist:number;
    heading:string;
    content:string;
    postID:string;
    full:number;
    kind:number;
    location:string;
    picture:string;
    qq:string,
    wechat:string,
    tel:string
}
export class OrderBuyArrayDto{
    code:string;
    data:OrderBuyArrayBto[];
    msg:string;
    pageNum: number;
    pageMaxSize: number;
    constructor(res:any){
        this.code = res.code;
        this.data = res.data;
        this.msg = res.msg;
        this.pageNum = res.pageNum;
        this.pageMaxSize = res.pageMaxSize;
    }
}