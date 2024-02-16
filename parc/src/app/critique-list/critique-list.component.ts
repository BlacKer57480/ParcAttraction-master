import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AttractionService } from '../Service/attraction.service';
import { CritiqueInterface } from '../Interface/critique.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-critique-list',
  standalone: true,
  templateUrl: './critique-list.component.html',
  styleUrls: ['./critique-list.component.scss'],
  imports: [CommonModule],

})
export class CritiqueListComponent implements OnInit {
  critiques!: CritiqueInterface[];

  constructor(
    private route: ActivatedRoute,
    private critiqueService: AttractionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('attraction_id');
    if (id) {
      this.critiqueService.getAttractionCritiques(+id).subscribe((critiques) => {
        this.critiques = critiques;
      });
    }
  }
}