import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor (private appService: AppService) {}

  ngOnInit(): void {
    this.refresh();
  }

  title = 'ui';
  email: any = "";
  group: any = "";
  editRow: number = 0;
  option: any = ""

  userData: any;

  userGroup: any[] = [];

  checkGroup(val: any) {
    let check = this.userData.filter( (x: any) => {
      this.userGroup.includes(x)
    } )
    console.log(check)
    if (!check.length) {
      let index = this.userGroup.indexOf(val)
      this.userGroup.splice(index, 1)
    }
    console.log(check)
  }

  refresh() {
    this.appService.getData().subscribe( (data: any) => {
      this.userGroup = [];
      this.userData = data;
      this.userData.map((x: any) => {
        if (!this.userGroup.includes(x.group))
          this.userGroup.push(x.group)
      });
    })
  }

  hardRefresh(res: any) {
    this.userGroup = [];
    this.userData = res;
    this.userData.map((x: any) => {
      if (!this.userGroup.includes(x.group))
        this.userGroup.push(x.group)
    });
  }

  addUser() {
    if (!this.email) return alert("Email is Mandatory");
    let user: any = {}
    user.email = this.email;
    user.group = this.group
    this.appService.addData(user).subscribe( data => {
      this.hardRefresh(data)
    })
    this.email = "";
    this.group = "";
    this.option = ""
  }

  changeEdit(val: boolean) {
    console.log(this.userData[this.editRow-1], this.editRow-1)
    if ( !val ) {
      this.email = "";
      this.group = "";
      this.editRow = 0
      this.option = ""
    } else {
      this.email = this.userData[this.editRow-1].email
      this.group = this.userData[this.editRow-1].group
    }
  }

  setGroup(i: any) {
    this.group = this.userGroup[i]
  }

  edit() {
    this.checkGroup(this.group)
    let user = {
      email: this.email,
      group: this.group
    }
    this.appService.editData(user).subscribe( data => {
      this.hardRefresh(data)
    })
    this.email = "";
    this.group = "";
    this.editRow = 0;
    this.option = ""
  }

  changeEditRow(i: any) {
    console.log(i)
    this.editRow = i + 1;
  }

  delete(i: any) {
    this.appService.deleteData(this.userData[i]).subscribe( data => {
      this.hardRefresh(data)
    })
  }
}
