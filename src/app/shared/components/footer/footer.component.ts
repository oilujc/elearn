import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUserState } from '@app/auth/store/auth.selector';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
    
  }

}
