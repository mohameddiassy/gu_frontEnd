import { Component, OnInit } from '@angular/core';
import { single } from './data';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  les_statistiques:any=[
    {nom:"Les bénéfice récents",liste:[{nom:"Mars",quantite:"40 000 f"},{nom:"Avril",quantite:"75 000 f"},{nom:"Mai",quantite:"30 000 f"},{nom:"Juin",quantite:"100 000 f"}]},
    {nom:"Les chiffres d'affaires récents",liste:[{nom:"Mars",quantite:"140 000 f"},{nom:"Avril",quantite:"250 000 f"},{nom:"Mai",quantite:"300 000 f"},{nom:"Juin",quantite:"100 000 f"}]},
    {nom:"Les meilleurs vendeurs de votre entreprise",liste:[{nom:"Ass Diop (KM)",quantite:"755 000 f"},{nom:"Senghor",quantite:"400 000 f"},{nom:"Lamine Sarr",quantite:"140 000 f"}]},
    {nom:"Les produits le mieux vendu",liste:[{nom:"Pain Simple",quantite:"9576 pièces"},{nom:"Pain Mais",quantite:"3000 pièces"},{nom:"Pain Sans Sel",quantite:"700 pièces"}]},
    {nom:"Ajoutez la nouvelle fonctionnalité de GUSTock pour 100f le mois",liste:[]},
    {nom:"Derniers visites sur votre boutique en ligne",liste:[{nom:"Pain Simple",quantite:"15 commandes"}]},
  ]
  single: any[]=[];
  multi: any[]=[];

  view:any= [400, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  legendPosition:any='below'

  colorScheme :any= {domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };

  constructor() {
    Object.assign(this, { single })
  }
  ngOnInit(): void {
  }

  onSelect(event:any) {
    console.log(event);
  }
}
