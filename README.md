# Running Tests

**Smoke tests (quick validation):**

```bash
npm run test:playwright:smoke
npm run test:playwright:smoke:h  # With browser visible
npm run test:playwright:smoke:d  # Debug mode
```

**Functional tests:**

```bash
npm run test:playwright
npm run test:playwright:h
npm run test:playwright:d
```

### Playwright API Tests (ReqRes)

```bash
npm run test:playwright:reqres
```

### k6 Performance Tests

```bash
npm run test:k6
```

Output files: `summary.md`

# CI/CD Pipeline

The GitHub Actions workflow (`playwright.yml`) supports:

- **Automatic execution on push to master** –
- **Manual dispatch with test selection** – Choose between:
  - `functional` – Swag Labs functional tests
  - `smoke` – Swag Labs smoke tests
  - `performance` – k6 performance tests

# Overview

Swag labs tests were split into two major part: smoke & functional.
With Smoke test we want to check the basic, most important feature of the app - in this case we want to check the endpoint state and the ability to login into app (with negative scenario added for locked-out user).

The remaining. required scenarios were placed withing functional tests.
Since app required user's login to access, the test setup was created - when user with valid credentials log into app we store the session data (storageState) and later following test can re-use the same session without the need to login.
This also allows to run certain tests independently
(if scenario allows to do that - note that this app allows user to start checkout process with empty cart !).

Each group of the tests were put into separate folders and wrapped into distinct project - to allow to easily run each of them locally or via Github Actions if needed.

Note also that default testIdAttribute for getByTestId function was updated according to 'data-test' which is present in all elements found on https://www.saucedemo.com/.

For reporting purpose the default, built-in 'html' report with traces is sufficient in this case.

For the sake of simplification - all functional tests runs only on Chrome (in headless mode by default)

As a first stage of testing (or exploratory part) - there is also an e2e test with complete scenario (login, order, checkout and finish the order, then log out) create using Playwright test generator - as a useful guide for further test creation.

For performance tests the k6 was used, based on template https://github.com/grafana/k6-template-typescript - to allow to write all tests with TS.

As for the verification of current results - the access to https://reqres.in/api/users?page=1 endpoint on free plan is limited by requests limit - therefore with more extensive testing the daily request limit can be easily exceeded.

The previous results shows small variation between p50 (median) & p95 & p99 - therefore for further investigation it might be necessary to gather more. daily data, or/and cut down the test duration to avoid daily requests limit.

Previously noticed 0% failure rate - every single request came back with a 200 status code and no network timeouts, which should be rather expected from simple mock API under limited load.

The mentioned endpoint can also be examined in details with Playwright API test.

# Other questions

## How would you integrate Playwright tests into CI/CD?

For the maintenance purpose I would like to keep the possibility to run test on pipeline manually (on demand) - independently from the main pipeline - where tests should be triggered as a gate-check - before any changes made by DEVs will be pushed from lower to higher branch (e.g. before PR from dev to stage or prod will be merged)

## How would you notify the team (Slack/Teams) about failures or regressions?

If no monitoring tools (like e.g.: DataDog) are applied to instantaneously monitor and/or inform about major issues - I would rather keep the QA team as the first were notifications about errors/issues/failing tests should be sent - then the pipeline failures should be investigated and reviewed and if needed - pushed forward to devs - ideally if error is valid I would try to check it with DEVs directly (face-to-face or via video meeting)

## What observability metrics would you include in an end-to-end quality dashboard?

For Playwright UI Tests:
The most important metrics are pass/fail rate per test suite over time (the latest run plus the overall trend) and flakiness rate - how often a test alternates between passing and failing without a code change.

For Playwright API Tests:
The most important metrics are - assertion failure breakdown by endpoint so you can immediately see which specific route fails
and did the response schema match what was expected

For k6 Performance Tests
Similarly to previous ones - I would try to show the trend also, besides of latests values. But also includes some sort of 'alerts' if the received values differs significantly from expected.

## How would you decide:

### What to automate

This decision should be made based on following criteria: time/resources needed to create & maintain the tests and priority/severity of issues which could be raised if given feature or functionality fails. In general - we don't want to promise we can automate everything and avoid errors to happen but rather start with the test for most important parts of the app.

This is true in terms of automation of regression tests.

It's useful also to automate scenarios during the exploratory tests and create ad-hoc test scripts while testing new features or functionalities.

### What not to automate

As a follow-up to above question - when time/resources needed to automate certain scenario exceed the potential gains - those tests could be skipped or removed from automation backlog. Such decision require the expertise in app logic and business requirements.

### What belongs to performance vs functional testing

In general - with functional tests we want to check only if the app works correctly in given scenario - by default we assume the simplest, happy_path conditions. If we would like to start checking how the app would work in basically the same scenario but with different conditions (like more complex configuration, larger files to process, more concurrent processes) - such tests should be rather put into 'performance' part of overall testing.
