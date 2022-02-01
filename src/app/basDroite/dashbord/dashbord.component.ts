import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { single } from './data';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  les_statistiques_backend:any=[]
  les_statistiques:any=[
    {nom:"Les bénéfice récents",liste:[{nom:"Mars",quantite:"40 000 f"},{nom:"Avril",quantite:"75 000 f"},{nom:"Mai",quantite:"30 000 f"},{nom:"Juin",quantite:"100 000 f"}]},
    {nom:"Les chiffres d'affaires récents",liste:[{nom:"Mars",quantite:"140 000 f"},{nom:"Avril",quantite:"250 000 f"},{nom:"Mai",quantite:"300 000 f"},{nom:"Juin",quantite:"100 000 f"}]},
    {nom:"Les meilleurs vendeurs de votre entreprise",liste:[{nom:"Ass Diop (KM)",quantite:"755 000 f"},{nom:"Senghor",quantite:"400 000 f"},{nom:"Lamine Sarr",quantite:"140 000 f"}]},
    {nom:"Les produits le mieux vendu",liste:[{nom:"Pain Simple",quantite:"9576 pièces"},{nom:"Pain Mais",quantite:"3000 pièces"},{nom:"Pain Sans Sel",quantite:"700 pièces"}]},
    {nom:"Ajoutez la nouvelle fonctionnalité de GUSTock pour 100f le mois",liste:[]},
    {nom:"Derniers visites sur votre boutique en ligne",liste:[{nom:"Pain Simple",quantite:"15 commandes"}]},
  ]
  les_ressumes_statistiques:any=[
    {nom:"Chiffre d'affaire",icone:"money-check-alt",nombre:"1000",bg_color:"#63c2de",unite:"fcfa",t_color:"white"},
    {nom:"Bénéfice du dernier mois",icone:"thumbs-up",nombre:"1000",bg_color:"#ffc107",unite:"fcfa",t_color:"white"},
    {nom:"Vente",icone:"shopping-cart",nombre:"1000",bg_color:"#3EF06B",unite:"fcfa",t_color:"white"},
    {nom:"Dépenses",icone:"share-square",nombre:"1000",bg_color:"#F00053",unite:"fcfa",t_color:"white"},
  ]
  single: any[]=[];
  multi: any[]=[];
  les_mois:any[]=[]
  mois_select: any;  view:any= [400, 400];
  page=1
  pageSize=4
  page_entree=1
  pageSize_entree=4

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
  item: any;

  constructor(public api:ApiService) {

    Object.assign(this, { single })


    api.getEvent().subscribe((data)=>{
      if(data.code=="item_list_dashboard"){
        this.item=data.data
        this.recevoir_dashboard(this.item.date);


      }

    })

  }
  ngOnInit(): void {
  }

  onSelect(event:any) {
    console.log(event);
  }
  recevoir_mois(){
    this.api.post_utilisateur_connecte({les_mois:true}).subscribe((data:any)=>{
      this.les_mois=data.les_mois
      this.mois_select = this.les_mois[0].mois;
      
      //this.les_stats=data.les_statistiques
      console.log("get_sortie_date",data)
    
    })
  }
  recevoir_dashboard(date:any) {
    this.api.post_utilisateur_connecte({dashboard:true,date:date}).subscribe((data:any)=>{
      this.les_statistiques_backend=data
      console.log("dashboard= ",data)
    })
  }
}
