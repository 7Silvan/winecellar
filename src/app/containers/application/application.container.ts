import {Title} from "@angular/platform-browser";
import {Component, ViewEncapsulation, OnInit, OnDestroy} from "@angular/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";
import {ApplicationSandbox} from "../../sandboxes/application.sandbox";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";
@Component({
    selector: "application",
    encapsulation: ViewEncapsulation.None,
    styles: [require("./application.container.scss")],
    providers: [Title],
    template: `
        <navbar [account]="account$|async" (logout)="logout()" [hidden]="!(isAuthenticated$|async)"></navbar>
        <router-outlet></router-outlet>
        <spinner [spin]="isBusy$|async"></spinner>
        <!--<ngrx-store-log-monitor toggleCommand="ctrl-t" positionCommand="ctrl-m"></ngrx-store-log-monitor>-->
    `
})
export class WineCellarApp implements OnInit, OnDestroy {
    account$ = this.sb.account$;
    isBusy$ = this.sb.isBusy$;
    isAuthenticated$ = this.sb.isAuthenticated$;

    private subscriptions: Array<Subscription> = [];

    constructor(private title: Title, private sb: ApplicationSandbox, private router: Router) {
        this.title.setTitle("Winecellar application");
    }

    ngOnInit(): void {
        this.sb.checkInitialAuthentication();
        this.sb.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
            if (isAuthenticated) {
                this.sb.loadWines();
            } else {
                this.router.navigate(["/authentication"]);
            }
        });
    }

    logout(): void {
        this.sb.logout();
        this.router.navigate(["/authentication"]);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}