import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecepiService {

  constructor(private http: HttpClient) { }

  getAllRecepis(recepi: string = ''){
    return this.http.get<any[]>('https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?q=' + recepi);
  }
}
