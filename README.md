# webcomp-generic-map

This project is a webcomponent to display data from the [Open Data
Hub](https://opendatahub.bz.it).

The Open Data Hub Team wants to generate reusable and independent visualization
components to display data from the Open Data Hub easily. Using these
webcomponents, a developer can easily integrate the functionality of the single
components into any website. 

## Table of contents

- [Usage](#usage)
- [Gettings started](#getting-started)
- [Deployment](#deployment)
- [Docker environment](#docker-environment)
- [Information](#information)

## Usage

Include the Javascript file `dist/map_widget.min.js` in your HTML and define the web component like this:

```html
<map-widget domain="mobility"></map-widget>
```

### Attributes

#### domain

Type: select
Options: "mobility", "tourism"
Default: "mobility"

#### station-types

Type: multiselect
Options: "CreativeIndustry","EChargingStation","EChargingPlug"
Default: []

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 12 / Yarn 1

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
git clone https://github.com/noi-techpark/webcomp-generic-map.git
```

Change directory:

```bash
cd webcomp-generic-map/
```

### Dependencies

Download all dependencies:

```bash
yarn install
```

### Build

Build and start the project:

```bash
yarn run watch
```

The application will be served and can be accessed at [http://localhost:8080](http://localhost:8080).

## Deployment

To create the distributable files, execute the following command:

```bash
yarn run build
```

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Dependenices

First, install all dependencies:

```bash
docker-compose run --rm app /bin/bash -c "yarn install"
```

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose run --rm app /bin/bash -c "..."
```

Some examples are:

```bash
docker-compose run --rm app /bin/bash -c "yarn run build"
```

## Information

### Support

For support, please contact [info@opendatahub.bz.it](mailto:info@opendatahub.bz.it).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `development` branch.

- Make sure the tests are passing.

- Create a pull request against the `development` branch.

A more detailed description can be found here: [https://github.com/noi-techpark/documentation/blob/master/contributors.md](https://github.com/noi-techpark/documentation/blob/master/contributors.md).

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/java-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.
