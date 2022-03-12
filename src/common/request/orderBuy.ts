import qs from "qs";
import Request from "../request";
import { OrderBuyArrayDto, OrderBuyDetailDto, OrderBuyMineDto } from "../resultType/OrderBuy";
import { ResponseDataDto } from "../resultType/response";
const request = Request.GetInstance();

export const queryOrderBuyDetailById = async(orderID:string) => {
    const res = await request.Fetch(`/order/buy?orderID=${orderID}`,{},'GET');
    return new OrderBuyDetailDto(res.data);
}

export const addUserToBuyOrder = async(orderbuyID:string,userID:string) => {
    const res = await request.Fetch(`/order/buy?orderbuyID=${orderbuyID}&userID=${userID}`,{},'POST');
    return new ResponseDataDto(res.data);
}

export const queryOrderBuyList = async(param:{kind:string,page?:string,pagesize?:string}) => {
    const res = await request.Fetch(`/order/buy/list?${qs.stringify(param)}`,{},'GET');
    return new OrderBuyArrayDto(res.data);
}

export const queryOrderBuyListByUID = async(param:{userID:string}) => {
    const res = await request.Fetch(`/order/buy/list/queryOrderBuyListById?${qs.stringify(param)}`,{},'GET');
    return new OrderBuyMineDto(res.data);
}

export const addOrderBuy = async(
    body:{
        datetime?: string;
        time:string;
        numNeed:string;
        numExist?:number;
        heading:string;
        content:string;
        postID:string;
        full?:number;
        kind:number;
        location:string;
        picture:string;
        qq:string,
        wechat:string,
        tel:string
    }) => {
    const res = await request.Fetch(`/order/post/buy`,body,'POST');
    return new ResponseDataDto(res.data);
}