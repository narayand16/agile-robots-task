import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const COUNTRY = gql`
  query ($countryCode: ID!) {
    country(code: $countryCode) {
      code
      name
      capital
      phone
      emoji
      currency
      native
    }
  }
`;

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      phone
      capital
      emoji
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private apollo: Apollo) {}

  getCountryByCode(code: string) {
    return this.apollo.query<any>({
      query: COUNTRY,
      variables: { countryCode: code },
    });
  }

  getCountries() {
    return this.apollo.watchQuery<any>({
      query: GET_COUNTRIES,
    });
  }
}
