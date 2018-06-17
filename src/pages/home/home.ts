import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import { AccountsProvider } from '../../providers/accounts/accounts';
import { LoadingController } from 'ionic-angular';
import {  AccountDetailsPage} from '../account-details/account-details';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  searchItem: FormControl;
  accounts: any[] = [];
  selectedAcounts: any[];
  total: any;
  skip: any;
  loading: any;
  searchParams: any;
  totalResult: any;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public accountsProvider: AccountsProvider) {

  }
  initFormControls() {
    this.searchItem = new FormControl();


  }
  ngOnInit() {
    this.firstStart();

  }
  firstStart() {
    this.initFormControls();
    this.searchItem.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {
        this.resetVariables();
        this.addOrReplaceSearchParams({ key: "number[$like]", value: term.trim() });
        this.getAccounts(this.searchParams);
      });
    this.getAccounts();

    this.resetVariables();

  }
  addOrReplaceSearchParams(searchParam) {
    const i = this.searchParams.findIndex(_item => _item.key == searchParam.key);
    if (i > -1) this.searchParams[i] = searchParam; // (2)
    else this.searchParams.push(searchParam);

  }
  resetVariables() {
    this.selectedAcounts = [];
    this.total = 0;
    this.skip = 0;
    this.searchParams = [];
  }
  getAccounts(searchParams: any[] = [], infiniteScroll?: any) {
    this.loading = true;
    this.accountsProvider.getAccounts(searchParams).subscribe(result => {
      this.totalResult = result.total;
      const i = this.searchParams.findIndex(_item => _item.key == '$skip');
      if (i > -1) {
        this.accounts = this.accounts.concat(result.data);

      }
      else {
        this.accounts = result.data;

      }

      this.loading = false;
      if (infiniteScroll) {
        infiniteScroll.complete();
        console.log("mmmmmmmmmmmmmmm")
      }

    }, error => {
      this.loading = false;
      if (infiniteScroll) {
        infiniteScroll.complete();
      }

    })
  }

  select(account) {
    this.selectedAcounts.push(account);
  }
  unSelect(account) {
    let index = this.selectedAcounts.indexOf(account);

    this.selectedAcounts.splice(index, 1)
  }
  selectOrUnSelect(account) {
    if (this.isSelected(account))
      this.unSelect(account);

    else this.select(account);
  }
  slectAll() {
    this.selectedAcounts = Object.assign([], this.accounts);
  }
  unSelectAll() {
    this.selectedAcounts = [];
  }
  isSelected(account) {

    const i = this.selectedAcounts.findIndex(_item => _item._id == account._id);
    if (i > -1) return true;
    else return false;
  }
  isSelectedAll() {
    if (this.accounts.length == this.selectedAcounts.length) return true;
    return false;
  }
  getTotal() {
    this.total = 0;
    for (let index = 0; index < this.selectedAcounts.length; index++) {
      this.total += this.selectedAcounts[index].totalBill;

    }
    return this.total;
  }

  doInfinite(infiniteScroll) {
    this.skip = this.skip + 10;
    this.addOrReplaceSearchParams({ key: "$skip", value: this.skip });
    if ((this.skip) < this.totalResult) {
      this.getAccounts(this.searchParams, infiniteScroll);
    }
    else {
      infiniteScroll.complete()
    }

  }
  highlight(content) {
    if(!this.searchItem.value) {
        return content;
    }
    return content.replace(new RegExp(this.searchItem.value, "gi"), match => {
        return '<span class="highlightText">' + match + '</span>';
    });
}
navigateTo(account){
  this.navCtrl.push(AccountDetailsPage, {
    account
  });
}


}
