import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.css']
})
export class SortieComponent implements OnInit {
  constructor(public data:DataService) { }

  ngOnInit(): void {
    this.recevoir_sorties()
  }
  recevoir_sorties(){
    this.data.requete_post("get_sortie_by_id.php",{id_utilisateur:1},(data:any)=>{
      this.data.les_sorties=data
    })
  }
}
