import Posts from './modules.js';

import './server/routes.js';
import './server/cron.js';

// index
Posts._ensureIndex({"status": 1, "isFuture": 1});
Posts._ensureIndex({"status": 1, "isFuture": 1, "postedAt": 1});

// text index for '$text' query
Posts._ensureIndex(
  { title: "text", body: "text" },
  { weights: { title: 4 } }
);

export * from './modules.js';
