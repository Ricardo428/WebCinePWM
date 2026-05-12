import { Component, signal } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {Header} from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, Header],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('WebCineAngular');
}
