import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjouterSortieComponent } from 'src/app/ajouter-sortie/ajouter-sortie.component';
import { DataService } from 'src/app/data.service';
import { SortieComponent } from 'src/app/sortie/sortie.component';

@Component({
  selector: 'app-bas-droite',
  templateUrl: './bas-droite.component.html',
  styleUrls: ['./bas-droite.component.css']
})
export class BasDroiteComponent implements OnInit {
  item:any
  clicksuscription: Subscription;
  sortie:any
  option="1"
  closesubscription:Subscription=new Subscription
  sortiecomponent=SortieComponent
  ajoutersortiecomponent=AjouterSortieComponent
  constructor(public data:DataService) { 
    this.clicksuscription=data.getBasGaucheClick().subscribe((data:any)=>{
      this.clique(data)
    })
    
    this.closesubscription=data.getCloseClick().subscribe(()=>{
      this.close()
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
    this.item=data
    this.recevoir_produit_entreprise()
  }
  changement(){

  }
  close(){
    this.data.closebool=!this.data.closebool
  }
}
