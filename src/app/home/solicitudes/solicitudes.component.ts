import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from 'src/app/_services/solicitudes.service';
import { responseServer } from 'src/app/classes/responseServer.class';
import { Solicitud } from 'src/app/_interfaces/solicitud.interface';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  solicitudes: Solicitud[] = [];
  summaries:String[] = ['Pendiente','Aceptada','Negada'];
  constructor(private solicitudService: SolicitudesService) { }

  guardarPeticion(event){
    var id = event.target.id;
    var elemento = this.solicitudes.find(element => element._id === id);
    var newedo = (document.getElementById('s_'+id) as HTMLSelectElement).value;
    elemento.estado = newedo;
    this.solicitudService.modificarSolicitud(elemento).subscribe(data=>{
      console.log(data)
    });
  }
  ngOnInit() {
    this.solicitudService.getSolicitudes().subscribe(
      (data: responseServer) => {
        var json = JSON.parse(JSON.stringify(data.message))
        this.solicitudes = json
      }
    );
  }

}
