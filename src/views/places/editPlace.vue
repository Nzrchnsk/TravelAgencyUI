<template>
    <div class="card">
    <div class="card-header">{{title}}</div>
    <div class="card-body">
        <input type="text" required v-model="data.name" class="form-control mb-2" placeholder="Название" aria-label="Username" aria-describedby="basic-addon1">
        <input type="text" required v-model="data.description" class="form-control mb-2" placeholder="Описание" aria-label="Username" aria-describedby="basic-addon1">
        <input type="text" required v-model="data.address" class="form-control mb-2" placeholder="Адрес" aria-label="Username" aria-describedby="basic-addon1">
        <div v-if="invalidValidation" style="color: red" class="mb-2"><label><small>Пожалуйста заполните все поля</small></label></div>
        <button type="button" @click="save" class="btn btn-success">
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
                title: '',
                data : {
                    name: '',
                    description: '',
                    address: '',
                },
            }
        },
        mounted() {
            if (this.$route.params.placeId) {
                this.getPlace();
            }
            if (this.$route.params.placeId) {
                this.title = 'Редактирование точки';
            } else {
                this.title = 'Создание точки';
            }
        },
        components: {
          Api
        },
        methods: {
            async saveEdit() {
                this.invalidValidation = false;
                if (!this.data.name || !this.data.description || !this.data.address) {
                    this.invalidValidation = true;
                    return
                }
                try {
                    await Api.Put('places/' + this.$route.params.placeId, this.data);
                    this.$router.push({name: 'placeList'});
                } catch (e) {
                    console.log(e)
                }
            },
            async saveCreate() {
                this.invalidValidation = false;
                if (!this.data.name || !this.data.description || !this.data.address) {
                    this.invalidValidation = true;
                    return
                }
                try {
                    await Api.Post('places', this.data);
                    this.$router.push({name: 'placeList'});
                } catch (e) {
                    console.log(e)
                }
            },
            async getPlace() {
                try {
                    let {data} = await Api.Get('places/' + this.$route.params.placeId);
                    this.data = data;
                } catch (e) {
                    console.log(e)
                }
            },
            save() {
                if (this.$route.params.placeId) {
                    this.saveEdit();
                } else {
                    this.saveCreate();
                }
            }
        },
    }
</script>
