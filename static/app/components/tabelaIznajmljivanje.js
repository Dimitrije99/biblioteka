export default {
    props:["iznajmljivanja"],
    emits: ["odabranoZaBrisanje", "vracanjeKnjige"],
    methods: {
        ukloniIznajmljivanje(id){
            this.$emit("odabranoZaBrisanje", id)
        },

        zatvoriIznajmljivanje(k){
            if (confirm("Da li ste sigurni da je knjiga vracena?") == true) {
                this.$emit("vracanjeKnjige", {...k})
            }
        },

        filterIznajmljivanja() {
            if (this.searchText[0] == " ") {
                this.searchText = this.searchText.trim();
            };
            return this.iznajmljivanja.filter(iznaj =>
                iznaj.id.toString().toLowerCase().includes(this.searchText.toLowerCase())
                || iznaj.datum_iznajmljivanja.toString().toLowerCase().includes(this.searchText.toLowerCase())
                || iznaj.rok_za_vracanje.toString().toLowerCase().includes(this.searchText.toLowerCase())
                || iznaj.naslov.toLowerCase().includes(this.searchText.toLowerCase())
                || iznaj.user_name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }

    },

    data() {
        return {
            searchText: "",
        }
    },
    template: `
    <br><br><label>Search: <input type="text" v-model="searchText" placeholder="Pretrazi iznajmljivanja..."/></label><br><br>
    <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Datum iznajmljivanja</th>
            <th>Rok za vracanje(Dani)</th>
            <th>Vraceno</th>
            <th>Knjiga</th>
            <th>Korisnik</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="i in filterIznajmljivanja()">
            <td>{{i.id}}</td>
            <td>{{i.datum_iznajmljivanja}}</td>
            <td>{{i.rok_za_vracanje}}</td>
            <td>{{i.vraceno}}</td>
            <td>{{i.naslov}}</td>
            <td>{{i.user_name}}</td>
            <td><button @click="ukloniIznajmljivanje(i.id)">Obrisi</button></td>
            <td><button v-if="i.vraceno == undefined" @click="zatvoriIznajmljivanje(i)">Vrati knjigu</button></td>
        </tr>
    </tbody>
    <tfoot></tfoot>
</table>`
}