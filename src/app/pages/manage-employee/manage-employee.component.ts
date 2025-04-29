import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Employee {
  
  id?: number;
  name: string;
  email: string;
  department: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-manage-employee',
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.css'
})
export class ManageEmployeeComponent {

  employees: Employee[] = [];
  newEmployee: Employee = {
    name: '',
    email: '',
    department: '',
    created_at: '',
    updated_at: ''
  };
  searchId: number | null = null;
  searchName: string = '';

  private API_URL = 'http://localhost:8080/employe';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get<Employee[]>(`${this.API_URL}/get-All`).subscribe({
      
      next: (data) => this.employees = data,
      
      error: (err) => console.error('Error fetching employees:', err)
    });
  }

  addEmployee() {
    if (this.newEmployee.name && this.newEmployee.email && this.newEmployee.department) {
      const now = new Date().toISOString();
      this.newEmployee.created_at = now;
      this.newEmployee.updated_at = now;
  
      this.http.post<Employee>(`${this.API_URL}/add`, this.newEmployee).subscribe({
        next: (data) => {
          this.employees.push(data);
          this.newEmployee = {
            name: '',
            email: '',
            department: '',
            created_at: '',
            updated_at: ''
          };
          this.getEmployees();
        },
        error: (err) => console.error('Error adding employee:', err)
      });
    }
  }

  updateEmployee() {
    if (this.newEmployee.id && this.newEmployee.name && this.newEmployee.email && this.newEmployee.department) {
      this.newEmployee.updated_at = new Date().toISOString();
  
      this.http.put<void>(`${this.API_URL}/update`, this.newEmployee).subscribe({
        next: () => {
          this.getEmployees();
          this.newEmployee = {
            name: '',
            email: '',
            department: '',
            created_at: '',
            updated_at: ''
          };
          alert('Employee updated successfully!');
        },
        error: (err) => console.error('Error updating employee:', err)
      });
    } else {
      alert('Please select an employee and fill all required fields.');
    }
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.http.delete<void>(`${this.API_URL}/delete/${id}`).subscribe({
        next: () => this.getEmployees(),
        error: (err) => console.error('Error deleting employee:', err)
      });
    }
  }

  searchEmployee() {
    if (this.searchId) {
      this.http.get<Employee>(`${this.API_URL}/searchById/${this.searchId}`).subscribe({
        next: (data) => this.employees = [data],
        error: (err) => console.error('Error searching employee by ID:', err)
      });
    } else if (this.searchName) {
      this.http.get<Employee[]>(`${this.API_URL}/searchByName/${this.searchName}`).subscribe({
        next: (data) => this.employees = data,
        error: (err) => console.error('Error searching employee by name:', err)
      });
    } else {
      this.getEmployees();
    }
  }

  selectEmployee(emp: Employee) {
    this.newEmployee = { ...emp };
  }



  generateReport() {
    this.http.get(`${this.API_URL}/report`, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'employee_report.pdf'; 
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (err) => {
        console.error('Error generating report:', err);
        alert('Failed to generate report.');
      }
    });
  }
  


}
