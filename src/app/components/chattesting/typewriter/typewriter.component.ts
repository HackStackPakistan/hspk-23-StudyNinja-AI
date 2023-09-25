import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css']
})
export class TypewriterComponent {


  constructor()  { console.log(" dsfasdf" +this.isTyping)  }

  @Input() text: string = '';
  @Input() isTyping: boolean = false;

  animatedText!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && this.isTyping ) {
      this.playTypewriterAnimation();
    }
  }


  playTypewriterAnimation() {
    if (this.text && this.text.length > 1) {
      this.animatedText = '';
      let i = 0;
      const interval = setInterval(() => {
        this.animatedText += this.text.charAt(i);
        if (i === this.text.length - 1) {
          clearInterval(interval);
        }
        i++;
      }, 35);
    }
  }
  
}
