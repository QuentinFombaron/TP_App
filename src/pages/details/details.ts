import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Result } from '../home/home';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  result: Result;
  constructor(public navParams: NavParams) {
    this.result = this.navParams.get('data_result');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
