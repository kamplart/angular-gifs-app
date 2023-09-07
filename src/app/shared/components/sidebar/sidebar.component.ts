import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService :GifsService){
  }

  buscar( tag:string): void {
    this.gifsService.searchTag(tag);
  }

  get tags(): string[]{
    return this.gifsService.tagsHistory;
  }

}
