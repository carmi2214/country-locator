# Country Locator
Detects country by given coordinate.<br/>
Good for offline usage.

[![build status](https://travis-ci.com/carmi2214/country-locator.svg?branch=master)](https://travis-ci.com/carmi2214/country-locator)
[![npm](https://img.shields.io/npm/v/country-locator)](https://www.npmjs.com/package/country-locator)
[![license](https://img.shields.io/npm/l/country-locator)](LICENSE)

## Installation
```shell script
npm install country-locator
```

## Usage
`findCountryByCoordinate` returns country info with two fields :
- name : the common name for the country
- code : three letters iso code of the country _(ISO3166-1-Alpha-3)_

```typescript
import {findCountryByCoordinate} from "country-locator";

const countryInfo = findCountryByCoordinate(51.500760, -0.125168);

console.log(countryInfo?.name); // United Kingdom
console.log(countryInfo?.code); // GBR
```

```typescript
const countryInfo = findCountryByCoordinate(0, 0);

console.log(countryInfo); // undefined
```

## Test
```shell script
npm run test
```

## Data
`countries.geojson` comes from [geo-countries](https://github.com/datasets/geo-countries).

## License
Country Locator is [MIT licensed](LICENSE).
