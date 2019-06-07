import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';

import { StreamViewerComponent } from './stream-viewer.component';
import { StreamService } from '../services/stream-service';

describe('StreamViewerComponent', () => {
    let component: StreamViewerComponent;
    let fixture: ComponentFixture<StreamViewerComponent>;
    let streamServiceSpy: jasmine.SpyObj<StreamService>;

    beforeEach(async(() => {
        const streamService: StreamService = jasmine.createSpyObj('StreamService', ['streamBlocks', 'streamTransactions']);

        TestBed.configureTestingModule({
            declarations: [StreamViewerComponent],
            imports: [
                MatTableModule
            ],
            providers: [
                {
                    provide: StreamService,
                    useValue: streamService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        streamServiceSpy = TestBed.get(StreamService);

        streamServiceSpy.streamBlocks.and.returnValues(
            of({
                x: {
                    time: '1',
                    height: 34534535353,
                    size: 345345345
                }
            })
        );
        streamServiceSpy.streamTransactions.and.returnValues(
            of({
                x: {
                    hash: '12345',
                    time: '1559865600',
                    value: '32423424'
                }
            })
        );

        fixture = TestBed.createComponent(StreamViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should subscribe to streamBlocks and convert the raw values to the mapped values', () => {
        expect(component.listBlocks.length).toBe(1);
        expect(component.listBlocks[0].age).toEqual('1');
    });

    it('should subscribe to streamTransactions and convert the raw values to the mapped values', () => {
        expect(component.listTransactions.length).toBe(1);
        expect(component.listTransactions[0].id).toEqual('12345');
    });
});
