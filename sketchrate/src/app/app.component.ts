import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newSketchAdd: any;
  sketches = [];
  newComment: any;
  showSketch;
  avg = 0;
  public showAvg: boolean = false;
  
  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.newSketchAdd= {artist:"", sketch:""};
    this.newComment= {comment:""};
    this.allSketches();
  };
// ____________________________show all sketches//
  allSketches(){ 
    let observable = this._httpService.allSketches();
    observable.subscribe(data => {
      this.sketches = data['sketches'];
    });
  };
// ____________________________create sketch//
  createSketch(){
    let observable = this._httpService.createSketch(this.newSketchAdd);
    observable.subscribe(data => {
      this.newSketchAdd = {artist:"", sketch:""};
      this.allSketches();
      this.showAvg = false;
    });
  };
// ____________________________show sketch//
  showOnClick(sketch){
    let observable = this._httpService.showOneSketch(sketch);
    observable.subscribe(data=>{
      this.showSketch = data["sketch"];
      this.avg = findAvg(this.showSketch);
      this.showAvg = true;
      
      function findAvg(arr){
        var sum = 0;;
        var count = 0;
        var avg;
        for(var x of arr.comments){
          sum += +x.rating;
          count += 1;
        }
        avg = Math.floor(sum/count);
        return avg; 
      }
    })
  }
// ____________________________rate sketch//  
  rateSketch(sketch_id, event){
    var event_val = event.target;
    var comment = event_val.comment.value;
    var rating = event_val.rating.value;
    this.newComment = {comment:comment, rating:rating}

    let observable = this._httpService.rateSketch(this.newComment, sketch_id);
    observable.subscribe(data => {
      var temp = data["comment"];
      this.avg = this.findAvg(temp);
      this.showAvg = true;
      this.showOnClick(sketch_id)
      this.newComment = {comment: ""};
    })
  };
// ____________________________find average function// 
  findAvg(arr){
    var sum = 0;;
    var count = 0;
    var avg;
    for(var x of arr.comments){
      sum += +x.rating;
      count += 1;
    }
    avg = Math.floor(sum/count);
    return avg; 
  }
    
};
