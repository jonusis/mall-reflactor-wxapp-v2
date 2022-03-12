export interface UserBto{
    uid:string;
    account: string;
    age:string;
    headPicture:string;
    name:string;
    password?:string;
    qq:string;
    sex:number;
    stNum?:number;
    tel:string;
    wechat:string;
}

export class UserDto{
    code:number;
    data:UserBto;
    msg:string;
    constructor(res:any){
        this.code = res.code;
        this.data = res.data;
        this.msg = res.msg;
    }
}