
# Flight Search App
[![AGPL License](https://img.shields.io/badge/License-GNU_AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

A web app made to search for low-cost flights using Amadeus API.
## Tech Stack

**Client:** ReactTS (v18.3.1)

**Server:** ASP.NET (.NET 8)

## Environment Variables

The project requires the following environment variables to be set up in the appsettings.json file under section "AmadeusAPI":

`ApiUrl`

`AuthUrl`

`ClientId`

`ClientSecret`
## API Reference

#### Get access token

```https
  GET /api/auth
```

#### Get flight offers

```https
  GET /api/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `origin`      | `string` | **Required**. IATA code of Origin Airport |
| `destination`      | `string` | **Required**. IATA code of Destination Airport |
| `departureDate`      | `string` | **Required**. Departure date in yyyy-MM-dd format |
| `returnDate`      | `string` | Return date in yyyy-MM-dd format (for return flights) |
| `passengers`      | `int` | **Required**. Number of (adult) passengers |
| `currency`      | `int` | **Required**. Currency (EUR, USD, HRK) |

## Run Locally
ℹ️ npm v10.8.3 | node v22.9.0

Clone the project

```bash
  git clone https://github.com/mzlodi/FlightSearch.git
```

Go to the project's client directory

```bash
  cd flightsearch.client
```

Install dependencies

```bash
  npm install
```

Go to the project's server directory
```bash
  cd ..
  cd FlightSearch.Server
```

Start the app

```bash
  dotnet run
```
