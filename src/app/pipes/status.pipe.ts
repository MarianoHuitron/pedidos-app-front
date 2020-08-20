import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value == 'pending') {
      return 'Pendinete';
    } else if(value == 'delivery') {
      return 'En camino';
    } else if(value == 'success') {
      return 'Entregado';
    }
  }

}
