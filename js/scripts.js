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
    let errCheckbox = document.getElementById('error-check');
    const inputs = document.getElementsByClassName('home__form-input');

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

    function hideErrorInputs() {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style.borderBottom = "1px solid #C6C6C4";
            inputs[i].nextElementSibling.classList.remove("error");
            inputs[i].nextElementSibling.classList.add("d-none");
        }
    }

    signUpButton.addEventListener('click', validationForm);

    function validationForm() {
        hideErrorInputs();

        let error = false;

        //2. может содержать только буквы и пробел const REG_FULLNAME
        if (!fullNameInput.value || fullNameInput.value.match(REG_FULLNAME)) {
            fullNameInput.style.borderBottom = "2px solid #FF0000FF";
            fullNameInput.nextElementSibling.classList.remove("d-none");
            fullNameInput.nextElementSibling.classList.add("error");
            error = true;
        }
        // 3. только буквы, цифры, символ подчеркивания и тире const REG_USERNAME
        if (!userNameInput.value || userNameInput.value.match(REG_USERNAME)) {
            userNameInput.style.borderBottom = "2px solid #FF0000FF";
            userNameInput.nextElementSibling.classList.remove("d-none");
            userNameInput.nextElementSibling.classList.add("error");
            error = true;
        }

        //4. реализовать проверку введенного E-mail на корректность const REG_EMAIL
        if (!emailInput.value.match(REG_EMAIL)) {
            emailInput.style.borderBottom = "2px solid #FF0000FF";
            emailInput.nextElementSibling.classList.remove("d-none");
            emailInput.nextElementSibling.classList.add("error");
            error = true;
        }

        //5. не менее 8 символов, должен содержать хотя бы одну большую букву, цифру и спецсимвол const REG_PASSWORD
        if (passwordInput.value.length < 8) {
            passwordInput.style.borderBottom = "2px solid #FF0000FF";
            passwordInput.nextElementSibling.classList.remove("d-none");
            passwordInput.nextElementSibling.classList.add("error");
            error = true;
        }
        //6. Password и Repeat Password должны совпадать
        if (passwordInput.value !== repeatPasswordInput.value) {
            repeatPasswordInput.style.borderBottom = "2px solid #FF0000FF";
            repeatPasswordInput.nextElementSibling.classList.remove("d-none");
            repeatPasswordInput.nextElementSibling.classList.add("error");
            error = true;
        }

        if (!checkboxInput.checked) {
            checkboxInput.style.borderBottom = "2px solid #FF0000FF";
            checkboxInput.nextElementSibling.classList.remove("d-none");
            checkboxInput.nextElementSibling.classList.add("error");
            error = true;
        } else {
            checkboxInput.style.borderBottom = "1px solid #C6C6C4";
            checkboxInput.nextElementSibling.classList.remove("error");
            checkboxInput.nextElementSibling.classList.add("d-none");
        }

        if (error) {
            return;
        }
        console.log('Ошибок нет');
        let userData = {
            name: fullNameInput.value,
            username: userNameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
        };

        addToLocalStorage(userData);
        modal.setAttribute('style', 'display: block');
    }

    function addToLocalStorage(user) {
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        clients.push(user);
        localStorage.setItem('clients', JSON.stringify(clients));
    }

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
        signUpButton.removeEventListener('click', validationForm);
        signUpButton.addEventListener('click', onLogin);
        switchLink.addEventListener('click', function () {
            location.reload();
        });

    }

    function onLogin() {

        const username = userNameInput.value.trim();
        const password = passwordInput.value.trim();
        hideErrorInputs();

        // Проверяем заполнены ли оба поля
        if (!username) {
            userNameInput.style.borderBottom = "2px solid #FF0000FF";
            userNameInput.nextElementSibling.classList.remove("d-none");
            userNameInput.nextElementSibling.classList.add("error");
        }
        if (!password) {
            passwordInput.nextElementSibling.classList.remove("d-none");
            passwordInput.nextElementSibling.classList.add("error");
        }
        const clients = JSON.parse(localStorage.getItem('clients'));

        if (username && password) {
            const user = clients.find(userData => userData.username === username);
            if (user.password !== password) {
                alert('Такой пользователь не зарегистрирован!');
            }else{
                goToPersonalPage();
            }
        }


    }

    function goToPersonalPage() {
        signUpButton.removeEventListener('click', onLogin);
        document.querySelector('h1').textContent = `Welcome, ${user.name} !`; // изменяем текст заголовка
        signUpButton.textContent = 'Exit'; // изменяем текст кнопки
        userNameInput.previousElementSibling.remove()
        userNameInput.remove(); // удаляем блок с полем User Name
        passwordInput.previousElementSibling.remove()
        passwordInput.remove(); // удаляем блок с полем Repeat Password
        homeText.previousElementSibling.remove()
        homeText.remove();
        switchLink.remove();

        signUpButton.addEventListener('click', function () {
            location.reload();
        });
    }
}


