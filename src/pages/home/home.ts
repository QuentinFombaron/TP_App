import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResolvedReflectiveFactory } from '@angular/core/src/di/reflective_provider';
import { DetailsPage } from '../details/details';

export interface Result {
  author: string;
  date: number;
  image: string;
  title: string;
}

const fakeResults: Result[] = [
  {
  author: 'Author1',
  date: 2017,
  //image: 'http://lorempixel.com/300/300/abstract/1',
  image: 'http://via.placeholder.com/300x300',
  title: 'Result1'
  },
  {
  author: 'Author2',
  date: 2018,
  //image: 'http://lorempixel.com/300/300/abstract/2',
  image: 'http://via.placeholder.com/300x300',
  title: 'Result2'
  },
  {
  author: 'Author3',
  date: 2019,
  //image: 'http://lorempixel.com/300/300/abstract/3',
  image: 'http://via.placeholder.com/300x300',
  title: 'Result3'
  }
]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  results: Result[];
  searchQuery: string = '';
  items: Result[];
  pushPage: any;

  constructor(public navCtrl: NavController) {
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
     this.initializeItems(fakeResults);
    } else {
      this.initializeItems([]);
    }
  }

}
