import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-haut-gauche',
  templateUrl: './haut-gauche.component.html',
  styleUrls: ['./haut-gauche.component.css']
})
export class HautGaucheComponent implements OnInit {
  
  
  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.get_fenetres()
  }
  changement(){
    console.log("option= ",this.api.global.fenetre_selectionnee)
    // this.data.envoyerClick()
  }
  get_fenetres(){
    this.api.post({get_fenetre:true}).subscribe((data:any)=>{
      if (data.status) {
        this.api.global.les_fenetres=data.les_fenetres
      } else {
        console.log("erreur de reception des fenetre")
      }
    })
  }
}
