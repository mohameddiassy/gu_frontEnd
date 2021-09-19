import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detail-entreprise',
  templateUrl: './detail-entreprise.component.html',
  styleUrls: ['./detail-entreprise.component.css']
})
export class DetailEntrepriseComponent implements OnInit {
  id_entreprise:number=0
  entreprise:any={}
 
  constructor(private router:ActivatedRoute,public data:DataService) { }

  ngOnInit(): void {
  
    this.router.params.subscribe((params:any)=>{
      this.id_entreprise=params["id_entreprise"];
      if (this.id_entreprise) {
        console.log("id_entreprise est present")
        this.recevoir_entreprise()
        this.recevoir_agent()
        
      } else {
        console.log("id_entreprise est absent")
        
      }
    })
  }
  recevoir_entreprise(){
    this.data.requete_post("get_entreprise_by_id.php",{id_entreprise:this.id_entreprise},(data:any)=>{
      this.entreprise=data[0]
    })
  }
  recevoir_agent(){
    this.data.requete_post("get_enregistreur_by_entreprise.php",{id_entreprise:this.id_entreprise},(data:any)=>{
      this.data.les_agents=data
    })
  }

}
