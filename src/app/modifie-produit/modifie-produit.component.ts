import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modifie-produit',
  templateUrl: './modifie-produit.component.html',
  styleUrls: ['./modifie-produit.component.css']
})
export class ModifieProduitComponent implements OnInit {
  id_produit:number=0
  produit={nom_produit:"",description:"",stock:0,prix_unitaire:""}
  constructor(public data:DataService,private router:ActivatedRoute) { 
    data.getCode().subscribe((data:any)=>{
      console.log("getcode= ",data)
      if(data.code=="modifier_sortie"){
        this.produit=data.data
      }
    })
  }

  ngOnInit(): void {
  }
  modifier(){
    this.data.requete_post("update_product.php",{produit:JSON.stringify(this.produit)},(data:any)=>{
      
    })
  }
  close(){
    this.data.bool.modifiersortie=!this.data.bool.modifiersortie
  }

}
