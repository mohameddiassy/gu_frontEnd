import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { EnteteAnalyticsComponent } from 'src/app/entete/entete-analytics/entete-analytics.component';
import { EnteteJourComponent } from 'src/app/entete/entete-jour/entete-jour.component';
import { EnteteMoisComponent } from 'src/app/entete/entete-mois/entete-mois.component';
import { EnteteProduitComponent } from 'src/app/entete/entete-produit/entete-produit.component';

@Component({
  selector: 'app-haut-droite',
  templateUrl: './haut-droite.component.html',
  styleUrls: ['./haut-droite.component.css']
})
export class HautDroiteComponent implements OnInit {

  les_droite_component=EnteteJourComponent
  les_components:any[]=[
    EnteteJourComponent,
    EnteteMoisComponent,
    EnteteProduitComponent,
    EnteteAnalyticsComponent
  ]

  item:any
  produit:any
  clicksuscription: Subscription = new Subscription;
  clickproduit: Subscription = new Subscription;
  constructor(public data:DataService) {
    data.getEvent().subscribe((data)=>{
      console.log(data.index)
      this.les_droite_component=this.les_components[data.index]
    })
  }

  ngOnInit(): void {
  }
  clique(data:any){
    console.log("clique")
    this.item=data
    this.produit=undefined
  }
  close(){
    this.data.sendCloseClick()
  }
}
