import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isSearchBarCollapsed = true;
  public active = 1;

  public navClick(i: number, isCollapsed: boolean): void {
    this.active = i;
    this.isSearchBarCollapsed = isCollapsed;
  }
}
