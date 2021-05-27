import { Component, OnInit ,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut,expand } from '../animations/app-animation';

 @Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'Style': 'display: block;'
  },
  animations: [
    flyInOut(),expand()
  ]

})

export class MenuComponent implements OnInit {
 
  errMess: string;
  dishes: Dish[];


  constructor(private dishService: DishService,
    @Inject('BaseURL') public BaseURL:any) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes,
      errMess => this.errMess = <any>errMess);
  }

}
