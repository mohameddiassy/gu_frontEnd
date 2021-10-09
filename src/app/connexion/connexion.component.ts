import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  utilisateur:any={login:"",mot_de_passe:""}
  echec_connexion=false
  constructor(public data:DataService,private route:Router) { }

  ngOnInit(): void {
    this.verifier_session()
  }
  connecter(){
    console.log(this.utilisateur)
    this.data.requete_post("get_utilisateur.php",{utilisateur:JSON.stringify(this.utilisateur)},(data:any)=>{
      if(data.status){
        this.data.utilisateur_connecte=data.personne
        console.log("Connexion effectuée avec succés")
        localStorage.setItem('utilisateur', JSON.stringify(data.personne));
        this.route.navigate(['/accueil'])
      }else{
        console.log("Echec de connexion")
        this.echec_connexion=true
      }
    })
  }
  verifier_session(){
    let u:any = localStorage.getItem('utilisateur');
    let user=JSON.parse(u)
    console.log("session= ",u)
    if (user==null) {//non connecté
      // on ne fait rien
      // this.route.navigate(["/"])
    } else {
      this.data.utilisateur_connecte=user
      if (user.privilege==2) {
        this.data.listehautgauche.push({nom:"Statistiques",id:3,component:'AnalyticsComponent'})
        this.data.listehautgauche.push({nom:"Fournisseurs",id:4,component:'FournisseurComponent'})
          console.log("le propriétaire de l'entreprise")
      } else {
        console.log("un gérant de l'entreprise")
      }
      this.route.navigate(["/accueil"])
    }
  }

}
