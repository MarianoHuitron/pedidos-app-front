import { NgModule } from '@angular/core';
import { StatusPipe } from './status.pipe';
import { ExtractDatePipe } from './extract-date.pipe';


@NgModule({
    declarations: [StatusPipe, ExtractDatePipe],
    imports: [],
    exports: [StatusPipe, ExtractDatePipe],
})

export class PipesModule {}