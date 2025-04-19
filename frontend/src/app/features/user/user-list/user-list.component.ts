import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../core/services/user/user.service";
import { User } from "../../../core/models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  editUser(id: string) {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
