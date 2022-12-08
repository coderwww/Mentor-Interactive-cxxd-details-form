
const form = document.querySelector('.interactive-card form');

form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelectorAll('fieldset, button[type=submit]').forEach(item => {
        item.style.display = 'none';
    })
    form.querySelector('.completed').style.display = 'flex';
});

form.addEventListener('reset', event => {
    form.querySelectorAll('fieldset, button[type=submit]').forEach(item => {
        item.style.display = 'flex';
    })
    form.querySelector('.completed').style.display = 'none';
});