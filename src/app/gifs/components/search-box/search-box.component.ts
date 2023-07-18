import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent{

  // Referencia al HTML
  @ViewChild('texto') 
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  BarraBusqueda(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = "" //Limpiar caja de texto


    console.log({newTag});
  }

}
