fields = [
    { input: '#c-name', 
        cardField: '.interactive-card .card-name'},
    { input: '#c-number', 
        cardField: '.interactive-card .card-number'},
    { input: '#c-mm', 
        cardField: '.interactive-card .card-expiry span:first-child'},
    { input: '#c-yy',
        cardField: '.interactive-card .card-expiry span:last-child'},
    { input: '#c-cvc',
        cardField: '.interactive-card .card-back'},
];

// INPUT
fields.forEach(obj => {
    const input = document.querySelector(obj.input);
    const cardField = document.querySelector(obj.cardField);

    let error = document.createElement('span');
    error.className = 'error';
    error.style.display = 'none';
    error.textContent = input.maxLength;
    const errorField = input.parentElement.appendChild(error);

    let checkInput = event => {
        if (input.validity.valid){
            errorField.style.display = 'none';
            errorField.textContent = '';
        } else {
            if (input.value.length === 0 && input.required){
                errorField.textContent = "Can't be blank";
            } else if (input.validity.patternMismatch){
                if (obj.input == '#c-mm' && /^\d{2}$/.test(input.value)){
                    errorField.textContent = "Month in range 01-12";
                }else{
                    errorField.textContent = (obj.input == '#c-name')    
                        ? "Wrong format, latin letters and spaces only (3-22 symbols)"
                        : `Wrong format, numbers only (${(obj.input=='#c-number')?16:input.maxLength} symbols)`;
                }
            } else {
                errorField.textContent = "Wrong format";
            }
            errorField.style.display = 'flex';
        }
    }

    input.addEventListener("input", event => {
        if (obj.input == '#c-number')
            input.value = input.value.replace(/[^a-z0-9]+/gi, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();
        cardField.textContent = input.value;
        checkInput(event);
    });
    input.addEventListener("input", event => {
        input.classList.add('edited');
    }, {once1: true})

    input.addEventListener("invalid", event => {
        input.classList.add('edited');
        checkInput(event);
    });
    input.valid = true;
});



const form = document.querySelector('.interactive-card form');
// SUBMIT
form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelectorAll('fieldset, button[type=submit]').forEach(item => {
        item.style.display = 'none';
    })
    form.querySelector('.completed').style.display = 'flex';
});

// RESET
form.addEventListener('reset', event => {
    form.querySelectorAll('input').forEach(item => {
        item.classList.remove('edited');
    })
    form.querySelectorAll('fieldset, button[type=submit]').forEach(item => {
        item.style.display = 'flex';
    })
    form.querySelector('.completed').style.display = 'none';
});