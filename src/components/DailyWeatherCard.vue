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
            console.log(this.url)  
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
    <div class="Dailycard">
        <div class="DailyImg">
            <img :src='url' :alt='url' class="card__image">
        </div>
        <div class="Dailybody">
            <p>{{ passData.weather[0].main }}</p>
            <p>氣溫：{{passData.temp.day}}</p>
            <p>體感溫度：{{passData.feels_like.day}}</p>
        </div>
    </div>
</template>



<style>
img {
    max-height:100%;
    display: block;
    object-fit: cover;
}

.Dailycard {
    display: flex;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    background: #ECE9E6;
    background: linear-gradient(to right, #FFFFFF, #ECE9E6);

}


.Dailybody {
    padding: 1rem;
    display: flex;
    gap: .5rem;
}

</style>