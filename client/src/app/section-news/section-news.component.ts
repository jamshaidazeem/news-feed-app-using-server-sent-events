import { ChangeDetectorRef, Component, Input, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeNews } from '../models/news.type';
import { ItemNewsComponent } from '../item-news.component.ts/item-news.component';

@Component({
  selector: 'app-section-news',
  standalone: true,
  imports: [CommonModule, ItemNewsComponent],
  template: `
    <ng-container *ngFor="let item of news">
      <app-item-news [news]="item"></app-item-news>
    </ng-container>
    <ng-content [select]="registeringSource"></ng-content>
    <ng-content [select]="noNews"></ng-content>
  `,
  styles: [
    `
      :host {
        @apply flex flex-col w-full min-h-[70%] justify-start items-center pt-4 pb-4 gap-y-3;
      }
    `,
  ],
})
export class SectionNewsComponent implements DoCheck {
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
