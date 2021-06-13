<template>
    <div class="card">
    <div class="card-header">{{title}}</div>
    <div class="card-body">
        <select v-model="data.departurePlaceId" class="form-select mb-2" aria-label="Default select example">
            <option value="" selected disabled>Выберите место отправления</option>
            <option v-for="value in places" :value="value.id">{{value.name}}</option>
        </select>
        <select v-model="data.arrivalPlaceId" required class="form-select mb-2" aria-label="Default select example">
            <option value="" selected disabled>Выберите место прибытия</option>
            <option v-for="value in places" :value="value.id">{{value.name}}</option>
        </select>
        <datepicker v-model="data.departureDate" required class="form-select mb-2" placeholder="Выберите дату отправления"></datepicker>
        <datepicker v-model="data.arrivalDate" required class="form-select mb-2" placeholder="Выберите дату прибытия"></datepicker>
        <input v-model="data.totalTicket" type="number" required class="form-control mb-2" placeholder="Количество билетов">
        <input v-model="data.price" type="number" required class="form-control mb-2" placeholder="Стоимость одного места">
        <div v-if="invalidValidation" style="color: red" class="mb-2"><label><small>Пожалуйста заполните все поля</small></label></div>
        <div v-if="placesInvalid" style="color: red" class="mb-2"><label><small>Место отправления и место прибытия не должны совпадать</small></label></div>
        <button type="button" @click="save" class="btn btn-success">
            Сохранить
        </button>
    </div>
    </div>
</template>
<script>
    import Datepicker from 'vue3-datepicker'
    import Api from '/src/components/db'

    export default {
        data() {
            return {
                places : [],
                invalidValidation : false,
                placesInvalid : false,
                title: '',
                data : {
                    departurePlaceId : "",
                    arrivalPlaceId : "",
                    departureDate : null,
                    arrivalDate : null,
                    totalTicket : null,
                    price: null,
                },
            }
        },
        mounted() {
            if (this.$route.params.tripId) {
                this.getTrip();
            }
            if (this.$route.params.tripId) {
                this.title = 'Редактирование поездки';
            } else {
                this.title = 'Создание поездки';
            }
            this.getPlaces();
        },
        components: {
            Api,
            Datepicker,
        },
        methods: {
            async getPlaces() {
                try {
                    let {data} = await Api.Get('places');
                    this.places = data;
                } catch (e) {
                    console.log(e)
                }
            },
            async editTrip() {
                this.invalidValidation = false;
                this.placesInvalid = false;
                if (!this.data.departurePlaceId || !this.data.arrivalPlaceId || !this.data.departureDate || !this.data.arrivalDate || !this.data.totalTicket || !this.data.price) {
                    this.invalidValidation = true;
                    return
                }
                if (this.data.departurePlaceId === this.data.arrivalPlaceId) {
                    this.placesInvalid = true;
                    return
                }
                try {
                    await Api.Put('trips/' + this.$route.params.tripId, this.data);
                    this.$router.push({name: 'tripsList'});
                } catch (e) {
                    console.log(e)
                }
            },
            async createTrip() {
                this.invalidValidation = false;
                this.placesInvalid = false;
                if (!this.data.departurePlaceId || !this.data.arrivalPlaceId || !this.data.departureDate || !this.data.arrivalDate || !this.data.totalTicket || !this.data.price) {
                    this.invalidValidation = true;
                    return
                }
                if (this.data.departurePlaceId === this.data.arrivalPlaceId) {
                    this.placesInvalid = true;
                    return
                }
                try {
                    await Api.Post('trips', this.data);
                    this.$router.push({name: 'tripsList'});
                } catch (e) {
                    console.log(e)
                }
            },
            async getTrip() {
                try {
                    let {data} = await Api.Get('trips/' + this.$route.params.tripId);
                    this.data = data;
                } catch (e) {
                    console.log(e)
                }
            },
            save() {
                if (this.$route.params.tripId) {
                    this.editTrip();
                } else {
                    this.createTrip();
                }
            }
        },
    }
</script>
