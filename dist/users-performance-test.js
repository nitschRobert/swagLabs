/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ // The require scope
  /******/ var __webpack_require__ = {};
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter = module && module.__esModule ? /******/ () => module['default'] : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // ESM COMPAT FLAG
  __webpack_require__.r(__webpack_exports__);

  // EXPORTS
  __webpack_require__.d(__webpack_exports__, {
    default: () => /* binding */ users_performance_test,
    handleSummary: () => /* binding */ handleSummary,
    options: () => /* binding */ options,
  }); // external "k6"

  const external_k6_namespaceObject = require('k6'); // external "k6/http"
  const http_namespaceObject = require('k6/http');
  var http_default = /*#__PURE__*/ __webpack_require__.n(http_namespaceObject); // ./tests/swag/test_data/test-data.ts
  const TEST_USERS = {
    STANDARD: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    LOCKED_OUT: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
  };
  const ERROR_MESSAGES = {
    LOCKED_OUT_USER: 'Epic sadface: Sorry, this user has been locked out.',
  };
  const PAGES = {
    LOGIN: '/',
    INVENTORY: '/inventory.html',
    CART: '/cart.html',
    CHECKOUT_STEP_ONE: '/checkout-step-one.html',
  };
  const PRODUCTS = {
    BACKPACK: {
      name: 'Sauce Labs Backpack',
    },
  };
  const CHECKOUT_DATA = {
    VALID: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    },
  };
  const API_ENDPOINTS = {
    HOMEPAGE: 'https://www.saucedemo.com/',
    EXPECTED_STATUS: 200,
  };
  const API_KEYS = {
    REQRES: 'reqres_b26cf07643da451597d8836c8b2add8c',
  }; // ./src/users-performance-test.ts
  let options = {
    discardResponseBodies: true,
    scenarios: {
      users: {
        executor: 'constant-arrival-rate',
        duration: '2m',
        rate: 100,
        timeUnit: '1s',
        preAllocatedVUs: 100,
        maxVUs: 100,
      },
    },
  };
  /* harmony default export */ const users_performance_test = () => {
    const response = http_default().get('https://reqres.in/api/users?page=1', {
      headers: {
        'x-api-key': API_KEYS.REQRES,
      },
    });
    (0, external_k6_namespaceObject.check)(response, {
      'status is 200': () => response.status === 200,
    });
  };
  function handleSummary(data) {
    var _data$metrics, _data$metrics2, _data$metrics3;
    const httpReqs =
      (_data$metrics = data.metrics) === null ||
      _data$metrics === void 0 ||
      (_data$metrics = _data$metrics.http_reqs) === null ||
      _data$metrics === void 0
        ? void 0
        : _data$metrics.values;
    const httpReqDuration =
      (_data$metrics2 = data.metrics) === null ||
      _data$metrics2 === void 0 ||
      (_data$metrics2 = _data$metrics2.http_req_duration) === null ||
      _data$metrics2 === void 0
        ? void 0
        : _data$metrics2.values;
    const httpReqFailed =
      (_data$metrics3 = data.metrics) === null ||
      _data$metrics3 === void 0 ||
      (_data$metrics3 = _data$metrics3.http_req_failed) === null ||
      _data$metrics3 === void 0
        ? void 0
        : _data$metrics3.values;
    const totalRequests = (httpReqs === null || httpReqs === void 0 ? void 0 : httpReqs.count) ?? 0;
    const throughput = (httpReqs === null || httpReqs === void 0 ? void 0 : httpReqs.rate) ?? 0;
    const p50 = (httpReqDuration === null || httpReqDuration === void 0 ? void 0 : httpReqDuration.med) ?? null;
    const p95 = (httpReqDuration === null || httpReqDuration === void 0 ? void 0 : httpReqDuration['p(95)']) ?? null;
    const p99 = (httpReqDuration === null || httpReqDuration === void 0 ? void 0 : httpReqDuration.max) ?? null;
    const failureRate = (httpReqFailed === null || httpReqFailed === void 0 ? void 0 : httpReqFailed.rate) ?? 0;
    const mdLines = [];
    mdLines.push('# k6 Test Summary');
    mdLines.push('');
    mdLines.push('## Overview');
    mdLines.push('');
    mdLines.push(`- Total Requests: **${totalRequests}**`);
    mdLines.push(`- Throughput: **${typeof throughput === 'number' ? throughput.toFixed(2) : throughput}** req/s`);
    mdLines.push('');
    mdLines.push('## Response Time (ms)');
    mdLines.push('');
    mdLines.push(`- P50: **${p50 !== null ? p50.toFixed(2) : 'N/A'}**`);
    mdLines.push(`- P95: **${p95 !== null ? p95.toFixed(2) : 'N/A'}**`);
    mdLines.push(`- P99: **${p99 !== null ? p99.toFixed(2) : 'N/A'}**`);
    mdLines.push('');
    mdLines.push('## Errors');
    mdLines.push('');
    mdLines.push(`- Failure Rate: **${(failureRate * 100).toFixed(2)}%**`);
    mdLines.push('');
    const summaryMd = mdLines.join('\n');
    return {
      stdout: `Captured Metrics:`,
      'summary.md': summaryMd,
    };
  }
  var __webpack_export_target__ = exports;
  for (var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
  if (__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, '__esModule', { value: true });
  /******/
})();
//# sourceMappingURL=users-performance-test.js.map
