import { Component, OnInit } from '@angular/core';
import { faTasks,faHome,faMedkit,faUser,faToolbox, faClinicMedical,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faTasks = faTasks;
  faHome = faHome;
  faMedkit = faMedkit;
  faUser = faUser;
  faToolbox = faToolbox;
  faClinicMedical = faClinicMedical;
  faSignOutAlt = faSignOutAlt;


  constructor() { }

  ngOnInit() {
  }
  salir(){
    sessionStorage.removeItem('headerToken');
    location.reload();
  }

}
