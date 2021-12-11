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
  add=true;
  les_type: any;
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      this.succes = false
      this.echec = false
      this.consommation = { quantite: "0", id_produit: "0", date_consommation: "",id_type_consommation:""}
      
      if (data.code == "ajouterconsommation") {
        this.add=true;
        this.item = data.data
      }
      else if (data.code == "modifierconsommation")
      {
        this.add = false;
        this.consommation = Object.assign({}, data.data[1])
        this.item = Object.assign({}, data.data[0])
      }
    })
  }
  ngOnInit(): void {
    this.recevoir_produit_entrant()
    this.recevoir_type_consommation()
    this.recevoir_produit_sortant();
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
          this.api.sendEvent("item_liste_consommation",this.item)
          this.consommation = { quantite: "0", id_produit: "0", date_consommation: "",id_type_consommation:""}
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
          this.api.bool.ajouterconsommation=!this.api.bool.ajouterconsommation
          this.succes = true
          this.consommation.quantite = "0"
          this.api.sendEvent("item_liste_consommation",this.item)
          this.consommation = { quantite: "0", id_produit: "0", date_consommation: "",id_type_consommation:""}
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
  recevoir_produit_sortant(){
    this.api.post_utilisateur_connecte({get_products_by_id_entreprise:true,type:"sortant"}).subscribe((data:any)=>{
      this.api.global.les_produits_sortants=data.products
    })
  }

  recevoir_type_consommation(){
    this.api.post_utilisateur_connecte({get_type_consommation:true}).subscribe((data:any)=>{
      this.les_type=data.type
      console.log("type",data.type)
    })
  }
}
