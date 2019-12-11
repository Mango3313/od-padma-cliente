import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicamento } from '../_interfaces/medicamento.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  direccionApi = 'https://pure-shore-99875.herokuapp.com/medicamentos';
  constructor(private http: HttpClient) { }
  getMedicos(){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.get(`${this.direccionApi}/`,{headers:header});
  }
  altaMedicos(medico: Medicamento){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.post(`${this.direccionApi}/registrar-meds/`,medico,{headers:header});
  }
  modificacionMedicos(medico: Medicamento){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.put(`${this.direccionApi}/update-meds/${medico._id}`,medico,{headers:header});
  }
  eliminarMedic(id: String){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.delete(`${this.direccionApi}/remove-meds/${id}`,{headers:header});
  }
}
