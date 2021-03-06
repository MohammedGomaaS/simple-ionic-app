import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-details',
  templateUrl: 'account-details.html',
})
export class AccountDetailsPage {
account:any={number:'',totalBill:'',totalServices:''};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.account = navParams.data.account;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountDetailsPage');
  }

}
