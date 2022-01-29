# shippo-test

Testing Shippo tracking API.

Running <kbd>node index</kbd> will return a tab-separated list of results (which is easy enough to copy-paste into a Google Sheet for further processing/filtering).

## USAGE
1. Set a `SHIPPO_TOKEN` env variable with your API token (either in your Terminal, .bashprofile, or an .env file).
1. Modify the "ups.js" and "usps.js" files with the tracking numbers you want to check.
1. <kbd>node index</kbd>

## SAMPLE OUTPUT

TRACKING_NUMBER|LABEL|CARRIER|ADDRESS|STATUS|DATE
---------------|-----|-------|-------|------|----
1Z12345|Employee 1|ups (Ground)|Tampa, FL 33626 (US)|Delivered|2022-01-11
1ZR5678||ups (Standard℠)|Markham, ON L6E1A (CA)|Departed from Facility|2022-01-26
CJ23456|Employee 5|usps (Priority Mail International)|Vancouver,   (CA)|Your shipment has been delivered.|2022-01-28
