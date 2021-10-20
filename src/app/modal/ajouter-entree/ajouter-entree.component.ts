import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-entree',
  templateUrl: './ajouter-entree.component.html',
  styleUrls: ['./ajouter-entree.component.css']
})
export class AjouterEntreeComponent implements OnInit {
  stock_en_cour:any=0;
  entree:any = { quantite: "0", id_produit: "0", id_enregistreur: 1, date_entree: "",id_fournisseur:1}
  option = "2"
  succes = false
  echec = false
  item: any
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajouterentree") {
        this.item = data.data
      }
    })
  }
  ngOnInit(): void {
    this.recevoir_produit_entrants()
    this.recevoir_fournisseur();
  }
  ajouter() {
    this.echec = false
    this.succes = false
    this.entree.date_entree = this.item.date
    this.entree.stock=this.stock_en_cour
    console.log("entree= ", this.entree)
    if (this.entree.id_produit == "0") {
      console.log("choisir un produit")
    } else {
      this.api.post({ add_entree: true, entree: JSON.stringify(this.entree) }).subscribe((data: any) => {
        if (data.status) {
          this.succes = true
          this.entree.quantite = "0"
          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          this.api.sendEvent("entree_par_jours_par_enregistreur",this.item)
        } else {
          this.echec = true
        }
      })
    }
  }
  parse(quantite:string)
  {
    return parseInt(quantite)
  }
  changement() {
    if(this.entree.id_fournisseur=="nouveau_fournisseur")
    {
      this.api.closeAllBool()
      this.api.sendEvent("ajouterfournisseur",this.item)
      this.api.bool.ajouterfournisseur=true
    }

    this.api.global.les_produits_entrants .forEach((element:any) => {
      if(element.id_produit==this.entree.id_produit)
      {
        this.stock_en_cour=element.stock
        return
      }
    });
    }
  recevoir_produit_entrants() {
    this.api.post({get_produit_entrant_by_id_entreprise: true, type: "entrant", id_entreprise: 1 }).subscribe((data: any) => {
      this.api.global.les_produits_entrants = data.les_produits_entrees
      console.log(";;;;;",data)
    })
  }
  recevoir_entree() {
    this.api.post({ get_entree: true, id_entreprise: 1 }).subscribe((data: any) => {
      this.api.global.les_entree_par_jour = data.les_entree_par_jour
    })
  }
  recevoir_fournisseur() {
    this.api.post({ get_fournisseur: true, id_entreprise: 1 }).subscribe((data: any) => {
      this.api.global.les_fournisseurs = data.les_fournisseurs
    })
  }


}
