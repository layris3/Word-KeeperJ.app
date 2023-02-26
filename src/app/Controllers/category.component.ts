import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { api_server } from '../Config/config';

@Component({
  selector: 'app-category',
  templateUrl: '../Views/category.component.html',
  styleUrls: ['../Styles/category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>(api_server + "categories")
      .subscribe(c => this.categories = c)
  }

}
