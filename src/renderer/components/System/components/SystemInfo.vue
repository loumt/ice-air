<template>
    <div>
        <div class="item">
            <div class="name">Path:</div>
            <div class="value">{{ path }}</div>
        </div>
        <div class="item">
            <div class="name">Route Name:</div>
            <div class="value">{{ name }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: this.$route.name,
                path: this.$route.path
            }
        }
    }
</script>

<style scoped>
    .item {
        display: flex;
        margin-bottom: 6px;
    }

    .item .name {
        color: #6a6a6a;
        margin-right: 6px;
    }

    .item .value {
        color: #35495e;
        font-weight: bold;
    }
</style>