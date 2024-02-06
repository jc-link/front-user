import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from './model/user';
import { UserService } from './service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  users: User[] = [];
  public page = 1;
  public pageSize = 10;
  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }

  selectedUser: User = new User(0, '', '', '', '');

  addUser() {
    if (this.selectedUser.id === 0) {
      this.userService.createUser(this.selectedUser).subscribe((data) => {
        console.log(data.status);
        console.log(data.headers.get('content-type'));
        if (data.body != null) this.users.push(data.body);
      });
    }
    this.selectedUser = new User(0, '', '', '', '');
  }

  updateUser() {
    this.userService.updateUser(this.selectedUser).subscribe(() => {
      this.users = this.users.map((x) => {
        if (x.id === this.selectedUser.id) {
          return this.selectedUser;
        } else {
          return x;
        }
      });
    });

    this.selectedUser = new User(0, '', '', '', '');
  }

  openForEdit(user: User) {
    this.selectedUser = user;
  }

  deleteUser(content: TemplateRef<any>, user: User) {
    this.modalService
      .open(content, { centered: true })
      .result.then((result) => {
        if (result) {
          this.userService.deleteUser(user).subscribe(() => {
            this.users = this.users.filter((x) => x.id !== user.id);
            if (this.selectedUser.id === user.id) {
              this.selectedUser = new User(0, '', '', '', '');
            }
          });
        }
      });
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }
}
