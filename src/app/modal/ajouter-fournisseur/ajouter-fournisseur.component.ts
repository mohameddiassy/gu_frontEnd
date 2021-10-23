import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-fournisseur',
  templateUrl: './ajouter-fournisseur.component.html',
  styleUrls: ['./ajouter-fournisseur.component.css']
})
export class AjouterFournisseurComponent implements OnInit {
  stock_en_cour: any = 0;
  fournisseur: any = { nom: "", adresse: "", telephone: "", description: "",dette:0 }
  option = "2"
  succes = false
  echec = false
  modifier_bool = false
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajouter_fournisseur") {
        this.modifier_bool=false
        this.fournisseur = { nom: "", adresse: "", telephone: "", description: "" ,dette:0}
      } else if (data.code == "modifier_fournisseur") {
        this.modifier_bool=true
        this.fournisseur = data.data
      }
    })
  }
  ngOnInit(): void {
  }
  ajouter() {
    this.echec = false
    this.succes = false
    this.api.post_utilisateur_connecte({ add_fournisseur: true, fournisseur: JSON.stringify(this.fournisseur) }).subscribe((data: any) => {
      console.log(data)
      if (data.status) {
        this.succes = true
        // this.api.sendEvent("ajouterfournisseur",this.item)
        this.recevoir_fournisseur()
      } else {
        this.echec = true
      }
    })
  }
  modifier() {
    this.echec = false
    this.succes = false
    this.api.post_utilisateur_connecte({ modifier_fournisseur: true, fournisseur: JSON.stringify(this.fournisseur) }).subscribe((data: any) => {
      console.log(data)
      if (data.status) {
        this.succes = true
        // this.api.sendEvent("ajouterfournisseur",this.item)
        this.recevoir_fournisseur()
      } else {
        this.echec = true
      }
    })
  }

  parse(quantite: string) {
    return parseInt(quantite)
  }
  changement() {

  }
  recevoir_fournisseur() {
    this.api.post_utilisateur_connecte({ get_fournisseur: true}).subscribe((data: any) => {
      if (data.status) {
        this.api.global.les_fournisseurs = data.les_fournisseurs
      } else {
        console.log("erreur de reception des fournisseurs")
      }
    })
  }
}
