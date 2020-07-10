import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomicilioNuevoPage } from './domicilio-nuevo.page';

describe('DomicilioNuevoPage', () => {
  let component: DomicilioNuevoPage;
  let fixture: ComponentFixture<DomicilioNuevoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomicilioNuevoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioNuevoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
