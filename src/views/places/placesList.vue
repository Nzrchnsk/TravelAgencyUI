<template>
    <div class="card">
        <div class="card-header">Точки маршрутов</div>
        <div class="card-body">
            <button type="button" @click="addPlace" class="btn btn-secondary btn-sm">
                Добавить точку
            </button>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Название точки</th>
                    <th scope="col">Описание точки</th>
                    <th scope="col">Адрес точки</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                <tr  v-for="item in places">
                    <td>{{item.name}}</td>
                    <td>{{item.description}}</td>
                    <td>{{item.address}}</td>
                    <td>
                        <button type="button" @click="editPlace(item.id)" class="btn btn-primary btn-sm me-2">
                           Редактировать
                        </button>

                        <button type="button" @click="deletePlace(item.id)" class="btn btn-danger btn-sm">
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
        name: "Places",
        data() {
            return {
                places: [],
            };
        },
        components: {
            Api,
        },
        mounted() {
            this.getPlaces();
        },
        methods: {
            editPlace(id) {
                this.$router.push({name: 'placeEdit', params: {placeId: id}});
            },
            addPlace() {
                this.$router.push({name: 'placeAdd'});
            },
            deletePlace(id) {
                try {
                    this.places = Api.Delete('places/' + id);
                    this.getPlaces();
                } catch (e) {
                    console.log(e)
                }
            },
            async getPlaces() {
                try {
                    let {data} = await Api.Get('places');
                    this.places = data
                } catch (e) {
                    console.log(e)
                }
            },
        },
    };
</script>