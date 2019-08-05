import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { Router, Route } from '@angular/router'
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  constructor(private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.usuario = new UsuarioModel;
  }

  enviar(forma: NgForm) {

    if (forma.invalid) { return }

    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espera un momento"
    });

    Swal.showLoading()

    this.authService.ingresar(this.usuario).subscribe(res => {
      console.log('desde el login component', res);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {

      Swal.fire({
        title: 'Error al ingresar',
        allowOutsideClick: true,
        type: "error",
        text: err.error.err.message
      });

      console.log(err.error.err.message)
    });

  }
}
