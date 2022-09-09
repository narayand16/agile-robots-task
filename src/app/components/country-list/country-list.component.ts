import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Country } from 'src/app/models/country.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading = true;
  destroy$ = new Subject<void>();
  columns = ['name', 'capital', 'phone', 'code', 'emoji'];
  dataSource = new MatTableDataSource<Country>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.countryService
      .getCountries()
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(({ data, loading }) => {
        console.log(loading);
        this.dataSource.data = data.countries;
        this.isLoading = loading;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCountrySelect(countryCode: string): void {
    this.router.navigate(['/country/' + countryCode]);
  }

  onSearchFilter(searchText: string): void {
    this.dataSource.filter = searchText.toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
