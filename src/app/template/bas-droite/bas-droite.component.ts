import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-bas-droite',
  templateUrl: './bas-droite.component.html',
  styleUrls: ['./bas-droite.component.css']
})
export class BasDroiteComponent implements OnInit {
  item:any
  clicksuscription: Subscription;
  closesuscription: Subscription;
  sortie:any
  option="1"
  closebool=false
  closesubscription:Subscription=new Subscription
  constructor(public data:DataService) { 
    this.clicksuscription=data.getClick().subscribe((data:any)=>{
      this.clique(data)
    })
    this.closesuscription=data.getCloseClick().subscribe(()=>{
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
    this.closebool=true
    this.recevoir_produit_entreprise()
  }
  changement(){

  }
  close(){
    this.closebool=!this.closebool
  }
}
