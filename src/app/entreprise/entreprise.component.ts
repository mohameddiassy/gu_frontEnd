import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {
infos_form:any={}
  constructor(public data:DataService) { }

  ngOnInit(): void {
  }
  inscrire(){
    console.log("les informations du formulaire sont: ",this.infos_form)
    this.data.requete_post("info_entreprise.php",{utilisateur:JSON.stringify(this.infos_form)},(data:any)=>{

    })
  }
}
