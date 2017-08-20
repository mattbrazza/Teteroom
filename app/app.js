// var socket = io();
const socket = io.connect('http://127.0.0.1:2000');

const vApp = new Vue({ el: '#v-app',
data: {
  currRoom: null,
  currUser: null,

  rooms: {
    '0': { name: 'General', isActive: true, isDelable: false },
  },
  users: {
    '0': { name: 'System', hide: true },
  },
  messages: [
    { id: 0, userId: 0, text: 'Welcome to Tete-a-tete', stamp: Date.now() }
  ],

  msgCnt: 0,
  errMsg: '',
  newRmName: '',
  newMsgTxt: '',
  isInit: true,
  newUserName: 'a-a',
},

created: function(){
  /* INITIALIZE DATA */
  this.currRoom = this.rooms[0];
  this.msgCnt = 0; // TODO: make persistent ?

  /* BIND SOCKET STUFF TO 'THIS' */
  socket.on('user.joined', function(data){
    let user = {
      id: data.id,
      name: data.name.substring(0,5),
      hide: false
    };
    this.buildUserList(this.users);
    if (this.isInit) {
      this.currUser = user;
      this.postSysMsg('You are in the room as User: ' + user.name);
      this.isInit = false;
    } else {
      this.postSysMsg('User: ' + data.name + ' has joined the room');
    }
  }.bind(this));

  socket.on('user.left', function(socketId){
    // TODO: figure a way to use 'indexOf()'
    let name = '';
    for(var i=0; i<this.users.length; i++){
console.log('S: ', socketId, '-I: ', this.users[i].id);
      if (this.users[i].id = socketId){
        name = this.users[i].name;
        this.users.splice(i,1);
console.log('UL: ', i, '--', name);
      }
    }
    this.postSysMsg('User: ' + name + ' has left the room');
  }.bind(this));

  socket.on('msg.recvd', function(data){
    this.messages.push({
      id: this.msgCnt++,
      userId: data.userName,
      text: data.text,
      stamp: Date.now(), // TODO: compare to data.stamp for delay times/etc.
    });
  }.bind(this));
},

mounted: function(){
//  document.getElementById('user-modal').style.visibility = 'visible';
//  $('.modal').collapse('show');
},

methods: {
submitUserName: function(){
  this.errMsg = null;
  this.currUser.name = this.newUserName;
  this.newUserName = '';
  return;
},


  /* PRIMARY FUNCTIONS
    ------------------ */
  submitMsg: function(){
    this.errMsg = null;
    if (!this.newMsgTxt) {
      this.errMsg = 'Cannot send a blank message';
      return;
    }

    // TODO: match with msg.recvd || log info on server
    let newMsg = {
      id: this.currUser.id,
      userName: this.currUser.name,
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

  buildUserList: function(userArr){
    this.errMsg = null;
    axios.get('/getusers')
      .then(function(response){
        for (var key in response.data) {
          let user = {
//            id: key,
            name: key.substring(0,5),
            hide: false,
          };
          userArr[key] = user;
        }
      })
      .catch(function(err){
        this.errMsg = 'Error while getting Online Users';
        console.error(err);
      });
  },

  /* SOCKET FUNCTIONS
    ----------------- */
},

filters: {
  formatDate: function(stamp){
    if (!stamp) { return; }
    let d = new Date(stamp);
    let date = '';
    let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul',
                'Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
    date = d.getDate() + ' ' + month + ' ' + d.getFullYear();
    date = date + '-' + d.getHours() + ':' + d.getMinutes();
    return date; // d.toLocaleString();
  },
},

}); // end of Vue


