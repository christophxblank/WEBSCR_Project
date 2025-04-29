(async () => {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!form.checkValidity()) return form.classList.add('was-validated');
        const data = {
            identifier: form.identifier.value,
            password: form.password.value,
            rememberMe: form.rememberMe.checked
        };
        const resp = await fetch('/api/auth/login', {
            method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
        });
        if (resp.ok) window.location.href = 'index.html';
        else alert((await resp.json()).errors.join(''));
    });
})();