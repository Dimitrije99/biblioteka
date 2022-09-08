export default {
    props:["izdavackeKuce"],
    emits: ["kucaZaBrisanje", "odabranaZaPromenu"],
    methods: {
        ukloniKucu(id){
            this.$emit("kucaZaBrisanje", id)
        },
        odabranaKuca(k){
            this.$emit("odabranaZaPromenu", {...k})

        },
        filterIzdavackeKuce() {
            if (this.searchText[0] == " ") {
                this.searchText = this.searchText.trim();
            };
            return this.izdavackeKuce.filter(kuca =>
                kuca.id.toString().toLowerCase().includes(this.searchText.toLowerCase())
                || kuca.naziv.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }

    },
    data() {
        return {
            searchText: "",
        }
    },

    template: `
    <br><br><label>Search: <input type="text" v-model="searchText" placeholder="Pretrazi izdavacke kuce..."/></label><br><br>
    <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Naziv</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="i in filterIzdavackeKuce()">
            <td>{{i.id}}</td>
            <td>{{i.naziv}}</td>
            <td><button @click="ukloniKucu(i.id)">Obrisi</button></td>
            <td><button @click="odabranaKuca(i)">Izmeni</button></td>
        </tr>
    </tbody>
    <tfoot></tfoot>
</table>`
}