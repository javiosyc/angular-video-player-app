import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit, OnChanges {
  
  isPlaying = false;
  isMuted = false;
  progressPercent = 0;
  @Output() actionEvent = new EventEmitter<any>();
  constructor() { }

  @Input()
  configuration : any ;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.configuration || ! changes.configuration.previousValue) {
      return ;
    }

     if( changes.configuration.currentValue.progressPercent === changes.configuration.previousValue.progressPercent) {
       return ;
     }

     this.progressPercent = changes.configuration.currentValue.progressPercent;
  }

  toggleButton(): void {
    const nextAction = this.isPlaying ? "pause" : "play";
    
    this.sendAction(nextAction);

    this.isPlaying = !this.isPlaying;
  }

  sendAction(action: string): void {
    this.actionEvent.emit({ action: action });
  }
  toggleVolumnButton(): void {
    const nextAction = this.isMuted ? "unMute" : "mute";
    this.sendAction(nextAction);
    this.isMuted = !this.isMuted;
  }
}
