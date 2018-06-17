import { isDevMode } from '@angular/core'
export class BaseURL { 
    getBaseURL(){
        if(isDevMode()) {
            return 'http://localhost:3000/';
          }
          else{
              return 'http://localhost:3000/';
          }
    }
    
  }
 