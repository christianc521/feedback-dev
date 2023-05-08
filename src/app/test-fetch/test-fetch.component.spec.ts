import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFetchComponent } from './test-fetch.component';

describe('TestFetchComponent', () => {
  let component: TestFetchComponent;
  let fixture: ComponentFixture<TestFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestFetchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
