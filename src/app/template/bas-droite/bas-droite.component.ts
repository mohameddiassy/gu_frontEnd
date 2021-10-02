import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from 'src/app/ajouter-sortie/ajouter-sortie.component';
import { DataService } from 'src/app/data.service';
import { DetailProduitComponent } from 'src/app/detail-produit/detail-produit.component';
import { ListejoursComponent } from 'src/app/listejours/listejours.component';
import { SortieMoisComponent } from 'src/app/sortie-mois/sortie-mois.component';
import { SortieComponent } from 'src/app/sortie/sortie.component';

@Component({
  selector: 'app-bas-droite',
  templateUrl: './bas-droite.component.html',
  styleUrls: ['./bas-droite.component.css']
})
export class BasDroiteComponent implements OnInit {
  item:any
  // clicksuscription: Subscription;
  sortie:any
  lecomponent=SortieComponent
  les_components:any[]=[
    SortieComponent,
    SortieMoisComponent,
    DetailProduitComponent
  ]
  constructor(public data:DataService) {
    data.getCloseClick().subscribe(()=>{
      this.close()
    })
    data.getEvent().subscribe((data)=>{
      console.log(data.index)
      this.lecomponent=this.les_components[data.index]
    })
  }

  ngOnInit(): void {

  }

  recevoir_produit_entreprise(){
    this.data.requete_post("get_product_by_entreprise.php",{id_entreprise:11},(data:any)=>{
      this.data.les_produits=data
    })
  }
  supprimer(un_produit:any){
    this.data.requete_post("update_product_state.php",{id_produit:un_produit.id_produit},(data:any)=>{
      if(data.status){
        console.log("Suppression effectuée avec succés")
      }else{
        console.log("Echec de suppression")
      }
    })
  }
  clique(data:any){
    console.log("clique")
    this.lecomponent=this.les_components[0]
    this.item=data

    this.recevoir_produit_entreprise()
  }
  changement(){

  }
  close(){
    this.data.closebool=!this.data.closebool
  }
}
