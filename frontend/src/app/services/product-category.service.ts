import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { Categorie } from '../models/Categorie';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
    private apiUrl = `${apiUrl}/category`;

constructor(private http: HttpClient) {}

  getAll(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/all`);
  }

  getOne(type: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${type}`);
  }

  save(category: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.apiUrl}/add`, category);
  }

  update(type: number, category: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/update/${type}`, category);
  }

  delete(type: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${type}`);
  }
}

