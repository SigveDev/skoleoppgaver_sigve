<script>
    import { onMount } from 'svelte';
    import Header from './header.svelte';
    import Footer from './footer.svelte';
    import Planes from './planes.svelte';
    import './+page.css';

//https://airlabs.co/api/v9/flights?airline_iata=NO&api_key=2286bb14-3743-45fd-8967-45e2adb899c4
</script>

<div class="section">
    <Header/>
    <div class="main">
        <Planes/>
    </div>
    <Footer/>
</div>

<style>
    .section {
        display: flex;
        width: 90vw;
        min-height: 80vh;
        height: fit-content;
        justify-content: center;
        align-items: center;
        background-color: var(--main-color);
        border-radius: 15px;
        flex-direction: column;
        margin: 8vh;
    }

    .main {
        display: flex;
        min-height: fit-content;
        width: 100%;
        flex-direction: column;
    }
</style>
