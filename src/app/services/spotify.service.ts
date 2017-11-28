import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas:any [] = [];
  urlBusqueda:string = "https://api.spotify.com/v1/search";
  urlArtista:string = "https://api.spotify.com/v1/artists";
  token:string = "BQCiKnfs5TR9L5DfZto_0Z3t5ZP6uQoJsi18UbaZI-clzb8MXmMs_uPnnhMQr1hlLNM5Ezw4IhvxenCbAFGerQ";

  constructor( private http:Http ) { }

  getArtistas( termino:string ){
      let headers = new Headers();
      //El token expira cada hora
      headers.append('authorization', `Bearer ${ this.token }`);

      let query = `?q=${ termino }&type=artist`;
      let url =  this.urlBusqueda + query;

      return this.http.get( url, { headers } )
        .map( res => {
          this.artistas =  res.json().artists.items;
          // console.log(this.artistas);
        });
  }

  getArtista( id:string ){
      let headers = new Headers();
      //El token expira cada hora
      headers.append('authorization', `Bearer ${ this.token }`);

      let query = `/${ id }`;
      let url =  this.urlArtista + query;

      return this.http.get( url, { headers } )
        .map( res => {
          // console.log( res.json() );
          return res.json();
        });
  }

  getTop( id:string ){
      let headers = new Headers();
      //El token expira cada hora
      headers.append('authorization', `Bearer ${ this.token }`);

      let query = `/${ id }/top-tracks?country=US`;
      let url =  this.urlArtista + query;

      return this.http.get( url, { headers } )
        .map( res => {
          // console.log( res.json().tracks );
          return res.json().tracks;
        });
  }

}
