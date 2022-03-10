import Request from "../request";
import { CommentsBto } from "../resultType/Comments";
import { ResponseDataDto } from "../resultType/response";
const request = Request.GetInstance();


export const addComments = async(body:CommentsBto) => {
    const res = await request.Fetch(`/comments/addComments`,body,'POST');
    return new ResponseDataDto(res);
}

export const updateComments = async(body:CommentsBto) => {
    const res = await request.Fetch(`/comments/updateComments`,body,'PUT');
    return new ResponseDataDto(res);
}

export const deleteComments = async(id:string) => {
    const res = await request.Fetch(`/comments/deleteComments?id=${id}`,{},'DELETE');
    return new ResponseDataDto(res);
}