import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  Form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  submit() {
    this.Form.markAllAsTouched();
    console.log(this.Form, this.Form.valid);
    if (this.Form.valid)
      this.auth.login(this.Form.value.username!, this.Form.value.password!).then(res => {
        this.auth.setJwt(res.jwt);
        this.router.navigate(['..', 'pages'], { relativeTo: this.ar });
      });
  }
}
