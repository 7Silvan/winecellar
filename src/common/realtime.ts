import {BACKEND} from "../configuration";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import * as io from "socket.io-client";
import {info} from "toastr";
@Injectable()
export class RealTime {
    constructor(private store: Store<ApplicationState>) {
    }

    connect(): void {
        this.store.select(state => state.data.authentication.jwtToken).take(1).subscribe((token: string) => {
            let socket = io(BACKEND, {query: "jwttoken=" + token});
            socket.on("UPDATE_REDUX", action => {
                info("Realtime update coming in!");
                this.store.dispatch(action)
            });
        });
    }
}

