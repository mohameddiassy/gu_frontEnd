import { Component, OnInit } from '@angular/core';
import { AnalyticsComponent } from 'src/app/analytics/analytics.component';
import { DataService } from 'src/app/data.service';
import { DetailProduitComponent } from 'src/app/detail-produit/detail-produit.component';
import { SortieMoisComponent } from 'src/app/sortie-mois/sortie-mois.component';
import { SortieComponent } from 'src/app/sortie/sortie.component';

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
