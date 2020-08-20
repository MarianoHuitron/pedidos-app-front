import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    private menuCtrl: MenuController, 
    public authService: AuthService, 
    private router: Router, 
  ) {   
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFub2hkMTQiLCJhIjoiY2sxb2wzaWJuMDBoMDNobXU5emdyYjUwaSJ9.3vjhZBBpCCTIEMITcH4W3w';
  }


  map: mapboxgl.Map;

  ngOnInit() {
    this.menuCtrl.enable(false) 
  }

  ionViewWillEnter() {
    
    this.menuCtrl.enable(false)
    if(this.authService.isLogged()) {
      this.router.navigate(['/home']);
    }
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      center: [-105.2315814, 21.7335187],
      style: 'mapbox://styles/mapbox/streets-v11',
      scrollZoom: false,
      zoom: 16,
    });

    let marker = new mapboxgl.Marker()
      .setLngLat([-105.2318026, 21.7336108])
      .setPopup(new mapboxgl.Popup().setHTML("<h4>Panadería San José</h4>"))
      .addTo(this.map);
  }

}
