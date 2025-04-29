import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [HttpClientModule,CommonModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const payload = { username: this.username, password: this.password };

    this.http.post('http://localhost:8080/user/searchByUsername', payload).subscribe({
      next: (response: any) => {
      
        console.log('Login success', response);
        this.router.navigate(['/manage-Enployee']); 
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login failed', error);
      }
    });
  }

}
