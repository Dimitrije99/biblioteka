export default {
    props: ["korisnikZaIzmenu", "flagDodavanje", "flagIzmena", "tipKorisnika"],
    emits:["kreiranjeKorisnika", "izmenaKorisnika"],
    data(){
        return {
            noviKorisnik: {},
        }
    },
    methods: {
        dodavanje(){
            this.$emit("kreiranjeKorisnika", {... this.noviKorisnik});

        },
        izmena(korisnikZaIzmenu){
            this.$emit("izmenaKorisnika", {... korisnikZaIzmenu})
        }
    },
    template: `
    <form v-on:submit.prevent="dodavanje" v-if="flagDodavanje">
        <div>
            <label>Korisnicko ime: <input type="text" v-model="noviKorisnik.user_name"></label>
        </div>
        <div>
            <label>Sifra: <input type="text" v-model="noviKorisnik.password"></label>
        </div>
        <div>
            <label>Tip korisnika: 
                <select v-model="noviKorisnik.tip_korisnika_id">
                    <option v-for="t in tipKorisnika" :value="t.id">{{t.uloga}}</option>
                </select>
            </label>
        </div>
        <div>
            <button type="button" @click="dodavanje()">Dodaj</button>
        </div>
    </form>
    <form v-if="flagIzmena"> 
        <div>
            <label>Korisnicko ime: <input type="text" v-model="korisnikZaIzmenu.user_name"></label>
        </div>
        <div>
            <label>Password: <input type="text" v-model="korisnikZaIzmenu.password"></label>
        </div>
        <div>
            <label>Tip korisnika: 
                <select v-model="korisnikZaIzmenu.tip_korisnika_id">
                    <option v-for="t in tipKorisnika" :value="t.id">{{t.uloga}}</option>
                </select>
            </label>
        </div>
        <div>
            <button  type="button" @click="izmena(korisnikZaIzmenu)">Izmeni</button>
        </div>
    </form>
`
}