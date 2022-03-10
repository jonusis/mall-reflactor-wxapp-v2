interface ResponseDataBto{
    data: string;
    code: string;
    msg: string;
}
export class ResponseDataDto{
    data: string;
    code: string;
    msg: string;
    constructor(orderBuy:ResponseDataBto){
        this.data = orderBuy.data;
        this.code = orderBuy.code;
        this.msg = orderBuy.msg;
    }
}