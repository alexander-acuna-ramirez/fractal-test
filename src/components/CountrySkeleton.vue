<template>
    <Card>
        <template #header>
            <Skeleton width="100%" height="170px"></Skeleton>
        </template>
        <template #content>
            <div class="flex flex-row">
                <Skeleton size="4rem" class="mr-2"></Skeleton>

                <div class="flex flex-column justify-content-center ml-5">
                    <Skeleton width="100%" class="mb-2"></Skeleton>
                    <Skeleton width="75%"></Skeleton>
                </div>
            </div>
        </template>
    </Card>
</template>

<script>
export default {
    name: 'CountrySkeleton',
};
</script>

<style scoped></style>