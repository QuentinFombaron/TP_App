import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_Key } from '../../app/tmdb';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Shake } from '@ionic-native/shake';

export interface Result {
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  id: number;
  vote_average: number;
}

// const fakeResults: Result[] = [
//   {
//     title: "Kingsman : Le Cercle d'or",
//     poster_path: "/iNmrBnvJfzuubl308rveefYUzKj.jpg",
//     backdrop_path: "/uExPmkOHJySrbJyJDJylHDqaT58.jpg",
//     overview: "Kingsman, l’élite du renseignement britannique en costume trois pièces, fait face à une menace sans précédent. Alors qu’une bombe s’abat et détruit leur quartier général, les agents font la découverte d’une puissante organisation alliée nommée Statesman, fondée il y a bien longtemps aux Etats-Unis. Face à cet ultime danger, les deux services d’élite n’auront d’autre choix que de réunir leurs forces pour sauver le monde des griffes d’un impitoyable ennemi, qui ne reculera devant rien dans sa quête destructrice.",
//     release_date: "2017-09-20",
//     id: 343668
//   }
// ]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  results: Observable<Result[]> = Observable.of([]);
  searchQuery: string = "";
  pushPage: any = DetailsPage;
  shakeSubscription: Subscription;

  constructor(private httpClt: HttpClient,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public shake: Shake) { }

  //Fonction de recherche
  getResults(ev: any) {
    let val = ev.target.value;

    if (val) {
      this.results = this.fetchResults(val);
    } else {
      this.results = Observable.of([]);
    }
  }

  fetchResults(query: string): Observable<Result[]> {
    return this.httpClt.get<Result[]>("https://api.themoviedb.org/3/search/movie", {
      params: new HttpParams().set("api_key", API_Key).set("query", query).set("language", "fr")
    }).pluck("results");
  }

  private discoverMovies(): Observable<Result[]> {
    return this.httpClt.get<Result[]>("https://api.themoviedb.org/3/discover/movie", {
      params: new HttpParams()
      .set("api_key", API_Key)
      .set("language", "fr")
      .set("primary_release_year", "2018")
    }).pluck("results");
  }

  private showRandomMovieAlert (movies: Result[]): void {
      const movie: Result = movies[Math.floor(Math.random() * movies.length)];

      const confirm = this.alertCtrl.create({
        title: movie.title,
        message: movie.overview,
        buttons: [
          {
            text: 'Annuler',
            handler: () => {
              console.log('Annuler est clické');
            }
          },
          {
            text: 'Détails',
            handler: () => {
              console.log('Détails est clické');
              this.navCtrl.push(DetailsPage, {data_result: movie});
            }
          }
        ]
      });
      confirm.present();
  }

  // ionViewDidEnter() {
  //   this.shakeSubscription = this.shake.startWatch()
  //     .switchMap(() => this.discoverMovies())
  //     .subscribe(movies => this.showRandomMovieAlert(movies));
  // }

  // ionViewWillLeave() {
  //   this.shakeSubscription.unsubscribe();
  // }

}
