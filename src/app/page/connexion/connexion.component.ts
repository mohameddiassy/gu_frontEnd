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
      
        // console.log("connexion",data)
      if(data.status){
        this.api.global.utilisateur_connecte=data.utilisateur
        localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur));
        this.route.navigate(['/accueil'])
      }else{
        // console.log("Echec de connexion",data)
        this.echec_connexion=true
      }
    })
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
