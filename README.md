# Dashboard

[![CircleCI](https://circleci.com/gh/AusDTO/dto-dashboard/tree/master.svg?style=svg)](https://circleci.com/gh/AusDTO/dto-dashboard/tree/master)

[![Code Climate](https://codeclimate.com/github/AusDTO/dto-dashboard/badges/gpa.svg)](https://codeclimate.com/github/AusDTO/dto-dashboard)

[![Issue Count](https://codeclimate.com/github/AusDTO/dto-dashboard/badges/issue_count.svg)](https://codeclimate.com/github/AusDTO/dto-dashboard)

[![Test Coverage](https://codeclimate.com/github/AusDTO/dto-dashboard/badges/coverage.svg)](https://codeclimate.com/github/AusDTO/dto-dashboard/coverage)

Version 3.0 of the Performance Dashboard.

Currently WIP.


## Requirements

 - ruby-2.3.1
 - Postgres 9.4
 - Node 6.3.0


## Getting Started

### Database

The default database config assumes you have installed Postgres via Homebrew.
You should need no further config.

Otherwise, create a `.env` file in the Rails directory and populate with the relevant credentials.

```
DB_HOST = '127.0.0.1'
DB_USER_NAME = 'dashboard'
DB_PWD = 'password'
GA_UA_CODE = 'UA-61222473-3'
```

If you don't have Bundler installed
```
gem install bundler
```

Install project gems, run
```
bundle install
```


To create the database and load the schema
```
rake db:setup
```

Migrate the database

```
rake db:migrate
```

Import the dashboard data

```
rake import:data
```

(Optional) If you need to hard reset the database

```
rake db:drop db:create db:migrate import:data
```

Create seed data for accessing the portal

```
rails db:seed
```

You will now be able to login to the portal in the development environment with

```
:email => 'dev@localhost'
:password => 'password'
```

### Run the App

To run on the default port (3000)
```
rails server
```

```
bin/start.sh
```

The site can now be viewed at `http://localhost:3000/`

Administration is available at `http://localhost:3000/admin`

### Mail

To test mail in development, we're using mailcatcher.

Once installed, mail can be viewed at
[http://localhost:1080/](http://localhost:1080/)


### Front end

Install the pipeline. Mostly this is all you will need.
```
npm install
npm run build
```

Build gulp (legacy js)
```
npm run gulp:build
```

Build webpack
```
npm run webpack:dev
```

Develop mode in Webpack?

1. Install these Chrome Extensions:

* Redux Dev Tools:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

More information here: http://zalmoxisus.github.io/redux-devtools-extension/


* React Developer Tools:
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi


2. Set .env variable to enable Dev Server mode
```
DEV_SERVER = true
```

3. Run
```
npm run webpack:dev
```


## Tests

```
bundle exec rspec
```

Run specs without the features (features use a browser and Capybara so can be much slower)

```
bundle exec rspec --exclude-pattern "features/**"
```

https://dashboard.gov.au/api/1/dashboards/1-mygov-dashboard

You can also use guard to run specs automatically on save with

```
bundle exec guard
```

When running under guard, it can be useful to isolate a specific test.
This can be achieved by using `:focus => true` on the desired spec.

```
it 'authenticates', :focus => true do
end
```

Remember to NOT commit this as it will mean the test suite no longer runs all the tests.

For advice for writing specs check [betterspecs](http://betterspecs.org/).


## Api documentation

https://swaggerhub.com/api/dto/dto-dashboard/v1


## High-level Development Process

## TL;DR​

1. Branch

2. PR

3. Review

4. Merge



### Branch Often.

 All work should be on a branch.

 Rebase long-living branches often (on master).


 ### Branch Naming Conventions

 For extra points name the branch to annotate the type of work and ticket number being resolved.
 ​
 Examples;
 ​

 - `fix/477-broken-redirects-for-guests`

 - `feature/502-new-cart-logo`

 - `ops/808-cloud-66-postgres-tweaks`

 ​

 #### Types of branches

 ​
 ```

 feature -> feature

 fix     -> fix

 ops     -> infrastructure / ops related changes

 test    -> adding missing tests

 tweak   -> small changes, refactors

 doc     -> documentation

 ```

 ## PR

 - Merges should be managed using a Pull Request

 - Before finishing a PR, rebase on master

 - Create the PR early and label as `WIP`

### Rebasing

Rebasing before merging a PR ensures a clean commit history, please see [Merging vs Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/) for more details.

If rebasing often, its a good idea to use `rerere`, see:
[Fix conflicts only once with git rerere](https://medium.com/@porteneuve/fix-conflicts-only-once-with-git-rerere-7d116b2cec67)

If your branch is long-lived (longer than a day on an active codebase), its a good idea to periodically rebase so you are actively tracking changes in master. This makes merge conflicts 1) less likely and 2) smaller and easier to deal with.

Merge conflicts need to be carefully resolved as part of the rebase process. A tool like git-tower can be useful.



### Review


 - At least one other person should review the PR before merge.

 - A review should ideally involve actually checking out and running the code, and sanity checking it before merge.

 - Close any related issues​ in Jira

### Coding Standard/s

[Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide)
