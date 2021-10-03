import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from 'src/app/ajouter-sortie/ajouter-sortie.component';
import { DataService } from 'src/app/data.service';
import { ListeAnalyticsComponent } from 'src/app/liste-analytics/liste-analytics.component';
import { ListejoursComponent } from 'src/app/listejours/listejours.component';
import { ListemoisComponent } from 'src/app/listemois/listemois.component';
import { ListeproduitsComponent } from 'src/app/listeproduits/listeproduits.component';
import { ProduitComponent } from 'src/app/produit/produit.component';
import { SortieComponent } from 'src/app/sortie/sortie.component';

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
