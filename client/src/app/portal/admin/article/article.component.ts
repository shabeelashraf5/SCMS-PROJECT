import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from './article.service';
import { Article } from '../../../model/ad-article.model';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {

  @ViewChild('my_modal_1') modal1!: ElementRef;

  constructor(private articleService: ArticleService){}

  articleForm!: FormGroup
  articleData: Article[] = []

  ngOnInit() {

    this.myForm()
    this.loadArticle()

  }

  loadArticle() { 

    this.articleService.loadArticle().subscribe({
      next: (response) => {
        this.articleData = response.datas
        console.log('News Datas:', this.articleData)
      }
    })


  }


  myForm() {

    this.articleForm = new FormGroup({
      article: new FormControl('', [Validators.required])
    })     
  }
  
  createArticle() {

    const formData: Article = this.articleForm.value

    this.articleService.addArticle(formData).subscribe({
      next: (response) => {
        this.loadArticle()
        console.log('Article Created')
      }
    })
  }

  removeArticle(id: string) {

    this.articleService.deleteArticle(id).subscribe({
      next: (response) => {
        this.loadArticle()
      }
    })
  }

  showModal(): void {
    this.modal1.nativeElement.showModal();
  } 




}
