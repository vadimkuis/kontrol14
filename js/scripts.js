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
    const homeText = document.getElementById('home__text');


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
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    emailInput.oninput = function () {
        if (!emailRegex.test(this.value)) {

        }
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
    form.onsubmit = onRegister;
    switchLink.onclick = changeLocation;

    function onRegister(ev) {
        ev.preventDefault();

        let formIsValid = true;


        for (let i = 0; i < inputs.length; i++) {

            if (!inputs[i].value && formIsValid) {
                inputs[i].previousElementSibling.style.color = 'red';
                alert('Заполните поле ' + inputs[i].previousElementSibling.innerText);
                formIsValid = false;
            }
        }

        function showError(inputElement, message) {
            inputElement.style.border = '1px solid red';
            inputElement.style.marginBottom = '10px';
            inputElement.nextElementSibling.textContent = message;
            inputElement.nextElementSibling.style.display = 'block';
        }

        if (formIsValid && additionalChecks()) {
            modal.setAttribute('style', 'display: block');
        }
        let person = {
            fullName: fullNameInput.value.trim(),
            userName: userNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        clients.push(person);
        localStorage.setItem('clients', JSON.stringify(clients));
    };

    function additionalChecks() {
        if (passwordInput.value.length < 8) {
            showError(passwordInput, 'Поле может содержать минимум 8 символов');
            return false;
        }
        //Поле пароля должно содержать минимум 8 символов, среди которых есть:
        //- хотя бы одна буква в верхнем регистре
        const passwordRegex1 = /[A-Z]/;
        //- хотя бы одна цифра
        const passwordRegex2 = /[0-9]/;
        //- хотя бы один спецсимвол
        const passwordRegex3 = /[.,^:;'"@#$%&*()=!?<>/~`]/;

        errorPassword.setAttribute('style', 'display: none');
        errorRepeatPassword.setAttribute('style', 'display: none');

        if (passwordRegex1.test(passwordInput.value)) {

        } else {
            errorPassword.setAttribute('style', 'display: block');
            return false;
        }
        if (passwordRegex2.test(passwordInput.value)) {
        } else {
            errorPassword.setAttribute('style', 'display: block');
            return false;
        }
        if (passwordRegex3.test(passwordInput.value)) {

        } else {
            errorPassword.setAttribute('style', 'display: block');
            return false;
        }
        if (!repeatPasswordInput.value) {
            alert('Подтвердите пароль');
            return false;
        }
        if (passwordInput.value !== repeatPasswordInput.value) {
            errorRepeatPassword.setAttribute('style', 'display: block');
            return false;
        }
        if (!checkboxInput.checked) {
            errorCheckbox.setAttribute('style', 'display: block');
            return false;
        }
        return true;
    }

    buttonOk.onclick = changeLocation;


    function changeLocation() {
        modal.removeAttribute('style');
        form.reset();

        document.querySelector('h1').textContent = 'Log in to the system'; // изменяем текст заголовка
        fullNameInput.previousElementSibling.remove();
        fullNameInput.remove(); // удаляем блок с полем Full Name
        emailInput.previousElementSibling.remove();
        emailInput.remove(); // удаляем блок с полем E-mail
        repeatPasswordInput.previousElementSibling.remove();
        repeatPasswordInput.remove(); // удаляем блок с полем Repeat Password
        checkboxInput.parentElement.remove(); // удаляем блок с чекбоксом
        signUpButton.textContent = 'Sign In'; // изменяем текст кнопки
        switchLink.textContent = 'Registration'; // замена текста

        //Перезагрузка страницы
        switchLink.onclick = location.reload;

        // Добавляем обработчик события для кнопки Sign In
        form.onsubmit = onLogin;
    }

    function onLogin(event) {
        event.preventDefault();
        form.reset();

        errorUsername.setAttribute('style', 'display: none');
        errorPasswordLog.setAttribute('style', 'display: none');

        let username = userNameInput.value.trim();
        let password = passwordInput.value.trim();

        // Проверяем заполнены ли оба поля
        if (!username) {
            errorUsername.setAttribute('style', 'display: block');
        }
        if (!password) {
            errorPasswordLog.setAttribute('style', 'display: block');
        }

        if (username && password) {
            const user = clients.find(person => person.userName === username);
            if (user.length === 0) {
                alert('Такой пользователь не зарегистрирован!');
            } else {
                const user = person.find(person => person.password === password);
                if (!user) {
                    alert('Неверный пароль!');
                } else {
                    form.onsubmit = goToPersonalPage;
                }
            }

        }

        function goToPersonalPage() {
            form.reset();

            document.querySelector('h1').textContent = `Welcome, ${user.fullName}`; // изменяем текст заголовка
            signUpButton.textContent = 'Exit'; // изменяем текст кнопки
            userNameInput.previousElementSibling.remove()
            userNameInput.remove(); // удаляем блок с полем User Name
            passwordInput.previousElementSibling.remove()
            passwordInput.remove(); // удаляем блок с полем Repeat Password
            switchLink.previousElementSibling.remove()
            switchLink.remove();
            homeText.previousElementSibling.remove()
            homeText.remove();

            form.onsubmit = onAutorization;
        }


        function onAutorization() {
            location.reload();
        }

    };
}


  