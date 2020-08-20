import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractDate'
})
export class ExtractDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    value = value.split('T')[0];
    return value;
  }

}
