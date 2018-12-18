import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  show = false

  constructor() { }

  ngOnInit() {

  }

  showDemo() {
    this.show = !this.show;
  }

}
