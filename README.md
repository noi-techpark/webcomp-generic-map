# Generic Map to show Open Data Hub Mobility Stations

This project is a webcomponent to display data from the [Open Data
Hub](https://opendatahub.bz.it).

The Open Data Hub Team wants to generate reusable and independent visualization
components to display data from the Open Data Hub easily. Using these
webcomponents, a developer can easily integrate the functionality of the single
components into any website. 

## Choices

To create more structured and mantainable webcomponents we used
[Polymer](https://www.polymer-project.org/), more specifically the
[lit-element](https://lit-element.polymer-project.org/) implementation.

Using [lerna](https://github.com/lerna/lerna) we can manage all the components
from a single repository, while still being able to publish single packages

CSS styles are transpiled using [Sass](https://sass-lang.com/).

We are using [Webpack](https://webpack.js.org/) to create the bundles.

## Getting Started

### Prerequisites

To work on the project, you'll need global installations of:

- Node (v11.9.0)
- Yarn (v1.15.2)
- Lerna (v3.6)

Later versions of the same tools should also work.

Or, alternatively, `docker-compose` to setup your docker environment, such that
you do not need to install these dependencies on your local machine.

### Development

Build and start your docker environment with

```shell
docker-compose build
docker-compose up
```

Then, login to your running docker instance with

```shell
docker-compose run app bash
```

Within the docker container, install yarn project's dependencies

```shell
yarn
```

To install all the dependencies of all the packages through Lerna, run:

```shell
lerna bootstrap
```

Start the Lerna pipeline with:

```shell
yarn wc
```

This will watch the files in every package configured in the right way to create a Webpack bundle.

### Production

Build all widgets using Webpack's `production` config:

```shell
yarn bc
```

The destination for the resulting code will be the `dist` folder, located at the root of the project.

## Development results

To see the source of components in action while working on, go to the `work` folder. 

To start a development web server, run the following snippet. However, `docker-compose up` already starts this command for you.

```shell
sh serve.sh
```

This will serve the "work in progress" website at [http://0.0.0.0:8888/](http://0.0.0.0:8888/).

## Deployment

To deploy the webcomponents, take the production bundle created with the `yarn bc` command and use it as a normal javascript.

We suggest deploying them on a CDN, rather than hardcoding them inside a project, so that future fixes and enhancements of the webcomponents are more easily distributed.

Currenlty, we use [jsDelivr's Github integration](https://www.jsdelivr.com/?docs=gh) for that:

```javascript
<script src="https://cdn.jsdelivr.net/gh/noi-techpark/webcomp-generic-map@master/dist/map_widget.min.js"></script>
```

## License

See LICENSE.md