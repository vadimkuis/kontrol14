//1 создаем обработчик события
window.onload = function () {
    const fullNameInput = document.getElementById('full-name');
    const userNameInput = document.getElementById('your-username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const repeatPasswordInput = document.getElementById('repeat-password');
    const checkboxInput = document.getElementById('checkbox');
    const buttonOk = document.getElementById('btn-ok');
    const modal = document.getElementById('modal');
    const switchLink = document.getElementById('switchLink');
    const signUpButton = document.getElementById('btn');
    const inputs = document.getElementsByClassName('home__form-input');
    const form = document.getElementById('add__form');


    // Full Name может содержать только буквы и пробел
    const fullName = /[.,^:;'"@#$%&*()=!?<>/~`0-9+]/;

    fullNameInput.oninput = function () {
        this.value = this.value.replace(fullName, '');
    }

    // Your username - может содержать только буквы, цифры, символ подчеркивания и тире
    const userName = /[.,^:;'"@#$%&*()=!?<>/~`+\s]/;

    userNameInput.oninput = function () {
        this.value = this.value.replace(userName, '');
    }

    //Реализовать проверку введенного E-mail на корректность
    const email = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    emailInput.oninput = function () {
        this.value = this.value.replace(email, '');
    }



    // выводим изменение значения чекбокса
    checkboxInput.onclick = () => {
        checkboxInput.checked ? console.log('Cогласен') : console.log('Не согласен');
    }

    
    // проверяем заполнение полей
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].onchange = function () {
            this.previousElementSibling.removeAttribute('style');
        }
    }
    signUpButton.onclick = function (ev) {
        ev.preventDefault();

        let formIsValid = true;

        for (let i = 0; i < inputs.length; i++) {

            if (!inputs[i].value && formIsValid) {
                inputs[i].previousElementSibling.style.color = 'red';
                alert('Заполните поле ' + inputs[i].previousElementSibling.innerText);
                formIsValid = false;
            }
        }
        if (formIsValid && additionalChecks()) {
            modal.setAttribute('style', 'display: block');
        }
    };

    function additionalChecks() {
        if (passwordInput.value.length < 8) {
            alert('Пароль должен быть не менее 8 символов');
            return false;
        }
        if (!repeatPasswordInput.value) {
            alert('Подтвердите пароль');
            return false;
        }
        if (passwordInput.value !== repeatPasswordInput.value) {
            alert('Пароли не совпадают');
            return false;
        }
        if (!checkboxInput.checked) {
            alert("Необходимо согласие на обработку данных");
            return false;
        }
        return true;
    }
    //Поле пароля должно содержать минимум 8 символов, среди которых есть:
    //- хотя бы одна буква в верхнем регистре
    //- хотя бы одна цифра
    //- хотя бы один спецсимвол

    buttonOk.onclick = changeLocation;
    switchLink.onclick = changeLocation;

    function changeLocation() {
        modal.removeAttribute('style');
        form.reset();
        document.querySelector('h1').textContent = 'Log in to the system'; // изменяем текст заголовка

        fullNameInput.previousElementSibling.remove();
        fullNameInput.remove(); // удаляем блок с полем Full Name

        emailInput.previousElementSibling.remove();
        emailInput.remove(); // удаляем блок с полем E-mail

        repeatPasswordInput.previousElementSibling.remove()
        repeatPasswordInput.remove(); // удаляем блок с полем Repeat Password

        checkboxInput.parentElement.remove(); // удаляем блок с чекбоксом
        signUpButton.textContent = 'Sign In'; // изменяем текст кнопки

        switchLink.remove(); // удаляем ссылку

        // Добавляем обработчик события для кнопки Sign In
        signUpButton.onclick = function (event) {
            event.preventDefault();
            let username = userNameInput.value.trim();
            let password = passwordInput.value.trim();

            // Проверяем заполнены ли оба поля
            if (!username || !password) {
                alert('Заполните все поля!');
            } else {
                alert(`Добро пожаловать, ${username}!`);
            }
        }
    }
}


  