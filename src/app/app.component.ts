import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuikService } from './quik.service';
import { IQuik, IConfig, ILevel } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public quiks: IQuik[] = [];

  constructor(public quikService: QuikService) {
    this.quikService.quiks$.subscribe((quiks) => {
      console.log(quiks);
      this.quiks = quiks;
    });
    this.quikService.init();
  }

  public start() {
    this.quikService.start();
  }

  public restart(level: ILevel) {
    this.quikService.restart(level);
  }
}
