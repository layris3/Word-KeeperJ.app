import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWordComponent } from './Controllers/add-word.component';
import { CategoryComponent } from './Controllers/category.component';
import { ChapterWordsComponent } from './Controllers/chapter-words.component';
import { ChapterComponent } from './Controllers/chapter.component';
import { PageNotFoundComponent } from './Controllers/page-not-found.component';
import { WordModifyComponent } from './Controllers/word-modify.component';

const routes: Routes = [
  { path: 'add-new', component: AddWordComponent },
  { path: '', component: CategoryComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:category', component: ChapterComponent },
  { path: 'category/:category/chapter/:chapter', component: ChapterWordsComponent },
  { path: 'modify/:wordName', component: WordModifyComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
