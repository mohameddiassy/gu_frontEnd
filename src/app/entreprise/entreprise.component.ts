import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {
  listeEntreprise : any;
  constructor(private entrepriseService : DataService) { }
  
  ngOnInit(): void {
  
  }
}

