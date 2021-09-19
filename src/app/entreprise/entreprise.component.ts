import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {
  listeEntreprise : any;

  constructor(public data : DataService) { }
  
  ngOnInit(): void {
    this.data.requete_post("get_all_entreprise.php",{},(data:any)=>{
      this.data.les_entreprises=data
    })
  }
  supprimer_entreprise(){
    
  }
}

