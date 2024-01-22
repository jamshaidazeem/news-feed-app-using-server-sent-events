import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TypeSection } from '../models/section.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-list',
  standalone: true,
  imports: [CommonModule],
  template: `<span
    *ngFor="let item of list; let i = index"
    class="item-common"
    [class]="item.styleClass"
    (click)="onClickItem(item)"
    >{{ item.section | titlecase }}</span
  >`,
  styles: [
    `
      :host {
        @apply flex flex-row justify-start items-center flex-wrap gap-3;

        .item-common {
          @apply text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 border cursor-pointer;
        }

        .item-default {
          @apply bg-blue-100 text-blue-800 dark:text-blue-400 border-blue-400;
        }

        .item-dark {
          @apply bg-gray-100 text-gray-800 dark:text-gray-400 border-gray-500;
        }

        .item-red {
          @apply bg-red-100 text-red-800 dark:text-red-400 border-red-400;
        }

        .item-green {
          @apply bg-green-100 text-green-800 dark:text-green-400 border-green-400;
        }

        .item-yellow {
          @apply bg-yellow-100 text-yellow-800 dark:text-yellow-300 border-yellow-300;
        }

        .item-indigo {
          @apply bg-indigo-100 text-indigo-800 dark:text-indigo-400 border-indigo-400;
        }

        .item-purple {
          @apply bg-purple-100 text-purple-800 dark:text-purple-400 border-purple-400;
        }

        .item-pink {
          @apply bg-pink-100 text-pink-800 dark:text-pink-400 border-pink-400;
        }
      }
    `,
  ],
})
export class SectionListComponent implements OnInit {
  @Input() list: TypeSection[] = [];
  @Output() onListItemClickedEvent = new EventEmitter<TypeSection>();

  listItemClasses: string[] = [
    'item-default',
    'item-dark',
    'item-red',
    'item-green',
    'item-yellow',
    'item-indigo',
    'item-purple',
    'item-pink',
  ];

  ngOnInit(): void {
    this.list.map((value: TypeSection) => {
      value.styleClass = this.getItemClassBasedOnRandomIndex();
    });
  }

  onClickItem(item: TypeSection) {
    if (this.onListItemClickedEvent) {
      this.onListItemClickedEvent.next(item);
    }
  }

  getItemClassBasedOnRandomIndex() {
    const random = Math.random() * this.listItemClasses.length; // for range
    const floored = Math.floor(random);
    return this.listItemClasses[floored];
  }
}
