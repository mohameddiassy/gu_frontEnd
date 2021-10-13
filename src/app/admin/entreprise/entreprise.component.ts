import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {
  listeEntreprise : any;
  
  succes=false
  echec=false

  constructor(public data : DataService) { }
  
  ngOnInit(): void {
    this.recevoir_entreprise()
  }
  recevoir_entreprise(){
    this.data.requete_post("get_all_entreprise.php",{},(data:any)=>{
      this.data.les_entreprises=data
    })
  }
  supprimer_entreprise(entreprise:any){
    this.data.requete_post("update_entreprise_state.php",{id_entreprise:entreprise.id_entreprise},(data:any)=>{
      if (data.status) {
        this.succes=true
        this.recevoir_entreprise()
      } else {
        this.echec=false
      }
    })
  }
}

