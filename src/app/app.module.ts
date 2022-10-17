import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { SanitazeHtmlPipe } from './pipes/sanitaze-html.pipe';

import { FeatherModule } from 'angular-feather';
import {
  Calendar,
  Maximize2,
  Disc,
  Unlock,
  Sun,
  PlusSquare,
  Link,
  Mail,
  MessageCircle,
  Trash2,
  X,
  Plus,
  Save,
} from 'angular-feather/icons';

const icons = {
  Calendar,
  Maximize2,
  Disc,
  Unlock,
  Sun,
  PlusSquare,
  Link,
  Mail,
  MessageCircle,
  Trash2,
  X,
  Plus,
  Save,
};

@NgModule({
  declarations: [AppComponent, SanitazeHtmlPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherModule.pick(icons),
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatCheckboxModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
