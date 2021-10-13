import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { ListeAnalyticsComponent } from 'src/app/basGauche/liste-analytics/liste-analytics.component';
import { ListejoursComponent } from 'src/app/basGauche/listejours/listejours.component';
import { ListemoisComponent } from 'src/app/basGauche/listemois/listemois.component';
import { ListeproduitsComponent } from 'src/app/basGauche/listeproduits/listeproduits.component';

@Component({
  selector: 'app-bas-gauche',
  templateUrl: './bas-gauche.component.html',
  styleUrls: ['./bas-gauche.component.css']
})
export class BasGaucheComponent implements OnInit {
  clicksuscription: Subscription = new Subscription;

  lecomponent=ListejoursComponent
  les_components:any=[
    ListejoursComponent,
    ListemoisComponent,
    ListeproduitsComponent,
    ListeAnalyticsComponent
  ]
  // lecomponent=ListejoursComponent
  constructor(public data:DataService){
    this.clicksuscription=data.recevoirClick().subscribe((data:any)=>{
      // on ecoute le changement du select depuis un component different
      console.log("on ecoute le changement du select depui un component different")
      let index=parseInt(this.data.option)
      this.lecomponent=this.les_components[index]
      // this.data.sendEvent(1,data.item)
    })
  }
  ngOnInit(){}

}
