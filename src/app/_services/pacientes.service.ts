import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../_interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient) { }
  direccionApi = 'http://localhost:3000/pacientes';
  getMedicos(){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.get(`${this.direccionApi}/`,{headers:header});
  }
  altaMedicos(medico: Paciente){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.post(`${this.direccionApi}/registrar-paciente/`,medico,{headers:header});
  }
  modificacionMedicos(medico: Paciente){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.put(`${this.direccionApi}/update-paciente/${medico._id}`,medico,{headers:header});
  }
  eliminarMedic(id: String){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.delete(`${this.direccionApi}/remove-paciente/${id}`,{headers:header});
  }
}
