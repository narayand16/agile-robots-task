import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Country } from 'src/app/models/country.interface';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  country!: Country;
  countryCode = '';
  isLoading = true;
  invalidCountryErrorMsg = '';
  destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.countryCode = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.countryService
      .getCountryByCode(this.countryCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data, loading }) => {
        if (data.country) this.country = data.country;
        else this.invalidCountryErrorMsg = 'No data found for this country';
        this.isLoading = loading;
      });
  }

  onBackBtnClick(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
