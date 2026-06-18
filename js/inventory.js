import { state, toast, clamp } from '#state';
import { fooditems, drinkitems, clothesitems, potionitems } from '#shop';

const allitems = [...fooditems, ...drinkitems, ...clothesitems, ...potionitems];
const itemmap = Object.fromEntries(allitems.map(i => [i.name, i]));

export function initinventory() {
    const shelf = document.getElementById('shelf');
    const invbtn = document.getElementById('inventorybtn');

    function rendershelf() {
        const keys = Object.keys(state.inventory).filter(k => state.inventory[k] > 0);
        if (keys.length === 0) {
            shelf.innerHTML = '<div style="color:rgba(255,255,255,0.3);font-size:12px;padding:4px;">Inventory empty</div>';
            return;
        }
        shelf.innerHTML = keys.map(key => {
            const item = itemmap[key];
            if (!item) return '';
            return `<div class="shelfitem" draggable="true" data-item="${key}">
                <img src="${item.img}" />
                <span>${key}</span>
                <span class="qty">${state.inventory[key]}</span>
            </div>`;
        }).join('');

        shelf.querySelectorAll('.shelfitem').forEach(el => {
            el.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', el.dataset.item);
                e.dataTransfer.effectAllowed = 'copy';
            });
            el.addEventListener('touchstart', (e) => {
                const touch = e.changedTouches[0];
                const clone = el.cloneNode(true);
                clone.style.position = 'fixed';
                clone.style.pointerEvents = 'none';
                clone.style.zIndex = '9999';
                clone.style.opacity = '0.8';
                clone.style.width = '60px';
                document.body.appendChild(clone);
                const movehandler = (ev) => {
                    const t = ev.changedTouches[0];
                    clone.style.left = (t.clientX - 30) + 'px';
                    clone.style.top = (t.clientY - 30) + 'px';
                };
                const endhandler = (ev) => {
                    const t = ev.changedTouches[0];
                    const dropTarget = document.elementFromPoint(t.clientX, t.clientY);
                    clone.remove();
                    document.removeEventListener('touchmove', movehandler);
                    document.removeEventListener('touchend', endhandler);
                    const pet = document.getElementById('ponxoucontainer');
                    if (pet && dropTarget && (dropTarget.closest('.poubody') || pet.contains(dropTarget))) {
                        const itemname = el.dataset.item;
                        if (state.inventory[itemname] > 0) {
                            consumeitem(itemname);
                            state.inventory[itemname]--;
                            rendershelf();
                            document.dispatchEvent(new CustomEvent('inventoryupdate'));
                        }
                    }
                };
                document.addEventListener('touchmove', movehandler);
                document.addEventListener('touchend', endhandler);
            });
        });
    }

    document.addEventListener('dragover', (e) => e.preventDefault());
    document.addEventListener('drop', (e) => {
        const itemname = e.dataTransfer.getData('text/plain');
        if (!itemname) return;
        const pet = document.getElementById('ponxoucontainer');
        const rect = pet.getBoundingClientRect();
        const x = e.clientX, y = e.clientY;
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            if (state.inventory[itemname] > 0) {
                consumeitem(itemname);
                state.inventory[itemname]--;
                rendershelf();
                document.dispatchEvent(new CustomEvent('inventoryupdate'));
                e.preventDefault();
            }
        }
    });

    invbtn.addEventListener('click', () => toast('Inventory shown on shelf'));
    document.addEventListener('inventoryupdate', rendershelf);
    rendershelf();
}

function consumeitem(name) {
    const item = itemmap[name];
    if (!item) return;
    if (item.type === 'food' || item.type === 'drink') {
        state.hunger = clamp(state.hunger + item.value, 0, 100);
        toast(`+${item.value} hunger`);
    } else if (item.type === 'potion') {
        state.health = clamp(state.health + item.value, 0, 100);
        toast(`+${item.value} health`);
    } else if (item.type === 'clothes') {
        toast('👕 Style +1');
    }
}
