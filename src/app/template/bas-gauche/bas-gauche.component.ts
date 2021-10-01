import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-bas-gauche',
  templateUrl: './bas-gauche.component.html',
  styleUrls: ['./bas-gauche.component.css']
})
export class BasGaucheComponent implements OnInit {
  listebasgauche:any[]=[]
  constructor(public data:DataService) { }

  ngOnInit(): void {
    this.get_dates()
  }
  get_dates(){
    
    let la_date=moment().locale("fr").format('L');
    for (let index = 0; index < 10; index++) {
      la_date=moment().locale("fr").subtract(index, 'days').calendar();
      let nombreentreesortie=Math.floor(Math.random() * 100);
      this.listebasgauche.push({id:index,date:la_date,nombreentreesortie:nombreentreesortie,derniereentreesortie:"La dernière activité d'entrée sortie"})
    }
  }
  clique(item:any){
    console.log(item)
    // this.data.hautdroite=item;
    this.data.sendClick(item)
  }
}
