# Women&Color: Frontend Web UI

[**Women&Color**](site-live) is a website for finding
talented women and people of color to speak at your tech-related event
in Toronto.

(The website is currently build on Wordpress.)

## Table of Contents

* [Get Involved](#get-involved)
* [Architecture](#architecture)
* [Installation](#installation)
* [Deployment](#deployment)
* [License & Copyright](#license--copyright)

## Architecture

This code repository is the visual _frontend_ part of an upcoming
relaunch of the website. It makes up the user interface that website
visitors interact with.

The other [`CivicTechTO/women-and-color-backend`][code-backend] code
repository powers the backend API, storing and retreiving data from the
database that underpins the website.

## Local Development

#### Dependencies

* Node.JS 6.x (Recommended install is [via `nvm`][node-install])

#### Setting up and running the app

```
npm install --global yarn
```

Now (and whenever you pull new package changes), do this:

```
yarn install
yarn start
```

That's it! Your local development site is now available at:
[http://localhost:8081/](http://localhost:8081/)

## Deployment

[**Heroku**][heroku] is a platform for easily deploying applications.

A [**buildpack**][buildpack] provides framework and runtime support for apps running on
platforms like Heroku.

* We auto-deploy `master` branch to our staging website on Heroku:
  [`womenandcolor-frontend.herokuapp.com`][site-staging]. (So merging a
  pull request also auto-deploys!)
* We use the
  [`create-react-app-buildpack`](https://github.com/mars/create-react-app-buildpack)
  to handle many deployment settings.

## License & Copyright

Copyright (C) 2017 Women&Color
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.0.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

See the [`LICENSE`](/LICENSE) file for details.

<!-- Links -->
   [site-live]: http://womenandcolor.com/
   [site-staging]: https://womenandcolor-frontend.herokuapp.com/
   [code-backend]: https://github.com/CivicTechTO/women-and-color-backend
   [heroku]: https://github.com/CivicTechTO/women-and-color-backend
   [buildpack]: https://docs.cloudfoundry.org/buildpacks/
   [license]: LICENSE
   [node-install]: https://nodejs.org/en/download/package-manager/#nvm
