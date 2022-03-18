import { Component } from '@angular/core';
import { concatMap, from, of, switchMap, tap } from 'rxjs';
import { ExtractorService, Query } from './shared/services/extractor.service';
import { UtilsService } from './shared/services/utils.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private extractorService: ExtractorService,
    private utilsService: UtilsService
  ) {}

  today = new Date();
  years = this.utilsService.years;
  days = this.utilsService.days;
  langs = this.utilsService.langs;

  refs: string = '';
  total = 0;
  percentage = '0%';

  extractionStatus: 'start' | 'loading' | 'error' | 'empty' | 'result' =
    'start';
  progressText = 'Processando...';

  query: Query = {
    query: '',
    'field-7-fromDay': '',
    'field-7-fromMonth': '',
    'field-7-fromYear': '',
    'field-7-toDay': '',
    'field-7-toMonth': '',
    'field-7-toYear': '',
    'field-10': [false, false, false],
  };

  export() {
    saveAs(
      new Blob([this.refs], { type: 'text/text' }),
      `${this.utilsService.generateFilename()}.bibtex`,
      { autoBom: true }
    );
  }

  onSubmit() {
    const query = this.utilsService.prepareQuery(this.query);
    this.setLoading();

    this.extractorService.getStatus(query).subscribe({
      next: (status) => {
        if (status.links.length > 0) {
          let count = 1;
          let articles = 1;
          this.progressText = `Extraindo ${status.links.length} página(s)`;
          this.total = status.total;
          from(status.links)
            .pipe(concatMap((link) => this.extractorService.extract(link)))
            .subscribe({
              next: (result) => {
                this.progressText = `Extraindo ${count++} de ${
                  status.links.length
                } página(s)`;
                this.refs += result.references.join('\r\n');
                articles += result.references.length;
                this.percentage = `${(articles / this.total) * 100}%`;
              },
              complete: () => {
                this.progressText = 'Concluído!';
                setTimeout(() => (this.extractionStatus = 'result'), 2000);
              },
            });
        } else {
          this.extractionStatus = 'empty';
        }
      },
      error: () => (this.extractionStatus = 'error'),
    });
  }

  setLoading() {
    this.progressText = 'Processando...';
    this.extractionStatus = 'loading';
    this.refs = '';
    this.total = 0;
    this.percentage = '0%';
  }

  get isLoading() {
    return this.extractionStatus === 'loading';
  }

  get hasError() {
    return this.extractionStatus === 'error';
  }

  get isEmpty() {
    return this.extractionStatus === 'empty';
  }

  get hasResults() {
    return this.extractionStatus === 'result';
  }
}
