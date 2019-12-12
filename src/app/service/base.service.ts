import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {FormBuilder, FormGroup} from "@angular/forms";

export abstract class BaseService<T> {

  private endpoint: string;

  constructor(protected http: HttpClient,
              endpoint: string) {
    this.endpoint = endpoint;
  }

  findAtivos(): Observable<T[]> {
    return this.http.get<T[]>(`${this.getUrl()}/ativos`);
  }

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.getUrl());
  }

  findOne(id: number): Observable<T> {
    return this.http.get<T>(`${this.getUrl()}/${id}`);
  }

  save(objeto: T): Observable<T> {
    return this.http.post<T>(this.getUrl(), objeto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.getUrl()}/${id}`);
  }

  getUrl(): string {
    return `${environment.api_url}${this.endpoint}`;
  }

  complete(query: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.getUrl()}/complete?query=${query}`);
  }

  getEnvoriment(): string {
    return `${environment.api_url}`;
  }



}
