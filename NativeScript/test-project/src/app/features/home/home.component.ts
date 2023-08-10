import { Component, OnInit } from '@angular/core';
import { EventData } from '@nativescript/core';

import { FlickService } from '../../../core/services/flick.service'

@Component({
    moduleId: module.id,
    selector: 'nx-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    flicks = this.flickService.getFlicks()

    constructor(
        private flickService: FlickService
    ) { }

    ngOnInit() { }

    public onClick(event: EventData) {
        console.log(event)
    }
}