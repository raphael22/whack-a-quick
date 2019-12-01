import { Component } from '@angular/core';
import { IConfig, QuikService } from './quik.service';
import { IQuik } from './quik/quik.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public quiks: IQuik[] = [];
  public config: IConfig;

  constructor(private quikService: QuikService) {
    this.init({
      level: 3
    });
  }

  init(config: IConfig) {
    this.config = config;
    this.quikService.init(this.config)
      .then(this.onInitSuccess.bind(this))
      .catch(this.onInitError.bind(this))
      .finally(this.onInitFinally.bind(this));
  }

  onInitSuccess(quiks: IQuik[]) {
    console.log('AppComponent::onInitSuccess', { quiks });
    this.quiks = quiks;
  }
  onInitError(error) {
    console.error('AppComponent::onInitSuccess', { error });
  }
  onInitFinally() {
    console.log('AppComponent::onInitFinally');
  }
}
