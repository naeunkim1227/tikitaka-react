/* eslint-disable */

import axios from "axios";


  export const textsendAction = async(data) => { 
    console.log('textsendAction >>>>>>>>>>>>' ,data )
            const result =  await axios.post(`/TT/talk/topic`, JSON.stringify(data), {headers:{"Content-Type":"application/json", "charset":"UTF-8"}})
            .then((response) => {
            console.log("msg send: ", response);
            return response.data;
            })
            .catch((err) => {
            console.log(err);
            });
        const ans = await result;

        const imageData = {
        chatNo : JSON.parse(auth.chatNo),
        userNo : auth.token,
        name: auth.name,
        type: typeState,
        message: result,
        readCount: 1,
        regTime: time
        } 
        return  axios.post(`/TT/talk/topic`, JSON.stringify(imageData), {headers:{"Content-Type":"application/json", "charset":"UTF-8"}})
                    .then((response) => {
                        console.log("img send: ", response);
                        showMessage(response);
                        return response;
                    })
                    .catch((err) => {
                        console.log(err);
                    })



    
        const res = await axios.post(`/TT/talk/topic`, JSON.stringify(data), {headers:{"Content-Type":"application/json", "charset":"UTF-8"}})
            .then((response) => {
                
                console.log("msg send: ", response);
                return 1;
            })
            .catch((err) => {
                console.log(err);
            })
          

      console.log('res send >>>>>>>' ,res)


     return res;
    }


    export const imgsendAction = async(data,loadImg) => {
        
    
          const formData = new FormData();
          formData.append('file', loadImg);
          console.log(loadImg);
          const result = await axios.post(`/TT/talk/topic/sendimage`, formData, {headers:{"Content-Type":"multipart/form-data", "charset":"UTF-8"}})
                .then((response) => {
                  console.log("img send: ", response.data);
                    setImage(response.data);
                    loadImgReset();
                  return response.data;
                })
                .catch((err) => {
                  console.log(err);
                });
          const ans = await result;
          
          const imageData = {
            chatNo : JSON.parse(auth.chatNo),
            userNo : auth.token,
            name: auth.name,
            type: typeState,
            message: result,
            readCount: 1,
            regTime: time
          } 
          return  axios.post(`/TT/talk/topic`, JSON.stringify(imageData), {headers:{"Content-Type":"application/json", "charset":"UTF-8"}})
                          .then((response) => {
                            console.log("img send: ", response);
                            showMessage(response);
                            return response;
                          })
                          .catch((err) => {
                            console.log(err);
                          })



       }