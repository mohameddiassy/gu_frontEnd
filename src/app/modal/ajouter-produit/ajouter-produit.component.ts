import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {
  produit:any={}
  // default_formulaire:any={nom:"",description:"",id_categorie:null,stock:0,prix_unitaire:0,nom_new_categorie:"",description_new_categorie:""}
  succes=false
  echec=false
  notok=false
  id_entreprise:number=0
  modifier_bool=false
  constructor(public api:ApiService) { 
    api.getEvent().subscribe((data:any)=>{
      this.succes=false
      this.echec=false
      this.notok=false;
      this.produit={}
      
      if (data.code=="modifier_produit") {
        this.produit=Object.assign({},data.data)
        this.modifier_bool=true
      } else if (data.code=="ajouter_produit") {
        var type=Object.assign({},data.data)
        this.produit.type=type.type
        this.modifier_bool=false
      } else {
        this.initialiser_formulaire()
      }
    })
    
  }

  ngOnInit(): void {
    this.recevoir_categorie()
  }
  initialiser_formulaire(){
    this.produit.nom=""
    this.produit.description=""
    this.produit.stock=0
    this.produit.prix_unitaire=0
    this.produit.nom_new_categorie=""
    this.produit.description_new_categorie=""
    this.produit.id_categorie=1
    this.produit.nom_new_categorie=""
    this.produit.description_new_categorie=""
  }


  recevoir_categorie(){
    this.api.post_utilisateur_connecte({get_categorie:true}).subscribe((data:any)=>{
      if (data.status) {
        this.api.global.les_categories=data.les_categories
      } else {
        console.log("erreur")
      }
    })
  }
  ajouter(){
    this.produit.id_enregistreur=1
    this.produit.id_entreprise=1
    this.succes=false
    this.echec=false
    this.notok=false
    console.log(this.produit)
    if(this.produit.nom==null ||
    this.produit.description==null ||
    this.produit.prix_unitaire==null ||
    this.produit.prix_unitaire==0){
      this.notok = true;
    }else{
    this.api.post_utilisateur_connecte({add_product:true,produit:JSON.stringify(this.produit)}).subscribe((data:any)=>{
        console.log(data)
        if (data.status) {
          this.succes=true
          if(this.produit.categorie=="nouvelle_categorie"){
            this.close();
            this.produit.categorie=undefined
            this.recevoir_categorie()
          }
          this.produit.id_produit=data.id;
          if (this.produit.type=="entrant") {
            this.api.global.les_produits_entrants.push(Object.assign({},this.produit))
          } else if (this.produit.type=="sortant") {
            this.api.global.les_produits_sortants.push(Object.assign({},this.produit))
          }
          this.initialiser_formulaire()
        } else {
          this.echec=true
        }
      })
    }
  }
  close(){
    this.api.bool.ajouterproduit=false
  }
  modifier(){
    this.produit.id_enregistreur=1
    this.produit.id_entreprise=1
    this.succes=false
    this.echec=false
    console.log(this.produit)
    this.api.post_utilisateur_connecte({modifier_produit:true,produit:JSON.stringify(this.produit)}).subscribe((data:any)=>{
      console.log(data)
      if (data.status) {
        this.api.sendEvent("item_liste_produit",Object.assign({},this.produit))
        this.succes=true
        this.initialiser_formulaire()
        this.close()
        alert("Modification reussie !")
      } else {
        this.echec=true
      }
    })
  }
}
