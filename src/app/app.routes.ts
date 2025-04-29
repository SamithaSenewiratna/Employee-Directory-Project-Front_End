import { Routes } from '@angular/router';
import { ManageEmployeeComponent } from './pages/manage-employee/manage-employee.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path:"manage-Enployee",
        component:ManageEmployeeComponent
    },
    {
        path:"logIn",
        component:LoginComponent
    },
    {
        path:"",
        component:LoginComponent
    }

];
