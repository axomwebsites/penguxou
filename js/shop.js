import { state, toast } from '#state';
import { fooditems } from '#foodmarket';
import { drinkitems } from '#drinksmarket';
import { clothesitems } from '#clothes';
import { potionitems } from '#potions';

const itemmap = {
    'food': fooditems,
    'drink': drinkitems,
    'clothes': clothesitems,
    'potion': potionitems
};

export function initshop() {
    const overlay = document.getElementById('modaloverlay');
    const closebtn = document.getElementById('modalclose');
    const title = document.getElementById('modaltitle');
    const body = document.getElementById('modalbody');

    document.getElementById('shopbtn').addEventListener('click', openshop);
    closebtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
    });

    function openshop() {
        title.textContent = '🛒 Shop';
        const room = state.room;
        let items = [];
        if (room === 0) {
            items = [...fooditems, ...drinkitems];
        } else if (room === 1) {
            items = potionitems;
        } else if (room === 2) {
            items = clothesitems;
        } else {
            items = [...fooditems, ...drinkitems, ...clothesitems, ...potionitems];
        }

        body.innerHTML = items.map(item => {
            return `<div class="shopitem">
                <img src="${item.img}" />
                <div class="info">
                    <div class="name">${item.name}</div>
                    <div class="desc">${item.type} · ${item.cost} coins</div>
                </div>
                <button class="buybtn" data-item='${JSON.stringify(item)}' ${state.coins < item.cost ? 'disabled' : ''}>Buy</button>
            </div>`;
        }).join('');

        body.querySelectorAll('.buybtn').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = JSON.parse(btn.dataset.item);
                if (state.coins >= item.cost) {
                    state.coins -= item.cost;
                    state.inventory[item.name] = (state.inventory[item.name] || 0) + 1;
                    toast(`Bought ${item.name}`);
                    openshop();
                    document.dispatchEvent(new CustomEvent('inventoryupdate'));
                }
            });
        });

        overlay.classList.add('open');
    }
}
