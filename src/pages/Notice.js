/* eslint-disable */
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppNewsUpdate
} from '../components/_dashboard/app';

import AppNoticeUpdate from  '../components/_dashboard/app/AppNoticeUpdate';
import AppAlertUpdate from  '../components/_dashboard/app/AppAlertUpdate';


// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={5} md={5} lg={5}>
          <AppAlertUpdate />
          </Grid>
          <Grid item xs={5} md={5} lg={5}>
          <AppNoticeUpdate />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
