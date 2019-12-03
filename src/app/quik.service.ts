import { Injectable } from "@angular/core";
import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IConfig, IQuik, ILevel, IMAGES, LEVELS, ELevel } from './models';


@Injectable({
  providedIn: 'root'
})
export class QuikService {
  private state: boolean;
  public state$: ReplaySubject<boolean> = new ReplaySubject(1);
  public playerState: string;

  private stopTimeout: any;
  public config: IConfig;
  public timer: number;
  private timerInterval: any;

  public levels: ILevel[] = LEVELS;
  public quiks: IQuik[] = [];
  public quiks$: ReplaySubject<IQuik[]> = new ReplaySubject(1);;
  public images: string[] = IMAGES;


  constructor() {
  }

  public init(level?: ILevel): Promise<IQuik[]> {
    if (!level) {
      level = LEVELS.find(level => level.matrix === ELevel.normal);
    }
    console.log('init', level);
    return new Promise((resolve, reject) => {
      this.setConfig(level);
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
    this.clearNodeTimer();
    this.setTimer();
    this.setState(true);
    this.setPlayerState(null);
    this.setNodeTimer();
  }

  public restart(level: ILevel) {
    this.stop();
    this.setPlayerState(null);
    this.init(level);
  }

  public stopOnTimeout() {
    this.checkVictory(true);
    this.stop();
  }

  public stop() {
    this.setState(false);
    this.timer = 0;
    this.clearNodeTimer();
  }

  public checkVictory(onTimeout: boolean = false) {
    if (this.quiks.filter(q => q.active).length === 0) {
      this.setPlayerState(`bravo !`);
      this.stop();
    } else if (onTimeout) {
      this.setPlayerState(`T'es nul !`);
    }
  }

  private setState(state: boolean) {
    this.state = state;
    this.state$.next(this.state);
  }

  private setConfig(level: ILevel) {
    this.config = {
      level,
      timeout: level.matrix * 5000
    };
    this.setTimer();
  }
  private setTimer() {
    this.timer = this.config.timeout;
  }
  private setPlayerState(state: string) {
    this.playerState = state;
  }

  initQuiks() {
    const { level } = this.config;
    const quiks: IQuik[] = []
    for (let index = 0; index < Math.pow(level.matrix, 2); index++) {
      const row = Math.ceil((index + 1) / level.matrix);
      quiks.push({
        index,
        row,
        level,
        active: true
      });
    }
    this.quiks = quiks;
    this.quiks$.next(this.quiks);
  }

  public getQuiks() {
    return this.quiks;
  }

  public getRandomImage() {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }

  private setNodeTimer() {
    this.stopTimeout = setTimeout(this.stopOnTimeout.bind(this), this.config.timeout);
    this.timerInterval = setInterval(() => this.timer = this.timer - 1000, 1000);
  }
  private clearNodeTimer() {
    clearInterval(this.timerInterval);
    clearTimeout(this.stopTimeout);
  }
}