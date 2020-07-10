import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Domicilio } from 'src/app/interfaces/domicilio.interface';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.page.html',
  styleUrls: ['./domicilio.page.scss'],
})
export class DomicilioPage implements OnInit {

  domicilios: Array<Domicilio> = [];
  radioOpt;

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getDoms();
  }

  getDoms() {
    this.userService.getAddresses()
      .subscribe((resp: Domicilio[]) => {
        this.domicilios = resp;
        console.log(this.domicilios);
      }, err => console.log(err));
  }

}
