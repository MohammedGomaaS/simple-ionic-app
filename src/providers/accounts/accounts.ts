
import { Injectable } from '@angular/core';
import {HTTPRequestProvider} from '../http-request/http-request';
/*
  Generated class for the ServicesAccountsAccountsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountsProvider {

  constructor(public hTTPRequest:HTTPRequestProvider) {

  }
  getAccounts(searchParams:any[]){
    return  this.hTTPRequest.search(searchParams,'accounts/');
  }

}
