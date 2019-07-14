import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  action: any;
  configuration = { progressPercent: 0 };

  playList;

  currentPlay ;


  constructor() {
    this.playList = [{
      title: "Animal Sounds (Rabbit) | Animal Voices for Kids | Rabbit Sounds",
      src: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }
      , {
      title: "Grizzly Bears Catching Salmon | Nature's Great Events ",
      src: 'https://www.w3schools.com/html/movie.mp4'
    }, {
      title: "Toy Story 4 | Official Trailer ",
      src: 'http://www.html5videoplayer.net/videos/toystory.mp4'
    }];

    
   }

  ngOnInit() {
    this.currentPlay = this.playList[0];
  }

  onActionButtonClick($event: any) {
    this.action = $event;
  }

  updateProgressPercent($event: number) {
    this.configuration = {
      progressPercent: $event
    };
  }

  onSelectedVideoHandler($event: any) {
    console.log($event);
    this.currentPlay = $event;
  }
}
