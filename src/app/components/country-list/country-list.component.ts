import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo, gql } from 'apollo-angular';
import { Subject, takeUntil } from 'rxjs';
import { Country } from 'src/app/models/country';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

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
export class CountryListComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'agile-robots-task';
  destroy$ = new Subject<void>();
  columns = [ 'name', 'capital', 'phone', 'code', 'emoji'];
  dataSource = new MatTableDataSource<Country>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_COUNTRIES
    }).valueChanges.pipe(takeUntil(this.destroy$)).subscribe(({data, loading}) => {
      console.log(loading);
      this.dataSource.data = data.countries;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCountrySelect(countryCode: string): void {
    this.router.navigate(['/country/' + countryCode]);
    console.log(countryCode);
  }

  onSearchFilter(searchText: string): void {
    this.dataSource.filter = searchText.toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
