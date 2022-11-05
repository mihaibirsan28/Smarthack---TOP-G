import { Component, OnInit, Input } from '@angular/core';
import {min} from "rxjs";

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {
  @Input() valueNow: number;
  @Input() valueFinal: number;
  constructor() { }

  ngOnInit(): void {
  }

  min(n1: number, n2:number) {
    if (n1 < n2) {
      return n1;
    }
    return n2;
  }
}
