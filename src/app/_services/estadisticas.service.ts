import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { responseServer } from '../classes/responseServer.class';

@Injectable()
export class EstadisticasService {
  rutaApiDoctores = "http://localhost:3000/doctores";
  rutaApiTrabajadores = "http://localhost:3000/trabajadores";
  rutaApiMedicamentos = "http://localhost:3000/medicamentos";

  constructor(private http: HttpClient) {
  }
  getDoctores(){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    //console.log(header)
    return this.http.get<responseServer>(`${this.rutaApiDoctores}/`,{headers:header});
  }
  getTrabajadores(){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.get<responseServer>(`${this.rutaApiTrabajadores}/`,{headers:header});
  }
  getMedicamentos(){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.get<responseServer>(`${this.rutaApiMedicamentos}/`,{headers:header});
  }
}
