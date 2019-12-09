import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PersonalService } from 'src/app/_services/personal.service';
import { responseServer } from 'src/app/classes/responseServer.class';
import { Trabajador } from 'src/app/_interfaces/trabajadores.interface';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  @ViewChild('inputNombreMed', { static: false }) inputNombreMed: ElementRef;
  @ViewChild('inputHora', { static: false }) inputHora: ElementRef;
  @ViewChild('textAreaDesc', { static: false }) textAreaDesc: ElementRef;
  trabajadores: Trabajador[] = [];
  constructor(private personalService: PersonalService) { }

  ngOnInit() {
    this.getPersonal();
  }
  getPersonal(){
    this.personalService.getTrabs().subscribe(
      (data: responseServer)=>{
        var json = JSON.parse(JSON.stringify(data.message))
        this.trabajadores = json
      }
    );
  }
  altaPersonal() {
    var nombre = this.inputNombreMed.nativeElement.value;
    var hora = this.inputHora.nativeElement.value;
    var desc = this.textAreaDesc.nativeElement.value;
   
    if (nombre !== '' && hora !== '' && desc !== '') {
      var doctor = { _id: null, nombre: nombre, telefono: hora, puesto: desc,};
      this.personalService.altaTrab(doctor).subscribe(
        (data: responseServer) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data);
            this.inputNombreMed.nativeElement.value='';
            this.inputHora.nativeElement.value='';
            this.textAreaDesc.nativeElement.value='';
            this.getPersonal();
          }
        }
      );
    }
  }
  guardarPersonal(event){
    var id = event.target.id;
    var strId = (''+id).replace('g_','');
    console.log(strId);
    var elemento = this.trabajadores.find(element => element._id === strId);
    var newnombre = (document.getElementById('nomM_'+strId) as HTMLInputElement).value;
    var newdosis = (document.getElementById('dos_'+strId) as HTMLInputElement).value;
    var newhora = (document.getElementById('hora_'+strId) as HTMLInputElement).value;
    elemento.nombre = newnombre;
    elemento.telefono = newdosis;
    elemento.puesto = newhora;
    this.personalService.modificacionTrabajs(elemento).subscribe(data=>{
      console.log(data)
      this.getPersonal();
    });
  }
  eliminarPersonal(event){
    var id = event.target.id;
    var strId = (''+id).replace('e_','');
    this.personalService.eliminarTrab(strId).subscribe(data=>{
      console.log(data)
      this.getPersonal();
    });
  }

}
