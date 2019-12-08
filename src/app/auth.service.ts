import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
  rutaApi = "http://localhost:3000/usuarios";
  constructor(private http: HttpClient) { 
  }
  obtenerToken(nombre: string,password:string){
   return this.http.post(`${this.rutaApi}/login`,JSON.stringify({nombre:nombre,password:password}));   
  }
}
