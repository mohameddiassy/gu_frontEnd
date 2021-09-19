import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  message_texte(un_logo:any){
    return "https://api.whatsapp.com/send?text=Salut!😍 J'ai obtenu de *jolies montages photos* avec ce site en quelques secondes et *gratuitement*. Rendez vous vite sur *Amar Montage Logo* en cliquant sur ce lien 👉 https://logo.groupemeta.com/"+un_logo.id_logo+" .Ceci est une production de l'entreprise *META* (plus d'informations 👉  contact@groupemeta.com site officiel👉 https://groupemeta.com). Merci de partager l'information avec vos proches😍";
  }
}
