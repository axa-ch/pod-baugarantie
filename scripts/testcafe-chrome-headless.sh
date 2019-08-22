#!/bin/bash
npm run start-ui-test --ci --quiet > /dev/null 2>&1 &
npx wait-on http://localhost:9999 -t 30000

npx testcafe "chrome:headless" ./**/ui.test.js

# Kill (cleanup) - By port
kill -9 $(lsof -t -i:9999 -sTCP:LISTEN)

exit $test_status
