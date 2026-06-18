import { state, rooms } from '#state';

export function initroomnavigation() {
    const leftbtn = document.getElementById('roomleftbtn');
    const rightbtn = document.getElementById('roomrightbtn');
    const indicators = document.getElementById('roomindicators').children;
    const label = document.getElementById('roomlabel');
    const bg = document.getElementById('roombg');

    function updateroom() {
        const room = rooms[state.room];
        label.textContent = room.label;
        bg.style.backgroundImage = room.bg ? `url('${room.bg}')` : 'none';
        bg.classList.add('active');
        Array.from(indicators).forEach((dot, i) => {
            dot.classList.toggle('active', i === state.room);
        });
        document.dispatchEvent(new CustomEvent('roomchange', { detail: { room: state.room } }));
    }

    leftbtn.addEventListener('click', () => {
        state.room = (state.room - 1 + rooms.length) % rooms.length;
        updateroom();
    });
    rightbtn.addEventListener('click', () => {
        state.room = (state.room + 1) % rooms.length;
        updateroom();
    });
    updateroom();
}
