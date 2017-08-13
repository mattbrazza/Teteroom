var app = new Vue({
el: "#v-app",

data: {
  test: 'test message',
  current_chatroom: 'room-0',
  rooms: ['Geny','Home','EastVil']
},

methods: {
  changeText: function(){
    this.test = 'new ' + this.test;
    return;
  }
}
});

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

