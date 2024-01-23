import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TypeMultimedia, TypeNews } from '../models/news.type';

@Component({
  selector: 'app-item-news',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  template: `
    <a
      (click)="$event.stopPropagation()"
      href="#"
      class="flex flex-col items-center w-full  bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        class="object-cover rounded-t-lg w-full h-96 md:w-48 md:h-auto md:rounded-none md:rounded-s-lg"
        [src]="photo"
        [alt]="caption"
      />
      <div
        class="flex flex-col w-full justify-between px-4 py-2 leading-normal"
      >
        <h6
          class="mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white"
        >
          {{ title | titlecase }}
        </h6>
        <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
          {{ details }}
        </p>
        <hr
          class="w-full h-0.5 mx-auto mb-3 mt-2 bg-gray-100 border-0 rounded dark:bg-gray-900"
        />
        <div>
          <span
            class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
            >{{ publishedDate }}</span
          >
          <span
            class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
            >{{ section }}</span
          >
        </div>
      </div>
    </a>
  `,
  styles: [
    `
      :host {
        @apply flex w-full justify-center items-center;
      }
    `,
  ],
})
export class ItemNewsComponent implements OnInit {
  @Input() news?: TypeNews;
  newsMultimedia: TypeMultimedia | undefined;

  ngOnInit(): void {
    this.newsMultimedia = this.multimedia;
  }

  get title() {
    return this.news?.title ? this.news?.title : 'No title available';
  }

  get details() {
    return this.news?.abstract ? this.news?.abstract : 'No details found';
  }

  get multimedia() {
    let item: TypeMultimedia | undefined;
    if (this.news?.multimedia && this.news?.multimedia.length) {
      item = this.news?.multimedia.find((v) => v.type === 'image');
    }
    return item;
  }

  get photo() {
    return this.newsMultimedia
      ? this.newsMultimedia.url
      : 'assets/placeholder2.svg';
  }

  get caption() {
    return this.newsMultimedia ? this.newsMultimedia.caption : '';
  }

  get publishedDate() {
    const date: Date | undefined = this.news?.published_date
      ? new Date(this.news.published_date)
      : undefined;
    const formattedDate = date ? date.toDateString() : 'N/A';
    return `Publish on: ${formattedDate}`;
  }

  get section() {
    const section = this.news?.section ? this.news.section : 'N/A';
    return `Section: ${section.toUpperCase()}`;
  }
}
