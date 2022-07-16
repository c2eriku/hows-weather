<script>
import dayjs from 'dayjs'

export default {
    props: ['passData'],
    data() {
        return {
            url: {},
            show: false
        }

    },
    methods: {
        pickIcon() {
            this.url = `http://openweathermap.org/img/wn/${this.passData.weather[0].icon}@2x.png`
            //console.log(this.url)
        }
    },
    computed: {
        unix2time() {
            return dayjs.unix(`${this.passData.dt}`).format('ddd');
        }
    },
    created() {
        this.pickIcon()
    },
    mounted() {
        this.show = true;
    }
}
</script>

<template>
    <Transition name="bounce">
        <div class="daily__card" v-if="show">
            <div>{{ unix2time }}</div>
            <img :src='url' :alt='url' class="card__image">
            <div>{{ passData.temp.min.toFixed(1) }}°</div>
            <div>{{ passData.temp.max.toFixed(1) }}°</div>
        </div>
    </Transition>
</template>



<style>
.daily__card {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    background: #ECE9E6;
    background: linear-gradient(to right, #FFFFFF, #ECE9E6);
}

.daily__card div,.daily__card img{
    margin-left: 5px;
    margin-right: 5px;
}

img {
    height: 100%;
}

.daily__body {
    display: flex;
    padding: 1rem;
    width: 10%;
    gap: .5rem;
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}
</style>