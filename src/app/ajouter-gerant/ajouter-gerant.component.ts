import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajouter-gerant',
  templateUrl: './ajouter-gerant.component.html',
  styleUrls: ['./ajouter-gerant.component.css']
})
export class AjouterGerantComponent implements OnInit {
  
  succes=false
  echec=false
  constructor() { }

  ngOnInit(): void {
  }

}
