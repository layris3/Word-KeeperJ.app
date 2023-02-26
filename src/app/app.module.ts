import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordComponent } from './Controllers/word.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddWordComponent } from './Controllers/add-word.component';
import { ToastComponent } from './Controllers/toast.component';
import { ChapterComponent } from './Controllers/chapter.component';
import { PageNotFoundComponent } from './Controllers/page-not-found.component';
import { ChapterWordsComponent } from './Controllers/chapter-words.component';
import { CategoryComponent } from './Controllers/category.component';
import { WordModifyComponent } from './Controllers/word-modify.component';

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    AddWordComponent,
    ToastComponent,
    ChapterComponent,
    PageNotFoundComponent,
    ChapterWordsComponent,
    CategoryComponent,
    WordModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
