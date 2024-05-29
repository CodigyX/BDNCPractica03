import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaComponent } from './personas/persona.component';
import { PersonaService } from './services/persona.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Añade FormsModule aquí
    HttpClientModule // Añade HttpClientModule aquí
  ],
  providers: [
    PersonaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
