import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Utils/Services/User.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.role = this.userService.decodeJwtToken().payload.scope;
    if(localStorage.getItem("IsLoggedIn")&& localStorage.getItem("IsLoggedIn")=="true"){
      this.isLoggedIn=true
    }
  }

  constructor(private userService: UserService, private route:ActivatedRoute) { }

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isLoggedIn: boolean = false;
  role : string = "" ;

  logout() {
    this.userService.logout();
    localStorage.removeItem("IsLoggedIn")
    this.isLoggedIn=false
    window.location.replace("/angular-app/#/illus/list");
  }



}
