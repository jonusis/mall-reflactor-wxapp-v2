export interface UserBto{
    uid:string;
    account: string;
    age:string;
    headPicture:number;
    name:number;
    password:string;
    qq:string;
    sex:string;
    stNum:number;
    tel:number;
    wechat:string;
}

export class UserDto{
    code:string;
    data:UserBto;
    msg:string;
    constructor(res:any){
        this.code = res.code;
        this.data = res.data;
        this.msg = res.msg;
    }
}