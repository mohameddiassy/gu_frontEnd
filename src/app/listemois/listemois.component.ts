import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../data.service';
import { ListejoursComponent } from '../listejours/listejours.component';

@Component({
  selector: 'app-listemois',
  templateUrl: './listemois.component.html',
  styleUrls: ['./listemois.component.css']
})
export class ListemoisComponent implements OnInit {

  listebasgauche:any[]=[]
  lecomponent=ListejoursComponent
  constructor(public data:DataService) { }

  ngOnInit(): void {
    // this.get_dates()
    this.data.recevoir_mois()
    this.data.sendEvent(1,this.data.les_mois[0])
  }
  get_dates(){
    // let la_date=moment().locale("fr").format('L');
    for (let index = 0; index < 100; index++) {
      let la_date:moment.Moment=moment().locale("fr").subtract(index, 'month');
      let la_date_formatee=la_date.format('MMMM  YYYY')
      let la_datetime=la_date.format('YYYY-MM-DD H:m:s')
      let nombreentreesortie=Math.floor(Math.random() * 100);
      this.data.les_mois.push({id:index,date:la_date_formatee,nombreentreesortie:nombreentreesortie,derniereentreesortie:"La dernière activité d'entrée sortie",datetime:la_datetime})
    }
  }
  clique(item:any){
    // console.log(item)
    // this.data.hautdroite=item;
    this.data.sendEvent(1,item)
  }

}
