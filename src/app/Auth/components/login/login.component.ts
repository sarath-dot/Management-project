import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  hide: boolean = true;
  header: boolean = false;
  loading: boolean = true;
  successMessage: any = '';
  errorMessage: any = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm.patchValue({
      username: '',
      password: ''
    });

    this.route.url.subscribe(url => {
      this.header = url[0].path === 'signup' ? true : false;
    })
    this.loading = false;
  }

  login() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      this.loading = false;
      console.log(res);
      if (res && res.success) {
        this.router.navigate(['/home/dashboard']);
        localStorage.setItem('user', JSON.stringify(res.user));
      } else {
        this.errorMessage = res.errorMsg
      }
    })
  }

  signup() {
    this.loading = true;
    this.authService.signup(this.loginForm.value).subscribe((res: any) => {
      this.loading = false;
      if (res && res.success) {
        this.successMessage = 'User created successfully';
        this
        this.router.navigate(['/home/login']);
      }
    })
  }

}
