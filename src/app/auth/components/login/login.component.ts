import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { LogIn } from '@app/auth/store/auth.actions';
import { JwtService } from '@app/auth/services/jwt.service';
import { getUserState } from '@app/auth/store/auth.selector';

declare const $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @Input() public openModal: false;

    loginForm: FormGroup
    userLogged = false
    loginError: any

    constructor(
        private fb: FormBuilder,
        private store: Store<any>,
        private jwtService: JwtService
    ) { }

    ngOnInit() {
        this.store.pipe(select(getUserState)).subscribe(user => {
            if (!user.username && user.error) {
                this.loginError = user.error
                this.userLogged = false
            } else if (!user.username && !user.error) {
                this.userLogged = false
            } else {
                $('#signin').hide()
                this.userLogged = true
            }
        })

        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })

    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.store.dispatch(new LogIn(this.loginForm.value))
        }
    }

}
