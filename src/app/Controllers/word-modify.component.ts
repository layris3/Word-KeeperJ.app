import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Meaning } from '../Models/Meaning';
import { Sentence } from '../Models/Sentence';
import { Word } from '../Models/Word';
import { ToastService } from '../Services/toast.service';
import { WordService } from '../Services/word.service';
import { CategoryComponent } from './category.component';

@Component({
  selector: 'app-word-modify',
  templateUrl: '../Views/word-modify.component.html',
  styleUrls: ['../Styles/word-modify.component.css']
})
export class WordModifyComponent implements OnInit, OnDestroy {

  word: Word;
  modifyForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private wordService: WordService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      this.wordService.getWord(p.get('wordName')!)
        .subscribe(s => {
          this.word = s;
          this.initForm();
        })
    })
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  initForm() {
    this.modifyForm = this.fb.group({
      wordName: [{ value: this.word.wordName, disabled: true }, Validators.required],
      pronunciation: [{ value: this.word.pronunciation, disabled: true }, Validators.required],
      chapter: [{ value: this.word.chapter, disabled: true }, Validators.required],
      category: [{ value: this.word.category, disabled: true }, Validators.required],
      meanings: this.fb.array([]),
      sentences: this.fb.array([])
    });

    if (this.word.meanings) {
      for (let index = 0; index < this.word.meanings.length; index++) {
        const element = this.word.meanings[index];
        this.addMeaning(element.type, element.content, element.id);
      }
    }

    if (this.word.sentences) {
      for (let index = 0; index < this.word.sentences.length; index++) {
        const element = this.word.sentences[index];
        this.addSentence(element.content, element.chinese, element.id);
      }
    }

  }

  get meanings(): FormArray {
    return this.modifyForm.controls['meanings'] as FormArray;
  }

  get sentences(): FormArray {
    return this.modifyForm.controls['sentences'] as FormArray;
  }

  addMeaning(type: string, meaning: string, id: number = 0) {
    const m = this.fb.group({
      id: [id],
      type: [type, Validators.required],
      meaning: [meaning, Validators.required]
    });
    this.meanings.push(m);
  }

  deleteMeaning(i: number) {
    this.meanings.removeAt(i);
  }

  addSentence(content: string, chinese: string, id: number = 0) {
    const sentenceForm = this.fb.group({
      id: [id],
      content: [content, Validators.required],
      chinese: [chinese, Validators.required]
    });
    this.sentences.push(sentenceForm);
  }

  deleteSentence(i: number) {
    this.sentences.removeAt(i);
  }


  serializeWord(): Word {
    let m: Meaning[] = [];
    let s: Sentence[] = [];
    this.meanings.controls.map((group, i) => {
      m.push({
        id: group.get('id')?.value,
        wordName: this.modifyForm.get('wordName')?.value,
        type: group.get('type')?.value,
        content: group.get('meaning')?.value
      });
    });
    this.sentences.controls.map((group, i) => {
      s.push({
        id: group.get('id')?.value,
        wordName: this.modifyForm.get('wordName')?.value,
        content: group.get('content')?.value,
        chinese: group.get('chinese')?.value
      })
    });
    return {
      wordName: this.modifyForm.get('wordName')?.value,
      pronunciation: this.modifyForm.get('pronunciation')?.value,
      meanings: m,
      sentences: s,
      chapter: this.modifyForm.get('chapter')?.value,
      category: this.modifyForm.get('category')?.value
    };
  }

  submit() {
    let word = this.serializeWord();
    this.wordService.updateWord(word).subscribe({
      next: () => {
        this.toastService.showSuccess('Added successfully!')
      },
      error: err => {
        this.toastService.showDanger('Something wrong,please try again!');
      }
    });
  }
}
