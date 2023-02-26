import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '../Services/toast.service';
import { CategoryService } from '../Services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chapter',
  templateUrl: '../Views/chapter.component.html',
  styleUrls: ['../Styles/chapter.component.css']
})
export class ChapterComponent implements OnInit, OnDestroy {

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      p => {
        this.categoryService.getCategoryChapters(p.get('category')!)
          .subscribe({
            next: chapters => {
              this.chapters = chapters
            },
            error: error => {
              this.toastService.showDanger("can't not retreive chapters!", 3000)
            }
          })
      }
    )
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  chapters: any[] = [];
}
