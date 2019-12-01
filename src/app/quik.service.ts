import { Injectable } from "@angular/core";
import { ReplaySubject } from 'rxjs';
import { IQuik } from './quik/quik.component';

export interface IConfig {
  level: number,
  timeout?: number
}

@Injectable({
  providedIn: 'root'
})
export class QuikService {
  private state: boolean;
  public state$: ReplaySubject<boolean> = new ReplaySubject(1);
  private stopTimeout: any;
  public config: IConfig;
  public timer: number;
  private timerInterval: any;

  public quiks: IQuik[] = [];
  private images: string[] = [
    './assets/caddic.png',
    './assets/né.png',
    './assets/lorcy.png',
    './assets/pellier.png'
  ];

  public init(config: IConfig): Promise<IQuik[]> {
    return new Promise((resolve, reject) => {
      this.setConfig(config);
      try {
        this.initQuiks();
        resolve(this.getQuiks())
      }
      catch (error) {
        reject(error);
      }
    })
  }

  public start() {
    this.clear();
    this.setState(true);
    this.timer = this.config.timeout;
    this.stopTimeout = setTimeout(this.stopOnTimeout.bind(this), this.config.timeout);
    this.timerInterval = setInterval(() => this.timer = this.timer - 1000, 1000);
  }
  public stopOnTimeout() {
    this.checkVictory(true);
    this.stop();
  }

  public stop() {
    this.setState(false);
    this.timer = 0;
    clearInterval(this.timerInterval);
  }

  public checkVictory(onStop: boolean = false) {
    if (this.quiks.filter(q => q.active).length === 0) {
      alert('winner !');
      this.stop();
    } else if (onStop) {
      alert('looser !');
    }
  }

  private setState(state: boolean) {
    this.state = state;
    this.state$.next(this.state);
  }

  private setConfig(config: IConfig) {
    config.timeout = config.level * 5000;
    this.config = config;
  }

  initQuiks() {
    const { level } = this.config;
    const quiks: IQuik[] = []
    for (let index = 0; index < Math.pow(level, 2); index++) {
      const row = Math.ceil((index + 1) / level);
      quiks.push({
        index,
        row,
        level,
        active: true
      });
    }
    this.quiks = quiks;
  }

  public getQuiks() {
    return this.quiks;
  }

  public getRandomImage() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }

  public clear() {
    clearInterval(this.timerInterval);
    clearTimeout(this.stopTimeout);
  }
}