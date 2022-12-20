import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
  Link,
} from '@backstage/core-components';
import { ConnectionsList } from './ConnectionList';

export const Connections = () => {
  return (
    <Page themeId="tool">
      <Header
        title="Welcome to hoop.dev"
        subtitle="A new way to see your connections"
      >
        <HeaderLabel label="Owner" value="hoop.dev" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Connections">
          <SupportButton>
            <span>
              Please contact us by <Link to="https://hoop.dev">hoop.dev</Link>
            </span>
          </SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <ConnectionsList />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
