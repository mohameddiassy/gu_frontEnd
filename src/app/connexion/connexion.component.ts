import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  utilisateur:any={login:"",mot_de_passe:""}
  constructor(public data:DataService) { }

  ngOnInit(): void {
  }

}
