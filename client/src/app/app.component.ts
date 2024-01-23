import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  CommonService,
  SSE_CONNECTED,
  SSE_ERROR,
  SSE_EVENT_TYPE_ALL_SENT,
  SSE_EVENT_TYPE_MSG,
  SSE_EVENT_TYPE_NEWS,
} from './services/common.service';
import { Subscription } from 'rxjs';
import { TypeSection } from './models/section.type';
import { TypeSSEEvent } from './models/sse-event.type';
import { TypeNews } from './models/news.type';
import { initFlowbite } from 'flowbite';
import { SectionListComponent } from './section-list/section-list.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { SectionNewsComponent } from './section-news/section-news.component';
import { NewsHeadlineComponent } from './news-headline/news-headline.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SectionListComponent,
    LoadingIndicatorComponent,
    SectionNewsComponent,
    NewsHeadlineComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CommonService],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';

  subscription: Subscription = new Subscription();

  sections: TypeSection[] = [];

  isFetchingSections: boolean = false;
  isSettingUpSSEConnection: boolean = false;

  news: TypeNews[] = [];
  allNewsFetched: boolean = false;

  constructor(private service: CommonService) {}

  ngOnInit(): void {
    initFlowbite();
    this.fetchSectionsFromServer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchSectionsFromServer() {
    this.isFetchingSections = true;
    this.subscription.add(
      this.service.getSections().subscribe({
        next: (data) => {
          this.sections = data;
          this.isFetchingSections = false;
          if (this.sections && this.sections.length) {
            this.setupSSERegistration(this.sections[0]); // default
          }
        },
        error: (error) => {
          this.isFetchingSections = false;
        },
      })
    );
  }

  onListItemClickedEventHandler(section: TypeSection) {
    this.news = [];
    this.allNewsFetched = false;
    this.service.closeEventSourceForSSE();
    this.setupSSERegistration(section);
  }

  setupSSERegistration(section: TypeSection) {
    this.isSettingUpSSEConnection = true;
    this.subscription.add(
      this.service.registerEventSourceForSSE(section.section).subscribe({
        next: (response: TypeSSEEvent) => {
          if (response.eventType === SSE_CONNECTED || SSE_ERROR) {
            //console.log(`event source connected`);
            this.isSettingUpSSEConnection = false;
          }
          if (response.eventType === SSE_EVENT_TYPE_MSG) {
            //console.log(`event response for message ==> ${response.data}`);
          }
          if (response.eventType === SSE_EVENT_TYPE_NEWS) {
            if (response.data === SSE_EVENT_TYPE_ALL_SENT) {
              this.allNewsFetched = true;
            } else {
              this.news.push(JSON.parse(response.data) as TypeNews);
            }
          }
        },
      })
    );
  }
}
