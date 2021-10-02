import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-haut-gauche',
  templateUrl: './haut-gauche.component.html',
  styleUrls: ['./haut-gauche.component.css']
})
export class HautGaucheComponent implements OnInit {
  
  
  constructor(public data:DataService) { }

  ngOnInit(): void {
  }
  changement(){
    console.log("option= ",this.data.option)
    this.data.envoyerClick()
  }
}
