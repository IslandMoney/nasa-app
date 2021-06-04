import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ImageService } from '../core/services/image.service';
import { Photos } from '../shared/models/photos.model';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit, OnDestroy {

  sol: number = 1000;
  page: number = 1;

  photos: Photos;

  imageLoadedCounter: number = 0;

  spinnerText = 'Loading...';

  private subscriptions = new Subscription();

  constructor(private imageService: ImageService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getImages();
  }

  getImages() {
    this.spinner.show();
    this.subscriptions.add(
      this.imageService.getImages(this.sol, this.page).subscribe(res => {
        this.photos = res;
        console.log(this.photos.photos);
      })
    );
  }

  imageLoaded() {
    this.imageLoadedCounter++;
    if (this.imageLoadedCounter === this.photos.photos.length) {
      this.spinner.hide();
      this.imageLoadedCounter = 0;
    }
  }

  solChanged() {
    if (this.sol > 3137) {
      this.sol = 3137;
      this.toastr.error('3137 is the last Sol for the Curiosity Rover :(');
    }
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      if (this.sol < 3137) {
        this.spinnerText = 'Loading next sol images!';
        this.sol++;
        this.getImages();
      } else {
        this.toastr.error('This is the last Sol for the Curiosity Rover :(');
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
