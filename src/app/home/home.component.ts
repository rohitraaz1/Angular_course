import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish:Dish;
  promotion: Promotion;
  leaders: Leader;
  disherrMess: string;
  promerrMess: string;
  lederrMess: string;

  constructor(private dishService:DishService,
    private promotionService: PromotionService, 
    private leaderService:LeaderService,
    @Inject('BaseURL') public BaseURL:any) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish,
      disherrMess => this.disherrMess = <any>disherrMess);
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion,
      promerrMess => this.promerrMess = <any>promerrMess);
    this.leaderService.getFeaturedLeader().subscribe(leaders => this.leaders = leaders,
      lederrMess => this.lederrMess = <any>lederrMess);
  }

}
