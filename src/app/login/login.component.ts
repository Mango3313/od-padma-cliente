import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import {responseToken} from '../classes/responseToken.class';
import {Router} from '@angular/router';
import { responseServer } from '../classes/responseServer.class';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('inputCorreo',{static:false}) inputCorreo:ElementRef;
  @ViewChild('inputPassword',{static:false}) inputPassword:ElementRef;
  @ViewChild('inputCorreoR',{static:false}) inputCorreoR:ElementRef;
  @ViewChild('inputPasswordR',{static:false}) inputPasswordR:ElementRef;
  toggleLogin: boolean = false;
  constructor(private authServ: AuthService,private router: Router) { }
  doLogin(){
    var password = this.inputPassword.nativeElement.value;
    var nombre = this.inputCorreo.nativeElement.value;
    if (password === '' || nombre ===''){
      console.log('Campos vacios');
    }else{
      this.authServ.obtenerToken(nombre,password).subscribe((data: responseToken)=>{
        //var response = JSON.parse(data.message)
        //console.log(data.token)
        if (typeof data.token !== 'undefined' && data.token !== null && data.token !== 'undefined'){
          sessionStorage.setItem('headerToken', data.token);
          this.router.navigate(['/','home']);
          //$state.go()
        }
      });
    }
  }
  doRegistro(){
    this.inputPasswordR.nativeElement.value = '';
    this.inputCorreoR.nativeElement.value = '';
    var password = this.inputPasswordR.nativeElement.value;
    var nombre = this.inputCorreoR.nativeElement.value;
    if (password === '' || nombre ===''){
      this.authServ.registrar(nombre,password).subscribe(
        (data: responseServer)=>{
          console.log(data)
          if(!data.error){
            this.toggleLogin = ! this.toggleLogin;
          }
        }
      );
    }
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    var gradientOb = document.getElementById('gradient');
    var colors = new Array(
      [62, 35, 255],
      [60, 255, 60],
      [255, 35, 98],
      [45, 175, 230],
      [255, 0, 255],
      [255, 128, 0]);

    var step = 0;
    //color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    var colorIndices = [0, 1, 2, 3];

    //transition speed
    var gradientSpeed = 0.002;
    setInterval(() => {
      if (gradientOb === undefined) return;

      var c0_0 = colors[colorIndices[0]];
      var c0_1 = colors[colorIndices[1]];
      var c1_0 = colors[colorIndices[2]];
      var c1_1 = colors[colorIndices[3]];

      var istep = 1 - step;
      var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
      var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
      var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
      var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

      var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
      var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
      var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
      var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

      gradientOb.style.background = "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))";

      gradientOb.style.background = "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)";

      step += gradientSpeed;
      if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

      }
    }, 10);
  }

}
