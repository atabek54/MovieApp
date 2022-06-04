import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public best10Movies:any=[];
  public trendMovies:any=[];
  public wantedMovies:any=[];
  public favMovies:any=[];
  public watchList:any=[];
  public kelime:string;
  public session_id: any;
  public imagePath:string='https://image.tmdb.org/t/p/original';
  public apiKey: string = '{{API_KEY}}';

  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,public modalController: ModalController,private loadingCtrl:LoadingController) { }

  ngOnInit() {

    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.session_id = JSON.parse(localStorage.getItem('user_session_id'));

    this.getTop10Movies();
    this.getNewMovies();

  }
  closeModal(){
    this.modalController.dismiss();
  }
getTop10Movies(){
this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key='+this.apiKey).subscribe(data=>{
  this.best10Movies=data;
  this.best10Movies=this.best10Movies.results.slice(0,10);
  console.log(this.best10Movies);

})
}

getNewMovies(){
  this.http.get('https://api.themoviedb.org/3/trending/movie/day?api_key='+this.apiKey).subscribe(data=>{
    this.trendMovies=data;
    this.trendMovies=this.trendMovies.results;
    console.log(this.trendMovies);

  })
}

movieSearch(){
  this.http.get('https://api.themoviedb.org/3/search/movie?api_key='+this.apiKey+'&query='+this.kelime+'&include_adult=false').subscribe(data=>{
    console.log(data);
    this.wantedMovies=data;
    this.wantedMovies=this.wantedMovies.results;
  });
}
getFavoriteMovies(){
  this.http.get('https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key='+this.apiKey+'&session_id='+this.session_id+'&sort_by=created_at.desc').subscribe(data=>{
    console.log(data);
    this.favMovies=data;
    this.favMovies=this.favMovies.results;
    console.log(this.favMovies);

  });
}


getWatchlist(){
  this.http.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key='+this.apiKey+'&session_id='+this.session_id+'&sort_by=created_at.desc').subscribe(data=>{
    console.log(data);
    this.watchList=data;
    this.watchList=this.watchList.results;
    console.log(this.watchList);

  });

}
}
