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
  clicksuscription: Subscription = new Subscription;
  constructor(public data:DataService) { 
    this.clicksuscription=data.getBasGaucheClick().subscribe((data:any)=>{
      this.clique(data)
    })
  }

  ngOnInit(): void {
  }
  clique(data:any){
    console.log("clique")
    this.item=data
  }
  close(){
    this.data.sendCloseClick()
  }
}
