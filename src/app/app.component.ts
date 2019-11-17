import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'elearn'
    openModal = false

    onOpenModal(event) {
        this.openModal = event
    }
}
