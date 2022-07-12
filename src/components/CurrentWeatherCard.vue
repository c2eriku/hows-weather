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
            this.url = `http://openweathermap.org/img/wn/${this.passData.weather[0].icon}@4x.png`
            console.log(this.url)
        }
    },
    created() {
        this.pickIcon()
    }
}
</script>

<template>
    <div class="card">
        <div class="card__header">
            <img :src='url' :alt='url' class="card__image">
        </div>
        <div class="card__body">
            <h4>{{ passData.weather[0].main }}</h4>
            <p>氣溫：{{ passData.temp }}</p>
            <p>體感溫度：{{ passData.feels_like }}</p>
        </div>
    </div>
</template>



<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

*,
*::before,
*::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

img {
    max-width:100%;
    display: block;
    object-fit: cover;
}

.card {
    display: flex;
    width: 387px;
    overflow: hidden;
    box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    background: #ECE9E6;
    background: linear-gradient(to right, #FFFFFF, #ECE9E6);

}

.card__body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.card__body h4 {
    font-size: 1.5rem;
    text-transform: capitalize;
}

</style>