import Request from "../request";
import { CommentsBto, CommentsDto } from "../resultType/Comments";
import { ResponseDataDto } from "../resultType/response";
const request = Request.GetInstance();


export const addComments = async(body:any,orderID:string) => {
    const res = await request.Fetch(`/comments/addComments?orderID=${orderID}`,body,'POST');
    return new ResponseDataDto(res.data);
}

export const getComments = async(orderID:string) => {
    const res = await request.Fetch(`/comments/Comments?orderID=${orderID}`,{},'GET');
    return new CommentsDto(res.data);
}

export const updateComments = async(body:CommentsBto) => {
    const res = await request.Fetch(`/comments/updateComments`,body,'PUT');
    return new ResponseDataDto(res.data);
}

export const deleteComments = async(id:string) => {
    const res = await request.Fetch(`/comments/deleteComments?id=${id}`,{},'DELETE');
    return new ResponseDataDto(res.data);
}