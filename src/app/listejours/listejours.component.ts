import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../data.service';

@Component({
  selector: 'app-listejours',
  templateUrl: './listejours.component.html',
  styleUrls: ['./listejours.component.css']
})
export class ListejoursComponent implements OnInit {


  lecomponent=ListejoursComponent
  constructor(public data:DataService) { }

  ngOnInit(): void {
    this.get_dates()
    this.data.sendEvent(0,this.data.les_jours[0])
  }
  get_dates(){
    // let la_date=moment().locale("fr").format('L');
    for (let index = 0; index < 100; index++) {
      let la_date:moment.Moment=moment().locale("fr").subtract(index, 'days');
      let la_date_formatee=la_date.format('LL')
      let la_datetime=la_date.format('YYYY-MM-DD H:m:s')
      let nombreentreesortie=Math.floor(Math.random() * 100);
      this.data.les_jours.push({id:index,date:la_date_formatee,nombreentreesortie:nombreentreesortie,derniereentreesortie:"La dernière activité d'entrée sortie",datetime:la_datetime})
    }
  }
  clique(item:any){
    this.data.sendEvent(0,item)
  }

}
