import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
  rutaApi = "https://pure-shore-99875.herokuapp.com/usuarios";
  constructor(private http: HttpClient) { 
  }
  obtenerToken(nombre: string,password:string){
   return this.http.post(`${this.rutaApi}/login`,JSON.stringify({nombre:nombre,password:password}));   
  }
  registrar(nombre: string,password:string){
    return this.http.post(`${this.rutaApi}/crear-usuario`,JSON.stringify({nombre:nombre,password:password}));
  }
}
