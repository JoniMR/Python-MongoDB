import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bancos } from './bancos';
import { lastValueFrom } from 'rxjs';

const API_URL = 'http://localhost:8000/bancos';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  constructor(private http: HttpClient) { }

  getBancos(): Promise<Bancos[]> {
    return lastValueFrom(this.http.get<Bancos[]>(API_URL));
  }

  getBancosById(id: string): Promise<Bancos> {
    return lastValueFrom(this.http.get<Bancos>(`${API_URL}/${id}`));
  }

  addBancos(bancos: Bancos): Promise<string> {
    return lastValueFrom(this.http.post<string>(API_URL, bancos));
  }

  updateBancos(id: string, bancos: Bancos): Promise<void> {
    return lastValueFrom(this.http.put<void>(`${API_URL}/${id}`, bancos))
  }

  deleteBancos(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${API_URL}/${id}`));
  }
}
