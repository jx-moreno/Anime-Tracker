import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Anime, MyAnime } from 'src/app/interfaces/api-anime';
import { AnimeService } from 'src/app/services/anime.service';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-result-anime',
  templateUrl: './result-anime.component.html',
  styleUrls: ['./result-anime.component.scss']
})
export class ResultAnimeComponent implements OnInit, OnDestroy{

  anime_results: Anime[] = [];
  subscription! : Subscription;
  constructor(private _animeService : AnimeService){}

  ngOnInit(): void {
    
    this.subscription =this._animeService.getResultAnime().subscribe(result => {
      this.anime_results = result;
    });

  }

  addAnime(anime : Anime){

    const addAnime : MyAnime ={
      id: anime.mal_id,
      title: anime.title,
      image: anime.images['jpg'].image_url,
      total_episodes: anime.episodes,
      watched: 0
    }

    this._animeService.animeSelected(addAnime);
    this.anime_results = this.anime_results.filter(x => x.mal_id != anime.mal_id);
  }

  setWatchTrailer(anime: Anime){
    if (anime.trailer.embed_url) {
      anime.watch_trailer = true;
    }
    
  }

  hideWatchTrailer(anime: Anime){

    anime.watch_trailer = false;
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
