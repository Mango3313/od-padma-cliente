import { Injectable } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { responseServer } from '../classes/responseServer.class';
import { Solicitud } from '../_interfaces/solicitud.interface';

@Injectable()
export class SolicitudesService {
  rutaApiSolicitud = 'https://pure-shore-99875.herokuapp.com/peticiones'
  constructor(private http: HttpClient) { }
  getSolicitudes(){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    //console.log(header)
    return this.http.get<responseServer>(`${this.rutaApiSolicitud}/`,{headers:header});
  }
  modificarSolicitud(solicitud: Solicitud){
    var header = new HttpHeaders({"Authorization":'Bearer '+sessionStorage.getItem('headerToken'),'Content-Type': 'application/json',});
    return this.http.put(`${this.rutaApiSolicitud}/update-peticion/${solicitud._id}`,solicitud,{headers:header},);
  }
}
