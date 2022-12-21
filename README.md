# hoop

Welcome to the hoop plugin!

## Getting Started

To get started, you will need install the plugin into your app:

```bash
# From your Backstage root directory
yarn add --cwd packages/app @hoophq/backstage-plugin
```

Modify your app routes in `App.tsx` to include the `HoopPage` component exported from the plugin, for example:

```tsx
// In packages/app/src/App.tsx
import { HoopPage } from '@hoop/backstage-hoop';

const routes = (
  <FlatRoutes>
    {/* ...other routes */}
    <Route path="/hoop" element={<HoopPage />} />
```

Then configure the `hoop` URL and the `hoop` token in your [`app-config.yaml`](https://github.com/backstage/backstage/blob/master/app-config.yaml).

```yaml
hoop:
  baseUrl: http://your-service-url
  token: yourTokenHere
```

Add a link to the sidebar:

```ts
// packages/app/src/components/Root/Root.tsx
import ExtensionIcon from '@material-ui/icons/ExtensionIcon';

export const Root = ({ children }: PropsWithChildren<{}>) => (
  <SidebarPage>
    <Sidebar>
      // ...
      <SidebarItem icon={ExtensionIcon} to='hoop' text='Hoop' />
      // ...
    </Sidebar>
  </SidebarPage>
);
```

You can now navigate to the Hoop page from your app's sidebar!
