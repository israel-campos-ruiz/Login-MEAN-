export interface JwtModel{
    dataUser : {
        id:string,
        nombre:string,
        email:string,
        token:string,
        expiresIn:string
    }
}