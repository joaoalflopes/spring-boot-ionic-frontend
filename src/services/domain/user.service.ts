import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { UserDTO } from "../../models/user.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class UserService{

        constructor(public http: HttpClient, public storage: StorageService){                
        }

        findByEmail(email : string) : Observable<UserDTO>{

                let token = this.storage.getLocalUser().token;
                let authHeader = new HttpHeaders({'Authorization': 'Bearer' + token});

                return this.http.get<UserDTO>(
                        `${API_CONFIG.baseUrl}/users/email?value=${email}`,
                        {'headers': authHeader });
        }

        getImageFromBucket(id : string) : Observable<any>{
                let url = `${API_CONFIG.bucketBaseUrl}/Cp${id}.jpg`
                return this.http.get(url, {responseType : 'blob'});
        }


}