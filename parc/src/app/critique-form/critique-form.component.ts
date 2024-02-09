import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AttractionInterface } from '../Interface/attraction.interface';
import { AttractionService } from '../Service/attraction.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-critique-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule, MatCardModule],
  templateUrl: './critique-form.component.html',
  styleUrl: './critique-form.component.scss'
})
export class CritiqueFormComponent {

  public formulaireCritique: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AttractionInterface, public attractionService: AttractionService,private _snackBar: MatSnackBar,) {
    console.log(data);
    this.formulaireCritique = new FormGroup({
      critique_id: new FormControl(),
      nom: new FormControl(""),
      prenom: new FormControl(""),
      attraction_id: new FormControl(data.attraction_id),
      note: new FormControl("", [Validators.required]),
      commentaire: new FormControl("", [Validators.required]),
    });

  }

  public submitCritique(formulaireCritique: FormGroup) {
    console.log(formulaireCritique)
     this.attractionService.addCritique(this.formulaireCritique.getRawValue()).subscribe(result => {
       formulaireCritique.patchValue({attraction_id: result.result});
       this._snackBar.open(result.message, undefined, {
         duration: 1000
       });
     }
     );
  }
  
}


