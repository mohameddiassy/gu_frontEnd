import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-ajouter-gerant',
  templateUrl: './ajouter-gerant.component.html',
  styleUrls: ['./ajouter-gerant.component.css']
})
export class AjouterGerantComponent implements OnInit {
  infos_form:any={id_entreprise:0,prenom:"",nom:"",email:"",telephone:"",profession:"",login:"",mot_de_passe:""}
  constructor(public data:DataService,private router:ActivatedRoute) { }
  succes=false
  echec=false


  ngOnInit(): void {
    this.router.params.subscribe((data:any)=>{
      this.infos_form.id_entreprise=data["id_entreprise"]
      console.log("id_entreprise",this.infos_form.id_entreprise)

    })
  }
  inscrire(){
    console.log("les informations du formulaire sont: ",this.infos_form)
    this.data.requete_post("ajout_utilisateur.php",{inscription:JSON.stringify(this.infos_form)},(data:any)=>{

    })
  }
}
