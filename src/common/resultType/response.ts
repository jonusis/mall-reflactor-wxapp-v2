interface ResponseDataBto{
    data: string;
    code: number;
    msg: string;
}
export class ResponseDataDto{
    data: string;
    code: number;
    msg: string;
    constructor(orderBuy:ResponseDataBto){
        this.data = orderBuy.data;
        this.code = orderBuy.code;
        this.msg = orderBuy.msg;
    }
}