import { Component, OnInit } from '@angular/core';
import { AjouterVendeurComponent } from 'src/app/modal/ajouter-vendeur/ajouter-vendeur.component';
import { ApiService } from 'src/app/service/api.service';
import {multi} from './data'

@Component({
  selector: 'app-vendeur',
  templateUrl: './vendeur.component.html',
  styleUrls: ['./vendeur.component.css']
})
export class VendeurComponent implements OnInit {
  vendeur:any
  ajoutervendeurcomponent=AjouterVendeurComponent
  multi: any=[];
  view: any= [null, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'En fonctions des jours';
  yAxisLabel: string = 'Entrées et Sorties';
  timeline: boolean = true;
  legendPosition:any='above'

  colorScheme:any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(public api:ApiService) { 
    // this.produit=this.api.global.les_produits[0]
    api.getEvent().subscribe((data:any)=>{
      if(data.code=="item_liste_vendeur"){
        this.vendeur=data.data
      }
    })
    Object.assign(this, { multi });
  }
  ngOnInit(): void {
    
  }
  ajouter_vendeur(){
    this.api.closeAllBool()
    this.api.bool.ajoutervendeur=!this.api.bool.ajoutervendeur
    this.api.sendEvent("ajouter_vendeur",this.vendeur);
  }
  
  modifier_vendeur(){
    this.api.closeAllBool()
    this.api.bool.ajoutervendeur=!this.api.bool.ajoutervendeur
    this.api.sendEvent("modifier_vendeur",this.vendeur);
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
