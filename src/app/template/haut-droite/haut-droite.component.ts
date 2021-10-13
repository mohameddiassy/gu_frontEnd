import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
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
  constructor(public data:DataService,private route:Router) {
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
  
  deconnexion(){
    localStorage.setItem('utilisateur', JSON.stringify(null));
    // sessionStorage.removeItem('utilisateur');
    this.route.navigate(["/"])
  }
}
