import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-vendeur',
  templateUrl: './ajouter-vendeur.component.html',
  styleUrls: ['./ajouter-vendeur.component.css']
})
export class AjouterVendeurComponent implements OnInit {

  stock_en_cour: any = 0;
  vendeur: any = { nom: "", adresse: "", telephone: "", description: "",dette:0 }
  option = "2"
  succes = false
  echec = false
  modifier_bool = false
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajouter_vendeur") {
        this.modifier_bool=false
        this.vendeur = { nom: "", adresse: "", telephone: "", description: "" ,dette:0}
      } else if (data.code == "modifier_vendeur") {
        this.modifier_bool=true
        this.vendeur = data.data
      }
    })
  }
  ngOnInit(): void {
  }
  ajouter() {
    this.echec = false
    this.succes = false
    this.api.post_utilisateur_connecte({ add_vendeur: true, vendeur: JSON.stringify(this.vendeur) }).subscribe((data: any) => {
      console.log(data)
      if (data.status) {
        this.succes = true
        // this.api.sendEvent("ajoutervendeur",this.item)
        this.recevoir_vendeur()
      } else {
        this.echec = true
      }
    })
  }
  modifier() {
    this.echec = false
    this.succes = false
    this.api.post_utilisateur_connecte({ modifier_vendeur: true, vendeur: JSON.stringify(this.vendeur) }).subscribe((data: any) => {
      console.log(data)
      if (data.status) {
        this.succes = true
        // this.api.sendEvent("ajoutervendeur",this.item)
        this.recevoir_vendeur()
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
  recevoir_vendeur() {
    this.api.post_utilisateur_connecte({ get_vendeur: true}).subscribe((data: any) => {
      if (data.status) {
        this.api.global.les_vendeurs = data.les_vendeurs
      } else {
        console.log("erreur de reception des vendeurs")
      }
    })
  }
}

