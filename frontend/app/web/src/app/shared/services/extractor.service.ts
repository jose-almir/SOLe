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
  'field-7-fromDay': string;
  'field-7-fromMonth': string;
  'field-7-fromYear': string;
  'field-7-toDay': string;
  'field-7-toMonth': string;
  'field-7-toYear': string;
  'field-10': boolean[] | string[];
}

export interface QueryStatus {
  total: number;
  pages: number;
  links: string[];
  query: string[];
  data: Query;
}
