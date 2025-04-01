import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isDashboard = true;
  userData: any = {};
  userName: any;
  notificationList: any = [];
  message: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {
    this.message = this.dashboardService.on('message').subscribe((data) => {
      this.notificationList.push(data);
    })
  }

  ngOnInit(): void {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    this.userName = this.userData.username.charAt(0)
    console.log(this.userData);

  }

  isUpdateDashboard(event: any) {
    this.isDashboard = event;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/home'])
  }

  ngOnDestroy(): void {
  }

}
