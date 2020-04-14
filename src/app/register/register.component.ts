import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RegisterService} from '../register.service';
import {User} from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(activatedRoute: ActivatedRoute, location: Location, registerService: RegisterService) {
  }

  ngOnInit(): void {
  }


  onClick() {
    this.registerService.;
  }
}
