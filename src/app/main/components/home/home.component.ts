import { Component, OnInit } from '@angular/core';
import { JwtService } from '@app/auth/services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private jwtSevice: JwtService) { }

  ngOnInit() {
  }

}
