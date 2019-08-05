import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../../models/usuario.model'
import { Form, NgForm } from '@angular/forms';
import {Router} from '@angular/router'
import {AuthService} from '../../services/auth.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel

  constructor(private authService:AuthService,
              private router:Router) {

  }

  ngOnInit() { 
    this.usuario = new UsuarioModel;
  }

  registrarUsuario(forma:NgForm){

    if(forma.invalid){return} 
    Swal.fire({
      allowOutsideClick: false,
      type:"info",
      text:"Espera un momento"
    });

    Swal.showLoading()
    
    this.authService.registrar(this.usuario).subscribe((res)=>{
      Swal.close()
     
      console.log(res)
      this.router.navigateByUrl('/home');
    },(err)=>{
      console.log(err.error.Message);
      Swal.fire({
        title:'Error al ingresar',
        allowOutsideClick: true,
        type:"error",
        text:err.error.Message
      });
    })

  }

  




}
