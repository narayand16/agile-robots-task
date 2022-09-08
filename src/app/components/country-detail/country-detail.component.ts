import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  country!: Country;
  countryCode = '';

  constructor(private activatedRoute: ActivatedRoute, private countryService: CountryService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(switchMap(params => {
      this.countryCode = params.get('id')!;
      return this.countryService.getCountryByCode(this.countryCode);
    })).subscribe(({data}) => {
      this.country = data
    })
  }

}
