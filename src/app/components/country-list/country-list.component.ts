import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo, gql } from 'apollo-angular';
import { Subject, takeUntil } from 'rxjs';
import { Country } from 'src/app/models/country';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const GET_COUNTRIES = gql`query {
  countries {
    code
    name
    phone
    capital
    emoji
  }
}`;

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit, OnDestroy {
  title = 'agile-robots-task';
  destroy$ = new Subject<void>();
  // countries: Country[] = [];
  columns = [ 'name', 'capital', 'phone', 'code', 'emoji'];
  dataSource = new MatTableDataSource<Country>([]);


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_COUNTRIES
    }).valueChanges.pipe(takeUntil(this.destroy$)).subscribe(({data, loading}) => {
      console.log(loading);
      this.dataSource = new MatTableDataSource(data.countries);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCountrySelect(country: Country): void {
    console.log(country)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
