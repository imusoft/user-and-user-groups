import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor (private appService: AppService) {}

  title = 'ui';
  email: any = "";
  group: any = "";
  editRow: number = 0;
  option: any = ""

  userData = [{
    email: "imusoft@gmail.com",
    group: "tech"
  }]

  userGroup = [
    "tech"
  ]

  checkGroup(val: any) {
    let check = this.userData.filter( (x: any) => {
      this.userGroup.includes(x)
    } )
    if (!check.length) {
      let index = this.userGroup.indexOf(val)
      this.userGroup.splice(index, 1)
    }
    console.log(check)
  }

  addUser() {
    if (!this.email) return alert("Email is Mandatory");
    let user: any = {}
    user.email = this.email;
    user.group = this.group
    this.userData.push(user)
    !!this.group && !this.userGroup.includes(this.group) && this.userGroup.push(this.group);
    this.email = "";
    this.group = "";
    this.appService.checkData(this.userData).subscribe( data => {
      console.log(data)
    })
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
    this.userData[this.editRow-1].email = this.email
    this.userData[this.editRow-1].group = this.group
    this.group && !this.userGroup.includes(this.group) && this.userGroup.push(this.group)
    this.email = "";
    this.group = "";
    this.editRow = 0;
    this.option = ""
    this.appService.checkData(this.userData).subscribe( data => {
      console.log(data)
    })
  }

  changeEditRow(i: any) {
    console.log(i)
    this.editRow = i + 1;
  }

  delete(i: any) {
    let tempGroup = this.userData[i].group;
    this.userData.splice(i, 1)
    tempGroup && this.checkGroup(tempGroup)
    this.appService.checkData(this.userData).subscribe( data => {
      console.log(data)
    })
  }
}
