import { NgModule } from '@angular/core';
import { PageHeadlineComponent } from './page-headline.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [PageHeadlineComponent],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule
  ],
  exports: [PageHeadlineComponent]
})
export class PageHeadlineModule { }
