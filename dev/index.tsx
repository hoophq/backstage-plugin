import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { hoopPlugin, HoopPage } from '../src/plugin';

createDevApp()
  .registerPlugin(hoopPlugin)
  .addPage({
    element: <HoopPage />,
    title: 'Root Page',
    path: '/hoop'
  })
  .render();
