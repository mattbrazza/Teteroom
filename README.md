# Teteroom
_Project to learn from, a small Chatroom in NodeJS_
--- --- --- --- --- --- --- --- --- --- --- ---
#### Frameworks/Libraries/etc. used:
+ Socket.io (help understand JavaScript's use of websockets)
+ NodeJS (with ExpressJS, Body-Parser)
+ Vue.js (with Bootstrap)

#### Goals and Lessons Learned:
+ Create a functioning web-app that functions as a Chatroom
+ Incorporate an API of some sort (MTA.info, Google Translate ?)
+ ?? Incorporate encryption for messages

#### Motivations and Explanation for Current State:
+ Teteroom comes from a change on Chatroom with Tete coming from tete-a-tete

#### Day-2 Ideas/Needs:
+ Try to implement a version without Socket.io (advance learning)
+ Create a version that will allow for persistency of rooms/chats
+ Allow for private messaging between users

--- --- --- --- --- --- --- --- --- --- --- ---
#### Stream of Consciousness:
_(General thoughts written down as I was coding)_  
Naming a project is half the battle.  
I was hoping to do this from scratch, but every time I tried to dig into chatroom and websocket examples, I was quickly redirected to using the Socket.io library. I figured I would cave in and use it to get a functioning prototype out and then try to read through the Socket.io code and see if I could implement a much lesser version in Day 2.  
I know have a extremely basic chatroom setup. I can open two browsers, point them to localhost, submit messages, and have those messages echo back to both browsers and added to the list of messages. For this to happen I need two lines, one socket.emit and another socket.broadcast.emit; I need to see if there is a proper way to do this with one call to emit. I also want to expand to add a concept of a user (possibly prompting for a user-handle when first hitting the page ?) and add timestamps. Also would like some simple scrubbing.  
Spending a lot of time on Bootstrap and site layout, but I am using it as a means to functionality; I know that sounds extremely backwards, but in this very specific case, it appears to be working for me - at least for now. It is also helping bring to light some bugs I need to fix, for example: deleting rooms is a mess, displaying users that are on the connection, how to properly use Vue's data{}.  
I started to refactor to clean up some spaghetti code after I started to understand VueJS better, but I discovered a bug where the list of current users would not update correctly when people joined/left the chatroom. As I started to fix this, I got lost in the code and found myself not sure about basic implementations anymore. I am quite lost with how I want to implement everything and may need to get back to the drawing board...  



