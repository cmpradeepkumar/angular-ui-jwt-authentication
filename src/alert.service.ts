import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertService {
  private subject = new Subject();
  constructor() { }

  getAlert(): Observable<any>{
    return this.subject.asObservable();
  }

}