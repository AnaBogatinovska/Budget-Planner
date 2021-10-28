import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public links: string[] = ['LOGIN', 'REGISTER'];
  public activeLink: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.includes('register')) {
      this.activeLink = 'REGISTER';
    }
    else {
      this.activeLink = 'LOGIN';
    }
  }

  public onChange(link: string): void {
    if (link === 'LOGIN' && this.activeLink !== link) {
      this.activeLink = link;
      this.router.navigate(['auth/login']);
    }
    if (link === 'REGISTER' && this.activeLink !== link) {
      this.activeLink = link;
      this.router.navigate(['auth/register']);
    }
  }
}
