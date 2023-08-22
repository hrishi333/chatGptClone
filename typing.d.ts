
interface Message{
    text:string,
    createdAt:admin.firestore.timestamp;
    user:{
        _id:string,
        name:string,
        avatar:string
    };
}