import { Component, OnInit } from '@angular/core';
import { BasDroiteOptionnelComponent } from '../bas-droite-optionnel/bas-droite-optionnel.component';
import { BasDroiteComponent } from '../bas-droite/bas-droite.component';
import { BasGaucheComponent } from '../bas-gauche/bas-gauche.component';
import { HautDroiteOptionnelComponent } from '../haut-droite-optionnel/haut-droite-optionnel.component';
import { HautDroiteComponent } from '../haut-droite/haut-droite.component';
import { HautGaucheComponent } from '../haut-gauche/haut-gauche.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  les_components:any={
    hautgauche:HautGaucheComponent,
    hautdroite:HautDroiteComponent,
    basgauche:BasGaucheComponent,
    basdroite:BasDroiteComponent,
    hautdroiteoptionnel:HautDroiteOptionnelComponent,
    basdroiteoptionnel:BasDroiteOptionnelComponent
  }
  constructor() { }

  ngOnInit(): void {
  }

}
