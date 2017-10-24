// import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import 'rxjs/add/operator/switchMap';
// const DISH = {
//   name: 'Uthappizza',
//   image: '/assets/images/uthappizza.png',
//   category: 'mains',
//   label: 'Hot',
//   price: '4.99',
//   description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
//   comments: [
//     {
//       rating: 5,
//       comment: "Imagine all the eatables, living in conFusion!",
//       author: "John Lemon",
//       date: "2012-10-16T17:57:28.556094Z"
//     },
//     {
//       rating: 4,
//       comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
//       author: "Paul McVites",
//       date: "2014-09-05T17:57:28.556094Z"
//     },
//     {
//       rating: 3,
//       comment: "Eat it, just eat it!",
//       author: "Michael Jaikishan",
//       date: "2015-02-13T17:57:28.556094Z"
//     },
//     {
//       rating: 4,
//       comment: "Ultimate, Reaching for the stars!",
//       author: "Ringo Starry",
//       date: "2013-12-02T17:57:28.556094Z"
//     },
//     {
//       rating: 2,
//       comment: "It's your birthday, we're gonna party!",
//       author: "25 Cent",
//       date: "2011-12-02T17:57:28.556094Z"
//     }
//   ]
// };

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  // @Input()
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createCommentForm();
     }

  ngOnInit() {
    // let id = +this.route.snapshot.params['id'];
    // this.dishservice.getDish(id).subscribe(dish => this.dish = dish);

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      rating: '',
      comment: '',
      author: ''
    })
  }

}
