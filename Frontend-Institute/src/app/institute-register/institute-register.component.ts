import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { InstituteService } from '../dashboard/institute/services/institute.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../state.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from '../core/services/notification.service';
@Component({
  selector: 'app-institute-register',
  templateUrl: './institute-register.component.html',
  styleUrls: ['./institute-register.component.css'],
})
export class InstituteRegisterComponent implements OnInit {
  State = [];
  StateArray = new Array();

  CityArray = [];
  cityDemo = new Array();

  hideUl = true;
  hideCity = true;
  // Reference variable of formGroup
  instituteRegistrationForm: FormGroup;

  // Reference variable : Institute class
  public ownerId = ' ';
  constructor(
    private stateService: StateService,
    public instituteService: InstituteService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {
    this.instituteRegistrationForm = this.fb.group({
      instituteName: [null, Validators.required],
      instituteType: [null, Validators.required],
      addressLine1: [null, Validators.required],
      addressLine2: [null],
      state: [null, Validators.required],
      city: [null, Validators.required],
      pincode: [null, Validators.required],
    });
  }

  ngOnInit() {
    const id = localStorage.getItem('ownerId');
    this.ownerId = id;
    this.State = this.stateService.getStates();
  }

  complete() {
    const StateValue = this.instituteRegistrationForm.get('state').value;
    this.StateArray = [];
    if (StateValue != '') {
      for (let i = 0; i < this.State.length; i++) {

        if (this.State[i].state
          .toLowerCase().startsWith(StateValue.toLowerCase()) &&
          this.State[i].state.toLowerCase().indexOf((StateValue as string).toLowerCase()) >= 0) {
          this.hideUl = false;
          this.StateArray.push({
            id: this.State[i].id,
            state: this.State[i].state,
          });
        }
      }
    }
  }

  completeCity() {
    const cityValue = this.instituteRegistrationForm.get('city').value;
    this.cityDemo = [];

    if (cityValue != '') {
      for (let i = 0; i < this.CityArray.length; i++) {
        if (
          this.CityArray[i].toLowerCase().startsWith(cityValue.toLowerCase()) &&
          this.CityArray[i].toLowerCase().indexOf((cityValue as string).toLowerCase()) >= 0
        ) {
          this.hideCity = false;
          this.cityDemo.push(this.CityArray[i]);
        }
      }
    }
  }

  filltextBox(value) {
    this.instituteRegistrationForm.controls.state.setValue(value.state);
    this.hideUl = true;
    this.CityArray = this.stateService
      .getCity()
      .filter((x) => x.id === value.id)[0].city;
  }

  fillCityBox(value) {
    this.instituteRegistrationForm.controls.city.setValue(value);
    this.hideCity = true;
  }

  // display fields value
  get instituteName() {
    return this.instituteRegistrationForm.get('instituteName');
  }

  get instituteType() {
    return this.instituteRegistrationForm.get('instituteType');
  }

  get addressLine1() {
    return this.instituteRegistrationForm.get('addressLine1');
  }

  get addressLine2() {
    return this.instituteRegistrationForm.get('addressLine2');
  }

  get state() {
    return this.instituteRegistrationForm.get('state');
  }

  get city() {
    return this.instituteRegistrationForm.get('city');
  }

  get pincode() {
    return this.instituteRegistrationForm.get('pincode');
  }

  getInstituteData() {
    return {
      instituteName: this.instituteRegistrationForm.get('instituteName').value,
      instituteType: this.instituteRegistrationForm.get('instituteType').value,
      instituteAddressLine1: this.instituteRegistrationForm.get('addressLine1')
        .value,
      instituteAddressLine2: this.instituteRegistrationForm.get('addressLine2')
        .value,
      state: this.instituteRegistrationForm.get('state').value,
      city: this.instituteRegistrationForm.get('city').value,
      pincode: this.instituteRegistrationForm.get('pincode').value,
      ownerId: this.ownerId,
    };
  }

  register() {
    const institute = this.getInstituteData();
    this.instituteService.createInstitute(institute).subscribe((response: any) => {
      this.notification.createNotification('success', 'Success', 'Istitute registered Successfully', 'topRight');
      localStorage.setItem('instituteId', response.institute._id);
      this.router.navigate(['/dashboard/course/list']);
    },
      (error) => {
        this.router.navigate(['/']);
        this.notification.createNotification('error', 'Error', 'Error in registering institute', 'topRight');
        alert(error.error.message);
      }
    );
  }

  cancel() { }
}
