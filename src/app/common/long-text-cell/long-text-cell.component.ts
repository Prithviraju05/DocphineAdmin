// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-long-text-cell',
//   templateUrl: './long-text-cell.component.html',
//   styleUrls: ['./long-text-cell.component.scss']
// })
// export class LongTextCellComponent {

// }

// long-text-cell.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-long-text-cell',
  template: `
    <div>
      <p *ngIf="!showFullText">{{ truncatedText }}</p>
      <p *ngIf="showFullText">{{ longText }}</p>
      <button mat-button (click)="toggleShowFullText()">
        {{ showFullText ? 'Show Less' : 'Show More' }}
      </button>
    </div>
  `,
})
export class LongTextCellComponent {
  @Input() longText = '';
  
  
  truncatedText = this.longText.slice(0, 100); // Display only the first 100 characters
  showFullText = false;

  toggleShowFullText() {
    console.log(this.longText);
    this.showFullText = !this.showFullText;
  }
}
