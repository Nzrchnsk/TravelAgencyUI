<template>
    <div class="card">
        <div class="card-header">Поездки</div>
        <div class="card-body">
            <button type="button" @click="addTrip" class="btn btn-secondary btn-sm">
                Добавить поездку
            </button>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Точка отправления</th>
                    <th scope="col">Точка прибытия</th>
                    <th scope="col">Дата отправления</th>
                    <th scope="col">Дата прибытия</th>
                    <th scope="col">Количество билетов</th>
                    <th scope="col">Стоимость билета</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="item in trips">
                    <td>{{item.departurePlace}}</td>
                    <td>{{item.arrivalPlace}}</td>
                    <td>{{item.departureDate}}</td>
                    <td>{{item.arrivalDate}}</td>
                    <td>{{item.totalTicket}}</td>
                    <td>{{item.price}}</td>
                    <td>
                        <button type="button" @click="buyTicket(item.id)" class="btn btn-success btn-sm">
                            Купить
                        </button>

                        <button type="button" @click="editTrip(item.id)" class="btn btn-primary btn-sm me-2">
                           Редактировать
                        </button>

                        <button type="button" @click="deleteTrip(item.id)" class="btn btn-danger btn-sm">
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
    import moment from 'moment';
    import Api from '/src/components/db'
    export default {
        name: "Trips",
        data() {
            return {
                trips: [],
            };
        },
        components: {
            Api,
            moment,
        },
        mounted() {
            this.getTrips();
        },
        methods: {
            buyTicket(id) {
                this.$router.push({name: 'buyTicket', params: {tripId: id}});
            },
            editTrip(id) {
                this.$router.push({name: 'tripEdit', params: {tripId: id}});
            },
            addTrip() {
                this.$router.push({name: 'tripAdd'});
            },
            async deleteTrip(id) {
                try {
                    this.trips = await Api.Delete('trips/' + id);
                    this.getTrips();
                } catch (e) {
                    console.log(e)
                }
            },
            async getTrips() {
                try {
                    let {data} = await Api.Get('trips');
                    this.trips = data
                    for(let i = 0; i < this.trips.length; i++) {
                        this.trips[0].departureDate = moment(this.trips[0].departureDate).format('YYYY-MM-DD');
                        this.trips[0].arrivalDate = moment(this.trips[0].arrivalDate).format('YYYY-MM-DD');
                    }
                } catch (e) {
                    console.log(e)
                }
            },
        },
    };
</script>