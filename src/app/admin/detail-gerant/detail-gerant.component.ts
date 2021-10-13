import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-detail-gerant',
  templateUrl: './detail-gerant.component.html',
  styleUrls: ['./detail-gerant.component.css']
})
export class DetailGerantComponent implements OnInit {

  constructor(private router:ActivatedRoute,public data:DataService) { }
  id_agent:number=0
  agent:any={}
  ngOnInit(): void {
  
    this.router.params.subscribe((params:any)=>{
      this.id_agent=params["id_agent"];
      if (this.id_agent) {
        console.log("i_agent est present"+this.id_agent)
        this.agent_id()
      } else {
        console.log("i_agent est absent")
        
      }
    })
  }
  agent_id(){
    this.data.requete_post("get_enregistreur_by_id.php",{id_agent:this.id_agent},(data:any)=>{
      this.agent=data[0]
    })
  }
 
}
