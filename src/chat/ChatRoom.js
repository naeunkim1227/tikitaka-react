/* eslint-disable */ 

import React from 'react';
import './components.css';
import './style.css';

const ChatRoom = () => {

    return (
        <div class="col-12 col-sm-6 col-lg-4">
        <div class="card chat-box card-success" id="mychatbox2">
          <div class="card-header">
            <h4><i class="fas fa-circle text-success mr-2" title="Online" data-toggle="tooltip"></i> Chat with Ryan</h4>
          </div>
          <div class="card-body chat-content">
          </div>
          <div class="card-footer chat-form">
            <form id="chat-form2">
              <input type="text" class="form-control" placeholder="Type a message"/>
              <button class="btn btn-primary">
                <i class="far fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

    );
};

export default ChatRoom;