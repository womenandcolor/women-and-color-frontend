# Contributing Guidelines

## Heroku Review Apps

[**Review Apps**][review-apps] are a Heroku feature that run the code from GitHub
pull requests in a complete, disposable app.

We are using review apps, and have enabled _automatic review app creation_ for each pull request. This automation only works when a pull request is made from a feature branch in the main upstream repo, and will not work from a personal fork. (This is a security feature.)

So if you have push access on the upstream repo, this is a great reason to work from there. When you create a pull request, Heroku will drop a link within the comments, linking to your newly deployed preview app. The app will be updated with each new commit, and will be destroyed when the pull request is merged or closed.

For an example of the automatic review app process in progress, see [this issue][review-app-example].

<!-- Links -->
   [review-apps]: https://devcenter.heroku.com/articles/github-integration-review-apps
   [review-app-example]: https://github.com/CivicTechTO/women-and-color-frontend/pull/3
