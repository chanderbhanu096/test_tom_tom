import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import tt from '@tomtom-international/web-sdk-maps';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-map-app';
  userData:User[] | undefined; // This line declares a variable called userData and specifies its type as an array of User objects. The | undefined part means that the variable can also have a value of undefined, which is used as a fallback in case it doesn't receive any data from the API.|undefined is used just in case if it doesn't get any data from the API
  map:any;
  marker:any;
  
  constructor(        //This is a constructor function that is called when an instance of the AppComponent is created. It takes an argument called httpclient of type HttpClient. The private keyword means that this argument is accessible only within the AppComponent class
    private httpclient: HttpClient 
  ) {  }

  ngOnInit() {                   // The ngOnInit function is a lifecycle hook in Angular that is called after the component is initialized. In this case, it is used to call the getJsonData function when the component is ready.
    this.map = tt.map({

      key: '<add your key here>',

      container: 'map',

      style: 'tomtom://vector/1/basic-main',

      zoom:1.2

    });
    this.getJsonData();
  }

  getJsonData() {   //his is a function defined within the AppComponent class. It uses the httpclient object to send an HTTP GET request to the specified URL and then subscribes to the response. The response is then assigned to the userData variable.
    this.httpclient.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe((res) => {  
      this.userData = res;
      for (var i=0;i<this.userData.length;i++) {

        this.marker = new tt.Marker({draggable:false})

            .setLngLat([this.userData[i].address.geo.lng,this.userData[i].address.geo.lat])

            .addTo(this.map);

      }

    });

  }

}