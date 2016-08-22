# Dashboard

[![CircleCI](https://circleci.com/gh/AusDTO/dto-dashboard/tree/master.svg?style=svg)](https://circleci.com/gh/AusDTO/dto-dashboard/tree/master)

Version 3.0 of the Performance Dashboard.

Currently WIP.


## Requirements

 - ruby-2.3.1
 - Postgres 9.4


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

### Run the App

Start the app on the default port (3000)
```
rails server
```

```
bin/start.sh
```

The site can now be viewed at `http://localhost:3000/`

Administration is available at `http://localhost:3000/admin`


## Run develop mode on Front end

Open a new Terminal window and run
```
npm run start
```

## Tests

```
rspec
```

You can also use guard to run specs automatically on save with

```
bundle exec guard
```

For advice for writing specs check [betterspecs](http://betterspecs.org/).


## High-level Development Process

## TL;DR​

1. Branch

2. PR

3. Review

4. Merge



### Branch Often.

 All work should be on a branch. Discretion is accepted for small changes.

 Rebase long-living branches often (on master).


 ### Branch Naming Conventions

 For extra points name the branch to annotate the type of work and ticket number being resolved.
 ​
 Examples;
 ​

 - `bugfix/477-broken-redirects-for-guests`

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

 tweak   -> small changes, documentation, refactors

 ```

 ## PR

 - Merges should be managed using a Pull Request

 - Before finishing a PR, rebase on master

 - Create the PR early and label as `WIP`


 ### Review


 - At least one other person should review the PR before merge.

 - A review should ideally involve actually checking out and running the code, and sanity checking it before merge.

 - Close any related issues​ in Jira

### Coding Standard/s

[https://github.com/bbatsov/ruby-style-guide](Ruby Style Guide)
