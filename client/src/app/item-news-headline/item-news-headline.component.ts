import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemNewsComponent } from '../item-news.component.ts/item-news.component';

// https://flowbite.com/docs/components/card/#horizontal-card
@Component({
  selector: 'app-item-news-headline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      (click)="$event.stopPropagation()"
      href="#"
      class="flex flex-row justify-start items-center w-auto h-auto bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        class="object-cover rounded-lg w-16 h-16 p-1"
        [src]="photo"
        [alt]="caption"
      />
      <h6
        class="px-2 w-64 text-base font-normal tracking-tight text-gray-900 dark:text-white truncate"
      >
        {{ title | titlecase }}
      </h6>
    </a>
  `,
  styles: [
    `
      :host {
        @apply flex w-auto h-auto justify-center items-center;
      }
    `,
  ],
})
export class ItemNewsHeadlineComponent extends ItemNewsComponent {
  constructor() {
    super();
  }
}
