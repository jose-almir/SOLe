import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExtractorService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getStatus(query: Query): Observable<QueryStatus> {
    return this.http.post<QueryStatus>(`${this.url}/api/status`, query);
  }

  extract(link: string): Observable<ExtractionResult> {
    return this.http.post<ExtractionResult>(`${this.url}/api/extract`, {
      link,
    });
  }
}

export interface ExtractionResult {
  references: string[];
}

export interface Query {
  query: string;
  fromDay: string;
  fromMonth: string;
  fromYear: string;
  toDay: string;
  toMonth: string;
  toYear: string;
  langs: boolean[] | string[];
}

export interface QueryStatus {
  total: number;
  pages: number;
  links: string[];
  query: string;
  data: Query;
}
