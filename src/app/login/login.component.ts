import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { text } from '@angular/core/src/render3/instructions';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/formdata' })
};


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  register: boolean = false;
  firstName: string;
  lastName: string;
  registrationSuccess: boolean = false;
  emailExists: boolean = false;
  invalidUser: boolean = false;

  public file: any;

onFileChanged(event: any) {
  this.file = event.target.files[0];
  console.log(this.file)
  this.onUpload();
}

  constructor(private loginService: LoginService, private router: Router, private http:HttpClient) { 
    
  }

  ngOnInit() {
  }

  onUpload() {
    
  }

  doLogin() {
    this.loginService.login(this.email, this.password).subscribe(
      data => {
        console.log("Login Successful ", data);
        localStorage.setItem("user", data);
        this.router.navigate(['/home'])
      },
      error => {
        console.log("Error", error);
        this.invalidUser = true;
      });
  }

  toggleForm() {
    this.register = !this.register;
  }

  doRegister() {
    this.loginService.register(this.firstName, this.lastName, this.email, this.password).subscribe(
      data => {
        console.log("Registration Successful ", data);
        if (data == true) {
          this.register = !this.register;
          this.registrationSuccess = true;
        } else {
          this.emailExists = true;
        }
      }, error => {
        console.log("Error", error);
      }
    )
  }

}
