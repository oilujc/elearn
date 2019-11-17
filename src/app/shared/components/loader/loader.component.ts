import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getIsLoading } from '@app/shared/store/shared.selector';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

    isLoading = false
    isOut = false

    constructor(
        private store: Store<any>,
    ) { }

    ngOnInit() {
        this.store.pipe(select(getIsLoading)).subscribe(loading => {
            if (!loading) {
                this.isOut = true
                setTimeout(() => {
                    this.isLoading = loading
                }, 1000)
            } else {
                this.isLoading = loading
            }
        })
    }

}
