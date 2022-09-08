export default {
    props: ["kucaZaIzmenu", "izdavackeKuce", "autori", "flagDodavanje", "flagIzmena"],
    emits:["kreiranjeIzdavackeKuce", "izmenaKuce"],
    data(){
        return {
            novaIzdavackaKuca: {},
        }
    },
    methods: {
        dodavanje(){
            this.$emit("kreiranjeIzdavackeKuce", {... this.novaIzdavackaKuca});

        },
        izmena(kucaZaIzmenu){
            this.$emit("izmenaKuce", {... kucaZaIzmenu})
        }
    },
    template: `
    <form v-on:submit.prevent="dodavanje"  v-if="flagDodavanje">
    <div>
        <label>Naziv: <input type="text" v-model="novaIzdavackaKuca.naziv"></label>
    </div>
    <div>
    <button type="button" @click="dodavanje()">Dodaj</button>
    </div>
</form>
<form  v-if="flagIzmena">
    <div>
        <label>Naziv: <input type="text" v-model="kucaZaIzmenu.naziv"></label>
    </div>
    <div>
    <button type="button" @click="izmena(kucaZaIzmenu)">Izmeni</button>
    </div>
</form>
`
}