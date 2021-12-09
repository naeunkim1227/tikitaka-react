/* eslint-disable */
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppNewsUpdate
} from '../components/_dashboard/app';

import AppAlertUpdate from  '../components/Alert/AppAlertUpdate';
import AppNoticeUpdate from '../components/Alert/AppNoticeUpdate';


// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid item xs={5} md={15} lg={6}>
          <AppNoticeUpdate />
          </Grid>
          <Grid item xs={5} md={15} lg={6}>
          <AppAlertUpdate />y
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
