import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const hoopPlugin = createPlugin({
  id: 'hoop',
  routes: {
    root: rootRouteRef,
  },
});

export const HoopPage = hoopPlugin.provide(
  createRoutableExtension({
    name: 'HoopPage',
    component: () =>
      import('./components/Connections').then(m => m.Connections),
    mountPoint: rootRouteRef,
  }),
);
