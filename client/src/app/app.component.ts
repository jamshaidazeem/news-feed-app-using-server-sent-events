import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NytService } from './services/nyt.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TypeSection } from './models/section.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
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
        },
        error: (error) => {
          console.log(
            '🚀 ~ AppComponent ~ this.nytService.getSections ~ error:',
            error
          );
        },
        complete: () => {
          this.isFetchingSections = false;
        },
      })
    );
  }
}
