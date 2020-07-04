import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Menu } from '../../interfaces/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {


  menuOpt: Observable<Menu[]>;

  constructor(private dataService: DataService, public auth: AuthService) { }

  ngOnInit() {
    this.menuOpt = this.dataService.getMenu();
  }


  logOut() {
    this.auth.logOut();
  }

}
