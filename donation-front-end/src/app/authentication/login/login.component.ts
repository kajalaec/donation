import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form: FormGroup =this.fb.group({});
  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router){

  }
  ngOnInit(){
 this.form= this.fb.group(
  {
    username: ['', Validators.required],
    password:['', Validators.required]
  })
  }
  onSubmit(){
  if(this.form.valid){
   if(this.authService.login(this.form.value.username, this.form.value.password))
  {
    this.router.navigate(['/dashboard'])
  }
  }
  else{
    console.log("Incorrect credentials")
  }
  }

}
