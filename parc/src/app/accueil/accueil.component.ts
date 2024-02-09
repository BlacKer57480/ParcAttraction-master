import { Component } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs/operators';
import { CritiqueFormComponent } from '../critique-form/critique-form.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {

  constructor(public attractionService: AttractionService, public dialog: MatDialog)
  {}
  //ne mettre que les attractions visibles ou attraction.visible == 1
  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttractionVisible();

  public afficherCritique(attraction: AttractionInterface) {
    const dialogRef = this.dialog.open(CritiqueFormComponent, {
      width: '250px',
      data: attraction
    });
  } 

}
