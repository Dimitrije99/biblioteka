export default {
    props: ["knjige", "logovaniKorisnik"],
    emits: ["odabranaZaBrisanje", "odabranaZaPromenu"],
    methods: {
        ukloniKnjigu(id) {
            this.$emit("odabranaZaBrisanje", id)
        },
        odabranaKnjiga(k) {
            this.$emit("odabranaZaPromenu", { ...k })

        },
        filterKnjige() {
            if (this.searchText[0] == " ") {
                this.searchText = this.searchText.trim();
            };
            return this.knjige.filter(knjiga =>
                knjiga.id.toString().toLowerCase().includes(this.searchText.toLowerCase())
                || knjiga.naslov.toLowerCase().includes(this.searchText.toLowerCase())
                || knjiga.ime.toLowerCase().includes(this.searchText.toLowerCase())
                || knjiga.zanr.toLowerCase().includes(this.searchText.toLowerCase())
                || knjiga.godina_izdanja.toString().toLowerCase().includes(this.searchText.toLowerCase())
            );
        }

    },
    data() {
        return {
            searchText: "",
        }
    },
    template: `
    <br><br><label>Search: <input type="text" v-model="searchText" placeholder="Pretrazi knjige..."/></label><br><br>
    <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Naslov</th>
            <th>Autor</th>
            <th>Zanr</th>
            <th>Godina izdanja</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="k in filterKnjige()">
            <td>{{k.id}}</td>
            <td>{{k.naslov}}</td>
            <td>{{k.ime}}</td>
            <td>{{k.zanr}}</td>
            <td>{{k.godina_izdanja}}</td>
            <td><button  @click="ukloniKnjigu(k.id)"  v-if="logovaniKorisnik.tip_korisnika_id != 3">Obrisi</button></td>
            <td><button  @click="odabranaKnjiga(k)"  v-if="logovaniKorisnik.tip_korisnika_id != 3">Izmeni</button></td>
        </tr>
    </tbody>
    <tfoot></tfoot>
</table>
<div v-if="searchText.trim().length > 0 && !this.filterKnjige().length">
    <p> Nije pronadjen ni jedan rezultat </p>
</div>
`
}