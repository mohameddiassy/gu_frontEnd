import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  item:any
  nombre_sortie_par_jour:any[]=[]
  option="1"
  listetrie=[
    {nom:"Jours",id:1},
    {nom:"Mois",id:2},
    {nom:"Annee",id:3}
  ]
  type = 'bar';
  title="titre du graphe"
  data = { };
  options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false, // must be false since we're going to draw our own 'gridlines'!
          color: 'rgba(255, 0, 0, .2)', // can still set the colour.
          lineWidth: 5 // can still set the width.
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  
  constructor(public d:DataService) {
    d.getEvent().subscribe((data:any)=>{
      this.item=data.item
      console.log("dans analitiques =",data)
      this.recevoir_sortie_par_jour(this.item.id_produit)
    })
   }

  ngOnInit(): void {
    this.recevoir_sortie_par_jour(this.d.les_produits[0].id_produit)
  }
  recevoir_sortie_par_jour(id_poduit:number){
    this.d.requete_post("get_nombre_de_produit_id_date.php",{id_produit:id_poduit},(data:any)=>{
      this.nombre_sortie_par_jour=data.all
      console.log(data)
      this.data = {
        labels: data.date,
        datasets: [{
          label: 'Nombre de sorties',
          data: data.nombre,
          borderWidth: 3,
          base:0,
          begin:0,
          minBarLength: 0,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
        },
      ]
      };
    })
  }
  recevoir_sortie_par_mois(id_poduit:number){
    this.d.requete_post("get_nombre_de_produit_id_mois.php",{id_produit:id_poduit},(data:any)=>{
      this.nombre_sortie_par_jour=data.all
      this.data = {
        labels: data.date,
        datasets: [{
          label: 'Nombre de sorties par mois',
          data: data.nombre,
          borderWidth: 3,
          base:0,
          minBarLength: 0,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
        }]
      };
    })
  }
  changement(){
    switch (this.option) {
      case "1":
        this.recevoir_sortie_par_jour(this.item.id_produit)
        break;
      case "2":
        this.recevoir_sortie_par_mois(this.item.id_produit)
        break;
      case "3":
        
        break;
    
      default:
        break;
    }
  }

}
