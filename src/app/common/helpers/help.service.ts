import { Inject, Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DOCUMENT } from "@angular/common";


@Injectable()
export class HelperService {

    public isMenuSettingsActive = false;
    constructor(
        private platform: Platform,
        @Inject(DOCUMENT) private _document: any

    ) { }

    public isMobile() {
        if (this.platform.is('desktop')) {
            return false;
        }
        else {
            if (this.platform.width() > 1024) {
                this._document.documentElement.className = 'plt-desktop md hydrated';
                return false;
            }
            return true;
        }
    }

}
