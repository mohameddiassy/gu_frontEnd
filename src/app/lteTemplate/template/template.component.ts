import { Component, OnInit } from '@angular/core';
import { BodyComponent } from 'src/app/template/body/body.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  les_components:any={
    body:BodyComponent
  }
  constructor() { }

  ngOnInit(): void {
  }

}
