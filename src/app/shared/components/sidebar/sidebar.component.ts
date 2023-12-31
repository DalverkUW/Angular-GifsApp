import { GifsService } from './../../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get tags(){
    return this.gifsService.tagsHistory
  }

  clickHistory(tag: string){
    this.gifsService.searchTag(tag);
  }

}
