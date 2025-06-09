import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { criptoType } from '../../types/cripto.type';
import { CriptoService } from '../../services/cripto.service';
import { FormBuilder } from '@angular/forms';
import { CriptoModel } from '../../model/cripto.model';
import { CommonModule } from '@angular/common';
import { CacheService } from '../../services/cache.service';
import { Conversao } from '../../model/conversao.model';

@Component({
  standalone: true,
  selector: 'app-consulta-cripto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './consulta-cripto.component.html',
  styleUrls: ['./consulta-cripto.component.css']
})
export class ConsultaCriptoComponent implements OnInit {
  mostrarResultado: boolean = false;
  formCripto: FormGroup;
  conversoes: Conversao[] = [];

  criptoResponse: criptoType = {
    code: '',
    codein: '',
    name: '',
    high: '',
    low: '',
    varBid: '',
    pctChange: '',
    bid: '',
    ask: '',
    timestamp: '',
    create_date: '',
  };

  constructor(
    private readonly criptoService: CriptoService,
    private formBuilder: FormBuilder,
    private readonly cacheService: CacheService,
  ) {
    this.formCripto = this.formBuilder.group({
      moedaOrigem: new FormControl(''),
      moedaDestino: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.creatFormCripto(new CriptoModel());
    this.conversoes = this.cacheService.getConversoes();
  }

  creatFormCripto(criptoModel: CriptoModel) {
    this.formCripto = this.formBuilder.group({
      moedaOrigem: [criptoModel.cripto],
      moedaDestino: ['']
    });
  }

  onSubmitCriptoForm() {
    this.mostrarResultado = false;

    const { moedaOrigem, moedaDestino } = this.formCripto.value;
    const origem = moedaOrigem.trim().toUpperCase();
    const destino = moedaDestino.trim().toUpperCase();
    const parMoedas = `${origem}-${destino}`;

    console.log(`Par consultado: ${parMoedas}`);

    this.criptoService.getCripto(parMoedas).subscribe(
      (response) => {
        const key = `${origem}${destino}`;
        this.criptoResponse = response[key];
        this.mostrarResultado = true;

        const conversao: Conversao = {
          moedaOrigem: origem,
          moedaDestino: destino,
          valorCompra: this.criptoResponse.bid,
          valorVenda: this.criptoResponse.ask,
          dataHora: new Date().toLocaleString()
        };

        this.cacheService.adicionarConversao(conversao);
        this.conversoes = this.cacheService.getConversoes();
      },
      (error) => {
        console.error('Erro ao buscar cotação:', error);
      }
    );
  }
}
