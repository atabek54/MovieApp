import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string = '';

  public password: string = '';
  public request_token: any = '';

  public apiKey: string = '9ea34dc5cf3d537cd5205537e222259a';
  public session_id:any=[];
  public userData: any = [];
  constructor(private http: HttpClient,private navCtrl:NavController) {}

  ngOnInit() {
this.getRequestToken();
this.session_id=JSON.parse(localStorage.getItem('user_session_id'));
if(this.session_id){
this.navCtrl.navigateRoot('folder/Inbox');
}
  }

  getRequestToken() {
    this.http
      .get(
        'https://api.themoviedb.org/3/authentication/token/new?api_key=' +
          this.apiKey
      )
      .subscribe((data) => {
        this.request_token = data;
        this.request_token = this.request_token.request_token;

      });
  }

  login() {


    this.http.post('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=9ea34dc5cf3d537cd5205537e222259a',{
      "username": this.username,
      "password": this.password,
      "request_token": this.request_token
    }).subscribe(data=>{
      console.log(data);
this.request_token=data;

this.request_token=this.request_token.request_token;

//session__id al kaydet
this.http.post('https://api.themoviedb.org/3/authentication/session/new?api_key=9ea34dc5cf3d537cd5205537e222259a',{
  "request_token": this.request_token,
}).subscribe(data=>{

console.log(data);
this.session_id=data;
this.session_id=this.session_id.session_id;
localStorage.setItem('user_session_id',JSON.stringify(this.session_id));

if(this.session_id){
  this.navCtrl.navigateRoot('folder/Inbox');
  }

});

});



  }


}
