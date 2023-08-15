<template>
    <body>
        <h1>
            <span>H</span>
            <span>K</span>
            <span>T</span>
        </h1>
        <h2>is awesome</h2>
        <h2>& amazing</h2>
    </body>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


export default {
    setup() {
    const router = useRouter();
    const countdown = ref(5); // Number of seconds to wait before redirecting
    onMounted(() => {
      startCountdown();
    });
    function startCountdown() {
      setTimeout(() => {
        redirectToPage();
      }, countdown.value * 1000);
    }

    function redirectToPage() {
      router.push('/network_checking');
    //   router.push('/');

    }

    return {
      countdown
    };
  },
}
</script>

<style scoped>
body {
  background: url(http://neilcarpenter.com/demos/asfalt.png);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  margin: auto;
  text-align: center;
  color: #fff;
  font-family: "Quicksand";
  font-weight: 300;
  letter-spacing: 0.4em;
  overflow: hidden; }

h1 {
  margin-right: 0.15em;
  font-weight: 300;
  font-size: 17em;
  font-family: "Quicksand";
  color: #063970;
  text-shadow: 0 0 0.1em black;
  letter-spacing: 0em;
  animation: space 1.5s forwards ease-out;
  animation-delay: 3.3s; }
  h1 span {
    display: inline-block; }
    h1 span:nth-child(1) {
      animation: fall 1s forwards ease-out alternate; }
    h1 span:nth-child(2) {
      animation: fall2 1.5s forwards ease-out alternate; }
    h1 span:nth-child(3) {
      animation: fall3 2s forwards ease-out alternate; }

h2 {
  font-size: 3em;
  font-weight: 200;
  text-shadow: 0 1em 0.1em black;
  margin-bottom: 0.15em; }
  h2:nth-child(2) {
    animation: fall2 3.7s forwards ease-in-out alternate; }
  h2:nth-child(3) {
    font-size: 4.5em;
    animation: fall3 3.9s forwards ease-in-out alternate; }
  h2:nth-child(4) {
    font-size: 2.8em;
    animation: fall 4.2s forwards ease-in-out alternate; }

@keyframes space {
  to {
    letter-spacing: -0.17em; } }

@keyframes fall {
  0% {
    transform: translateY(-50em); } }

@keyframes fall2 {
  0% {
    transform: translateX(-50em); } }

@keyframes fall3 {
  0% {
    transform: translateX(50em); } }

</style>