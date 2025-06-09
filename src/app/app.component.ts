import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ConsultaCriptoComponent} from './consulta-cripto/consulta-cripto.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
            ConsultaCriptoComponent, 
            LoginComponent, 
            CommonModule,
            CadastroComponent,
            HttpClientModule
            ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'consulta-cripto';
  usuarioLogado=false;
  mostrarCadastro = false;

  

  trocarTela(){
    this.mostrarCadastro = !this.mostrarCadastro;
    console.log('pegando');
  }


  aologar(){
    this.usuarioLogado = true;
  }
}
