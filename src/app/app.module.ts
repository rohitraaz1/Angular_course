import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';

import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';


import 'hammerjs';
//services
import { DishService } from './services/dish.service';
import { LeaderService } from './services/leader.service';
import { PromotionService } from './services/promotion.service';
import { ProcessHTTPMsgService  } from './services/process-httpmsg.service';


//components
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule
  ],
  exports: [ RouterModule ],
  entryComponents: [
    LoginComponent
],
  providers: [DishService,
              PromotionService,
              LeaderService,
              ProcessHTTPMsgService,
              {provide: 'BaseURL', useValue: baseURL}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
