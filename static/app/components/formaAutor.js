export default {
    props: ["autorZaIzmenu", "flagDodavanje", "flagIzmena"],
    emits:["kreiranjeAutora", "izmenaAutora"],
    data(){
        return {
            noviAutor: {},
        }
    },
    methods: {
        dodavanje(){
            this.$emit("kreiranjeAutora", {... this.noviAutor});

        },
        izmena(autorZaIzmenu){
            this.$emit("izmenaAutora", {... autorZaIzmenu})
        }
    },
    template: `
    <form v-on:submit.prevent="dodavanje"  v-if="flagDodavanje">
        <div>
            <label>Ime: <input type="text" v-model="noviAutor.ime"></label>
        </div>
        <div>
            <label>Prezime: <input type="text" v-model="noviAutor.prezime"></label>
        </div>
        <div>
            <label>Datum rodjenja: <input type="date" v-model="noviAutor.datum_rodjenja"></label>
        </div>
        <br>
        <div>
            <button type="button" @click="dodavanje()">Dodaj</button>
        </div>
    </form>
    <form  v-if="flagIzmena">
        <div>
            <label>Ime: <input type="text" v-model="autorZaIzmenu.ime"></label>
        </div>
        <div>
            <label>Prezime: <input type="text" v-model="autorZaIzmenu.prezime"></label>
        </div>
        <div>
            <label>Datum rodjenja: <input type="date" v-model="autorZaIzmenu.datum_rodjenja"></label>
        </div>
        <div>
        <button type="button" @click="izmena(autorZaIzmenu)">Izmeni</button>
        </div>
    </form>
`
}