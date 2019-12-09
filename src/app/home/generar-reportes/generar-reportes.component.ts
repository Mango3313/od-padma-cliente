import { Component, OnInit } from '@angular/core';
import {EstadisticasService} from '../../_services/estadisticas.service';
import { responseServer } from 'src/app/classes/responseServer.class';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/_interfaces/doctor.interface';
import { Trabajador } from 'src/app/_interfaces/trabajadores.interface';
import { Medicamento } from 'src/app/_interfaces/medicamento.interface';

@Component({
  selector: 'app-generar-reportes',
  templateUrl: './generar-reportes.component.html',
  styleUrls: ['./generar-reportes.component.scss']
})
export class GenerarReportesComponent implements OnInit {

  doctores: Doctor[] = [];
  trabajadores: Trabajador[] = [];
  medicamentos: Medicamento[] = [];
  constructor(private estService: EstadisticasService) { }

  ngOnInit() {
    this.estService.getDoctores().subscribe((data: responseServer) =>{
      var json = JSON.parse(JSON.stringify(data.message))
      this.doctores = json
    });
    this.estService.getTrabajadores().subscribe(data =>{
      var json = JSON.parse(JSON.stringify(data.message))
      console.log(json)
      this.trabajadores = json
    });
    this.estService.getMedicamentos().subscribe(data=>{
      var json = JSON.parse(JSON.stringify(data.message))
      this.medicamentos = json
      //this.medicamentos = data
    });
  }

}
