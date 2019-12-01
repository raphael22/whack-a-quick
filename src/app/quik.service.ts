import { Injectable } from "@angular/core";
import { ReplaySubject } from 'rxjs';
import { IQuik } from './quik/quik.component';

@Injectable({
  providedIn: 'root'
})
export class QuikService {
  private level: number;
  public level$: ReplaySubject<number> = new ReplaySubject(1);

  public quiks: IQuik[] = [];
  private images: string[] = [
    './assets/caddic.png',
    './assets/né.png',
    './assets/lorcy.png',
    './assets/pellier.png'
  ];

  public init(level: number) {
    this.setLevel(level);
    this.initQuiks();
  }

  private setLevel(level: number) {
    this.level = level
    this.level$.next(this.level);
  }

  initQuiks() {
    const level = this.level;

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