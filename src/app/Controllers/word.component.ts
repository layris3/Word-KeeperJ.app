import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { Meaning } from '../Models/Meaning';
import { Sentence } from '../Models/Sentence';
import { Word } from '../Models/Word';

@Component({
  selector: 'app-word',
  templateUrl: '../Views/word.component.html',
  styleUrls: ['../Styles/word.component.css']
})
export class WordComponent implements OnInit, OnChanges {
  @Input() word: Word;
  @Output() goToNextWord: EventEmitter<any> = new EventEmitter();
  @Output() knowIt: EventEmitter<any> = new EventEmitter();

  isShowDetail: boolean = false;
  constructor() { }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.playSound();
  }

  showWordDetail(): void {
    this.isShowDetail = true;
  }

  nextWord() {
    this.isShowDetail = false;
    this.goToNextWord.emit(null);
  }

  know(){
    this.isShowDetail = false;
    this.knowIt.emit(null);
  }

  playSound() {
    let audio = new Audio();
    audio.src = `https://dict.youdao.com/dictvoice?audio=${this.word?.wordName}&type=2`;
    audio.play();
  }
}
