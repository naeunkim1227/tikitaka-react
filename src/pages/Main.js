/* eslint-disable */
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppNewsUpdate
} from '../components/_dashboard/app';

import AppNoticeUpdate  from  '../components/Alert/AppNoticeUpdate';
import AppNoticeView from '../components/Alert/AppNoticeView';


// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid item xs={5} md={15} lg={6}>
          <AppNoticeUpdate />y
          </Grid>
          <Grid item xs={5} md={15} lg={6}>
          <AppNoticeView />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
