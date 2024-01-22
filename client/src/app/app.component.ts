import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NytService } from './services/nyt.service';
import { Subscription } from 'rxjs';
import { TypeSection } from './models/section.type';
import { initFlowbite } from 'flowbite';
import { SectionListComponent } from './section-list/section-list.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SectionListComponent,
    LoadingIndicatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NytService],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';

  subscription: Subscription = new Subscription();

  sections: TypeSection[] = [];

  isFetchingSections: boolean = false;

  constructor(private nytService: NytService) {}

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
      this.nytService.getSections().subscribe({
        next: (data) => {
          this.sections = data;
          this.isFetchingSections = false;
        },
        error: (error) => {
          console.log(
            '🚀 ~ AppComponent ~ this.nytService.getSections ~ error:',
            error
          );
          this.isFetchingSections = false;
        },
      })
    );
  }

  onListItemClickedEventHandler(section: TypeSection) {
    // clear the current feed
    // update server to start sending SSE events based on this section
  }
}
