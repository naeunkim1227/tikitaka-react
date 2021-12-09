/* eslint-disable */
let account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg'
};

if(sessionStorage.getItem("userno") != null){
  account = {
    displayName: sessionStorage.getItem("name"),
    email: sessionStorage.getItem("email"),
    photoURL: '/static/mock-images/avatars/avatar_default.jpg'
}
}



export default account;
