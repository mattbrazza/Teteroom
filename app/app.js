// var socket = io();
const socket = io.connect('http://127.0.0.1:2000');

const vApp = new Vue({ el: '#v-app',
data: {
  currRoom: null,
  currUser: null,

  rooms: [
    { id: 0, name: 'General', isActive: true, isDelable: false }
  ],
  users: [
    { id: 0, name: 'DaSys', hide: true }
  ],
  messages: [
    { id: 0, userId: 0, text: 'Welcome to Tete-a-tete', stamp: Date.now() }
  ],

  msgCnt: 0,
  errMsg: '',
  newRmName: '',
  newMsgTxt: '',
},

created: function(){
  /* INITIALIZE DATA */
  this.currRoom = this.rooms[0];
  this.currUser = this.users[0];
  this.msgCnt = 0; // TODO: make persistent ?

  /* BIND SOCKET STUFF TO 'THIS' */
  socket.on('user.joined', function(data){
    this.users.push({id: data.socketId, name: data.name, hide: false});
    this.postSysMsg('User: ' + data.name + ' has joined the room');
  }.bind(this));

  socket.on('user.left', function(socketId){
    // TODO: figure a way to use 'indexOf()'
    let name = '';
    for(var i=0; i<users.length; i++){
      if (this.users[i].id = socketId){
        name = this.users[i].name;
        this.users.splice(i,1);
      }
    }
    this.postSysMsg('User: ' + name + ' has left the room');
  }.bind(this));

  socket.on('msg.recvd', function(data){
    this.messages.push({
      id: msgCnt++,
      userId: data.socketId,
      text: data.text,
      stamp: Date.now(), // TODO: compare to data.stamp for delay times/etc.
    });
  }.bind(this));

},

methods: {
  /* PRIMARY FUNCTIONS
    ------------------ */
  submitMsg: function(){
    this.errMsg = null;
    if (!this.newMsgTxt) {
      this.errMsg = 'Cannot send a blank message';
      return;
    }

    let newMsg = {
      id: this.currUser.id,
      userId: this.currUser.name,
      text: this.newMsgTxt,
      stamp: Date.now(),
    };
    socket.emit('msg.send', newMsg);
    this.newMsgTxt = '';

    return;
  },

  addRoom: function(){},
  delRoom: function(){},
  modRoom: function(){},

  /* HELPER FUNCTIONS
    ----------------- */
  postSysMsg: function(msg){
    let sysMsg = {
      id: this.msgCnt++,
      userId: 0,
      text: msg,
      stamp: Date.now(),
    };

    this.messages.push(sysMsg);
    return;
  },

  /* SOCKET FUNCTIONS
    ----------------- */
},
});

/* CUSTOM VUE FILTERS */
Vue.filter('formatDate', function(stamp){
  if (!stamp) { return; }
  let d = new Date(stamp);
  let date = '';
  let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul',
                'Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
  date = d.getDate() + ' ' + month + ' ' + d.getFullYear();
  date = date + '-' + d.getHours() + ':' + d.getMinutes();
  return date; // d.toLocaleString();
});


