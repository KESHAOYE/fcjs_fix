<template>
    <div class="personcenter">
        <personbar />
        <headers />
        <div class="content">
            <div class="personcenter_card">
                <leftbar />
                <div class="person_right">
                    <router-view :key="$route.fullPath" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import leftbar from './personleft'
    export default {
        name: "personcenter",
        components: {
            leftbar,
        }
    }
</script>

<style lang="scss">
    .personcenter_card {
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        .person_right {
            width: 1020px;
            height: auto;
        }
    }
</style>