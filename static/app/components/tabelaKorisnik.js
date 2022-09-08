export default {
    props:["korisnici"],
    emits: ["odabranZaBrisanje", "odabranZaPromenu",],
    methods: {
        ukloniKorisnika(id){
            this.$emit("odabranZaBrisanje", id)
        },
        odabraniKorisnik(k){
            this.$emit("odabranZaPromenu", {...k})

        },
        filterKorisnik() {
            if (this.searchText[0] == " ") {
                this.searchText = this.searchText.trim();
            };
            return this.korisnici.filter(korisnik =>
                korisnik.id.toString().toLowerCase().includes(this.searchText.toLowerCase())
                || korisnik.user_name.toLowerCase().includes(this.searchText.toLowerCase())
                || korisnik.uloga.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }

    },
    data() {
        return {
            searchText: "",
        }
    },
    template: `
    <br><br><label>Search: <input type="text" v-model="searchText" placeholder="Pretrazi korisnike..."/></label><br><br>
    <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Korisnicko Ime</th>
            <th>Tip korisnika</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="k in  filterKorisnik()">
            <td>{{k.id}}</td>
            <td>{{k.user_name}}</td>
            <td>{{k.uloga}}</td>
            <td><button @click="ukloniKorisnika(k.id)">Obrisi</button></td>
            <td><button @click="odabraniKorisnik(k)">Izmeni</button></td>
        </tr>
    </tbody>
    <tfoot></tfoot>
</table>`
}