import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-entete-mois',
  templateUrl: './entete-mois.component.html',
  styleUrls: ['./entete-mois.component.css']
})
export class EnteteMoisComponent implements OnInit {

  item:any
  constructor(public data:DataService) {
    this.item=this.data.les_mois[0]
    data.getEvent().subscribe((data)=>{
      this.item=data.item
      console.log("entete jour= ",this.item)
    })
  }
  ngOnInit(): void {
  }

}
