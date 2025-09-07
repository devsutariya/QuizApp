import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './modules/shared/shared-module';
import { UserStorage } from './modules/auth/services/user-storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // protected readonly title = signal('quizWeb');
  title='quizWeb';
  isUserLoggedIn: boolean = UserStorage.isUserLoggedIn();
  isAdminLoggedIn: boolean = UserStorage.isAdminLoggedIn();

  constructor(private router: Router) {} // Inject the Router service

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isUserLoggedIn = UserStorage.isUserLoggedIn();
      this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
    })
  }

  logout() {
    UserStorage.signOut();
    this.router.navigateByUrl('login');
  }
}

// import { Component, signal } from '@angular/core';
// import { Router, RouterOutlet } from '@angular/router';
// import { SharedModule } from './modules/shared/shared-module';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, SharedModule],
//   templateUrl: './app.html',
//   styleUrl: './app.scss'
// })
// export class App {
//   constructor(private router: Router) {} // Inject the Router service

//   protected readonly title = signal('quizWeb');

//   // goToSignup() {
//   //   this.router.navigateByUrl('/register');
//   // }
// }