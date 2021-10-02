import { Component, OnInit } from '@angular/core';
import { EnteteJourComponent } from 'src/app/entete/entete-jour/entete-jour.component';
import { EnteteMoisComponent } from 'src/app/entete/entete-mois/entete-mois.component';

@Component({
  selector: 'app-haut-droite-optionnel',
  templateUrl: './haut-droite-optionnel.component.html',
  styleUrls: ['./haut-droite-optionnel.component.css']
})
export class HautDroiteOptionnelComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }

}
