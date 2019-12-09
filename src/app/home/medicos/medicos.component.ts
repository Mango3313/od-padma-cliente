import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MedicosService } from 'src/app/_services/medicos.service';
import { Doctor } from 'src/app/_interfaces/doctor.interface';
import { responseServer } from 'src/app/classes/responseServer.class';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  @ViewChild('inputNombreMedico', { static: false }) inputNombreMedico: ElementRef;
  @ViewChild('inputTelefonoMedico', { static: false }) inputTelefonoMedico: ElementRef;
  medicos: Doctor[] = [];
  constructor(private medicosService: MedicosService) { }
  altaMedico() {
    var nombre = this.inputNombreMedico.nativeElement.value;
    var tel = this.inputTelefonoMedico.nativeElement.value;
    if (nombre !== '' && tel !== '') {
      var doctor ={_id:null,nombre:nombre,telefono:tel,pacientes:[]};
      this.medicosService.altaMedicos(doctor).subscribe(
        (data: responseServer)=>{
          if(data.error){
            console.log(data.error);
          }else{
            console.log(data);
            this.inputTelefonoMedico.nativeElement.value = '';
            this.inputTelefonoMedico.nativeElement.value = '';
            this.loadMedicos();
          }
        }
      );
    }
  }
  loadMedicos(){
    this.medicosService.getMedicos().subscribe(
      (data: responseServer) => {
        var json = JSON.parse(JSON.stringify(data.message))
        this.medicos = json
      }
    );
  }
  ngOnInit() {
    this.loadMedicos();
  }

}
