import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { API_KEYS } from '../tests/swag/test_data/test-data';

export let options: Options = {
  discardResponseBodies: true,
  scenarios: {
    users: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      rate: 100,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 100,
    },
  },
};

export default () => {
  const response = http.get('https://reqres.in/api/users?page=1', {
    headers: {
      'x-api-key': API_KEYS.REQRES,
    },
  });

  check(response, {
    'status is 200': () => response.status === 200,
  });
};

export function handleSummary(data: any) {
  const httpReqs = data.metrics?.http_reqs?.values;
  const httpReqDuration = data.metrics?.http_req_duration?.values;
  const httpReqFailed = data.metrics?.http_req_failed?.values;

  const totalRequests = httpReqs?.count ?? 0;
  const throughput = httpReqs?.rate ?? 0;
  const p50 = httpReqDuration?.med ?? null;
  const p95 = httpReqDuration?.['p(95)'] ?? null;
  const p99 = httpReqDuration?.max ?? null;
  const failureRate = httpReqFailed?.rate ?? 0;

  const mdLines = [] as string[];
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
