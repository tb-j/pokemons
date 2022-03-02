import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../service/pokemon.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  id;
  details: any;

  constructor(private route: ActivatedRoute, private service: PokemonService, private location: Location) {
    this.id = this.route.snapshot.paramMap.get('key');
    this.service.getPokemonDetails(this.id || '').subscribe(data => {
      this.details = data;
    })
  }

  back(): void {
    this.location.back();
  }

}
