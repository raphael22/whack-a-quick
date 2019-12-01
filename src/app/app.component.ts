import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IQuik } from './quik/quik.component';
import { QuikService } from './quik.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public quiks: IQuik[] = [];
  public level: number = 4;

  constructor(private quikService: QuikService) {
    this.level = 4;
    this.quikService.init(this.level);
    this.quiks = this.quikService.getQuiks();
    console.log(this.quiks);
  }

  ngAfterViewInit() {
  }
}
