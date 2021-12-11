/* eslint-disable */ 
import React from 'react';

export default function ({ no, role, name, status, profile}) {
    return (
        
                        // <Table data={user} />
                        //  map.data => <TableItem key={data.no} 
                        <TableRow
                          hover
                          key={no}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >

                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* 사진 */}
                              <Avatar alt={name} src={profile} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{company}</TableCell>

                          <TableCell align="left">
                            <Label
                              // variant="ghost"
                              color={(status === 'offline' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>

                        </TableRow>
                      
    )
};