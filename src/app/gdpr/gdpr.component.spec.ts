import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdprComponent } from './gdpr.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

describe('GdprComponent', () => {
  let component: GdprComponent;
  let fixture: ComponentFixture<GdprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdprComponent ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
