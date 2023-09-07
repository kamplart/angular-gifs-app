
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = '4e9YxnoR01CNZ3TbTmTLqiST5mLa14Pt';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private limit: string = '10';


  constructor( private http: HttpClient ) {

    this.loadLocalStorage();
    console.log('carga');
  }

  get tagsHistory(){
    //return this._tagsHistory;
    return [...this._tagsHistory];
  }

private organizeHistory(tag:string){
  tag = tag.toLowerCase();
  if( this._tagsHistory.includes(tag)) {
    this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
  }
  this._tagsHistory.unshift(tag);
  this._tagsHistory = this._tagsHistory.splice(0,10);

  this.saveLocalStorage();
}

private saveLocalStorage(): void{
  localStorage.setItem('history',JSON.stringify(this._tagsHistory));
}

private loadLocalStorage(): void{
  if(! localStorage.getItem('history')) return;

  this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

  if(this._tagsHistory.length===0) return;
  this.searchTag(this._tagsHistory[0]);

}


  searchTag(tag:string): void{
    if( tag.length === 0 ) return;

    //console.log({Tag : tag});

    this.organizeHistory(tag);
    //this._tagsHistory.unshift(tag);
    //console.log(this._tagsHistory);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', this.limit)
    .set('q', tag);

    //fetch('https://api.giphy.com/v1/gifs/search?api_key=4e9YxnoR01CNZ3TbTmTLqiST5mLa14Pt&q=valorant&limit=10').then(resp => resp.json()).then(data => console.log(data));

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe( resp =>{
      this.gifList = resp.data;
      //console.log({ gifs: this.gifList });
    }
    );


  }



}
