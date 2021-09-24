import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.registerUser().subscribe(
      (res: any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New user created','Registeration Successful');
        } else{
          res.errors.forEach((element: { code: any; description: any; }) => {
            switch(element.code){
              case 'DuplicateUserName':
                this.toastr.error('Username already exist','Registeration Failed');
                break;
              default:
                this.toastr.error(element.description,'Registeration Failed');
                break;
            }
          });
        }
      },
      err => {
        console.log(err)
      }
    );
  }

}
