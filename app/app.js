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
},

created: function(){
  // when Vue inits
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
      text: this.newMsgTxt,
      user: this.currUser
    };
    // TODO: Send message via socket
    this.newMsgTxt = '';

    return;    
  },

  /* Use to initialize items when Vue loads */
  initializeVue: function(){
    this.currId = 1;
    this.currRm = this.rooms[0];
    this.currUser = this.users[0];
  },

  addUser: function(usr){ this.users.push(usr); },
}
});
vApp.initializeVue();


var socket = io.connect('http://127.0.0.1:2000');
var idd = 33;

socket.on('new_user', function(){
  vApp.addUser({id: idd, name: 'A'+idd, isYou: false});
  idd++;
});

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

