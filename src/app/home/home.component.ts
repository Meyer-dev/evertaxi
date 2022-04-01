import { Component, OnInit } from '@angular/core'
import { confirm } from "@nativescript/core";
import { RouterExtensions }         from "@nativescript/angular";
import { CardView } from '@nstudio/nativescript-cardview';
import { registerElement } from '@nativescript/angular';
import { knownFolders } from '@nativescript/core';
registerElement('CardView', () => CardView);

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  constructor(private routerExtensions: RouterExtensions) {
  }

  file:any;
  folder:any;
  rideHistory:any;

  ngOnInit(): void {
    this.readFromFile();
  }

  //The below function reads the ride history data from local storage and parses the data into an array.
  readFromFile(){
    let documents = knownFolders.documents();
    this.folder = documents.getFolder("evertaxi");
    this.file = this.folder.getFile(("rideHistory") + ".txt");
    this.file.readText()
    .then(res => {
        this.rideHistory = JSON.parse(res);
    }).catch(err => {
        console.log(err.stack);
    });
  }
  
  //The below function logs the user out and prevents routing back into the app.
  logout() {
    confirm({
        title: "Logging Out",
        message: "Are you sure you want to log out?",
        okButtonText: "Yes, log out",
        cancelButtonText: "No"
    }).then((result) => {
        if (result==true){
          this.routerExtensions.navigate(["/login"], { clearHistory: true });
        }
    });
  }
}
