import {AbstractControl, ValidatorFn} from "@angular/forms";

export function validateEmail(email: string): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
