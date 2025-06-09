import { Injectable } from "@angular/core";
import { criptoType } from "../types/cripto.type";
import { HttpClient } from "@angular/common/http";
import { response } from "express";
import {auth} from '../auth/auth'
import {map} from 'rxjs';
const chave = auth.exchangekey;
@Injectable({ providedIn: 'root' })

export class CriptoService{
    criptoResponse: criptoType = {
    code: '',
    codein:'',
    name: '',
    high:'',
    low: '',
    varBid: '',
    pctChange : '',
    bid: '',
    ask: '',
    timestamp: '',
    create_date: '',
    };
    
    constructor(private readonly httpClient: HttpClient){}
    getCripto(parMoedas: string) {
        return this.httpClient
            .get<any>(`https://economia.awesomeapi.com.br/json/last/${parMoedas}?token=${chave}`)
            .pipe(
         map((response) => response) // o acesso ao campo específico é feito no componente
        );
    }
    
}