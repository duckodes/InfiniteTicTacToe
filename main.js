const boxes = document.querySelectorAll('.box');
const gg = document.querySelector('.gg');
const turn = document.querySelector('.turn');
let turns = 0;
let p1 = [];
let p2 = [];
for (var i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', (e) => {
    const index = Array.prototype.indexOf.call(boxes, e.target);
    if (e.target.textContent === '') {
      if (turns !== 0) {
        turns = 0;
        e.target.textContent = 'x';
        if (p2.length < 3) {
          p2.push(index);
          turn.textContent = 'o';
          if (p2.length > 2) {
            document.querySelectorAll('.box')[p1[0]].style.opacity = '0.3';
            turn.textContent = '';
          }
        } else if (p2.length === 3) {
          let p2f = p2.shift();
          document.querySelectorAll('.box')[p2f].textContent = '';
          document.querySelectorAll('.box')[p2f].style.opacity = '';
          document.querySelectorAll('.box')[p1[0]].style.opacity = '0.3';
          p2.push(index);
        }
      } else {
        turns = 1;
        e.target.textContent = 'o';
        if (p1.length < 3) {
          p1.push(index);
          turn.textContent = 'x';
        } else if (p1.length === 3) {
          let p1f = p1.shift();
          document.querySelectorAll('.box')[p1f].textContent = '';
          document.querySelectorAll('.box')[p1f].style.opacity = '';
          document.querySelectorAll('.box')[p2[0]].style.opacity = '0.3';
          p1.push(index);
        }
      }
    }
    // GG
    const GG = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let game of GG) {
      if (game.every(num => p1.includes(num))) {
        console.log('p1 wins');
        document.querySelector('.board').textContent = 'o wins';
        gg.style.display = 'flex';
      }
      if (game.every(num => p2.includes(num))) {
        console.log('p2 wins');
        document.querySelector('.board').textContent = 'x wins';
        gg.style.display = 'flex';
      }
    }
  });
}

gg.addEventListener('click', () => {
  turns = 0;
  p1 = [];
  p2 = [];
  for (var n = 0; n < boxes.length; n++) {
    boxes[n].textContent = '';
    boxes[n].style = '';
  }
  gg.style.display = '';
  turn.textContent = 'o';
})