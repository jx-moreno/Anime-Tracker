import { Component, OnInit } from '@angular/core';
import { MyAnime } from 'src/app/interfaces/api-anime';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-selected-anime',
  templateUrl: './selected-anime.component.html',
  styleUrls: ['./selected-anime.component.scss']
})
export class SelectedAnimeComponent implements OnInit{
  animes_selected: MyAnime[] = [];

constructor(private _animeService: AnimeService){}

  ngOnInit(): void {

    this.animes_selected = JSON.parse(localStorage.getItem('my_selected_animes') as any) || [];

   
    this._animeService.getAnimeSelected().subscribe( myAnime =>{
      this.animes_selected.push(myAnime);
      localStorage.setItem('my_selected_animes',JSON.stringify(this.animes_selected))
    });
  }

  increaseWatch(anime : MyAnime){    
      anime.watched ++;  
      localStorage.setItem('my_selected_animes',JSON.stringify(this.animes_selected))  
  }

  decreaseWatch(anime: MyAnime){
      anime.watched --;
  }

}
