import { createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'hoop',
});

export const entityContentRouteRef = createRouteRef({
  id: 'lighthouse:entity-content',
});
