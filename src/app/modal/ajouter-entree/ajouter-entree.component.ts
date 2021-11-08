import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-entree',
  templateUrl: './ajouter-entree.component.html',
  styleUrls: ['./ajouter-entree.component.css']
})
export class AjouterEntreeComponent implements OnInit {
  stock_en_cour:any=0;
  quantite_vide: any
  prix_vide: any;
  produit_vide:any;
  fournisseur_vide:any
  entree:any = { quantite: "0", id_produit: "0",prix_unitaire:'0', id_enregistreur: 1, date_entree: "",id_fournisseur:1}
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
      this.produit_vide='donner le produit svp'
    }
    else if (this.entree.quantite =='0')
    {
      this.quantite_vide='donner la quantite svp'

    }
    else if (this.entree.prix_unitaire =='0')
    {
      this.prix_vide='donner la quantite svp'

    }
     else {
      this.api.post_utilisateur_connecte({ add_entree: true, entree: JSON.stringify(this.entree) }).subscribe((data: any) => {
        if (data.status) {
          this.succes = true
          this.entree.quantite = "0"
          this.entree.id_produit = ""
          this.entree.prix_unitaire='0'

          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          this.api.sendEvent("entree_par_jours_par_enregistreur",this.item)

        } else {
          this.echec = true
        }
      })
    }
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
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise: true, type: "entrant"}).subscribe((data: any) => {
      this.api.global.les_produits_entrants = data.products
      console.log("dfghjkllkjhgcvbklmkjhghjkjhg ",data)
    })
  }
  recevoir_fournisseur() {
    this.api.post_utilisateur_connecte({ get_fournisseur: true}).subscribe((data: any) => {
      this.api.global.les_fournisseurs = data.les_fournisseurs
    })
  }


}
