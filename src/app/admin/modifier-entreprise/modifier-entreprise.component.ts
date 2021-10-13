import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-modifier-entreprise',
  templateUrl: './modifier-entreprise.component.html',
  styleUrls: ['./modifier-entreprise.component.css']
})
export class ModifierEntrepriseComponent implements OnInit {
  entreprise:any={}
  succes=false
  echec=false
  event:any
  id_entreprise:number=0
  constructor(private router:ActivatedRoute,public data:DataService) { }

  ngOnInit(): void {
    this.router.params.subscribe((params:any)=>{
      this.id_entreprise=params["id_entreprise"];
      if (this.id_entreprise) {
        console.log("id_entreprise est present")
        this.recevoir_entreprise_by_id()
      } else {
        console.log("id_entreprise est absent")
      }
    })
  }
  recevoir_entreprise_by_id(){
    this.data.requete_post("get_entreprise_by_id.php",{id_entreprise:this.id_entreprise},(data:any)=>{
      this.entreprise=data[0]
    })
  }

  setevent(event:any){
    this.event=event
    console.log("event= ",event)
  }
  modifier(){
    this.data.chargement_image(this.event ,"update_entreprise.php",{entreprise:JSON.stringify(this.entreprise)},(data:any)=>{
      if (data.status) {
        this.succes=true
      } else {
        this.echec=false
      }
    })
  }
}
