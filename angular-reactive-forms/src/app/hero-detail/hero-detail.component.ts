import { Component, OnChanges, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { states, Hero, Address } from '../data-model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnChanges {
  states = states;
  heroForm: FormGroup
  @Input() hero: Hero;

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  }

  addLair() {
    this.secretLairs.push(this.fb.group(new Address())));
  }

  removeLair(i) {
    this.secretLairs.removeAt(i)
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: false
    });
  }

  rebuildForm() {
    this.heroForm.reset({
      name: this.hero.name,
    });
    this.setAddresses(this.hero.addresses);
  }

  ngOnChanges() {
    this.rebuildForm();
  }

}
