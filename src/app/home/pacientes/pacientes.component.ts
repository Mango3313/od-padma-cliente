import { Component, OnInit, ViewChild, ElementRef, TemplateRef, Directive, AfterViewInit } from '@angular/core';
import { PacientesService } from 'src/app/_services/pacientes.service';
import { MedicamentosService } from 'src/app/_services/medicamentos.service';
import { MedicosService } from 'src/app/_services/medicos.service';
import { Medicamento } from 'src/app/_interfaces/medicamento.interface';
import { Doctor } from 'src/app/_interfaces/doctor.interface';
import { responseServer } from 'src/app/classes/responseServer.class';
import { Paciente } from 'src/app/_interfaces/paciente.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit{
  medicinas: Medicamento[] = [];
  doctores: Doctor[] = [];
  pacientes: Paciente[] = [];
  doesMod: Boolean = false;
  idToMod: Paciente = null;
  //
  @ViewChild('inputNombre', { static: true }) inputNombre: ElementRef;
  @ViewChild('inputObs', { static: true }) inputObs: ElementRef;
  @ViewChild('selectDoc', { static: true }) selectDoc: ElementRef;
  @ViewChild('selectMed', { static: true }) selectMed: ElementRef;
  @ViewChild('inputNNombre', { static: true }) inputNNombre: ElementRef;
  @ViewChild('inputNObs', { static: true }) inputNObs: ElementRef;
  @ViewChild('selectNDoc', { static: true }) selectNDoc: ElementRef;
  @ViewChild('selectNMed', { static: true }) selectNMed: ElementRef;
  @ViewChild('selectNEdo', { static: true }) selectNEdo: ElementRef;
  @ViewChild('selectNProg', { static: true }) selectNProg: ElementRef;
  @ViewChild('inputFechaIn', { static: true }) inputFechaIn: ElementRef;
  @ViewChild('inputFechaUV', { static: true }) inputFechaUV: ElementRef;
  @ViewChild('inputFechaPV', { static: true }) inputFechaPV: ElementRef;
  @ViewChild('inputFechaS', { static: true }) inputFechaS: ElementRef;
  @ViewChild('inputVisitas', { static: true }) inputVisitas: ElementRef;
  constructor(private pacienteService: PacientesService, private medService: MedicamentosService, private docService: MedicosService, private modalService: NgbModal) { }
  ngOnInit() {
    this.loadData();
  }
  editar(event){
    var id = event.target.id;
    var strId = ('' + id).replace('g_', '');
    var pacMod = this.pacientes.find(element => element._id === strId);
    this.idToMod = pacMod;
    this.inputNNombre.nativeElement.value = pacMod.nombre;
    this.inputNObs.nativeElement.value = pacMod.observaciones;
    this.selectNDoc.nativeElement.value = pacMod.id_doctor;
    this.selectNMed.nativeElement.value = pacMod.id_med;
    this.selectNEdo.nativeElement.value = pacMod.estado;
    this.selectNProg.nativeElement.value = pacMod.progreso;
    this.inputFechaIn.nativeElement.value = new Date(Number(pacMod.fecha_ingreso)).toLocaleDateString('es-MX');
    this.inputFechaPV.nativeElement.value = new Date(pacMod.fecha_proxima_visita).toLocaleDateString('es-MX');
    this.inputFechaUV.nativeElement.value = new Date(pacMod.fecha_ultima_visita).toLocaleDateString('es-MX');
    this.inputFechaS.nativeElement.value = new Date(pacMod.fecha_aprox_salida).toLocaleDateString('es-MX');
    this.inputVisitas.nativeElement.value = pacMod.num_visitas;
    console.log(new Date(Number(pacMod.fecha_ingreso)).toLocaleDateString('es-MX'))
  }
  modificar(){
    this.idToMod.nombre = this.inputNNombre.nativeElement.value;
    this.idToMod.observaciones =this.inputNObs.nativeElement.value ;
    this.idToMod.id_doctor =this.selectNDoc.nativeElement.value ;
    this.idToMod.id_med =this.selectNMed.nativeElement.value ;
    this.idToMod.estado =this.selectNEdo.nativeElement.value ;
    this.idToMod.progreso =this.selectNProg.nativeElement.value ;
    //this.inputFechaIn.nativeElement.value = new Date(Number(pacMod.fecha_ingreso)).toLocaleDateString('es-MX');
    //this.inputFechaPV.nativeElement.value = new Date(pacMod.fecha_proxima_visita).toLocaleDateString('es-MX');
    //this.inputFechaUV.nativeElement.value = new Date(pacMod.fecha_ultima_visita).toLocaleDateString('es-MX');
    //this.inputFechaS.nativeElement.value = new Date(pacMod.fecha_aprox_salida).toLocaleDateString('es-MX');
    this.idToMod.num_visitas =this.inputVisitas.nativeElement.value;
    this.pacienteService.modificacionMedicos(this.idToMod).subscribe(
      (data: responseServer)=>{
        console.log(data)
        this.inputNNombre.nativeElement.value = '';
    this.inputNObs.nativeElement.value = '';
    this.selectNDoc.nativeElement.value = '';
    this.selectNMed.nativeElement.value = '';
    this.selectNEdo.nativeElement.value = '';
    this.selectNProg.nativeElement.value = '';
    this.inputFechaIn.nativeElement.value = '';
    this.inputFechaPV.nativeElement.value = '';
    this.inputFechaUV.nativeElement.value = '';
    this.inputFechaS.nativeElement.value = '';
    this.inputVisitas.nativeElement.value = '';
    this.doesMod = ! this.doesMod;
      }
    );
  }
  altaPaciente() {
    var nombre = this.inputNNombre.nativeElement.value;
    var obs = this.inputNObs.nativeElement.value;
    var doc = this.selectNDoc.nativeElement.value;
    var med = this.selectNMed.nativeElement.value;
    var dateNow = Date.now();
    var dateEx = new Date(dateNow);
    dateEx.setDate(dateEx.getDate() + 120);
    var dateProx = new Date(dateNow);
    dateProx.setDate(dateProx.getDate() + 45);
    if (nombre !== '' && doc !== '' && med !== '') {
      var paciente = {
        _id: null,
        nombre: nombre,
        estado: "Inactivo",
        progreso: "Recien ingresado",
        fecha_ingreso: dateNow.toString(),
        num_visitas: 0,
        fecha_ultima_visita: "",
        fecha_proxima_visita: dateProx.toDateString(),
        fecha_aprox_salida: dateEx.toDateString(),
        id_doctor: doc,
        id_med: med,
        observaciones: obs
      };
      this.pacienteService.altaMedicos(paciente).subscribe(
        (data: responseServer) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data);
            this.inputNNombre.nativeElement.value = '';
            this.inputNObs.nativeElement.value = '';
            this.selectNDoc.nativeElement.value = '';
            this.selectNMed.nativeElement.value = '';
            this.loadData();
          }
        }
      );
    }
  }
  loadData() {
    this.medService.getMedicos().subscribe(
      (data: responseServer) => {
        var json = JSON.parse(JSON.stringify(data.message))
        this.medicinas = json
      }
    );
    this.docService.getMedicos().subscribe(
      (data: responseServer) => {
        var json = JSON.parse(JSON.stringify(data.message))
        this.doctores = json
      }
    );
    this.pacienteService.getMedicos().subscribe(
      (data: responseServer) => {
        var json = JSON.parse(JSON.stringify(data.message))
        this.pacientes = json
      }
    );
  }
  /**
   *  guardarMedicamento(event) {
     var id = event.target.id;
     var strId = ('' + id).replace('g_', '');
     console.log(strId);
     var elemento = this.meds.find(element => element._id === strId);
     var newnombre = (document.getElementById('nomM_' + strId) as HTMLInputElement).value;
     var newdosis = (document.getElementById('dos_' + strId) as HTMLInputElement).value;
     var newhora = (document.getElementById('hora_' + strId) as HTMLInputElement).value;
     var newdesc = (document.getElementById('desc_' + strId) as HTMLInputElement).value;
     elemento.nombre = newnombre;
     elemento.dosis = newdosis;
     elemento.hora_aplicacion = newhora;
     elemento.descripcion = newdesc;
     this.pacienteService.modificacionMedicos(elemento).subscribe(data => {
       console.log(data)
       this.getMeds();
     });
   }
   * 
   */
  eliminarMedicamento(event) {
    var id = event.target.id;
    var strId = ('' + id).replace('e_', '');
    this.pacienteService.eliminarMedic(strId).subscribe(data => {
      console.log(data)
      this.loadData();
    });
  }
  /**
   * 
   * 

   * 
   */


}
