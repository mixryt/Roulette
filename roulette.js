let currentPlayer = document.querySelector('.current_player');
let sequence = 0;
currentPlayer.textContent = localStorage.getItem(`player_${sequence}`) + ` (0)`;
// СТИЛИЗОВАТЬ КАРЕНТ ПЛЕЕРА

let carousel = document.querySelector('.carousel');
let startBtn = carousel.querySelector('.start');
let resetBtn = document.querySelector('.reset');
let move = carousel.querySelectorAll('.carousel_move');
let block = carousel.querySelectorAll('.block');
let blocked = carousel.querySelectorAll('.carousel_blocked');
let unblock = carousel.querySelectorAll('.unblock');
let doneFaild = carousel.querySelector('.done_faild');
let done = carousel.querySelector('.done');
let faild = carousel.querySelector('.faild');

let list = carousel.querySelectorAll('.list');
let list2 = carousel.querySelector('.list_2');

let width = 245,
    posView = 1,
    count = 0;

startBtn.onclick = roulette;

let ass = {
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    2: [4, 7, 10, 11, 12, 13, 17, 21],
    3: [3, 4, 7, 9, 10, 11, 12, 13, 14, 16, 17, 19, 20, 21, 22],
    4: [3, 1, 4, 7, 10, 12, 13, 14, 15, 16, 19, 20, 21],
    5: [3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21],
    6: [3, 6, 7, 15, 16, 19],
    7: [1, 3, 8, 10, 12, 13, 14, 18, 21],
    8: [12, 13, 14, 21],
    9: [9, 10, 11, 12, 13, 14, 17, 21],
    10: [3, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    11: [7, 8, 9, 12, 13, 15, 16, 19],
    12: [2, 7, 8, 10, 12, 13, 14, 16, 19, 21, 22],
    13: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    14: [9, 10, 11, 12, 13, 14, 15, 18, 21]
}

function aHid(e) {
    e.classList.add('hid');
}
function rHid(e) {
    e.classList.remove('hid');
}

function roulette() {
    sequence++;
    sequence %= 2;

    let cP0 = localStorage.getItem('cP0');
    let cP1 = localStorage.getItem('cP1');
    let current = sequence === 0 ? cP0 : cP1;
    let previous = sequence === 1 ? cP0 : cP1;

    for (let l = list.length - 1; l >= 0; l--) {
        // нижняя и верхняя рулетка  
        let elem = list[l],
            position = 0,
            maxLen = elem.children.length - (Math.round(posView / 2));
        count = Math.max(Math.floor(Math.random() * maxLen), 1);
        position = width * count;

        elem.style.transform = `translate(${-position}px, 0)`;
    }

    // средняя рулетка (в зависимости от верхней)
    let count2 = 0,
        position2 = 0;
    count2 = ass[count][Math.floor(Math.random() * ass[count].length)];
    position2 = width * count2;

    list2.style.transform = `translate(${-position2}px, 0)`;

    aHid(this);
    rHid(doneFaild);
    doneFaild.onclick = function (event) {
        if (event.target !== doneFaild) {
            rHid(startBtn);
            aHid(doneFaild);
            if (event.target === done) {
                current++;
                localStorage.setItem(`cP${sequence}`, current);
            }
            currentPlayer.textContent = localStorage.getItem(`player_${sequence}`) + ` (${previous})`;
            // if (event.target === faild) {
            //     current--;S
            //     localStorage.setItem(`cP${sequence + 1}`, current);
            // }
        }
    }
}

for (let b = 0; b < block.length; b++) {
    block[b].onclick = () => {
        aHid(move[b]);
        rHid(blocked[b]);
    }
    unblock[b].onclick = () => {
        rHid(move[b]);
        aHid(blocked[b]);
    }
}

resetBtn.onclick = () => {
    for (let l of list) {
        l.style.transform = `translate(0, 0)`;
    }
    list2.style.transform = `translate(0, 0)`;
    localStorage.setItem('cP0', 0);
    localStorage.setItem('cP1', 0);
    currentPlayer.textContent = localStorage.getItem(`player_0`) + ` (0)`;
}