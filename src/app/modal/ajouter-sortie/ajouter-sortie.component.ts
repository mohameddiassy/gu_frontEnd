import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-sortie',
  templateUrl: './ajouter-sortie.component.html',
  styleUrls: ['./ajouter-sortie.component.css']
})
export class AjouterSortieComponent implements OnInit {
  sortie = { quantite: "", id_produit: "0", id_enregistreur: 1, date_sortie: "" }
  option = "2"
  succes = false
  echec = false
  item: any
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajoutersortie") {
        this.item = data.data
      }
    })
  }

  ngOnInit(): void {
    this.recevoir_produit_sortant()
  }
  ajouter() {
    this.echec = false
    this.succes = false
    this.sortie.date_sortie = this.item.date
    console.log("sortie= ", this.sortie)
    if (this.sortie.id_produit == "0") {
      console.log("choisir un produit")
    } else {
      this.api.post_utilisateur_connecte({ add_sortie: true, sortie: JSON.stringify(this.sortie) }).subscribe((data: any) => {
        if (data.status) {
          this.succes = true
          this.sortie.quantite = ""
          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          this.api.sendEvent("sortie_par_jours_par_enregistreur",this.item)
        } else {
          this.echec = true
        }
      })
    }
  }
  changement() {

  }
  recevoir_produit_sortant() {
    this.api.post_utilisateur_connecte({ get_products_by_id_entreprise: true, type: "sortant"}).subscribe((data: any) => {
      this.api.global.les_produits_sortants = data.products
    })
  }
  recevoir_sorties() {
    this.api.post_utilisateur_connecte({ get_sortie: true }).subscribe((data: any) => {
      this.api.global.les_sorties_par_jour = data.les_sorties_par_jour
    })
  }

}
