# Image Processing API

This project is part of Udacity's [Full Stack JavaScript Developer Nanodegree Program](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067). The Image Processing API was built using Node.js and can be used in two ways:

- A simple placeholder API that allows you to place images into your frontend with the size set via URL parameters.
- A library to serve properly scaled versions of your images to the front end to reduce page
  load size.

## Installation

To set up the local development environment, clone this repo to your local machine, navigate to its location in the
terminal and
run the following command:

```
npm run dev
```

## Running the project

### Setting Up The Environment Variables

Before running the application, you need to set up the environment variables by creating a new file named `.env` and
ensure that it contains the following variables:

| Variable   | Description                                                  |
|------------|--------------------------------------------------------------|
| HOST       | The hostname. (e.g. http://localhost)                        |
| PORT       | The port number to be listened to. (default value is `3000`) |

See the [.env.example](./.env.example) file for more details.

### Development mode

To start the development server (default port is `3000`), navigate to the project location in the terminal and run the
following command:

```
npm run dev
```

## Endpoints

### Path

`/api/images`

### Query Parameters

| Param    | Description                    |
|----------|--------------------------------|
| filename | The name of an image.          |
| width    | The width to be converted to.  |
| height   | The height to be converted to. |

### Example

```
http://localhost:3000/api/images?filename=encenadaport.jpg&width=600&height=600
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details