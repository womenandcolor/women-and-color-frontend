# Women and Color: Frontend Web UI

[**Women and Color**][site-live] is an online community of talented women and people of color available for speaking opportunities at tech-related events.

## Table of Contents

* [Get Involved](#get-involved)
* [Architecture](#architecture)
* [Local Development](#local-development)
* [Deployment](#deployment)
* [License & Copyright](#license--copyright)

## Get Involved

1. Review our [Contributor Guidelines][contributing] and [Code of
   Conduct][conduct]
2. Jump into our Slack chat channel, `#womenandcolor`
    * Anyone can [request an invite][slack-invite] to the **CivicTech
      Toronto** slack team.
    * Ping one of our project members (@heymosef, @eric-ba, @emarchak) and
      say hey!
3. Check out our [Roadmap][roadmap] and [Task Tracker][task-tracker] to
   see what we're working on.
4. Join us at a [weekly CivicTech Toronto hacknight][meetup].
    * Join the meetup and RSVP to see the location.
    * We're there most every week, but you might want to jump into chat
      first, and ask us to make sure!

## Architecture

(The [live website][site-live] is currently built on Wordpress.)

This code repository is the visual _frontend_ part of an upcoming
relaunch of the website. It makes up the user interface that website
visitors interact with.

The other [`CivicTechTO/women-and-color-backend`][code-backend] code
repository powers the backend API, storing and retreiving data from the
database that underpins the website.

### Technology Used

* ReactJS
* Heroku

## Local Development

#### Dependencies

* Node.JS 8.x (Recommended install is [via `nvm`][node-install])

#### Setting up and running the app

```
npm install --global yarn
```

Now (and whenever you pull new package changes), do this:

```
yarn install
yarn start
```

That's it! Your local development site is now available at: http://localhost:8080/

#### Integrating with the backend code
In order to use the API functionality, the backend code needs to be set up locally as well. The set up steps are:
- Clone the repo using the command `git clone git@github.com:CivicTechTO/women-and-color-backend.git`
- Install Docker and docker-compose
- Run `docker-compose up`. Sometimes the web app comes up before postgres configuration has completed which can cause a failure. If this happens, run `docker-compose up` again.

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

Please see [CONTRIBUTING.md][contributing] for important details, including our use of:

* **Heroku Review Apps**

## License & Copyright

Copyright (C) 2017 Women and Color
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.0.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

See the [`LICENSE`](/LICENSE) file for details.

<!-- Links -->
   [site-live]: http://womenandcolor.com/
   [site-staging]: https://womenandcolor-frontend.herokuapp.com/
   [contributing]: CONTRIBUTING.md
   [conduct]: CONDUCT.md
   [code-backend]: https://github.com/CivicTechTO/women-and-color-backend
   [heroku]: https://github.com/CivicTechTO/women-and-color-backend
   [buildpack]: https://docs.cloudfoundry.org/buildpacks/
   [license]: LICENSE
   [node-install]: https://nodejs.org/en/download/package-manager/#nvm
   [slack-invite]: https://civictechto-slack-invite.herokuapp.com
   [meetup]: https://www.meetup.com/Civic-Tech-Toronto/
   [task-tracker]: https://trello.com/b/DwTxOhMB
   [roadmap]: https://trello.com/b/OB0S6wZq
