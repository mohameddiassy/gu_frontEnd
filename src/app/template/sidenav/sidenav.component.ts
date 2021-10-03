import { Component, OnInit } from '@angular/core';
import { BasGaucheComponent } from '../bas-gauche/bas-gauche.component';
import { HautGaucheComponent } from '../haut-gauche/haut-gauche.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  les_components:any={
    hautgauche:HautGaucheComponent,
    basgauche:BasGaucheComponent
  };

  icone: string = "menu";
  isClosed = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void{
    if(this.isClosed){
      this.icone = "menu";
      this.isClosed = !this.isClosed;
    } else{
      this.icone = "close";
      this.isClosed = !this.isClosed;
    }
  }

}
