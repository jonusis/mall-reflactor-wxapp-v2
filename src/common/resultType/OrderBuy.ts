import { CommentsBto } from "./Comments";

interface OrderBuyDetailBto{
    comments:CommentsBto[];
    userPicture:string[];
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
    tel:string;
}
export class OrderBuyDetailDto{
    code:string;
    data: OrderBuyDetailBto;
    msg: string;
    constructor(orderBuy:any){
        this.code = orderBuy.code;
        this.data = orderBuy.data;
        this.msg = orderBuy.msg;
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

interface MineOrder{
    Comments:OrderBuyArrayBto[]
    Join:OrderBuyArrayBto[]
    Post:OrderBuyArrayBto[]
}
export class OrderBuyMineDto{
    code:string;
    data:MineOrder;
    msg:string;
    constructor(res:any){
        this.code = res.code;
        this.data = res.data;
        this.msg = res.msg;
    }
}