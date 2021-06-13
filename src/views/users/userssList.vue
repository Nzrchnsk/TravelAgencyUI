<template>
    <div class="card">
        <div class="card-header">Пользователи</div>
        <div class="card-body">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Роль</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="item in users">
                    <td>{{item.userName}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.role}}</td>
                    <td>
                        <button type="button" @click="deleteUser(item.id)" class="btn btn-danger btn-sm">
                            Удалить
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import Api from '/src/components/db'
    export default {
        name: "Users",
        data() {
            return {
                users: [],
            };
        },
        components: {
            Api,
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            async deleteUser(id) {
                try {
                    this.users = await Api.Delete('users/' + id);
                    this.getUsers();
                } catch (e) {
                    console.log(e)
                }
            },
            async getUsers() {
                try {
                    let {data} = await Api.Get('users');
                    this.users = data
                } catch (e) {
                    console.log(e)
                }
            },
        },
    };
</script>