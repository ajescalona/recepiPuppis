import { Component, OnInit, ViewChild } from '@angular/core';
import { RecepiService } from '../core/service/recepi.service';
import { IonInput } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HelperService } from '../common/helpers/help.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  //@ViewChild ('textSearchInput') textSearchInput: IonInput;
  @ViewChild('textSearchInput', {static: true}) textSearchInput: IonInput;

  recepi$ = new Subject<void>();

  public isMobile: boolean;

  showList: boolean = false;
  searchText: string = '';

  searchForm: FormGroup;
  recepi: any = [];

  constructor(private recepiService: RecepiService, private fb: FormBuilder, private helper: HelperService) {}

  ngOnInit(){
    this.isMobile = this.helper.isMobile();
    this.buildForm();
    this.subscribeToSearch();
    this.getAllRecepi();
  } 
  
  subscribeToSearch() {
    this.textSearchInput.ionInput.pipe(
      takeUntil(this.recepi$),
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)
      // Time in milliseconds between key events
      , debounceTime(1000)
      // If previous query is diffent from current
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {
      this.showResults();
    });
  }

  getAllRecepi(){
    this.recepiService.getAllRecepis().subscribe((data: any = []) =>{
      this.recepi = data.results; 
      console.log(this.recepi);
    });
  }

  search(){
    this.recepiService.getAllRecepis(this.searchText).subscribe((data: any = []) =>{
      this.recepi = data.results; 
      console.log(this.recepi);
      this.showList = true;
    });
  }

  buildForm() {
    this.searchForm = this.fb.group({
      searchText: ['', Validators.required]
    });
  }

  showResults() {
    this.showList = !this.showList;
    this.search();
  }

  toggleFilter() {
    if (this.showList) {
      this.searchText = '';
      this.recepi = [];
      this.showList = !this.showList;
      this.getAllRecepi();
    } else if (!this.showList && this.searchText !== '') {
      this.showList = !this.showList;
      this.search();
    }
  }

}
