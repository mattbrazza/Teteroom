// var socket = io();
var socket = io.connect('http://127.0.0.1:2000');

var vApp = new Vue({ el: "#v-app",
data: {
  currId: 1, // starting at 1 b/c 0 is 'General'
  currRm: '',
  currUser: '',
  rooms: [
    { id: 0, title: 'General', isActive: true },
  ],
  users: [
    { id: 0, name: 'Anon.', isYou: true },
  ],
  errMsg: '',
  newRmName: '',
  newMsgTxt: '',
  messages: [],
},

created: function(){ // when Vue inits
  /* Add ijoined user to list, announce */
  socket.on('user.joined', function(socketId){
    this.users.push({id: 3, name: socketId, isYou: false});
  }.bind(this));

  /* Remove user from list, announce */
  socket.on('user.left', function(socketId){
    let index = this.users.indexOf(socketId);
    if (index >= 0) {
      this.users.splice(index,1);
    }
  }.bind(this));

  /* Add new message to chat window */
  socket.on('chat.msg.recv', function(data){
    this.messages.push(data.text);
  }.bind(this));
},

methods: {
  /* Create a new room */
  addRoom: function(){
    this.errMsg = null;
    if (!this.newRmName) {
      this.errMsg = 'Room must have a name';
      return;
    }

    let newRm = {
      id: this.currId++,
      title: this.newRmName,
      isActive: false
    };
    this.rooms.push(newRm);
    this.newRmName = '';

    return;
  },

  /* Delete a room */
  delRoom: function(index){
    this.errMsg = null;
    let rm = this.rooms[index];
    if (rm.id === this.currRm.id) {
      this.errMsg = 'Cannot delete current room';
      return;
    }

    this.rooms.splice(index, 1);

    return;
  },

  /* Modify which is the current room */
  modRoom: function(index){
    this.errMsg = null;
    let rm = this.rooms[index];
    if (rm.id === this.currRm.id) {
      this.errMsg = this.currRm.title + ' is already the current room';
      return;
    }

    this.currRm.isActive = false;
    this.currRm = rm;
    this.currRm.isActive = true;

    return;
  },

  submitMsg: function(){
    this.errMsg = null;
    if (!this.newMsgTxt) {
      this.errMsg = 'Cannot send a blank message';
      return;
    }

    let newMsg = {
      user: this.currUser,
      text: this.newMsgTxt,
    };
    socket.emit('chat.msg.sent', newMsg);
    this.newMsgTxt = '';

    return;
  },

  /* Use to initialize items when Vue loads */
  initializeVue: function(){
    this.currId = 1;
    this.currRm = this.rooms[0];
    this.currUser = this.users[0];
  },

}
});
vApp.initializeVue();

socket.on('msg', function(data){
  if (data.msg) {
    let ul = document.getElementById('list');

    var node = document.createElement('LI');
    node.classList.add('list-group-item');
    let txt = data.user.username + ': ' + data.msg;
    var textNode = document.createTextNode(txt);
    node.appendChild(textNode);

    ul.appendChild(node);
  } else {
    console.error('NO DATA.MSG');
  }
});

var submitMsg = function(){
  vApp.errMsg = null;
  var msgTxt = document.getElementById('msgTxt');
  if (!msgTxt.value) {
    vApp.errMsg = 'Cannot submit a blank message'; 
    return;
  }

  let username = 'Anony'; // TODO: create users...
  let data = {
    msg: msgTxt.value,
    user: {
      username: username || 'Anon.',
      profPic: 'http://lorempixel.com/100/100'
    },
    time: Date.now()
  };

//  console.log('Data sending: ', data);
  socket.emit('newMsg', data);

  msgTxt.value = '';
  return;
};

