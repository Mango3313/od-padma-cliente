import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MedicamentosService } from 'src/app/_services/medicamentos.service';
import { responseServer } from 'src/app/classes/responseServer.class';
import { Medicamento } from 'src/app/_interfaces/medicamento.interface';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss']
})
export class MedicamentosComponent implements OnInit {

  @ViewChild('inputNombreMed', { static: false }) inputNombreMed: ElementRef;
  @ViewChild('inputHora', { static: false }) inputHora: ElementRef;
  @ViewChild('textAreaDesc', { static: false }) textAreaDesc: ElementRef;
  @ViewChild('inputDosis', { static: false }) inputDosis: ElementRef;
  @ViewChild('inputCantidad', { static: false }) inputCantidad: ElementRef;
  meds: Medicamento[] = [];
  constructor(private medsService: MedicamentosService) { }

  ngOnInit() {
    this.getMeds()
  }
  altaMedico() {
    var nombre = this.inputNombreMed.nativeElement.value;
    var hora = this.inputHora.nativeElement.value;
    var desc = this.textAreaDesc.nativeElement.value;
    var dosis = this.inputDosis.nativeElement.value;
    var cantidad = this.inputCantidad.nativeElement.value;
    if (nombre !== '' && hora !== '' && desc !== '' && dosis !== '' && cantidad !== '') {
      var doctor = { _id: null, nombre: nombre, descripcion: desc, dosis: dosis, hora_aplicacion: hora, cantidad: cantidad };
      this.medsService.altaMedicos(doctor).subscribe(
        (data: responseServer) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log(data);
            this.inputNombreMed.nativeElement.value='';
            this.inputHora.nativeElement.value='';
            this.textAreaDesc.nativeElement.value='';
            this.inputDosis.nativeElement.value='';
            this.inputCantidad.nativeElement.value='';
            this.getMeds();
          }
        }
      );
    }
  }
  getMeds() {
    this.medsService.getMedicos().subscribe(
      (data: responseServer) => {
        var json = JSON.parse(JSON.stringify(data.message))
        this.meds = json
      }
    );
  }
  guardarMedicamento(event){
    var id = event.target.id;
    var strId = (''+id).replace('g_','');
    console.log(strId);
    var elemento = this.meds.find(element => element._id === strId);
    var newnombre = (document.getElementById('nomM_'+strId) as HTMLInputElement).value;
    var newdosis = (document.getElementById('dos_'+strId) as HTMLInputElement).value;
    var newhora = (document.getElementById('hora_'+strId) as HTMLInputElement).value;
    var newdesc = (document.getElementById('desc_'+strId) as HTMLInputElement).value;
    elemento.nombre = newnombre;
    elemento.dosis = newdosis;
    elemento.hora_aplicacion = newhora;
    elemento.descripcion = newdesc;
    this.medsService.modificacionMedicos(elemento).subscribe(data=>{
      console.log(data)
      this.getMeds();
    });
  }
  eliminarMedicamento(event){
    var id = event.target.id;
    var strId = (''+id).replace('e_','');
    this.medsService.eliminarMedic(strId).subscribe(data=>{
      console.log(data)
      this.getMeds();
    });
  }

}
