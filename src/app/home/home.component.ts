import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Quote } from "../quote";
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'HOMEPAGE';
  
  quote: Quote;
  
  constructor(private messageService: MessageService, private quoteService: QuoteService) { }

  ngOnInit() {
    this.clear();
    this.getQuote();
  }
  
  clear() : void {
    this.messageService.clear();
  }
  
  getQuote(): void {
    this.quoteService.getQuote().subscribe(quote => this.quote = quote);
  }
 
 

}
