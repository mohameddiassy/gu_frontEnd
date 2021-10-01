import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-haut-gauche',
  templateUrl: './haut-gauche.component.html',
  styleUrls: ['./haut-gauche.component.css']
})
export class HautGaucheComponent implements OnInit {
  
  option="1"
  constructor(public data:DataService) { }

  ngOnInit(): void {
  }
  changement(){
    console.log("option= ",this.option)
  }
}
