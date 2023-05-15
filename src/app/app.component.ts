import { Component, OnInit } from '@angular/core';

import { User } from './user';

import { HttpClient } from '@angular/common/http';


@Component({

  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']

})

export class AppComponent {

  title = 'my-map-app';

  userData:User[] | undefined; // |undefined is used just in case if it doesn't get any data from the API

  constructor(

    private httpclient: HttpClient

  ) {  }

  ngOnInit() {

    this.getJsonData();

  }

  getJsonData() {

    this.httpclient.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe((res) => {

      this.userData = res;

    });

  }

}