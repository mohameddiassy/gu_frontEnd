import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css']
})
export class AjoutUtilisateurComponent implements OnInit {
  stock_en_cour: any = 0;
  utilisateur: any = { prenom: "", nom: "", email: "", telephone: "", profession: "", login: "", mot_de_pass: "", id_privilege: "0" }
  succes = false
  echec = false
  item: any
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      this.succes = false
      this.echec = false
      this.utilisateur= { prenom: "", nom: "", email: "", telephone: "", profession: "", login: "", mot_de_pass: "", id_privilege: "0" }
    if (data.code == "ajouterutilisateur") {
        this.item = data.data
        this.recevoir_privilege()
      }
    })
  }
  ngOnInit(): void {
    // this.recevoir_produit_entrants()
  }
  ajouter() {
    this.echec = false
    this.succes = false
    this.utilisateur.date_utilisateur = this.item.date
    this.utilisateur.stock = this.stock_en_cour
    console.log("utilisateur= ", this.utilisateur)
    if (this.utilisateur.id_privilege == "0") {
      alert("choisir un privilege")
    } else {
      this.api.post_utilisateur_connecte({ add_utilisateur: true, utilisateur: JSON.stringify(this.utilisateur) }).subscribe((data: any) => {
        console.log(data)
        if (data.status) {
          this.succes = true
          this.utilisateur.quantite = "0"
          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          // this.api.sendEvent("item_liste_utilisateur",this.item)
          this.api.sendEvent("liste_parametre_utilisateur",this.item)
        } else if (data.alert) {
            alert(data.alert)
        } else {
          this.echec = true
        }
      })
    }
  }
  changement() {
    if (this.utilisateur.id_produit == "nouveau_produit") {
      this.api.closeAllBool()
      this.api.sendEvent("ajouterproduit", this.item)
      this.api.bool.ajouterfournisseur = true
    }

    this.api.global.les_produits_entrants.forEach((element: any) => {
      if (element.id_produit == this.utilisateur.id_produit) {
        this.stock_en_cour = element.stock
        return
      }
    });
  }
  recevoir_privilege() {
    this.api.post_utilisateur_connecte({ get_privilege: true}).subscribe((data: any) => {
      this.api.global.les_privileges = data.les_privileges
    })
  }


}
