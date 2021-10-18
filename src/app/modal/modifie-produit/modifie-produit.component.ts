import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-modifie-produit',
  templateUrl: './modifie-produit.component.html',
  styleUrls: ['./modifie-produit.component.css']
})
export class ModifieProduitComponent implements OnInit {
  id_produit:number=0
  produit={nom_produit:"",description:"",stock:0,prix_unitaire:""}
  constructor(public api:ApiService,private router:ActivatedRoute) { 
    api.getEvent().subscribe((data:any)=>{
      console.log("getcode= ",data)
      if(data.code=="modifier_sortie"){
        this.produit=data.data
      }
    })
  }

  ngOnInit(): void {
  }
  modifier(){
  }

}
