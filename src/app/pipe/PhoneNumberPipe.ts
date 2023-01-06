import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatter'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phoneNumber?: number): string {
    if (phoneNumber)
      return phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')
    return ''
  }
}
