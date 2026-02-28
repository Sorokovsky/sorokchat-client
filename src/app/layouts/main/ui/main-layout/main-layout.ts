import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from '@/widgets';

@Component({
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  imports: [Sidebar, RouterOutlet],
})
export class MainLayout {}
