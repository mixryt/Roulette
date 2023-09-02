
let play = document.querySelector('.play');

let player_1 = document.querySelector('.player_1');
let player_2 = document.querySelector('.player_2');

play.onclick = function () {
    localStorage.setItem('player_0', player_1.value);
    localStorage.setItem('player_1', player_2.value);
    localStorage.setItem('cP0', 0);
    localStorage.setItem('cP1', 0);
}
