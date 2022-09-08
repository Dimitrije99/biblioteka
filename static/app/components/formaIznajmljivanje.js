export default {
    props: ["knjige", "korisnici", "flagDodavanje"],
    emits: ["kreiranjeIznajmljivanja"],
    data() {
        return {
            novoIznajmljivanje: {},
            datumIsOk: true,
        }
    },
    methods: {
        dodavanje() {
            this.$emit("kreiranjeIznajmljivanja", { ... this.novoIznajmljivanje });

        },
        onChangeDatumIznajmljivanja(){
            let danas = new Date();
            danas.setHours(0, 0, 0, 0);
            if(new Date(this.novoIznajmljivanje.datum_iznajmljivanja) < danas){
                this.datumIsOk = false;
            }else {
                this.datumIsOk = true;
            }

        }
    },
    template: `<br>
    <form v-on:submit.prevent="dodavanje" v-if="flagDodavanje">
    <div>
        <label> Knjiga: 
            <select v-model="novoIznajmljivanje.knjiga_id">
                <option v-for="kn in knjige" :value="kn.id">{{kn.naslov}}</option>
            </select>
        </label>
    </div>
    <div>
        <label> Korisnik: 
            <select v-model="novoIznajmljivanje.korisnik_id">
                <option v-for="k in korisnici.filter(k => k.tip_korisnika_id == 3)" :value="k.id">{{k.user_name}}</option>
            </select>
        </label>
    </div>
    <div>
        <div :class="{'datum-ok': datumIsOk, 'datum-not-ok': !datumIsOk}">
            <label> Datum iznajmljivanja: <input type="date" v-model="novoIznajmljivanje.datum_iznajmljivanja" @change="onChangeDatumIznajmljivanja"></label> <br/>
            <span v-if="!datumIsOk">Datum iznajmljivanja nije korektan</span>
        </div>
        <div>
            <label>Rok za vracanje: <input type="text" v-model="novoIznajmljivanje.rok_za_vracanje"></label>
        </div>
        <div>
            <button type="button" @click="dodavanje()" :disabled='!datumIsOk'>Dodaj</button>
        </div>
    </div>
</form>`
}