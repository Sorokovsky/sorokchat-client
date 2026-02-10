import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Endpoints } from '@/shared';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  public ngOnInit(): void {
    console.log(Endpoints.PROFILE);
  }
}
