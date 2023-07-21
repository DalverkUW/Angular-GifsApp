import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'app-gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.css']
})
export class GifsCardComponent implements OnInit {

  @Input()
  public gif!: Gif;

  constructor() { }

  ngOnInit(): void {
    if (!this.gif) {
      throw new Error("Propiedad de gif requerida")
    }
  }

}
