var vApp = new Vue({
el: "#v-app",

data: {
  id_inc: 5,
  rooms: [
    { id: 1, title: 'General', isActive: true },
    { id: 2, title: 'HomeGrp', isActive: false },
  ],
  currRm: '',
},

methods: {
  addRoom: function(){
    let newRmInpt = document.getElementById('newRmInpt');
    if (!newRmInpt.value) { console.error('Room must have a name'); return; }

    let newRm = {
      id: this.id_inc + 1,
      title: newRmInpt.value,
      isActive: false
    };
    this.id_inc += 1;
    this.rooms.push(newRm);
    newRmInpt.value = '';
    return;
  },

  delRoom: function(index){
    let rm = this.rooms[index];
    if (rm.id === this.currRm.id) {
      console.error('Cannot delete current room');
    } else {
      console.log('Deleting room: ', rm);
      this.rooms.splice(index,1);
      console.log('Rooms is now: ', this.rooms);
    }

    return;
  },

  modRoom: function(index){
    let rm = this.rooms[index];
console.log('Current Room: ', this.currRm, ' -Room: ', rm);
    if (rm.id === this.currRm.id) { console.error('Already current room'); return; }

    this.currRm.isActive = false;
    this.currRm = rm;
    this.currRm.isActive = true;
    return;
  },

  initial: function(){ this.currRm = this.rooms[0] },
}
});

vApp.initial();

var socket = io.connect('http://127.0.0.1:2000');

socket.on('msg', function(data){
//  console.log('Data received: ', data);

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
  var msgTxt = document.getElementById('msgTxt');
  if (!msgTxt.value) { console.error('No blank msg'); return; }

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

