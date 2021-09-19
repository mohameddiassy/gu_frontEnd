import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ajouter-sortie',
  templateUrl: './ajouter-sortie.component.html',
  styleUrls: ['./ajouter-sortie.component.css']
})
export class AjouterSortieComponent implements OnInit {
  sortie={quantite:"",id_produit:"",id_enregistreur:1}
  constructor(public data:DataService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe((params:any)=>{
      this.sortie.id_produit=params["id_produit"]
      if(this.sortie.id_produit){
        
        console.log("id_produit est renseigne")
      }else{
        console.log("pas de id_produit")
      }
    })
  }
  ajouter(){
    this.data.requete_post("add_sortie.php",{sortie:JSON.stringify(this.sortie)},(data:any)=>{

    })
  }

}
