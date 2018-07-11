import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  allSketches(){
    return this._http.get('/sketches')
  }

  createSketch(new_sketch){
    return this._http.post('/sketch/create', new_sketch)
  }
  
  rateSketch(params, sketch_id){
    console.log("rate services", sketch_id, params)
    return this._http.post('/sketch/rate/'+ sketch_id, params)
  }
  showOneSketch(sketch_id){
    return this._http.get('/sketch/'+sketch_id)
  }
  
}
