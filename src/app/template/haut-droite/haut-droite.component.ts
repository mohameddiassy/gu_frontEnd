import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-haut-droite',
  templateUrl: './haut-droite.component.html',
  styleUrls: ['./haut-droite.component.css']
})
export class HautDroiteComponent implements OnInit {
  item:any
  produit:any
  clicksuscription: Subscription = new Subscription;
  clickproduit: Subscription = new Subscription;
  constructor(public data:DataService) { 
    this.clicksuscription=data.getBasGaucheClick().subscribe((data:any)=>{
      this.clique(data)
      
    })
    //ecouter produit
    this.clickproduit=data.getProduit().subscribe((data:any)=>{
      this.produit=data
      this.item=undefined
    })
  }

  ngOnInit(): void {
  }
  clique(data:any){
    console.log("clique")
    this.item=data
    this.produit=undefined
  }
  close(){
    this.data.sendCloseClick()
  }
}
