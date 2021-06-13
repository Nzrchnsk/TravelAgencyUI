<template>
    <header class="p-3 bg-dark text-white">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/trips" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src="../../assets/beach-tour-logo.png" width="60" height="60">
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li v-if="auth"><a href="/places" class="nav-link px-2 text-white">Точки маршрута</a></li>
                    <li v-if="auth"><a href="/trips" class="nav-link px-2 text-white">Поездки</a></li>
                    <li v-if="auth && admin"><a href="/users" class="nav-link px-2 text-white">Пользователи</a></li>
                    <li v-if="auth"><a href="/users" class="nav-link px-2 text-white">Билеты</a></li>
                </ul>

                <div class="text-end">
                    <button type="button" @click="login" v-if="!auth" class="btn btn-outline-warning me-2">Авторизация</button>
                    <button type="button" @click="registration" v-if="!auth" class="btn btn-warning me-2">Регистрация</button>
                    <button type="button" v-if="auth" @click="logout" class="btn btn-outline-warning me-2">Выйти</button>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        methods: {
            login() {
                this.$router.push({name: 'login'});
            },
            registration() {
                this.$router.push({name: 'registration'});
            },
            logout() {
                localStorage.clear();
                window.location = '/login';
            },
        },
        computed: {
            auth() {
                return localStorage.getItem('auth');
            },
            admin() {
                return localStorage.getItem('admin');
            },
        },
    }
</script>