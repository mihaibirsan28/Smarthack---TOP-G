import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Campaign, Store} from "../model/campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http:HttpClient) {
  }

  getCampaignById(id: string): Observable<Campaign> {
    return this.http.get<any>('http://localhost:8085/api/v1/campaign/'+id);
  }

  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<any>('http://localhost:8085/api/v1/campaign' , campaign);
  }

  deleteCampaignById(id: string): Observable<any> {
    return this.http.delete<any>('http://localhost:8085/api/v1/campaign/'+id);
  }

  updateCampaign(campaign: Campaign , id:string): Observable<Campaign> {
    return this.http.put<any>('http://localhost:8085/api/v1/campaign/'+id , campaign);
  }

  getAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<any>('http://localhost:8085/api/v1/campaign/all');
  }
  getAllStore(): Observable<Store[]> {
    return this.http.get<any>('http://localhost:8085/api/v1/store/all');
  }
  getStoreById(id:string): Observable<Store> {
    return this.http.get<any>('http://localhost:8085/api/v1/store/'+id);
  }
  updateStore(store: Store , id:string): Observable<Store> {
    return this.http.put<any>('http://localhost:8085/api/v1/store/'+id , store);
  }
  createStore(store: Store): Observable<Store> {
    return this.http.post<any>('http://localhost:8085/api/v1/store' , store);
  }
  deleteStoreById(id: string): Observable<any> {
    return this.http.delete<any>('http://localhost:8085/api/v1/store/'+id);
  }

  getAdsByName(name: string): Observable<any> {
    return this.http.delete<any>('http://localhost:8085/api/v1/store/'+name);
  }




}

