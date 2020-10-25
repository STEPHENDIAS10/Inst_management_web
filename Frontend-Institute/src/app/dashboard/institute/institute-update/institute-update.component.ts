import { Component, OnInit } from '@angular/core';
import { InstituteService } from '../services/institute.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StateService } from 'src/app/state.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-institute-update',
  templateUrl: './institute-update.component.html',
  styleUrls: ['./institute-update.component.css'],
})
export class InstituteUpdateComponent implements OnInit {
  // Reference variable of formGroup
  instituteUpdateForm: FormGroup;

  // State and City variables
  State = [];
  StateArray = new Array();

  CityArray = [];
  cityDemo = new Array();

  hideUl = true;
  hideCity = true;

  public ownerId = ' ';
  public instituteId = ' ';
  disabledBtn = true;
  public institute = {
    instituteName: '',
    instituteType: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    city: '',
    pinCode: '',
  };
  constructor(
    private stateService: StateService,
    private fb: FormBuilder,
    private router: Router,
    private instituteService: InstituteService,
    private readonly notification: NotificationService
  ) { }

  ngOnInit(): void {
    const id = localStorage.getItem('ownerId');
    this.ownerId = id;
    const data = {
      ownerId: this.ownerId,
    };

    this.instituteService.findInstituteId(data).subscribe(
      (response: any) => {
        this.instituteId = response.institute._id;
        this.setData(response.institute);
      },
      (error) => {
      }
    );

    this.instituteUpdateForm = this.fb.group({
      instituteName: [null, Validators.required],
      instituteType: [null, Validators.required],
      addressLine1: [null, Validators.required],
      addressLine2: [null],
      state: [null, Validators.required],
      city: [null, Validators.required],
      pincode: [null, Validators.required],
    });

    this.State = this.stateService.getStates();
  }

  completeState() {
    const StateValue = this.instituteUpdateForm.get('state').value.toLowerCase();
    this.StateArray = [];
    if (StateValue != '') {
      for (let i = 0; i < this.State.length; i++) {
        if (
          this.State[i].state
            .toLowerCase()
            .startsWith(StateValue.toLowerCase()) &&
          this.State[i].state.toLowerCase().indexOf((StateValue as string).toLowerCase()) >= 0
        ) {
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
    const cityValue = this.instituteUpdateForm.get('city').value;
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
    this.instituteUpdateForm.controls.state.setValue(value.state);
    this.hideUl = true;
    this.CityArray = this.stateService
      .getCity()
      .filter((x) => x.id === value.id)[0].city;
  }

  fillCityBox(value) {
    this.instituteUpdateForm.controls.city.setValue(value);
    this.hideCity = true;
  }

  setData(institute) {
    this.instituteUpdateForm
      .get('instituteName')
      .setValue(institute.instituteName);
    this.instituteUpdateForm
      .get('instituteType')
      .setValue(institute.instituteType);
    this.instituteUpdateForm
      .get('addressLine1')
      .setValue(institute.instituteAddressLine1);
    this.instituteUpdateForm
      .get('addressLine2')
      .setValue(institute.instituteAddressLine2);
    this.instituteUpdateForm.get('state').setValue(institute.state);
    this.instituteUpdateForm.get('city').setValue(institute.city);
    this.instituteUpdateForm.get('pincode').setValue(institute.pincode);
  }

  get instituteName() {
    return this.instituteUpdateForm.get('instituteName');
  }

  get instituteType() {
    return this.instituteUpdateForm.get('instituteType');
  }

  get addressLine1() {
    return this.instituteUpdateForm.get('addressLine1');
  }

  get addressLine2() {
    return this.instituteUpdateForm.get('addressLine2');
  }

  get state() {
    return this.instituteUpdateForm.get('state');
  }

  get city() {
    return this.instituteUpdateForm.get('city');
  }

  get pincode() {
    return this.instituteUpdateForm.get('pincode');
  }

  update() {
    const data = {
      _id: this.instituteId,
      instituteName: this.instituteUpdateForm.get('instituteName').value,
      instituteType: this.instituteUpdateForm.get('instituteType').value,
      instituteAddressLine1: this.instituteUpdateForm.get('addressLine1').value,
      instituteAddressLine2: this.instituteUpdateForm.get('addressLine2').value,
      state: this.instituteUpdateForm.get('state').value,
      city: this.instituteUpdateForm.get('city').value,
      pincode: this.instituteUpdateForm.get('pincode').value,
      ownerId: this.ownerId,
    };

    this.instituteService.updateInstitute(data).subscribe(
      (response: any) => {
        this.notification.createNotification('success', 'Success', 'Updated successfully', 'topRight');
        this.router.navigate(['/dashboard/course/list']);
      },
      (error) => {
        this.notification.createNotification('error', 'Error', 'Error in updation', 'topRight');
      }
    );
  }

  cancel() {
    this.router.navigate(['/dashboard/course/list']);
  }




}
