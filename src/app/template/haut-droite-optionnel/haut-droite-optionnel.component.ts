import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-haut-droite-optionnel',
  templateUrl: './haut-droite-optionnel.component.html',
  styleUrls: ['./haut-droite-optionnel.component.css']
})
export class HautDroiteOptionnelComponent implements OnInit {

  constructor(public data:DataService,public route:Router) { }

  ngOnInit(): void {
  }
  deconnexion(){
    localStorage.setItem('utilisateur', JSON.stringify(null));
    // sessionStorage.removeItem('utilisateur');
    this.route.navigate(["/"])
  }
}
