import { Injectable } from "@angular/core";
import { ReplaySubject } from 'rxjs';
import { IQuik } from './quik/quik.component';

export interface IConfig {
  level: number
}

@Injectable({
  providedIn: 'root'
})
export class QuikService {
  private config: IConfig;
  public config$: ReplaySubject<IConfig> = new ReplaySubject(1);

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

  private setConfig(config) {
    this.config = config;
    this.config$.next(this.config);
  }

  initQuiks() {
    const { level } = this.config;

    for (let index = 0; index < Math.pow(level, 2); index++) {
      const row = Math.ceil((index + 1) / level);
      this.quiks.push({
        index,
        row,
        level
      });
    }
  }

  public getQuiks() {
    return this.quiks;
  }

  public getRandomImage() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}