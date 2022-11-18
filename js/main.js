const card_number = document.getElementById('card-nr');
const card_owner = document.getElementById('owner');
const exp_date = document.getElementById('exp-date');
const cvs_number = document.getElementById('cvs-number');
const form = document.querySelector('form');


const input_card_owner = document.getElementById('name');
const input_card_number = document.getElementById('number');
const input_expire_month = document.getElementById('expire-month');
const input_expire_year = document.getElementById('expire-year');
const input_cvs = document.getElementById('card-cvs');

form.addEventListener('submit', event => {
    event.preventDefault();

    if (input_card_owner.value == '') {
        input_card_owner.closest('div.input-field').setAttribute('data_after', 'Can\'t be blank');
        input_card_owner.closest('div.input-field').classList.add('error');
    } else {
        input_card_owner.closest('div.input-field').classList.remove('error');
    }

    if (input_card_number.value == '') {
        input_card_number.closest('div.input-field').setAttribute('data_after', 'Can\'t be blank');
        input_card_number.closest('div.input-field').classList.add('error');
    } else if (!validateOnlyDigits(input_card_number.value)) {
        input_card_number.closest('div.input-field').setAttribute('data_after', 'Wrong format, numbers only');
        input_card_number.closest('div.input-field').classList.add('error');
    } else if (input_card_number.value.length != 16) {
        input_card_number.closest('div.input-field').setAttribute('data_after', 'Wrong format, incorrect length');
        input_card_number.closest('div.input-field').classList.add('error');
    } else {
        input_card_number.closest('div.input-field').classList.remove('error');
    }

    if (input_expire_month.value == '') {
        input_expire_month.closest('fieldset').setAttribute('data_after', 'Can\'t be blank');
        input_expire_month.closest('fieldset').classList.add('error');
        input_expire_month.classList.add('error');
    } else if (!validateOnlyDigits(input_expire_month.value)) {
        input_expire_month.closest('fieldset').setAttribute('data_after', 'Wrong format, numbers only');
        input_expire_month.closest('fieldset').classList.add('error');
        input_expire_month.classList.add('error');
    } else if (Number(input_expire_month.value) > 12 || Number(input_expire_month.value) < 1) {
        input_expire_month.closest('fieldset').setAttribute('data_after', 'Wrong month format');
        input_expire_month.closest('fieldset').classList.add('error');
        input_expire_month.classList.add('error');
    } else {
        input_expire_month.classList.remove('error');
    }

    if (input_expire_year.value == '') {
        input_expire_year.closest('fieldset').setAttribute('data_after', 'Can\'t be blank');
        input_expire_year.closest('fieldset').classList.add('error');
        input_expire_year.classList.add('error');
    } else if (!validateOnlyDigits(input_expire_year.value)) {
        input_expire_year.closest('fieldset').setAttribute('data_after', 'Wrong format, numbers only');
        input_expire_year.closest('fieldset').classList.add('error');
    } else {
        input_expire_year.classList.remove('error');
    }

    if (
        !input_expire_month.classList.contains('error') &&
        !input_expire_year.classList.contains('error')
    ) {
        input_expire_month.closest('fieldset').classList.remove('error');
    }

});

input_card_number.onkeyup = function (e) {
    console.log(validateOnlyDigits(this.value));
    card_number.innerText = formatCardNumber(this.value);
}

input_card_owner.onkeyup = function (e) {
    card_owner.innerText = this.value || this.getAttribute('placeholder');
}

input_expire_month.onkeyup = input_expire_year.onkeyup = function (e) {

    if(input_expire_month.value) {
        Number(input_expire_month.value) < 10 ? 
            exp_month = "0" + input_expire_month.value :
            exp_month = input_expire_month.value;
    } else {
        exp_month = "00";
    }

    if(input_expire_year.value) {
        Number(input_expire_year.value) < 10 ? 
            exp_year = "0" + input_expire_year.value :
            exp_year = input_expire_year.value;
    } else {
        exp_year = "00";
    }

    exp_date.innerText = exp_month + "/" + exp_year;
}

input_cvs.onkeyup = function (e) {
    cvs_number.innerText = this.value || '000';
}

function formatCardNumber(numberString) {
    let cardNumber = '0000000000000000'.split('');

    for (i = 0; i < numberString.length; i++) {
        cardNumber.shift();
        cardNumber.push(numberString[i]);
    }

    str = '';
    for (i = 0; i < cardNumber.length; i += 4) {
        str += cardNumber.slice(i, i + 4).join('') + " ";
    }

    return str.trim();
}

function validateOnlyDigits(str) {
    const regex = /\D/g

    return str.match(regex) ? false : true;
}



