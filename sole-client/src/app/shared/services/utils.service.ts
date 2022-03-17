import { Injectable } from '@angular/core';
import { Query } from './extractor.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  get years() {
    const year = new Date().getFullYear();
    const iteractions = year - 1899;

    return Array.from({ length: iteractions }, (_, i) => i + 1900);
  }

  get days() {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }

  get langs() {
    return [
      {
        id: 'por',
        name: 'Português',
      },
      {
        id: 'eng',
        name: 'Inglês',
      },
      {
        id: 'spa',
        name: 'Espanhol',
      },
    ];
  }

  prepareQuery(query: Query): Query {
    const langs = (query['field-10'] as boolean[]).reduce(
      (filtered: string[], lang: any, i: number) => {
        if (lang) {
          filtered.push(this.langs[i].id);
        }

        return filtered;
      },
      new Array<string>()
    );

    return { ...query, 'field-10': langs };
  }
}
