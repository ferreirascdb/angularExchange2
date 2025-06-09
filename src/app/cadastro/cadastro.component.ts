import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  @Output() trocarTela = new EventEmitter<void>();
  formCadastro: FormGroup;
  auth = inject(Auth);
  
  constructor(private fb: FormBuilder){
    this.formCadastro= this.fb.group({
      email:['',[Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit(){
    if(this.formCadastro.valid){
      const {email, senha} = this.formCadastro.value;
      createUserWithEmailAndPassword(this.auth, email, senha)
        .then((userCredential) =>{
          console.log('Deu certo', userCredential.user);
        }).catch((error)=>{
          console.error(error.message);
        });
    }
  }
  onJaTenhoConta() {
    this.trocarTela.emit();
  }
}
