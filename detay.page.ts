import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detay',
  templateUrl: './detay.page.html',
  styleUrls: ['./detay.page.scss'],
})
export class DetayPage implements OnInit {
  public movie_id: any;
  public apiKey: string = '9ea34dc5cf3d537cd5205537e222259a';
  public imagePath: string = 'https://image.tmdb.org/t/p/original';
  public session_id: any;
  public detayBilgisi: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public navCtrl: NavController,
    public toastController: ToastController,
    private loadingCtrl:LoadingController,
  ) {}

  ngOnInit() {

    this.movie_id = this.activatedRoute.snapshot.paramMap.get('movie_id');
    this.detayGetir();
    this.session_id = JSON.parse(localStorage.getItem('user_session_id'));

  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:color
    });
    toast.present();
  }
 async detayGetir() {
    const loading=await this.loadingCtrl.create();
    loading.present();
    this.http
      .get(
        'https://api.themoviedb.org/3/movie/' +
          this.movie_id +
          '?api_key=' +
          this.apiKey
      )
      .subscribe((data) => {
        this.detayBilgisi = data;
        console.log(this.detayBilgisi);
    console.log(this.detayBilgisi.id);
    loading.dismiss();
      });
  }

  geriGel() {
    this.loadingCtrl.dismiss();
    this.navCtrl.navigateRoot('/folder/Inbox');
  }

  addFavorite() {
    this.http
      .post(
        'https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=9ea34dc5cf3d537cd5205537e222259a&session_id=' +
          this.session_id,
        {
          media_type: 'movie',
          media_id: this.detayBilgisi.id,
          favorite: true,
        }
      )
      .subscribe((data) => {
        console.log(data);
        this.presentToast('Movie successfully added to favorites','success');
      });
  }


  addWatchlist(){
    this.http
    .post(
      'https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=9ea34dc5cf3d537cd5205537e222259a&session_id='+this.session_id,
      {
        media_type: 'movie',
        media_id: this.detayBilgisi.id,
        watchlist: true,
      }
    )
    .subscribe((data) => {
      console.log(data);
      this.presentToast('Movie successfully added to watchlist','success');
    });
  }
}
