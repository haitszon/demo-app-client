import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'HOMEPAGE';
  
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.clear();
  }
  
  clear() : void {
    this.messageService.clear();
  }

}