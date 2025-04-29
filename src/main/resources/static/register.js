(async () => {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!form.checkValidity()) return form.classList.add('was-validated');
        const data = {
            title: form.title.value,
            firstname: form.firstname.value,
            lastname: form.lastname.value,
            email: form.email.value,
            username: form.username.value,
            phone: form.phone.value,
            password: form.password.value,
            adress_fk: Number(form.adress_fk.value),
            payment_fk: Number(form.payment_fk.value)
        };
        if (data.password !== form.password_confirm.value) {
            form.password_confirm.setCustomValidity('');
            return form.classList.add('was-validated');
        }
        const resp = await fetch('/api/auth/register', {
            method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
        });
        const result = await resp.json();
        if (result.success) window.location.href = 'login.html';
        else alert(result.errors.join(''));
    });
})();