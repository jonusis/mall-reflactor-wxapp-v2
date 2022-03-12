export interface CommentsBto{
    id: string;
    content: string;
    datetime: string;
    username?:string;
    headpicture?:string;
    orderbuyID?: number;
    ordercarID?:number;
    userID:string;
}
export class CommentsDto{
    data: string;
    code: string;
    msg: string;
    constructor(comments:any){
        this.data = comments.data;
        this.code = comments.code;
        this.msg = comments.msg;
    }
}