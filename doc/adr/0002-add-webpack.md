# 2. Add Webpack

Date: 2019-11-09

## Status

Accepted

## Context

Firefox addons run in browser and so we need this in order to be able to factor the software.

## Decision

Make a bundle for our application.

## Consequences

* It's nicer to be able to write tests in node against the application rather than dealing with browser js
* It forces a natural seam between the browser apis and our application.

