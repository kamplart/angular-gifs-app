import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'share-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {



  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

public hasLoaded: boolean = false;

ngOnInit(): void {
  if(!this.url) throw new Error('Url error');
}

onLoad(){
  setTimeout(() => {
    this.hasLoaded = true;
  }, 700);
}
}
