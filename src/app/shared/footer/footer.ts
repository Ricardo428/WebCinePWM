import { Component } from '@angular/core';
import { IonFooter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-footer',
  imports: [IonFooter],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  standalone: true,
})
export class Footer {}
