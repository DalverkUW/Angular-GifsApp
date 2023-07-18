import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[]=[]

  private _tagsHistory: string[] = []
  private URL: string = 'https://api.giphy.com/v1/gifs'
  private APIkey = 'w5ZbrJkMNpQlF47Y9bre5z1FKr3QWiKO'
  

  constructor(private http: HttpClient) { 
    this.loadLocalStorage();
   }


  get tagsHistory(){
    return [...this._tagsHistory]
  }



  private organizaHistorial(tag:string){
    tag = tag.toLowerCase(); //El texto buscado pasa a minúscula para facilitar ver si ya se buscó elemento

    // Si el arreglo (_tagsHistory) ya incluye el nuevo elemento a buscar, entonces se reemplaza la busqueda anterior por la nueva
    if (this._tagsHistory.includes(tag)) {
      //filtra la búsqueda. Solo las búsquedas diferentes pasarán.
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag); //Añade nuevo tag/búsqueda al inicio
    this._tagsHistory = this._tagsHistory.splice(0, 10) //Limitar el historial a 10 búsquedas. Si sobrepasa, se eliminará el elemento mas viejo
    this.saveLocalStorage()
  }


  // LOCAL STORAGE //
  private saveLocalStorage(){
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(){
    if (!localStorage.getItem('history')) return
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    //Para mantener las imágenes al recargar o volver a la página
    if (this._tagsHistory.length === 0) return 
    this.searchTag(this._tagsHistory[0])  
    
  }

  searchTag(tag: string){  
    if (tag.length === 0) {return}
    this.organizaHistorial(tag);
    const params = new HttpParams().set('api_key', this.APIkey).set('limit', '10').set('q', tag)

    this.http.get<SearchResponse>(`${this.URL}/search`, {params})
    .subscribe(resp => {
      this.gifList = resp.data;
    })
 
  }
}
