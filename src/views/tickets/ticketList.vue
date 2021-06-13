<template>
    <div class="card">
        <div class="card-header">Билеты</div>
        <div class="card-body">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Номер билета</th>
                    <th scope="col">Пассажир</th>
                    <th scope="col">Маршрут</th>
                    <th scope="col">Дата поездки</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="item in tickets">
                    <td>{{item.number}}</td>
                    <td>{{item.user.userName}}</td>
                    <td>{{item.tractName}}</td>
                    <td>{{item.departureDate}}</td>
                    <td>
                        <button type="button" v-if="admin" @click="deleteTicket(item.id)" class="btn btn-danger btn-sm">
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
    import moment from "moment";
    export default {
        name: "Tickets",
        data() {
            return {
                tickets: [],
            };
        },
        components: {
            Api,
        },
        mounted() {
            this.getTickets();
        },
        methods: {
            async deleteTicket(id) {
                try {
                    this.tickets = await Api.Delete('tickets/' + id);
                    this.getTickets();
                } catch (e) {
                    console.log(e)
                }
            },
            async getTickets() {
                try {
                    let {data} = await Api.Get('tickets');
                    this.tickets = data;
                    for(let i = 0; i < this.tickets.length; i++) {
                        this.tickets[i].departureDate = moment(this.tickets[i].departureDate).format('YYYY-MM-DD');
                        this.tickets[i].tractName = this.tickets[i].trip.departPlace.name + ' - ' + this.tickets[i].trip.arrivePlace.name;
                    }
                } catch (e) {
                    console.log(e)
                }
            },
        },
        computed: {
            admin() {
                return localStorage.getItem('role') === 'Admin'
            },
        },
    };
</script>