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
                        <button type="button" @click="recommendedTrip(item.id)" data-bs-toggle="modal" data-bs-target="#recommendModal" class="btn btn-warning  me-2 btn-sm">
                            Рекомендовать поездку
                        </button>

                        <button type="button" @click="deleteUser(item.id)" class="btn btn-danger btn-sm">
                            Удалить
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="recommendModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Рекомендация поездки</h5>
                    </div>
                    <div class="modal-body">
                        <select v-model="modal.trip" required class="form-select mb-2" aria-label="Default select example">
                            <option value="" selected disabled>Выберите маршрут</option>
                            <option v-for="value in trips" :value="value.id">{{value.name}}</option>
                        </select>
                        <input type="text" v-model="modal.text" required class="form-control mb-2" placeholder="Введите рекомендацию">
                        <div v-if="invalidValidation" style="color: red" class="mb-2"><label><small>Пожалуйста заполните все поля</small></label></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="recommend" class="btn btn-primary">Рекомендовать</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import Api from '/src/components/db'
    export default {
        name: "Users",
        data() {
            return {
                invalidValidation: false,
                modal: {
                    user: null,
                    trip: null,
                    text: ''
                },
                users: [],
                trips: [],
            };
        },
        components: {
            Api,
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            recommendedTrip(user_id) {
                this.modal.user = user_id;
                this.getTrips();
            },
            async recommend() {
                this.invalidValidation = false;
                if (!this.modal.user || !this.modal.trip || !this.modal.text) {
                    this.invalidValidation = true;
                    return
                }
                try {
                    await Api.Post('recommendation', this.modal);
                    alert('Рекомендация успешно отправлена');
                    $('#recommendModal').modal('hide')
                } catch (e) {
                    console.log(e)
                }
            },
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
            async getTrips() {
                try {
                    let {data} = await Api.Get('trips');
                    this.trips = data
                } catch (e) {
                    console.log(e)
                }
            },
        },
    };
</script>