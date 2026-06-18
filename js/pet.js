import { state, clamp, toast } from '#state';

export function initpet() {
    const container = document.getElementById('ponxoucontainer');
    const sleepbtn = document.getElementById('sleepbtn');
    const app = document.getElementById('app');

    sleepbtn.addEventListener('click', () => {
        state.sleeping = !state.sleeping;
        container.classList.toggle('sleeping', state.sleeping);
        app.classList.toggle('sleeping', state.sleeping);
        sleepbtn.classList.toggle('active', state.sleeping);
        toast(state.sleeping ? 'Zzz...' : 'Wake up!');
    });

    document.querySelector('.poubody')?.addEventListener('click', () => {
        sleepbtn.click();
    });

    function updatestats() {
        document.getElementById('hungerfill').style.width = state.hunger + '%';
        document.getElementById('hungerval').textContent = Math.round(state.hunger);
        document.getElementById('energyfill').style.width = state.energy + '%';
        document.getElementById('energyval').textContent = Math.round(state.energy);
        document.getElementById('healthfill').style.width = state.health + '%';
        document.getElementById('healthval').textContent = Math.round(state.health);
        document.getElementById('boredomfill').style.width = state.boredom + '%';
        document.getElementById('boredomval').textContent = Math.round(state.boredom);
        document.getElementById('coindisplay').textContent = state.coins;
        document.getElementById('levelbadge').textContent = 'Lv.' + state.level;
    }

    setInterval(() => {
        if (!state.sleeping) {
            state.hunger = clamp(state.hunger - 0.2, 0, 100);
            state.energy = clamp(state.energy - 0.1, 0, 100);
            state.boredom = clamp(state.boredom + 0.15, 0, 100);
        } else {
            state.hunger = clamp(state.hunger - 0.4, 0, 100);
            state.energy = clamp(state.energy + 0.6, 0, 100);
        }
        if (state.hunger < 20 || state.energy < 20) {
            state.health = clamp(state.health - 0.1, 0, 100);
        } else {
            state.health = clamp(state.health + 0.05, 0, 100);
        }
        updatestats();
        if (state.coins > 500) state.level = 2;
        if (state.coins > 1000) state.level = 3;
        document.getElementById('levelbadge').textContent = 'Lv.' + state.level;
    }, 2000);

    const nameinput = document.getElementById('petnameinput');
    nameinput.addEventListener('change', () => {
        state.petname = nameinput.value || 'Ponxou';
    });

    updatestats();
}
