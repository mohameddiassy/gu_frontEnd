import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-mes-entreprises',
  templateUrl: './mes-entreprises.component.html',
  styleUrls: ['./mes-entreprises.component.css']
})
export class MesEntreprisesComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
  }

}
