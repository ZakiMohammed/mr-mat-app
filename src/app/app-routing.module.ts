import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerPagingComponent } from './components/customer-paging/customer-paging.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'customer/list', component: CustomerListComponent },
  { path: 'customer/paging', component: CustomerPagingComponent },
  { path: 'customer/edit/:id', component: CustomerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
