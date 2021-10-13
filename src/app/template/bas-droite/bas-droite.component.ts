import { Component, OnInit } from '@angular/core';
import { AnalyticsComponent } from 'src/app/basDroite/analytics/analytics.component';
import { DataService } from 'src/app/service/data.service';
import { DetailProduitComponent } from 'src/app/basDroite/detail-produit/detail-produit.component';
import { SortieMoisComponent } from 'src/app/basDroite/sortie-mois/sortie-mois.component';
import { SortieComponent } from 'src/app/basDroite/sortie/sortie.component';

@Component({
  selector: 'app-bas-droite',
  templateUrl: './bas-droite.component.html',
  styleUrls: ['./bas-droite.component.css']
})
export class BasDroiteComponent implements OnInit {
  // clicksuscription: Subscription;
  sortie:any
  lecomponent=SortieComponent
  les_components:any[]=[
    SortieComponent,
    SortieMoisComponent,
    DetailProduitComponent,
    AnalyticsComponent
  ]
  item:any
  constructor(public data:DataService) {
    data.getEvent().subscribe((data)=>{
      console.log("bas droite= ",data)
      this.item=data.item
      this.lecomponent=this.les_components[data.index]
    })
  }

  ngOnInit(): void {

  }
}
