export const state = {
    hunger: 70,
    energy: 80,
    health: 90,
    boredom: 30,
    coins: 150,
    level: 1,
    room: 0,
    sleeping: false,
    inventory: {},
    petname: 'Ponxou'
};

export const rooms = [
    { id: 'kitchen', label: 'Kitchen', bg: 'https://uploads.onecompiler.com/43xa2dbu5/1781634224757/1000067501.jpg' },
    { id: 'lab', label: 'Laboratory', bg: '' },
    { id: 'gameroom', label: 'Game Room', bg: 'https://uploads.onecompiler.com/43xa2dbu5/1781634232420/1000067503.jpg' },
    { id: 'bedroom', label: 'Bedroom', bg: '' },
    { id: 'outside', label: 'Outside', bg: '' }
];

export function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

let toasthandle;
export function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toasthandle);
    toasthandle = setTimeout(() => el.classList.remove('show'), 2500);
}
