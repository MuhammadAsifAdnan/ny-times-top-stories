import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss'],
})
export class NewsCategoryComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.newsCategory = params.get('category') || '';
    });
  }

  newsCategory: string = '';
  ngOnInit(): void {}
}
