<script>
export default {
    props: ['passData'],
    data() {
        return {
            url: {}
        }

    },
    methods: {
        pickIcon() {
            this.url = `http://openweathermap.org/img/wn/${this.passData.weather[0].icon}@2x.png`
            //console.log(this.url)
        }
    },
    computed: {
        currentDate() {
            return dayjs().format(`MMMM Do YYYY`)
        },
    },
    created() {
        this.pickIcon()
    }
}
</script>

<template>
    <div class="daily__card">
        <div class="daily__img">
            <img :src='url' :alt='url' class="card__image">
        </div>
        <div class="daily__body">
            <p>min {{ passData.temp.min.toFixed(1) }}°</p>
            <p class="temp__max">MAX {{ passData.temp.max.toFixed(1) }}°</p>
        </div>
    </div>
</template>



<style>
.daily__card {
    display: flex;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    background: #ECE9E6;
    background: linear-gradient(to right, #FFFFFF, #ECE9E6);
}

.daily__img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
}

.daily__img img {
    height: 100%;
}

.daily__body {
    display: flex;
    padding: 1rem;
    width: 100%;
    gap: .5rem;
}

.temp__min {}

.temp__max {
    margin-left: auto;
}
</style>