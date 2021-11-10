import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-consommation',
  templateUrl: './ajouter-consommation.component.html',
  styleUrls: ['./ajouter-consommation.component.css']
})
export class AjouterConsommationComponent implements OnInit {
  stock_en_cour:any=0;
  consommation:any = { quantite: "0", id_produit: "0", date_consommation: "",id_type_consommation:""}
  option = "2"
  succes = false
  echec = false
  item: any
  les_type: any;
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajouterconsommation") {
        this.item = data.data
        this.recevoir_produit_entrant()
        this.recevoir_type_consommation()
      }
      else if (data.code == "modifierconsommation")
      {
        this.consommation=data.data
      }
    })
  }
  ngOnInit(): void {
    // this.recevoir_produit_entrants()
  }
  ajouter() {
    this.echec = false
    this.succes = false
    this.consommation.date_consommation = this.item.date
    this.consommation.stock_avant=this.stock_en_cour
    this.consommation.stock_apres=this.api.parse(this.stock_en_cour)-this.api.parse(this.consommation.quantite)
    console.log("consommation= ", this.consommation)
    if (this.consommation.id_produit == "0") {
      alert("choisir un produit")
    } else {
      this.api.post_utilisateur_connecte({ add_consommation: true, consommation: JSON.stringify(this.consommation) }).subscribe((data: any) => {
       console.log(data)
        if (data.status) {
          this.succes = true
          this.consommation.quantite = "0"
          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          this.api.sendEvent("item_liste_consommation",this.item)
        } else {
          this.echec = true
        }
      })
    }
  }
  Modifier()
  {

    this.echec = false
    this.succes = false
    this.consommation.date_consommation = this.item.date
    this.consommation.stock_avant=this.stock_en_cour
    this.consommation.stock_apres=this.api.parse(this.stock_en_cour)-this.api.parse(this.consommation.quantite)
    console.log("consommation= ", this.consommation)
    if (this.consommation.id_produit == "0") {
      alert("choisir un produit")
    } else {
      this.api.post_utilisateur_connecte({ update_consommation: true, consommation: JSON.stringify(this.consommation) }).subscribe((data: any) => {
       console.log(data)
        if (data.status) {
          this.succes = true
          this.consommation.quantite = "0"
          // this.data.les_produits.push(data.produit)
          // let date=moment(this.item.date).format("YYYY-MM-DD")
          this.api.sendEvent("item_liste_consommation",this.item)
        } else {
          this.echec = true
        }
      })
    }

  }
  changement() {
    if(this.consommation.id_produit=="nouveau_produit")
    {
      this.api.closeAllBool()
      this.api.sendEvent("ajouterproduit",this.item)
      this.api.bool.ajouterfournisseur=true
    }

    this.api.global.les_produits_entrants .forEach((element:any) => {
      if(element.id_produit==this.consommation.id_produit)
      {
        this.stock_en_cour=element.stock
        return
      }
    });
    }
  recevoir_produit_entrant(){
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise:true,type:"entrant"}).subscribe((data:any)=>{
      this.api.global.les_produits_entrants=data.products
    })
  }

  recevoir_type_consommation(){
    this.api.post_utilisateur_connecte({get_type_consommation:true}).subscribe((data:any)=>{
      this.les_type=data.type
      console.log("type",data.type)
    })
  }
}
