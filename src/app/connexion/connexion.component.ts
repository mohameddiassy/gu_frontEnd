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
  }
  connecter(){
    console.log(this.utilisateur)
    this.data.requete_post("get_utilisateur.php",{utilisateur:JSON.stringify(this.utilisateur)},(data:any)=>{
      if(data.status){
        this.data.utilisateur_connecte=data.personne
        console.log("Connexion effectuée avec succés")
        this.route.navigate(['/produit',data.personne.id_entreprise])
      }else{
        console.log("Echec de connexion")
        this.echec_connexion=true
      }
    })
  }

}
