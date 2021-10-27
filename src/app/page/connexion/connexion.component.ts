import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  utilisateur:any={login:"",mot_de_passe:""}
  echec_connexion=false
  constructor(public api:ApiService,private route:Router) { }

  ngOnInit(): void {
    this.verifier_session()
  }
  connecter(){
    this.echec_connexion=false
    console.log(this.utilisateur)
    this.api.post_utilisateur_connecte({connexion:true,utilisateur:JSON.stringify(this.utilisateur)}).subscribe((data:any)=>{
      console.log("connexion",data)
      if(data.status){
        this.parametres_utililisateur_connecte(data)
        
        // this.route.navigate(['/accueil/fenetre_sortie'])
      }else{
        // console.log("Echec de connexion",data)
        this.echec_connexion=true
      }
    })
  }
  parametres_utililisateur_connecte(data:any){
    let u=data.utilisateur
    if (u.proprietaire_entreprises.length>0) {
      let e=u.proprietaire_entreprises[0]
      u.entreprise_selectionnee=e
      this.api.global.utilisateur_connecte=u
      // sauvegarder les informations de l'utilisateur sur le local_storage
      localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur));
      this.route.navigate(["/accueil/"+u.entreprise_selectionnee.id_entreprise+"/fenetre_sortie"])
      console.log("l'utilisateur connecté est le propriétaite de l'entreprise ",e)
    } else if (u.agent_entreprises.length>0) {
      let e=u.agent_entreprises[0]
      u.entreprise_selectionnee=e
      console.log("l'utilisateur connecté est un agent de l'entreprise ",e)
      this.api.global.utilisateur_connecte=u
      // sauvegarder les informations de l'utilisateur sur le local_storage
      localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur));
      this.route.navigate(["/accueil/"+u.entreprise_selectionnee.id_entreprise+"/fenetre_sortie"])
    }else {
      console.log("L'utilisateur connecté n'est ni un agent ni propriétaire d'entreprise")
      alert("Votre compte n'est pas encore activé. Veuillez contacter le propriétaire de l'entreprise")
    }
  }
  verifier_session(){
    let u:any = localStorage.getItem('utilisateur');
    let user=JSON.parse(u)
    // console.log("session= ",u)
    if (user==null) {//non connecté
      // on ne fait rien
      // this.route.navigate(["/"])
    } else {
      this.api.global.utilisateur_connecte=user
      this.route.navigate(["/accueil"])
    }
  }

}
