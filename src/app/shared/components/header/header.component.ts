import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUserState } from '@app/auth/store/auth.selector';
import { LogOut } from '@app/auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() public openModal = new EventEmitter<boolean>()

    userLogged = false
    openSearch = false

    constructor(
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.store.pipe(select(getUserState)).subscribe(user => {
            console.log(user.username)

            if (!user.username) {
                this.userLogged = false
            } else {
                this.userLogged = true
            }
        })
    }

    onLogOut() {
        this.store.dispatch(new LogOut(true))
    }

    onOpenSearch() {
        this.openSearch = !this.openSearch
    }

    onOpenModal() {
        this.openModal.emit(true)
    }

}
