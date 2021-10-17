import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-haut-droite',
  templateUrl: './haut-droite.component.html',
  styleUrls: ['./haut-droite.component.css']
})
export class HautDroiteComponent implements OnInit {

  constructor(public api:ApiService,private route:Router) {
    
  }

  ngOnInit(): void {
  }
  
  deconnexion(){
    localStorage.setItem('utilisateur', JSON.stringify(null));
    // sessionStorage.removeItem('utilisateur');
    this.route.navigate(["/"])
  }
}
