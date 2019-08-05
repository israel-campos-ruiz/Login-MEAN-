import { Injectable } from '@angular/core';
import {UsuarioModel} from '../models/usuario.model';
import {JwtModel} from '../models/jwt.model';
import {HttpClient} from '@angular/common/http';
import {tap, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // los end point son register y login 
  url = 'http://localhost:3000' 
  usuario:UsuarioModel;
  dataUser:JwtModel
 private UserToken:string;
  constructor(private http:HttpClient) {
    this.leerToken();

   }

   
  

   registrar(usuario:UsuarioModel){
     return this.http.post(`${this.url}/register`,usuario)
     .pipe(
       tap((res:JwtModel)=>{
           // salvar el token 
           this.saveToken(res.dataUser.token,res.dataUser.expiresIn);
 
          
   
         
       })
    )}


    ingresar(usuario:UsuarioModel){
      return this.http.post<JwtModel>(`${this.url}/login`,usuario)
      .pipe(
        tap((res:JwtModel)=>{
          if(res){
            console.log(res);
            //salvar el token el jwtmodel debe de coincidir con los nombres que tenga el back
            console.log('/////////8888////',res);
            this.saveToken(res.dataUser.token,res.dataUser.expiresIn);
            
         

            
          }
        })
     )}
          
   
     saveToken( idToken:string,expire:string){
       localStorage.setItem("token",idToken)
       localStorage.setItem('Expira',expire)
       this.UserToken = idToken;
     }
    

     leerToken(){
      if( localStorage.getItem("token")){
        this.UserToken =  localStorage.getItem("token");
      }else{
        this.UserToken = '';
      }
     }


     tieneToken():boolean{
       return this.UserToken.length > 2
       
     }
    
    

}

