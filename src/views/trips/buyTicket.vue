<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-7">
                    <div class="left border">
                        <div class="row"> <span class="header">Оплата</span>
                            <div class="icons"> <img src="https://img.icons8.com/color/48/000000/visa.png" /> <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" /> <img src="https://img.icons8.com/color/48/000000/maestro.png" /> </div>
                        </div>
                        <form> <span>Имя держателя карты:</span> <input placeholder="Иванов Иван"> <span>Номер карты:</span> <input v-maska="'#### #### #### ####'" placeholder="0125 6780 4567 9909">
                            <div class="row">
                                <div class="col-4"><span>Дата окончания:</span> <input v-maska="'##/##'" placeholder="YY/MM"> </div>
                                <div class="col-4"><span>CVV/CSV:</span> <input v-maska="'###'" id="cvv"> </div>
                            </div> <input type="checkbox" id="save_card" class="align-left"> <label for="save_card">Сохранить данные о карте</label>
                        </form>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="right border">
                        <div class="header">Данные о покупке</div>
                        <p>1 место</p>
                        <div class="row item">
                            <div class="row lower">
                                <div class="col text-left">Маршрут</div>
                                <div class="col text-right">{{trip ? trip.name : ''}}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="row lower">
                            <div class="col text-left">Стоимость</div>
                            <div class="col text-right">{{trip ? trip.price : ''}}</div>
                        </div>
                        <div class="row lower">
                        </div> <button type="button" class="btn-pay" data-bs-toggle="modal" data-bs-target="#exampleModal">Оплатить</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Подтверждение платежа</h5>
                    </div>
                    <div class="modal-body">
                        <input type="number" v-model="code" required class="form-control mb-2" placeholder="Введите код">
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="save" class="btn btn-primary">Подтвердить</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import { maska } from 'maska'
    import Api from "../../components/db";

    export default {
        data() {
            return {
                trip: null,
                code: null,
            }
        },
        methods: {
           async save() {
                if(!this.code) {
                    return
                }
                try {
                    this.trips = await Api.Post('trips/', {tripId: this.$route.params.tripId});
                } catch (e) {
                    console.log(e)
                }
                $('#exampleModal').modal('hide')
                this.$router.push({name: 'tripsList'});
            },
            async getTrip() {
                try {
                    let {data} = await Api.Get('trips/' + this.$route.params.tripId);
                    this.trip = data;
                } catch (e) {
                    console.log(e)
                }
            },
        },
        directives: { maska },
        mounted() {
            this.getTrip();
        }
    }
</script>
<style>
    body {
        background-color: lightgray;
    }

    @media(max-width:768px) {
        .card-body {
            padding: 0 1rem 1rem 1rem;
            background-image: url("https://i.imgur.com/4bg1e6u.jpg");
            background-size: cover;
            background-repeat: no-repeat
        }
    }

    .row {
        margin: 0
    }

    .icons {
        margin-left: auto
    }

    form span {
        color: rgb(179, 179, 179)
    }

    form {
        padding: 2vh 0
    }

    input {
        border: 1px solid rgba(0, 0, 0, 0.137);
        padding: 1vh;
        margin-bottom: 4vh;
        outline: none;
        width: 100%;
        background-color: rgb(247, 247, 247)
    }

    input:focus::-webkit-input-placeholder {
        color: transparent
    }

    .header {
        font-size: 1.5rem
    }

    .left {
        background-color: #ffffff;
        padding: 2vh
    }

    .left img {
        width: 2rem
    }

    .left .col-4 {
        padding-left: 0
    }

    .right .item {
        padding: 0.3rem 0
    }

    .right {
        background-color: #ffffff;
        padding: 2vh
    }

    .lower {
        line-height: 2
    }

    .btn-pay {
        background-color: rgb(23, 4, 189);
        border-color: rgb(23, 4, 189);
        color: white;
        width: 100%;
        font-size: 0.7rem;
        margin: 4vh 0 1.5vh 0;
        padding: 1.5vh;
        border-radius: 0
    }

    .btn:hover {
        color: white
    }

    input[type=checkbox] {
        width: unset;
        margin-bottom: unset
    }

    #cvv {
        background-image: linear-gradient(to left, rgba(255, 255, 255, 0.575), rgba(255, 255, 255, 0.541)), url("https://img.icons8.com/material-outlined/24/000000/help.png");
        background-repeat: no-repeat;
        background-position-x: 95%;
        background-position-y: center
    }

    #cvv:hover {}
</style>