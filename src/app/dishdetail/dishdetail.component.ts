import { Component, OnInit, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish';
import { ActivatedRoute,Params } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comments';
  
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  commentsForm: FormGroup;
  comment: Comment;
    
    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;
    @ViewChild('cform') commentsFormDirective: { resetForm: () => void; };
  constructor(private fb: FormBuilder,private dishservice: DishService,private route:ActivatedRoute, private location:Location) { }
  
  formErrors: any = {
    'author': '',
    'comment': ''
  };
  validationMessages: any = {
    'author': {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be at least 2 characters long.',
      'maxlength': 'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comments are required.'
    },
  };
  ngOnInit() {
    this.createForm();
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe( dish => {this.dish = dish; this.setPrevNext(dish.id)}  );
  }

  createForm(): void{
    this.commentsForm = this.fb.group({
      author: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)] ],
      rating: ['5'],
      comment:['', [Validators.required] ]
    });
    this.commentsForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();  // (re)set validation messages now
  }
  
  onValueChanged(data?: any){
    if(!this.commentsForm) {return;}
    const form = this.commentsForm;
    for(const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        } 
      }
    }
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index -1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index +1) % this.dishIds.length];
  }
  goBack(): void{
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentsForm.value;
    this.comment.date = new Date().toISOString();
    //console.log(this.ratingcomment);
    this.dish.comments.push(this.comment);
    this.commentsForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.commentsFormDirective.resetForm();
  }

}
