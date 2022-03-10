import Request from "../request";
import { UserBto, UserDto } from "../resultType/user";
const request = Request.GetInstance();

export const getUserInfo = async(uid:string) => {
    const res = await request.Fetch(`/user/info?uid=${uid}`,{},'GET');
    return new UserDto(res);
}

export const updateUserInfo = async(body:UserBto) => {
    const res = await request.Fetch(`/user/info`,body,'PUT');
    return new UserDto(res);
}