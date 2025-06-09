import { Injectable } from '@angular/core';
import { Conversao } from '../model/conversao.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private chave = 'conversoesCache';

  getConversoes(): Conversao[] {
    const cache = localStorage.getItem(this.chave);
    return cache ? JSON.parse(cache) : [];
  }

  adicionarConversao(conversao: Conversao): void {
    const conversoes = this.getConversoes();
    conversoes.unshift(conversao);
    localStorage.setItem(this.chave, JSON.stringify(conversoes.slice(0, 10))); 
  }

  limparConversoes(): void {
    localStorage.removeItem(this.chave);
  }
}
