import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routedComponents } from './app-routing.module';

import { StompService } from 'ng2-stomp-service';
import { AppComponent } from './app.component';
import {ChatService} from "./service/chat.service";

@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [StompService, ChatService],
  bootstrap: [AppComponent]
})

export class AppModule { }

