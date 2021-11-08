import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-sortie',
  templateUrl: './ajouter-sortie.component.html',
  styleUrls: ['./ajouter-sortie.component.css']
})
export class AjouterSortieComponent implements OnInit {
  stock_en_cour:any
  stock_restant:any
  quantite_vide: any
  prix_vide: any;
  produit_vide:any;
  vendeur_vide:any
  sortie = { quantite: "", id_produit: "0", id_enregistreur: 1, date_sortie: "" ,id_vendeur:"",prix_unitaire:'0'}
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
    this.recevoir_vendeur()
  }
  ajouter() {
    if(parseInt(this.stock_en_cour)<parseInt(this.sortie.quantite))
    {

      this.stock_en_cour="quantite insuffisante"

    }
    else
    {

    this.echec = false
    this.succes = false
    this.sortie.date_sortie = this.item.date
    console.log("sortie= ", this.sortie)
    if (this.sortie.id_produit == "0") {
      console.log("choisir un produit")
    }

    else if (this.sortie.quantite =='0')
    {
      this.quantite_vide='donner la quantite svp'

    }
    else if (this.sortie.prix_unitaire =='0')
    {
      this.prix_vide='donner le prix unitaire svp'

    }
     else {
      this.stock_en_cour=parseInt(this.stock_en_cour)-parseInt(this.sortie.quantite)+" en stock "

      this.api.post_utilisateur_connecte({ add_sortie: true, sortie: JSON.stringify(this.sortie) }).subscribe((data: any) => {
        if (data.status) {
         this.succes = true
         this.sortie.quantite = ""
         this.sortie.id_produit= '0'
         this.sortie.id_vendeur="0",
         this.sortie.prix_unitaire='0'
         this.stock_restant='0'
         this.stock_en_cour='0'
          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          this.api.sendEvent("sortie_par_jours_par_enregistreur",this.item)

        } else {
          this.echec = true
        }
      })
    }
  }
}
  changement() {
    this.api.global.les_produits_sortants.forEach((element:any) => {
      if(element.id_produit==this.sortie.id_produit)
      {
        this.stock_en_cour=element.stock +" en stock"
        console.log('ppppppppppppppppp',this.stock_en_cour)
        return
      }
    });


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
  recevoir_vendeur(){
    this.api.post_utilisateur_connecte({get_vendeur:true}).subscribe((data:any)=>{
      if (data.status) {
        this.api.global.les_vendeurs=data.les_vendeurs
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
}
