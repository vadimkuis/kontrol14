//1 создаем обработчик события
window.onload = function () {
    const fullNameInput = document.getElementById('full-name');
    const userNameInput = document.getElementById('your-username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const repeatPasswordInput = document.getElementById('repeat-password');
    const checkboxInput = document.getElementById('checkbox');
    const signUpButton = document.getElementById('btn');
    const buttonOk = document.getElementById('btn-ok');
    const modal = document.getElementById('modal');
    const switchLink = document.getElementById('switchLink');
    const form = document.getElementById('add__form');
    const homeText = document.getElementById('home__text');

    //2. может содержать только буквы и пробел
    const REG_FULLNAME = /[0-9.,^:;'"@#$%&*()_=!?<>/~№+}{\-]/;

    //3. только буквы, цифры, символ подчеркивания и тире
    const REG_USERNAME = /[.,^:;'"@#$%&*()=!?<>/~`+\s]/;

    //4. реализовать проверку введенного E-mail на корректность
    const REG_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    //5. не менее 8 символов, должен содержать хотя бы одну большую букву, цифру и спецсимвол
    const REG_PASSWORD = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    checkboxInput.addEventListener('change', function () {
        console.log(this.checked ? 'Согласен' : 'Не согласен');
    });


    function validationForm() {
        let error = false;

        //2. может содержать только буквы и пробел const REG_FULLNAME
        if (!fullNameInput.value || fullNameInput.value.match(REG_FULLNAME)) {
            fullNameInput.style.borderBottom = "2px solid #FF0000FF";
            fullNameInput.nextElementSibling.classList.remove("d-none");
            fullNameInput.nextElementSibling.classList.add("error");
            error = true;
        } else {
            fullNameInput.style.borderBottom = "1px solid #C6C6C4";
            fullNameInput.nextElementSibling.classList.remove("error");
            fullNameInput.nextElementSibling.classList.add("d-none");
        }

        // 3. только буквы, цифры, символ подчеркивания и тире const REG_USERNAME
        if (!userNameInput.value || userNameInput.value.match(REG_USERNAME)) {
            userNameInput.style.borderBottom = "2px solid #FF0000FF";
            userNameInput.nextElementSibling.classList.remove("d-none");
            userNameInput.nextElementSibling.classList.add("error");
            error = true;
        } else {
            userNameInput.style.borderBottom = "1px solid #C6C6C4";
            userNameInput.nextElementSibling.classList.remove("error");
            userNameInput.nextElementSibling.classList.add("d-none");
        }

        //4. реализовать проверку введенного E-mail на корректность const REG_EMAIL
        if (!emailInput.value.match(REG_EMAIL)) {
            emailInput.style.borderBottom = "2px solid #FF0000FF";
            emailInput.nextElementSibling.classList.remove("d-none");
            emailInput.nextElementSibling.classList.add("error");
            error = true;
        } else {
            emailInput.style.borderBottom = "1px solid #C6C6C4";
            emailInput.nextElementSibling.classList.remove("error");
            emailInput.nextElementSibling.classList.add("d-none");
        }

        //5. не менее 8 символов, должен содержать хотя бы одну большую букву, цифру и спецсимвол const REG_PASSWORD
        if (passwordInput.value.length < 8) {
            passwordInput.style.borderBottom = "2px solid #FF0000FF";
            passwordInput.nextElementSibling.classList.remove("d-none");
            passwordInput.nextElementSibling.classList.add("error");
            error = true;
        } else if (passwordInput.value.match(REG_PASSWORD)) {
            passwordInput.style.borderBottom = "1px solid #C6C6C4";
            passwordInput.nextElementSibling.classList.remove("error");
            passwordInput.nextElementSibling.classList.add("d-none");
        }

        //6. Password и Repeat Password должны совпадать
        if (passwordInput.value !== repeatPasswordInput.value) {
            repeatPasswordInput.style.borderBottom = "2px solid #FF0000FF";
            repeatPasswordInput.nextElementSibling.classList.remove("d-none");
            repeatPasswordInput.nextElementSibling.classList.add("error");
            error = true;
        } else {
            repeatPasswordInput.style.borderBottom = "1px solid #C6C6C4";
            repeatPasswordInput.nextElementSibling.classList.remove("error");
            repeatPasswordInput.nextElementSibling.classList.add("d-none");
            //Это добавляем чтобы не было ошибки и в поле, где вводится пароль
            passwordInput.style.borderBottom = "1px solid #C6C6C4";
            passwordInput.nextElementSibling.classList.remove("error");
            passwordInput.nextElementSibling.classList.add("d-none");
        }

        let errCheckbox = document.getElementById('error-check');

        if (!checkboxInput.checked) {
            errCheckbox.classList.remove("d-none");
            errCheckbox.classList.add("error");
            error = true;
        } else {
            errCheckbox.classList.remove("error");
            errCheckbox.classList.add("d-none");
        }

        if (error) {
            console.log('Ошибка');
        } else {
            console.log('Ошибок нет');
            let userData = {
                name: fullNameInput.value,
                username: userNameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
            }

            addToLocalStorage();

        }
    }

    function addToLocalStorage() {
        const userData = {
            name: fullNameInput.value,
            username: userNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        }

        let clients = localStorage.getItem('clients');
        if (clients) {
            let clientsArray = JSON.parse(clients);
            clientsArray.push(userData);
            localStorage.setItem('clients', JSON.stringify(clientsArray));
        } else {
            let clientsArray = [];
            clientsArray.push(userData);
            localStorage.setItem('clients', JSON.stringify(clientsArray))
        }
        console.log(localStorage);
        modal.setAttribute('style', 'display: block');
    }

    signUpButton.addEventListener('click', validationForm);

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
        repeatPasswordInput.previousElementSibling.remove();
        repeatPasswordInput.remove(); // удаляем блок с полем Repeat Password
        checkboxInput.parentElement.remove(); // удаляем блок с чекбоксом
        signUpButton.textContent = 'Sign In'; // изменяем текст кнопки
        switchLink.textContent = 'Registration'; // замена текста

        signUpButton.addEventListener('click', onLogin);
    }

    function onLogin() {

        let username = userNameInput.value.trim();
        let password = passwordInput.value.trim();

        // Проверяем заполнены ли оба поля
        if (!username) {
            userNameInput.style.borderBottom = "2px solid #FF0000FF";
            userNameInput.nextElementSibling.classList.remove("d-none");
            userNameInput.nextElementSibling.classList.add("error");
        } else {
            userNameInput.style.borderBottom = "1px solid #C6C6C4";
            userNameInput.nextElementSibling.classList.remove("error");
            userNameInput.nextElementSibling.classList.add("d-none");
        }
        if (!password) {
            passwordInput.nextElementSibling.classList.remove("d-none");
            passwordInput.nextElementSibling.classList.add("error");
        } else {
            passwordInput.style.borderBottom = "1px solid #C6C6C4";
            passwordInput.nextElementSibling.classList.remove("error");
            passwordInput.nextElementSibling.classList.add("d-none");
        }
        let clients = JSON.parse(localStorage.getItem('clients'));
        console.log(clients);

        if (username && password) {
            const user = clients.find(userData => userData.username === username);
            if (!user.password === password) {

                alert('Такой пользователь не зарегистрирован!');
            } else {
                // const user = clients.find(userData => userData.password === password);
                // if (!user) {
                //     alert('Неверный пароль!');
                // } else {
                //     signUpButton.addEventListener('click', goToPersonalPage);
                // }

                document.getElementById('title').textContent = `Welcome, ${username} !`;
                signUpButton.textContent = 'Exit'; // изменяем текст кнопки
                userNameInput.previousElementSibling.remove()
                userNameInput.remove(); // удаляем блок с полем User Name
                passwordInput.previousElementSibling.remove()
                passwordInput.remove(); // удаляем блок с полем Repeat Password
                switchLink.previousElementSibling.remove()
                switchLink.remove();
                homeText.previousElementSibling.remove()
                homeText.remove();

            }

        }
    }
}


