import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { StreamService } from '../services/stream-service';
import { Block, Transaction } from './stream-viewer.model';

@Component({
    selector: 'app-stream-viewer',
    templateUrl: './stream-viewer.component.html',
    styleUrls: ['./stream-viewer.component.sass']
})
export class StreamViewerComponent implements OnInit, OnDestroy {
    streamBlocks: Observable<any>;
    streamTransactions: Observable<any>;

    listBlocks: Block[];
    listTransactions: Transaction[];

    sourceBlocks: MatTableDataSource<any>;
    sourceTransactions: MatTableDataSource<any>;

    constructor(streamService: StreamService) {
        this.streamBlocks = streamService.streamBlocks('wss://ws.blockchain.info/inv');
        this.streamTransactions = streamService.streamTransactions('wss://ws.blockchain.info/inv');

        this.listBlocks = [];
        this.listTransactions = [];
    }

    ngOnDestroy(): void {

    }

    ngOnInit() {
        this.streamBlocks.subscribe(message => {
            this.listBlocks.push({
                age: message.x.time,
                height: message.x.height,
                size: message.x.size
            });

            if (this.listBlocks.length > 5) {
                this.listBlocks.splice(0, this.listBlocks.length - 5);
            }

            this.sourceBlocks = new MatTableDataSource(this.listBlocks);
        });

        this.streamTransactions.subscribe(message => {
            const timestamp = new Date(message.x.time * 1000);
            const time = timestamp.getSeconds() + ' seconds';

            this.listTransactions.push({
                id: message.x.hash,
                age: time,
                output: message.x.value
            });

            if (this.listTransactions.length > 5) {
                this.listTransactions.splice(0, this.listTransactions.length - 5);
            }

            this.sourceTransactions = new MatTableDataSource(this.listTransactions);
        });
    }

}
