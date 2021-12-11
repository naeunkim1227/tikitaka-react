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
          <AppNoticeUpdate />
      </Container>
    </Page>
  );
}
