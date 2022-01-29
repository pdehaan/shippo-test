import dotenv from "dotenv";
import Shippo from "shippo";
// import { getTracking } from "ts-tracking-number";

dotenv.config();

const { SHIPPO_TOKEN } = process.env;
const shippo = Shippo(SHIPPO_TOKEN);

const DEFAULT_NO_DATA = "n/a";
const DELIMITER = "\t";

// See https://goshippo.com/docs/reference#carriers for shippo carrier tokens.
// TODO?: Possibly use https://www.npmjs.com/package/ts-tracking-number to infer
// carrier from a tracking number (vs n-different files)?
const carriers = {
  ups: await import("./ups.js"),
  usps: await import("./usps.js"),
};

const headings = ["TRACKING_NUMBER", "LABEL", "CARRIER", "ADDRESS", "STATUS", "DATE"];
console.log(headings.join(DELIMITER));
for (const [carrier = "", data={}] of Object.entries(carriers)) {
  const numbers = data.default || [];
  for (let record of numbers) {
    if (!Array.isArray(record)) {
      record = [record];
    }
    const [number = "", label = ""] = record;
    // const ddd = getTracking(number);
    // console.log({ddd});
    // console.log(ddd.courier.code, carrier);
    const res = await shippo.track.get_status(carrier, number);
    const { status_date, status_details = DEFAULT_NO_DATA } = res.tracking_status || {};
    let localeDate = new Date(status_date);
    if (!isNaN(localeDate)) {
      localeDate = localeDate.toLocaleDateString();
    } else {
      localeDate = DEFAULT_NO_DATA;
    }
    const data = [
      res.tracking_number,
      label,
      `${res.carrier} (${res.servicelevel?.name || DEFAULT_NO_DATA})`,
      address_tostring(res.address_to),
      status_details,
      localeDate,
    ];
    console.log(data.join(DELIMITER));
  }
}

function address_tostring(address = {}) {
  if (!address) {
    return DEFAULT_NO_DATA;
  }
  return `${address.city}, ${address.state} ${address.zip} (${address.country})`;
}
