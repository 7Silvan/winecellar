import {Component} from "@angular/core";
import {Account} from "../../types/Account";
import {Credentials} from "../../types/Credentials";
import {AuthenticationSandbox} from "../../sandboxes/authentication.sandbox";
@Component({
    selector: "authentication",
    template: `
    <div class="container">
        <panel [header]="'You are not authenticated!'">
            <login *ngIf="curTab === 0" (authenticate)="login($event)"></login>
            <register *ngIf="curTab === 1" (authenticate)="register($event)"></register>
            <a href="javascript:void(0)" (click)="enableTab(1)" *ngIf="curTab===0">I don't have an account yet</a>
            <a href="javascript:void(0)" (click)="enableTab(0)" *ngIf="curTab===1">I have an account already</a>
        </panel>
    </div>
      `
})
export class Authentication {
    curTab: number = 0;

    constructor(private sb: AuthenticationSandbox) {
    }

    enableTab(tabIndex: number): void {
        this.curTab = tabIndex;
    }

    login(credentials: Credentials): void {
        this.sb.login(credentials);
    }

    register(account: Account): void {
        this.sb.register(account);
    }
}