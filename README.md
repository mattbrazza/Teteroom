# Teteroom
_Project to learn from, a small Chatroom in NodeJS_
--- --- --- --- --- --- --- --- --- --- --- ---
#### Frameworks/Libraries/etc. used:
+ NodeJS (with ExpressJS, Body-Parser)
+ Socket.io (help understand JavaScript's use of websockets)

#### Goals and Lessons Learned:
+ Create a functioning web-app that functions as a Chatroom
+ Incorporate an API of some sort (MTA.info, Google Translate ?)

#### Motivations and Explanation for Current State:
+ Teteroom comes from a change on Chatroom with Tete coming from tete-a-tete

#### Day-2 Ideas/Needs:
+ Try to implement a version without Socket.io (advance learning)

--- --- --- --- --- --- --- --- --- --- --- ---
#### Stream of Consciousness:
_(General thoughts written down as I was coding)_  
Naming a project is half the battle.  
I was hoping to do this from scratch, but every time I tried to dig into chatroom and websocket examples, I was quickly redirected to using the Socket.io library. I figured I would cave in and use it to get a functioning prototype out and then try to read through the Socket.io code and see if I could implement a much lesser version in Day 2.  
I know have a extremely basic chatroom setup. I can open two browsers, point them to localhost, submit messages, and have those messages echo back to both browsers and added to the list of messages. For this to happen I need two lines, one socket.emit and another socket.broadcast.emit; I need to see if there is a proper way to do this with one call to emit. I also want to expand to add a concept of a user (possibly prompting for a user-handle when first hitting the page ?) and add timestamps. Also would like some simple scrubbing.  

