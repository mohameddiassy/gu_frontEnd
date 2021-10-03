import { Component, OnInit } from '@angular/core';
import { BasDroiteComponent } from '../bas-droite/bas-droite.component';
import { HautDroiteComponent } from '../haut-droite/haut-droite.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  les_components:any={
    hautdroite:HautDroiteComponent,
    basdroite:BasDroiteComponent
  };

  constructor() { }

  ngOnInit(): void {
  }

}
