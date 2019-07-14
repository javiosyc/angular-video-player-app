import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit{
  
  @Input()
  private currentSrc: any;


  @Input()
  private playList: any;

  @Output()
  selectedVideo = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    
  }

  click(item) {
    if(this.currentSrc === item.src) {
      return;
    }
    this.selectedVideo.emit(item);
  }

}
