import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PopupMultipleComponent} from './popup-multiple.component';


describe('PopupMultipleComponent', () => {
  let component: PopupMultipleComponent;
  let fixture: ComponentFixture<PopupMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMultipleComponent, ],
        providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
