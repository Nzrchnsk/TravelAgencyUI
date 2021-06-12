<template>
    <div class="card">
        <div class="card-header">Регистрация</div>
        <div class="card-body">
            <input type="email" required v-model="data.email" class="form-control mb-2" placeholder="E-mail">
            <input type="text" required v-model="data.userName" class="form-control mb-2" placeholder="Имя пользователя">
            <input type="password" required v-model="data.password" class="form-control mb-2" placeholder="Пароль">
            <div v-if="invalidValidation" style="color: red" class="mb-2"><label><small>Пожалуйста заполните все поля</small></label></div>
            <div v-if="invalidData" style="color: red" class="mb-2"><label><small>Неверные данные</small></label></div>
            <button type="button" @click="registration" class="btn btn-success">
                Сохранить
            </button>
        </div>
    </div>
</template>
<script>
    import Api from '/src/components/db'

    export default {
        data() {
            return {
                invalidValidation : false,
                invalidData : false,
                data : {
                    email: '',
                    password: '',
                    userName: '',
                },
            }
        },
        components: {
            Api
        },
        methods: {
            async registration() {
                this.invalidValidation = false;
                this.invalidData = false;
                if (!this.data.email || !this.data.password || !this.data.userName) {
                    this.invalidValidation = true;
                    return
                }
                try {
                    let {data} = await Api.Post('account/registration', this.data);
                    localStorage.setItem('auth', data.accessToken)
                    localStorage.setItem('role', data.role)
                    window.location = '/';
                } catch (e) {
                    this.invalidData = true;
                    console.log(e)
                }
            },
        },
    }
</script>
<style>
    .card-body {
        height: 50% !important;
    }
</style>
