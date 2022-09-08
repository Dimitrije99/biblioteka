export default {
    props:["autori"],
    emits: ["odabranZaBrisanje", "odabranZaPromenu"],
    methods: {
        ukloniAutora(id){
            this.$emit("odabranZaBrisanje", id)
        },
        odabraniAutor(k){
            this.$emit("odabranZaPromenu", {...k})

        },
        filterAutor() {
            if (this.searchText[0] == " ") {
                this.searchText = this.searchText.trim();
            };
            return this.autori.filter(autor =>
                autor.id.toString().toLowerCase().includes(this.searchText.toLowerCase())
                || autor.ime.toLowerCase().includes(this.searchText.toLowerCase())
                || autor.prezime.toLowerCase().includes(this.searchText.toLowerCase())
                || autor.datum_rodjenja.toString().toLowerCase().includes(this.searchText.toLowerCase())
            );
        }

    },
    data() {
        return {
            searchText: "",
        }
    },
    template: `
    <br><br><label>Search: <input type="text" v-model="searchText" placeholder="Pretrazi autore..."/></label><br><br>
    <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Datum rodjenja</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="a in filterAutor()">
            <td>{{a.id}}</td>
            <td>{{a.ime}}</td>
            <td>{{a.prezime}}</td>
            <td>{{a.datum_rodjenja}}</td>
            <td><button @click="ukloniAutora(a.id)">Obrisi</button></td>
            <td><button @click="odabraniAutor(a)">Izmeni</button></td>
        </tr>
    </tbody>
    <tfoot></tfoot>
</table>`
}