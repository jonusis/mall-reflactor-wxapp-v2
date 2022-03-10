import qs from "qs";
import Request from "../request";
import { OrderBuyArrayDto, OrderBuyDetailDto } from "../resultType/OrderBuy";
import { ResponseDataDto } from "../resultType/response";
const request = Request.GetInstance();

export const queryOrderBuyDetailById = async(orderID:string) => {
    const res = await request.Fetch(`/order/buy?orderID=${orderID}`,{},'GET');
    return new OrderBuyDetailDto(res);
}

export const addUserToBuyOrder = async(orderbuyID:string,orderID:string) => {
    const res = await request.Fetch(`/order/buy?orderID=${orderID}&orderbuyID=${orderbuyID}`,{},'POST');
    return new ResponseDataDto(res);
}

export const queryOrderBuyList = async(param:{kind:string,page?:string,pagesize?:string}) => {
    const res = await request.Fetch(`/order/buy/list?${qs.stringify(param)}`,{},'GET');
    return new OrderBuyArrayDto(res);
}

export const queryOrderBuyListById = async(param:{userID:string,page?:string,pagesize?:string}) => {
    const res = await request.Fetch(`/order/buy/list/queryOrderBuyListById?${qs.stringify(param)}`,{},'GET');
    return new OrderBuyArrayDto(res);
}

export const addOrderBuy = async(
    body:{
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
    }) => {
    const res = await request.Fetch(`/order/post/buy`,body,'GET');
    return new ResponseDataDto(res);
}