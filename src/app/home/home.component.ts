import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails: any;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
    );
  }
  
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
