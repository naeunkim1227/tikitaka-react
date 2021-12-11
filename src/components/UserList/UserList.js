/* eslint-disable */ 

import UserListItem from '../UserList/UserListItem'

// // ----------------------------------------------------------------------

// // const users = [...Array(24)].map((_, index) => ({
// //   id: faker.datatype.uuid(),
// //   avatarUrl: mockImgAvatar(index + 1),
// //   name: faker.name.findName(),
// //   company: faker.company.companyName(),
// //   status: sample(['online', 'offline']),
// // }));

// // const users = [...Array(24)].map((_, index) => ({
// //   id: "12345",
// //   avatarUrl: mockImgAvatar(index + 1),
// //   name: "hihi",
// //   company: "cs or cp",
// //   status: sample(['online', 'offline']),
// // }));


// // export default users;

export default function USERLIST ({ users }) {
  return (
    <Fragment>
    {users.map(user => <UserListItem
      key={user.no}  
      role={user.role} 
      name={user.name}
      status={user.status}
      profile={user.profile}
      />)}
    </Fragment>
  );
}