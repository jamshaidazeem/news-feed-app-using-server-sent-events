import { ChangeDetectorRef, Component, Input, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeNews } from '../models/news.type';
import { ItemNewsHeadlineComponent } from '../item-news-headline/item-news-headline.component';

// https://flowbite.com/docs/components/footer/#sticky-footer
@Component({
  selector: 'app-news-headline',
  standalone: true,
  imports: [CommonModule, ItemNewsHeadlineComponent],
  template: `
    <footer
      class="flex items-center justify-end fixed bottom-0 left-0 z-20 w-full px-4 py-1.5 bg-gray-100 border-t border-gray-200 shadow dark:bg-gray-800 dark:border-gray-600 hide-scrollbar"
    >
      <div
        class="flex items-center justify-start gap-4 w-full animate-infinite-scroll"
      >
        <ng-container *ngFor="let item of news">
          <app-item-news-headline [news]="item"></app-item-news-headline>
        </ng-container>
      </div>
    </footer>
  `,
})
export class NewsHeadlineComponent implements DoCheck {
  @Input() news: TypeNews[] = [];

  private _newsCount = 0;

  constructor(private changeRef: ChangeDetectorRef) {}

  ngDoCheck(): void {
    if (this.news.length > this._newsCount) {
      this._newsCount = this.news.length;
      this.changeRef.markForCheck();
    }
  }
}
