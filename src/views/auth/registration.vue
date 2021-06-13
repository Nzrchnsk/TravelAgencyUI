<template>
    <div class="wrapper fadeInDown">
        <div id="formContent">

            <div class="fadeIn first">
                <h3 class="h3 mb-3 font-weight-normal">Регистрация</h3>
            </div>

            <form>
                <input type="email" required v-model="data.email" id="email" class="fadeIn second" name="login" placeholder="E-mail">
                <input type="text" required v-model="data.userName" id="login" class="fadeIn second" name="login" placeholder="Имя пользователя">
                <input type="password" required v-model="data.password" id="password" class="fadeIn third" name="login" placeholder="Пароль">
                <div v-if="invalidValidation" class="mb-2 validation-failed"><label><small>Пожалуйста заполните все поля</small></label></div>
                <div v-if="invalidData" class="mb-2 validation-failed"><label><small>Неверные данные</small></label></div>
                <input type="button" @click="registration" class="fadeIn fourth" value="Зарегистрироваться">
            </form>

            <div id="formFooter">
            </div>

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
                    window.location = '/trips';
                } catch (e) {
                    this.invalidData = true;
                    console.log(e)
                }
            },
        },
    }
</script>