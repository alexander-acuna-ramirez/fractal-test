<template>
    <Card @click="searchCountry">
        <template #header>
            <div :style="{ backgroundImage: `url(${imageUrl})` }" class="card-image" />
        </template>
        <template #content>
            <div class="flex flex-row ">
                <img v-if="!flagError" :src="`https://flagsapi.com/${country.code}/flat/64.png`" alt="Flag of {{ country.name }}"
                    width="100px" height="auto" @error="handleFlagError"/>
                <img v-else :src="this.noFlag" alt="Flag of {{ country.name }}"
                    width="100px" height="64px" />

                <div class="flex flex-column justify-content-center ml-5">
                    <h4 class="text-2xl my-0">{{ country.name }}</h4>
                    <span>{{ country.continent.name }}</span>
                </div>
            </div>
        </template>
    </Card>
    <div>
        <Sidebar v-model:visible="visibleRightBar" header="País" position="right">
            <CountrySideBar
            :country="country" 
            :countryData="countryData"
            :urlImage="url" 
            />
        </Sidebar>
            <!--
        <Sidebar v-model:visible="visibleRightBar" header="País" position="right">
            <img :src="imageUrl" class="w-full" style="border-radius: 6px; height: 170px;" />
            <div class="flex flex-row mt-2 align-items-center">
                <img v-if="!flagError" :src="`https://flagsapi.com/${country.code}/flat/64.png`" alt="Flag of {{ country.name }}"
                    width="100px" height="auto" @error="handleFlagError"/>
                <img v-else :src="this.noFlag" alt="Flag of {{ country.name }}"
                    width="100px" height="64px" />
                <div class="flex flex-column justify-content-center ml-5">
                    <h4 class="text-2xl my-0">{{ country.name }}</h4>
                    <span class="text-lg">{{ country.continent.name }}</span>
                </div>
            </div>
            <div>
                <div class="my-2">
                    <span class="text-primary text-xl font-bold">Capital: </span>
                    <span class="text-xl">{{ countryData.name }}</span>
                </div>
                <div class="my-2">
                    <span class="text-primary text-xl font-bold">Language: </span>
                    <span class="text-xl">{{ countryData.languages[0].name }}, {{ countryData.languages[0].native
                        }}</span>
                </div>
                <div class="my-2">
                    <span class="text-primary text-xl font-bold">Currency: </span>
                    {{ countryData.currency }}
                </div>
                <div class="my-2">
                    <span class="text-primary text-xl font-bold">Region</span>
                    
                    <Listbox :options="countryData.state" optionLabel="name" class="w-full mt-2" emptyMessage="No regions" />

                </div>
            </div>
        </Sidebar>
        -->
    </div>
</template>

<script>
import axios from "axios";
import CountrySideBar from '@/components/CountrySideBar.vue';
import gql from "graphql-tag";


const GET_COUNTRY = gql`
  query findCountry($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      currency
      languages {
        name
        native
      }
      states {
        name
      }
    }
  }
`;

export default {
    name: "CountryCard",
    props: {
        country: {
            type: Object,
            required: true,
        },
    },
    components: {
        CountrySideBar,
    },
    data() {
        return {
            url: "https://fakeimg.pl/250x170?text=Not+Image",
            noFlag: "https://fakeimg.pl/250x170?text=Not+Flag",
            flagError: false,
            loading: false,
            error: null,
            visibleRightBar: false,
            countryData: {
                code: "",
                name: "",
                capital: "",
                languages: [],
                states: []
            }
        };
    },
    methods: {
        async fetchCountryImage() {
            const searchQuery = `${this.country.name}`;
            const response = await axios.get(
                `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=1&client_id=${import.meta.env.VITE_UNPLASH_TOKEN}`
            );
            const image = response.data.results[0].urls.raw;
            this.url = image;
        },
        handleFlagError(){
            this.flagError = true;
        },
        async searchCountry() {
            this.loading = true;
            this.error = null;

            try {
                const result = await this.$apollo.query({
                    query: GET_COUNTRY,
                    variables: {
                        code: this.country.code
                    },
                });

                this.countryData = result.data.country;
                this.visibleRightBar = true;
            } catch (error) {
                this.error = error;
                console.error(error)
            } finally {
                this.loading = false;
            }
        },
    },
    computed: {
        imageUrl() {
            return this.url;
        },
    },
    mounted() {
        this.fetchCountryImage();
    },
};
</script>

<style scoped>
.card-image {
    height: 170px;
    background-size: cover;
    background-position: center;
    border-radius: 6px 6px 0px 0px;
}
</style>
