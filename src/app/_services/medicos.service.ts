import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctor } from '../_interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  direccionApiMedicos = 'https://pure-shore-99875.herokuapp.com/doctores';
  constructor(private http: HttpClient) { }
  getMedicos(){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.get(`${this.direccionApiMedicos}/`,{headers:header});
  }
  altaMedicos(medico: Doctor){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.post(`${this.direccionApiMedicos}/registrar-doctor/`,medico,{headers:header});
  }
  modificacionMedicos(medico: Doctor){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.post(`${this.direccionApiMedicos}/update-doctor/+`,medico,{headers:header});
  }
}
