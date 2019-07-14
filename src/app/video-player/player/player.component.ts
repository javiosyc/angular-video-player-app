import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnChanges, AfterViewInit {


  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;



  @Input()
  action: any;
  currentAction: any;
  currentPlayItem: any;

  @Input()
  currentPlay: any;


  @Output()
  control;

  @Output()
  progressPercentEvent = new EventEmitter<number>();

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (this.videoPlayer == null ) {
      return;
    }

    const videoPlayerElement = this.videoPlayer.nativeElement;

    if (changes.currentPlay) {
      if (changes.currentPlay.currentValue.src !== changes.currentPlay.previousValue) {
        this.currentPlayItem = changes.currentPlay.currentValue;
        videoPlayerElement.src = this.currentPlayItem.src;
        this.progressPercentEvent.emit(0);
      }
    }

    if(!changes.action) {
      return;
    }
    this.currentAction = changes.action.currentValue;
    console.log(this.currentAction.action);

    switch (this.currentAction.action) {
      case 'play':
        videoPlayerElement.play();
        break;
      case 'pause':
        videoPlayerElement.pause();
        break;
      case 'volumnUp':
        var volume = videoPlayerElement.volume;
        if (volume >= 0.8) {
          volume = 1.0;
          //$(this).prop('disabled', true)

        } else {
          volume = volume + 0.2;
          if (volume >= 0.2) {
            // $('#volume_minus').prop('disabled', false);
          }
        }
        videoPlayerElement.volume = volume;
        break;
      case 'volumnMinus':
        var volume = videoPlayerElement.volume;

        if (volume < 0.4) {
          volume = 0;
          //$(this).prop('disabled', true)
        } else {
          if (volume === 1.0) {
            // $('#volume_plus').prop('disabled', false);
          }
          volume = volume - 0.2;
        }
        videoPlayerElement.volume = volume;
        break;

      case 'reload':
        const isPaused = videoPlayerElement.paused;
        videoPlayerElement.load();
        this.progressPercentEvent.emit(0);
        if (!isPaused) {
          videoPlayerElement.play();
        }

        break;
      case "mute":
        this.renderer.setAttribute(videoPlayerElement, "muted", "");
        videoPlayerElement.muted = true;
        break;
      case "unMute":
        this.renderer.removeAttribute(videoPlayerElement, "muted");
        videoPlayerElement.muted = false;
        break;
      default:
        break;
    }
  }

  ngAfterViewInit(): void {

  }

  timeupdateHandler($event: any) {
    this.progressPercentEvent.emit(($event.target.currentTime / $event.target.duration) * 100);
  }
}
