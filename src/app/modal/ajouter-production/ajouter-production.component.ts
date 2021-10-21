import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-production',
  templateUrl: './ajouter-production.component.html',
  styleUrls: ['./ajouter-production.component.css']
})
export class AjouterProductionComponent implements OnInit {
  stock_en_cour:any=0;
  production:any = { quantite: "0", id_produit: "0", date_production: ""}
  option = "2"
  succes = false
  echec = false
  item: any
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajouterproduction") {
        this.item = data.data
        this.recevoir_produit_entrants()
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
    this.production.date_production = this.item.date
    this.production.stock=this.stock_en_cour
    console.log("production= ", this.production)
    if (this.production.id_produit == "0") {
      console.log("choisir un produit")
    } else {
      this.api.post({ add_production: true, production: JSON.stringify(this.production) }).subscribe((data: any) => {
        if (data.status) {
          this.succes = true
          this.production.quantite = "0"
          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          this.api.sendEvent("production_par_jours_par_enregistreur",this.item)
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
    if(this.production.id_fournisseur=="nouveau_fournisseur")
    {
      this.api.closeAllBool()
      this.api.sendEvent("ajouterfournisseur",this.item)
      this.api.bool.ajouterfournisseur=true
    }

    this.api.global.les_produits_entrants .forEach((element:any) => {
      if(element.id_produit==this.production.id_produit)
      {
        this.stock_en_cour=element.stock
        return
      }
    });
    }
  recevoir_produit_entrants() {
    this.api.post({get_produit_entrant_by_id_entreprise: true, type: "entrant", id_entreprise: 1 }).subscribe((data: any) => {
      this.api.global.les_produits_entrants = data.les_produits_productions
      console.log(";;;;;",data)
    })
  }
  recevoir_production() {
    this.api.post({ get_production: true, id_entreprise: 1 }).subscribe((data: any) => {
      this.api.global.les_production_par_jour = data.les_production_par_jour
    })
  }
  recevoir_fournisseur() {
    this.api.post({ get_fournisseur: true, id_entreprise: 1 }).subscribe((data: any) => {
      this.api.global.les_fournisseurs = data.les_fournisseurs
    })
  }


}
