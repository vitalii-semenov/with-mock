# Guidelines

Stack: React, Redux, Rxjs (or similar  lib), ES6/ES7 or Typescript

## We have such model

```typescript
interface Asset {
	id: number
	assetName: string; // "USD", Samsung Electronics Co Ltd : "SSNLF"
	price: number; // asset current price relative to USD
	lastUpdate: number; // unix timestamp
	type: "Currency" | "Stock"; // asset type Currency (e.g. USD, EUR...) or Stock (Samsung, Google)
}
```

## Mock 

Creates 400 random assets, 200 currencies and 200 stocks (just the types is itersting, you don't need real assets) id 1-400
Create a stream from those 400 assets that fires 1 updates per secound for each asset:
* price must be changed each update by -1 to 1 and with the current timestamp, the rest will stay the same

you can find the mock at mock.js
It's exports a mock, rxjs observable with the required stream

### see the mock running

npm/yarn install
npm test

## Requirements:

* Show a table with all of the assets
* Allow to sort for each one of the model fields
* Allow to filter for each one of the model fields

**Optional Todos**

* Add to favorites button
* favorites should be persist  to localstorage
* favorites should be pin to the top of the table

