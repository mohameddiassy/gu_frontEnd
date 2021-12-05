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
  add=true;
  les_productions: any;
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajouterproduction") {
        this.add=true;
        this.item = data.data

      }
      else if (data.code == "modifierproduction")
      {
        this.add=false;
        this.production=Object.assign({}, data.data[1])
        this.item = Object.assign({}, data.data[0])
      }
    })
  }
  ngOnInit(): void {
    this.recevoir_produit_sortant()
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
      this.api.post_utilisateur_connecte({ add_production: true, production: JSON.stringify(this.production) }).subscribe((data: any) => {
        console.log(data);
        if (data.status) {

          this.succes = true
          this.production.quantite = "0"
          this.api.sendEvent("item_liste_production",this.item)
        } else {
          this.echec = true
        }
      })
    }
  }
  modifier()
  {

    this.echec = false
    this.succes = false
    this.production.date_production = this.item.date
    this.production.stock=this.stock_en_cour
    console.log("production= ", this.production)
    if (this.production.id_produit == "0") {
      alert("choisir un produit")
    } else {
      this.api.post_utilisateur_connecte({ update_production: true, production: JSON.stringify(this.production) }).subscribe((data: any) => {
        if (data.status) {
          this.succes = true
          // this.production.quantite = "0"
          // // this.data.les_produits.push(data.produit)
          // // let date=moment(this.item.date).format("YYYY-MM-DD")
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

    }
    changement2() {
      this.stock_en_cour=0

      this.api.global.les_productions.forEach((element:any) => {
        if(this.api.parse(element.id_produit)==this.api.parse(this.production.id_produit))
        {
          this.stock_en_cour=element.quantite
          console.log("kkkk",this.stock_en_cour);

          return
        }
      });

    }
  recevoir_produit_sortant(){
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise:true,type:"sortant"}).subscribe((data:any)=>{
      this.api.global.les_produits_sortants=data.products
    })
  }

}
