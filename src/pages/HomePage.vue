<template>
    <div>
        <div class="flex justify-content-center py-6 w-full">
            <div class="md:w-6 sm:w-8 xs:w-10">
                <InputGroup class="w-full">
                    <Button  style="border-radius: 3rem 0 0 3rem" class="sm:w-4 md:w-3" @click="toggle"
                        icon="pi pi-filter" />

                    <InputText style="border-radius: 0 3rem 3rem 0" class="px-7 py-3 sm:w-8 md:w-9"
                        v-model="this.filter.search" placeholder="Escribe el país que deseas ver" />

                    <Menu ref="menu" id="overlay_menu" :model="continentsOptions" :popup="true">
                        <template #end>
                            <div class="w-full flex align-items-center justify-content-center pt-2 pb-2">
                                <Button type="button" label="Limpiar filtros" icon="pi pi-trash" :loading="loading"
                                    @click="clearFilters" />
                            </div>
                        </template>

                        <template #item="{ item, props }">
                            <a class="flex" v-bind="props.action" @click="filter.continent = item.code" :class="{'text-primary': item.code == filter.continent }">
                                <img :src="`/continents/${item.code}.png`" height="20px" width="auto"/>
                                <span class="ml-2">{{ item.name }}</span>
                            </a>
                        </template>
                    </Menu>
                </InputGroup>
                <small v-if="filter.continent" class="mt-2 ml-2 text-secondary">Selected filters: {{ filter.continent }}</small>
            </div>
        </div>

        <div class="grid md:px-8 sm:px-4" v-if="!this.$apollo.loading">
            <div class="col-12 md:col-6 lg:col-4" v-for="country in paginated" :key="country.code">
                <CountryCard :country="country" />
            </div>
        </div>

        <div class="grid md:px-8 sm:px-4" v-else>
            <div class="col-12 md:col-6 lg:col-4" v-for="x in 6" :key="x">
                <CountrySkeleton />
            </div>
        </div>
        <div v-if="!this.$apollo.loading">
            <Paginator :rows="6" :totalRecords="total"
                template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" @page="handlePagination"/>

        </div>
    </div>
</template>

<script>
import CountryCard from "@/components/CountryCard.vue";
import CountrySkeleton from "@/components/CountrySkeleton.vue";
import gql from "graphql-tag";

const GET_COUNTRIES = gql`
  query listCountries {
    countries {
      code
      name
      continent {
        code
        name
      }
    }
  }
`;

const GET_CONTINENTS = gql`
  query listContients {
    continents {
      code
      name
    }
  }
`;


export default {
    name: "HomePage",

    data() {
        return {
            filter: {
                search: "",
                continent: "",
            },
            countries: [],
            continents: [],
            loading: false,
            error: null,
            perpage: 6,
            page: 1,
            total: 0,
        };
    },

    mounted() { },
    methods: {
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        clearFilters() {
            Object.assign(this.filter, {
                search: "",
                continent: "",
            });
            this.page = 1;
        },
        handlePagination(event){
            this.page = event.page + 1;
        }
    },

    apollo: {
        countries: {
            query: GET_COUNTRIES,
        },
        continents: {
            query: GET_CONTINENTS,
        },
    },
    computed: {
        paginated() {
            const filteredCountries = this.countries.filter((country) => {
                if (this.filter.continent)
                    return country.continent.code == this.filter.continent;
                if (this.filter.search)
                    return country.name.toUpperCase().includes(this.filter.search.toUpperCase());
                return true;
            });
            this.total = filteredCountries.length;


            const startIndex = (this.page - 1) * this.perpage;
            const paginatedData = filteredCountries.slice(
                startIndex,
                startIndex + this.perpage
            );
            return paginatedData;
        },
        continentsOptions() {
            return [
                {
                    label: "Filtrar por continentes",
                    items: this.continents,
                },
            ];
        },
    },
};
</script>

<style scoped></style>
