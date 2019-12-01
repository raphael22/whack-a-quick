import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { QuikService } from '../quik.service';

export interface IQuik {
  index: number
  row: number
  level: number
}

@Component({
  selector: 'quik',
  templateUrl: './quik.component.html',
  styleUrls: ['./quik.component.scss']
})
export class QuikComponent implements OnInit {
  @Input() quik: IQuik;
  public image: SafeUrl;

  constructor(
    private element: ElementRef<HTMLDivElement>,
    private sanitizer: DomSanitizer,
    private quikService: QuikService
  ) {
  }

  ngOnInit() {
    const { index, level } = this.quik;
    this.element.nativeElement.style.zIndex = (level - index % level).toString();
    const randomQuik = this.quikService.getRandomImage();
    this.image = this.sanitizer.bypassSecurityTrustUrl(randomQuik);
  }
}