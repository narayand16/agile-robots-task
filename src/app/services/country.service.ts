import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Country } from '../models/country';

const COUNTRY = gql`query {
  country(code: $countryCode) {
    code
    name
    capital
    phone
    emoji
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private apollo: Apollo) { }

  getCountryByCode(code: string) {
    return this.apollo.query<Country>({
      query: COUNTRY,
      variables: {countryCode: code}
    })
  }
}
