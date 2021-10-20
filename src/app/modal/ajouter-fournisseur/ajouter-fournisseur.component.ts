import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-ajouter-fournisseur',
  templateUrl: './ajouter-fournisseur.component.html',
  styleUrls: ['./ajouter-fournisseur.component.css']
})
export class AjouterFournisseurComponent implements OnInit {stock_en_cour:any=0;
  fournisseur:any = { nom: "", adresse: "",telephone: "",description: ""}
  option = "2"
  succes = false
  echec = false
  item: any
  constructor(public api: ApiService) {
    api.getEvent().subscribe((data) => {
      if (data.code == "ajouterfournisseur") {
        this.item = data.data
      }
    })
  }
  ngOnInit(): void {
  }
  ajouter() {
    this.echec = false
    this.succes = false
      this.api.post({ add_fournisseur: true, entree: JSON.stringify(this.fournisseur) }).subscribe((data: any) => {
        if (data.status) {
          this.succes = true
          this.api.sendEvent("ajouterfournisseur",this.item)
        } else {
          this.echec = true
        }
      })
    }

  parse(quantite:string)
  {
    return parseInt(quantite)
  }
 changement() {

 }
}
