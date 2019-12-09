import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trabajador } from '../_interfaces/trabajadores.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  direccionApi = 'http://localhost:3000/trabajadores';
  constructor(private http: HttpClient) { }
  getTrabs(){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.get(`${this.direccionApi}/`,{headers:header});
  }
  altaTrab(trab: Trabajador){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.post(`${this.direccionApi}/registrar-trabajador/`,trab,{headers:header});
  }
  modificacionTrabajs(trab: Trabajador){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.put(`${this.direccionApi}/update-trabajador/${trab._id}`,trab,{headers:header});
  }
  eliminarTrab(id: String){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.delete(`${this.direccionApi}/remove-trabajador/${id}`,{headers:header});
  }
}
