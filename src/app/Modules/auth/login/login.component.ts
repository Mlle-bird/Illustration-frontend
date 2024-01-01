import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Utils/Services/Shared.service';
import { UserService } from 'src/app/Utils/Services/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private share: SharedService) { }

  myForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required])
  });

  errMessage: string = '';

  onSubmit() {
    if (this.myForm.valid) {
      this.userService.login(this.myForm.value).subscribe({
        next: (res: any) => {
          this.userService.storeToken(res.jwt);
          localStorage.setItem("IsLoggedIn","true")
          //window.location.replace("/angular-app/#/account/profile")
          window.location.reload()
        },
        error: () => {
          this.share.errorMessageObservable.subscribe(msg => {
            this.errMessage = msg
            console.log(msg);
          });
        }
      });
    } else {
        this.errMessage="All fields are required"
    }
  }
}
