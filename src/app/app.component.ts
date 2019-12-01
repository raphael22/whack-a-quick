import { Component, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public moles = [];

  private images: string[] = [
    './assets/caddic.png',
    './assets/né.png',
    './assets/lorcy.png',
    './assets/pellier.png'
  ];

  constructor(private sanitizer: DomSanitizer) {
    const moles = [];
    for (let index = 0; index < 16; index++) {
      const id = index;
      const row = Math.ceil((id + 1) / 4);
      moles.push({
        id,
        row,
        zIndex: row * (4 - id % 4),
        image: this.sanitizer.bypassSecurityTrustUrl(this.images[Math.floor(Math.random() * this.images.length)])
      });
    }
    this.moles = moles;
    console.log(this.moles);
  }

  ngAfterViewInit() {
  }
}
