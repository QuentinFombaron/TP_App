import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResolvedReflectiveFactory } from '@angular/core/src/di/reflective_provider';
import { DetailsPage } from '../details/details';
import { HttpClient } from '@angular/common/http/src/client';
import { HttpParams } from '@angular/common/http/src/params';
import { API_Key } from '../../app/tmdb';
import { Observable } from 'rxjs/Observable';

export interface Result {
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  id: number;
}

const fakeResults: Result[] = [
  {
    title: "Kingsman : Le Cercle d'or",
    poster_path: "/iNmrBnvJfzuubl308rveefYUzKj.jpg",
    backdrop_path: "/uExPmkOHJySrbJyJDJylHDqaT58.jpg",
    overview: "Kingsman, l’élite du renseignement britannique en costume trois pièces, fait face à une menace sans précédent. Alors qu’une bombe s’abat et détruit leur quartier général, les agents font la découverte d’une puissante organisation alliée nommée Statesman, fondée il y a bien longtemps aux Etats-Unis. Face à cet ultime danger, les deux services d’élite n’auront d’autre choix que de réunir leurs forces pour sauver le monde des griffes d’un impitoyable ennemi, qui ne reculera devant rien dans sa quête destructrice.",
    release_date: "2017-09-20",
    id: 343668
  }
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  results: Observable<Result[]>;
  searchQuery: string = "";
  items: Result[];
  pushPage: any;

  constructor(private httpClt: HttpClient) {
    this.initializeItems([]);
    this.pushPage = DetailsPage;
  }

  initializeItems(results: Result[]): void {
    this.results = results;
  }

  //Fonction de recherche
  getResults(ev: any) {
    // this.initializeItems();
    let val = ev.target.value;
    // if (val && val.trim() != '') {
    //   this.results = this.results.filter((result) => {
    //     return (result.title.toLowerCase().indexOf(val.toLowerCase()) > -1
    //     || result.author.toLowerCase().indexOf(val.toLowerCase()) > -1
    //     || result.date.toString().indexOf(val.toString()) > -1);
    //   })
    // }
    if (val) {
     //this.initializeItems(fakeResults);
     this.results=this.fetchResults(val);
    } else {
      this.initializeItems([]);
    }
  }

  fetchResults(query: string): Observable<Result[]> {
    return this.httpClt.get<Result[]>("https://api.themoviedb.org/3/search/movie", {
      params: new HttpParams().set("api_key", API_Key).set("query", query)
    });
  }

}
