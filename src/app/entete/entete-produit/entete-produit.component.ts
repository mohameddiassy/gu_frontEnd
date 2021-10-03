import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-entete-produit',
  templateUrl: './entete-produit.component.html',
  styleUrls: ['./entete-produit.component.css']
})
export class EnteteProduitComponent implements OnInit {

  item:any
  constructor(public data:DataService) {
    this.item=data.les_produits[0]   
    data.getEvent().subscribe((data)=>{
      this.item=data.item
      console.log("entete jour= ",this.item)
    })
  }
  ngOnInit(): void {

  }

}
