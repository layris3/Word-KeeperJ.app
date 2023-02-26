import { Component, Input, OnInit } from '@angular/core';
import { Word } from '../Models/Word';
import { WordService } from '../Services/word.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-chapter-words',
  template: `
  <ng-container *ngIf="!isFinished">
    <app-word [word]="currentWord" (goToNextWord)="nextWord()" (knowIt)="knowIt()"></app-word>
  </ng-container>
  <div *ngIf="isFinished">
    <div class="px-4 pt-5 my-5 text-center border-bottom">
        <div class="py-5">
          <a routerLink="./" class="text-dark text-decoration-none">
              <h1 class="display-4 fw-bold" >You've praticed all the words!</h1>
          </a>
        </div>
        <div class="col-lg-12 mx-auto">
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <button type="button" class="btn btn-success btn-lg px-4 me-sm-3" (click)="tryAgain()">Try again</button>
                <a routerLink="/">
                  <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3" >Go to home</button>
                </a>
            </div>
        </div>
    </div>
  </div>
  `,
  styleUrls: []
})
export class ChapterWordsComponent implements OnInit {
  chapter: string;
  words: Word[];
  currentWord: Word;
  index: number = 0;
  isFinished: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wordService: WordService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(p => {
        this.wordService.getChapterWords(p.get('category')!, p.get('chapter')!)
          .subscribe(w => {
            this.words = w
            this.currentWord = w[0]
          });
      })
  }

  nextWord() {
    if (this.index < this.words.length - 1) {
      this.currentWord = this.words[++this.index];
    }
    else {
      this.isFinished = true;
    }
  }

  knowIt() {
    this.words.splice(this.index, 1);
    if (this.index === this.words.length - 1) {
      this.isFinished = true;
    }
    else {
      this.currentWord = this.words[this.index];
    }
  }

  tryAgain() {
    this.currentWord = this.words[0];
    this.index = 0;
    this.isFinished = false;
  }
}
