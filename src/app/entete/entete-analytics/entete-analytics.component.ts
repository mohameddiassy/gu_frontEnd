import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-entete-analytics',
  templateUrl: './entete-analytics.component.html',
  styleUrls: ['./entete-analytics.component.css']
})
export class EnteteAnalyticsComponent implements OnInit {
  item:any
  constructor(public data:DataService) {
    this.item=data.les_produits[0]
    data.getEvent().subscribe((data)=>{
      this.item=data.item
    })
   }

  ngOnInit(): void {
  }

}
