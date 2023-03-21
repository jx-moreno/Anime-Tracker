import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.scss']
})
export class SearchAnimeComponent implements OnInit {
  searchTerm : string='';

  constructor(private _animeService: AnimeService){}

  ngOnInit(): void {
   
  }

  search(){
    this._animeService.getanimes(this.searchTerm).subscribe(result => {

      this._animeService.addResultAnime(result.data);
      this.searchTerm = '';
    });
  }

}
