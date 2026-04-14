import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SnacksService {
  private jsonUrl = '/assets/json/snacks.json';
  constructor(private http: HttpClient) {}
  getSnacks(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
