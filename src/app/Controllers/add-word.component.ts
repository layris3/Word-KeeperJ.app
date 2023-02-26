import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { Word } from '../Models/Word';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { WordService } from '../Services/word.service';
import { Meaning } from '../Models/Meaning';
import { Sentence } from '../Models/Sentence';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-add-word',
  templateUrl: '../Views/add-word.component.html',
  styleUrls: ['../Styles/add-word.component.css']
})
export class AddWordComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private wordService: WordService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  addWordForm: FormGroup;

  initFormGroup() {
    this.addWordForm = this.fb.group({
      wordName: ['', Validators.required],
      pronunciation: ['', Validators.required],
      chapter: ['', Validators.required],
      category: ['', Validators.required],
      meanings: this.fb.array([
        this.fb.group({
          type: ['', Validators.required],
          meaning: ['', Validators.required]
        })
      ]),
      sentences: this.fb.array([
        this.fb.group({
          content: ['', Validators.required],
          chinese: ['', Validators.required]
        })
      ]),
    });
  }

  get meanings(): FormArray {
    return this.addWordForm.get('meanings') as FormArray;
  }

  get sentences(): FormArray {
    return this.addWordForm.controls['sentences'] as FormArray;
  }

  addMeaning() {
    const meaning = this.fb.group({
      type: ['', Validators.required],
      meaning: ['', Validators.required]
    });
    this.meanings.push(meaning);
  }

  deleteMeaning(i: number) {
    this.meanings.removeAt(i);
  }

  addSentence() {
    const sentenceForm = this.fb.group({
      content: ['', Validators.required],
      chinese: ['', Validators.required]
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
        id: 0,
        wordName: this.addWordForm.get('wordName')?.value,
        type: group.get('type')?.value,
        content: group.get('meaning')?.value
      });
    });
    this.sentences.controls.map((group, i) => {
      s.push({
        id: 0,
        wordName: this.addWordForm.get('wordName')?.value,
        content: group.get('content')?.value,
        chinese: group.get('chinese')?.value
      })
    });
    return {
      wordName: this.addWordForm.get('wordName')?.value,
      pronunciation: this.addWordForm.get('pronunciation')?.value,
      meanings: m,
      sentences: s,
      chapter: this.addWordForm.get('chapter')?.value,
      category: this.addWordForm.get('category')?.value
    };
  }

  submit() {
    let word = this.serializeWord();
    this.wordService.addWord(word).subscribe({
      next: () => {
        this.toastService.showSuccess('Added successfully!')
        this.initFormGroup();
      },
      error: err => {
        this.toastService.showDanger('Something wrong,please try again!');
      }
    });
  }
}
