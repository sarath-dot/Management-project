import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isDashboard = true;
  userData: any = {};
  userName: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    this.userName = this.userData.username.charAt(0)
    console.log(this.userData)
  }

  isUpdateDashboard(event: any) {
    this.isDashboard = event;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home'])
  }

}
