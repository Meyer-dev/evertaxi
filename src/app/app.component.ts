import { Component, OnInit } from '@angular/core'
import { knownFolders } from '@nativescript/core';

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  constructor() {
// Use the component constructor to inject services.
  }

  folder:any;
  file:any;
  successMessage:any;
  writtenContent:any;

//The below array is past ride data that will be written into local storage when the app initialises.
  rideHistory: any = [
    {
      "date": "23/03/2022",
      "time": "12:18 pm",
      "fromLocation": "23 James Street",
      "toLocation": "12 John Close",
      "price": "€7",
      "status": "Complete"
    },
    {
      "date": "20/03/2022",
      "time": "14:08 pm",
      "fromLocation": "56 Graham Street",
      "toLocation": "17 Peter road",
      "price": "€4",
      "status": "Complete"
    },
    {
      "date": "12/03/2022",
      "time": "8:56 am",
      "fromLocation": "43 Tash Road",
      "toLocation": "122 Lenord Terrace",
      "price": "€8",
      "status": "Cancelled"
    },
    {
      "date": "10/03/2022",
      "time": "18:14 pm",
      "fromLocation": "87 Bruce Drive",
      "toLocation": "26 Alice Close",
      "price": "€12",
      "status": "Complete"
    },
    {
      "date": "4/03/2022",
      "time": "11:04 am",
      "fromLocation": "93 Ryan Street",
      "toLocation": "9 Larry lane",
      "price": "€30",
      "status": "Cancelled"
    },
    {
      "date": "25/02/2022",
      "time": "13:16 pm",
      "fromLocation": "19 Shelly Street",
      "toLocation": "36 Ronald Road",
      "price": "€6",
      "status": "Complete"
    },
    {
      "date": "18/02/2022",
      "time": "7:21 am",
      "fromLocation": "62 Mountain Drive",
      "toLocation": "173 Pearl Street",
      "price": "€8",
      "status": "Cancelled"
    },
    {
      "date": "11/02/2022",
      "time": "10:16 am",
      "fromLocation": "44 River Close",
      "toLocation": "116 St Bernard Road",
      "price": "€9",
      "status": "Complete"
    },
    {
      "date": "26/01/2022",
      "time": "19:43 pm",
      "fromLocation": "143 Olivia Road",
      "toLocation": "71 Slow Drive",
      "price": "€10",
      "status": "Complete"
    },
    {
      "date": "15/01/2022",
      "time": "20:38 pm",
      "fromLocation": "14 Carla Street",
      "toLocation": "93 Jonothan Lane",
      "price": "€16",
      "status": "Complete"
    },      
  ]

  ngOnInit(): void {
    this.writeToFile();
  }

//The below function writes ride history data into local storage.
  writeToFile(): void {
    let documents = knownFolders.documents();
    this.folder = documents.getFolder("evertaxi");
    this.file = this.folder.getFile(("rideHistory") + ".txt");
    this.file.writeText(JSON.stringify(this.rideHistory))
        .then(result => {
            this.file.readText()
                .then(res => {
                    this.successMessage = "Successfully saved in " + this.file.path;
                    this.writtenContent = res;
                });
        }).catch(err => {
        console.log(err);
    });
  }
}
