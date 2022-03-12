import qs from "qs";
import Request from "../request";
import { UserBto, UserDto } from "../resultType/user";
const request = Request.GetInstance();

export const getUserInfo = async(uid:string) => {
    const res = await request.Fetch(`/user/info?uid=${uid}`,{},'GET');
    return new UserDto(res.data);
}

export const updateUserInfo = async(body:UserBto) => {
    const res = await request.Fetch(`/user/info`,body,'PUT');
    return new UserDto(res.data);
}

export const loginUser = async(param:{account:string,password:string}) => {
    const res = await request.Fetch(`/v1/user/login?${qs.stringify(param)}`,{},'POST');
    return new UserDto(res.data);
}