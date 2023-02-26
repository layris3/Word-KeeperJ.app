import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    template: `
  <div class="container">
    <div class="row">
        <div class="px-4 pt-5 my-5 text-center">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details py-5">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div class="error-actions">
                    <a routerLink="/" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-home"></span>
                        Take Me Home 
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>`,
    styleUrls: []
})
export class PageNotFoundComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
