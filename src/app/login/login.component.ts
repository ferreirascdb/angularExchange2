import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output()login= new EventEmitter<void>();
  
  @Output() trocarTela = new EventEmitter<void>();
  formLogin:FormGroup;
  
  mensagemErro: string | null = null;

  auth=inject(Auth);
  
  constructor(private fb: FormBuilder){
    this.formLogin = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }
  onSubmit(){
    if(this.formLogin.valid){
      const{email, senha}=this.formLogin.value;
      signInWithEmailAndPassword(this.auth, email, senha).then(userCredential=>{console.log(userCredential);
      this.login.emit(); 
      })
      .catch(error => {
          console.error('Erro de login:', error.message);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          this.mensagemErro = 'E-mail ou senha incorretos.';
        } else if (error.code === 'auth/invalid-email') {
          this.mensagemErro = 'E-mail inválido.';
        } else {
          this.mensagemErro = 'Erro ao fazer login. Tente novamente.';
        }
      });
      
    }
  }
  onCriarConta() {
    this.trocarTela.emit(); 
    console.log('cheguei aqui');
  }
}
