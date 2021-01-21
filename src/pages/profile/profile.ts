import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { UserDTO } from '../../models/user.dto';
import { UserService } from '../../services/domain/user.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user : UserDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageService,
    public userService: UserService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.userService.findByEmail(localUser.email)
        .subscribe(Response => {
          this.user = Response;
          this.getImageIfExists();
        },
        _error => {});
    }
  }

  getImageIfExists(){
    this.userService.getImageFromBucket(this.user.id)
      .subscribe(Response => {
        this.user.imageUrl = `${API_CONFIG.bucketBaseUrl}/Cp${this.user.id}.jpg`;
      },
      error => {});
  }
}
