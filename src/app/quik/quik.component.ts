import { Component, Input, OnInit, ElementRef, HostListener, OnDestroy, HostBinding, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { QuikService } from '../quik.service';
import { IQuik } from '../models';


@Component({
  selector: 'quik',
  templateUrl: './quik.component.html',
  styleUrls: ['./quik.component.scss']
})
export class QuikComponent implements OnInit, OnDestroy {
  @HostBinding('class.hidden') hidden: boolean = false;
  @Input() quik: IQuik;
  private style: CSSStyleDeclaration;
  public image: SafeUrl;
  public animationDuration: string;
  private animationName = 'quik'

  constructor(
    private element: ElementRef<HTMLDivElement>,
    private sanitizer: DomSanitizer,
    private quikService: QuikService
  ) {
    this.quikService.state$.subscribe((state) => state ? this.start() : this.stop());
  }

  ngOnInit() {
    const { index, level: { matrix } } = this.quik;
    this.style = this.element.nativeElement.style;
    this.style.zIndex = (matrix - index % matrix).toString();
    const margin = 100 / (matrix * 2);
    const size = `calc(100%/${matrix} - ${margin * 2}px)`;
    this.style.width = size;
    this.style.paddingTop = size;
    this.style.margin = `${margin}px`;

    this.setImage();
  }

  public start() {
    this.hidden = false;
    this.quik.active = true;
    this.startAnimation();
  }
  public stop() {
    if (this.style) {
      this.style.animationName = 'none';
    }
  }

  private setImage() {
    let quikImage;
    if (this.quik.level.name === 'john') {
      quikImage = this.quikService.images[0];
    }
    else {
      quikImage = this.quikService.getRandomImage();
    }
    this.image = this.sanitizer.bypassSecurityTrustUrl(quikImage);
  }

  private startAnimation() {
    this.style.animationDuration = this.getRandomDuration();
    this.style.animationName = this.animationName;
  }

  private getRandomDuration() {
    return Math.round(Math.random() * 1500) + 750 + 'ms';
  }

  @HostListener('animationiteration')
  onAnimationEnd() {
    this.style.animationName = 'none';
    setTimeout(() => {
      this.style.animationDuration = this.getRandomDuration();
      this.style.animationName = this.animationName;
    })
  }

  onClick() {
    console.log('click', event);
    this.hidden = true;
    this.quik.active = false;
    this.quikService.checkVictory();
  }

  ngOnDestroy() {
  }
}