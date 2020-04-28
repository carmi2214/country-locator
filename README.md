# Country Locator
Detects country by a given geometry.<br/>
Good for offline usage.

[![build status](https://travis-ci.com/carmi2214/country-locator.svg?branch=master)](https://travis-ci.com/carmi2214/country-locator)
[![npm](https://img.shields.io/npm/v/country-locator)](https://www.npmjs.com/package/country-locator)
[![license](https://img.shields.io/npm/l/country-locator)](LICENSE)

## Installation
```shell script
npm install country-locator
```

## Usage
`findCountryByCoordinate` accepts latitude & longitude, or a point as an array,<br />
and returns country info with two fields:
- name: the common name for the country
- code: three letters iso code of the country _(ISO3166-1-Alpha-3)_

```typescript
import {findCountryByCoordinate} from "country-locator";

const countryInfo = findCountryByCoordinate(51.500760, -0.125168);

console.log(countryInfo?.name); // United Kingdom
console.log(countryInfo?.code); // GBR
```

You can also call it as a **point** - an array of `[x, y]`<br />
**PAY ATTENTION - `x == longitude` and `y == latitude`**
```typescript
const countryInfo = findCountryByCoordinate([-0.125168, 51.500760]);

console.log(countryInfo?.name); // United Kingdom
console.log(countryInfo?.code); // GBR
```

<hr />

`findCountriesByPolygon` accepts a polygon (array of points arrays)<br />
and returns an array of countries that intersect with a given polygon

```typescript
import {findCountriesByPolygon} from "country-locator";

const countriesInfo = findCountriesByPolygon([
    [-131.484375, 49.781264058178344],
    [-137.548828125, 44.15068115978094],
    [-128.935546875, 26.194876675795218],
    [-96.240234375, 22.755920681486405],
    [-72.50976562499999, 26.43122806450644],
    [-59.501953125, 42.48830197960227],
    [-62.314453125, 48.3416461723746],
    [-76.2890625, 50.3454604086048],
    [-109.77539062499999, 53.173119202640635],
    [-131.484375, 49.781264058178344]
]);

console.log(countriesInfo);

// [
//     { name: 'The Bahamas', code: 'BHS' },
//     { name: 'Canada', code: 'CAN' },
//     { name: 'Mexico', code: 'MEX' },
//     { name: 'United States of America', code: 'USA' }
// ]
```

## Test
```shell script
npm run test
```

## Data
`countries.geojson` comes from [geo-countries](https://github.com/datasets/geo-countries).

## License
Country Locator is [MIT licensed](LICENSE).
