import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-domicilio-nuevo',
  templateUrl: './domicilio-nuevo.page.html',
  styleUrls: ['./domicilio-nuevo.page.scss'],
})
export class DomicilioNuevoPage implements OnInit {


  domicilio: FormGroup;

  constructor(public userService: UserService, private router: Router) { 
    this.domicilio = new FormGroup({
      street: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      sub: new FormControl(null, Validators.required),
      street1: new FormControl(null),
      street2: new FormControl(null),
      references: new FormControl(null)
    });
  }

  ngOnInit() {
  }

  guardar() {

    if(this.domicilio.valid) {
      this.userService.createAddress(this.domicilio.value)
        .subscribe((res) => {
          console.log(res)
          this.domicilio.reset();
          this.router.navigate(['/domicilio']);
        }, err=> console.error(err))
    }
  }

}
