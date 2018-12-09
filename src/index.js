import './main.scss'
import Model from './model';
import View from './view';

const left = document.querySelector('.left');
const right = document.querySelector('.right');

Model.login(6757939, 2)
    .then(() => {
        return Model.getFriends({ fields: 'photo_50' })
    })
    .then((listfriends) => {
        if (localStorage['list-friends']) {
            let storageList = JSON.parse(localStorage['list-friends']);

            let storageLeft = [];
            let storageRight = [];

            for (const key in listfriends.items) {
                if ( ~storageList.right.indexOf(''+listfriends.items[key].id)) {
                    storageRight.push(listfriends.items[key]);
                } else {
                    storageLeft.push(listfriends.items[key]);
                }
            }
            left.innerHTML = View.render('tempeLestFriendsLeft', { list: storageLeft });
            right.innerHTML = View.render('tempeLestRight', { list: storageRight });

        } else {
            left.innerHTML = View.render('tempeLestFriendsLeft', { list: listfriends.items });
        }

        left.addEventListener('click', clickPlus);
        right.addEventListener('click', clickMinus)
    })
    .catch(e => {
        console.error(e);
        alert('Ошибка: ' + e.message);

    });

function clickPlus(e) {
    if (e.target.classList.contains('plus')) {

        e.target.classList.remove('plus');
        e.target.classList.add('minus');
        right.appendChild(e.target.parentNode);
    }

}

function clickMinus(e) {
    if (e.target.classList.contains('minus')) {

        e.target.classList.remove('minus');
        e.target.classList.add('plus');
        left.appendChild(e.target.parentNode);
    }
}

document.querySelector('.search_Left').addEventListener('keyup', filter);
document.querySelector('.search_Right').addEventListener('keyup', filter);

function filter(e) {
    const zone = (e.target.className.split('_')[1]).toLowerCase();
    const value = e.target.value.toLowerCase();

    const zoneHtml = document.querySelector(`.${zone}`);

    for (const key of zoneHtml.children) {
        const name = key.getElementsByTagName('p')[0].textContent.toLowerCase();

        if (name.includes(value)) {
            key.style.display = 'flex';
        } else {
            key.style.display = 'none';
        }
    }
}

document.querySelector('.save').addEventListener('click', ()=>{
    let listFriends = {
        left: getListZone(left),
        right: getListZone(right)
    };

    localStorage['list-friends'] = JSON.stringify(listFriends);

});

const getListZone = (zone)=>{
    let arr =[];

    for (const element of zone.children) {
        arr.push(element.id);
    }
    
    return arr;
};

makeDnD([left, right]);

function makeDnD(zones) {
    let currentDrag;

    zones.forEach(zone => {
        zone.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/html', 'dragstart');
            currentDrag = { source: zone, node: e.target };
        });

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        zone.addEventListener('drop', (e) => {
            if (currentDrag) {
                e.preventDefault();

                if (currentDrag.source !== zone) {
                    if (e.target.classList.contains('item')) {
                        zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
                    } else {
                        zone.insertBefore(currentDrag.node, zone.lastElementChild);
                    }
                }

                currentDrag = null;
            }
        });
    })
}