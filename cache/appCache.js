import { NodeCache } from "@cacheable/node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export default cache;
