import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav style="background:#8AA624;color:#fff;height:56px;display:flex;align-items:center;padding:0 16px;">
  <strong style="letter-spacing:0.5px; font-size:30px; font-family:Verdana, sans-serif;">
    Canteen Management
  </strong>
  <span style="margin-left:auto;opacity:.8"></span>
</nav>
    <router-outlet></router-outlet>
    
  `
})
export class AppComponent { }

