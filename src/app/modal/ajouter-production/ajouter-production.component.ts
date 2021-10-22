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
        this.recevoir_produit_sortant()
      }
    })
  }
  ngOnInit(): void {
    // this.recevoir_produit_entrants()
  }
  ajouter() {
    this.echec = false
    this.succes = false
    this.production.date_production = this.item.date
    this.production.stock=this.stock_en_cour
    console.log("production= ", this.production)
    if (this.production.id_produit == "0") {
      alert("choisir un produit")
    } else {
      this.api.post({ add_production: true,id_enregistreur:this.api.global.utilisateur_connecte.id_utilisateur, production: JSON.stringify(this.production) }).subscribe((data: any) => {
        if (data.status) {
          this.succes = true
          this.production.quantite = "0"
          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          this.api.sendEvent("item_liste_production",this.item)
        } else {
          this.echec = true
        }
      })
    }
  }
  changement() {
    if(this.production.id_produit=="nouveau_produit")
    {
      this.api.closeAllBool()
      this.api.sendEvent("ajouterproduit",this.item)
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
  recevoir_produit_sortant(){
    this.api.post({get_products_by_id_entreprise:true,type:"sortant",id_entreprise:1}).subscribe((data:any)=>{
      this.api.global.les_produits_sortants=data.products
    })
  }


}
