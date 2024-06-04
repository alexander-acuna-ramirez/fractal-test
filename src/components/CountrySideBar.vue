<template>
    <div>
        <img :src="urlImage" class="w-full" style="border-radius: 6px; height: 170px" />

        <div class="flex flex-row mt-2 align-items-center">
            <img v-if="!flagError" :src="`https://flagsapi.com/${country.code}/flat/64.png`"
                alt="Flag of {{ country.name }}" width="100px" height="auto" @error="handleFlagError" />
            <img v-else :src="this.noFlag" alt="Flag of {{ country.name }}" width="100px" height="64px" />
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
                <span class="text-xl">{{ countryData.languages[0].name }},
                    {{ countryData.languages[0].native }}</span>
            </div>
            <div class="my-2">
                <span class="text-primary text-xl font-bold">Currency: </span>
                {{ countryData.currency }}
            </div>
            <div class="my-2">
                <span class="text-primary text-xl font-bold">Region</span>

                <Listbox :options="countryData.state" optionLabel="name" class="w-full mt-2"
                    emptyMessage="No regions" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CountrySideBar",
    props: {
        country: {
            required: true,
            type: Object,
        },
        countryData: {
            required: true,
            type: Object,
        },
        urlImage: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            noFlag: "https://fakeimg.pl/250x170?text=Not+Flag",
            flagError: false,
        };
    },
    methods: {
        handleFlagError() {
            this.flagError = true;
        },
    },

};
</script>

<style scoped></style>
