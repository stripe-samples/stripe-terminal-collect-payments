<script setup>
import { computed, onBeforeMount, ref } from "vue";
import SrMessages from "./components/SrMessages.vue";

// Reactive vars that we'll use in our template
const readersList = ref(null);
const readerId = ref(null);
const reader = ref(null);
const amount = ref(null);
const paymentIntent = ref(null);

// For error messages
const messages = ref([]);

// Get readers before mounting the component
onBeforeMount(async () => {
  const response = await fetch("/api/readers");
  const result = await response.json();
  readersList.value = result.readersList;
});

// Process payment click handler
const processPayment = async () => {};

// Cancel action click handler
const cancelAction = async () => {};

// Simulate payment click handler
const simulatePayment = async () => {};

// Capture payment click handler
const capturePayment = async () => {};

// Helpers
function reset() {
  paymentIntent.value = null;
  amount.value = null;
  reader.value = null;
}

function addMessage(message) {
  messages.value.push(message);
}

// Computed properties to handle enabling and disabling of buttons
// Don't worry about this stuff: it'll depend on your client.
const isSimulateable = computed(() => {
  if (reader.value) {
    return reader.value?.device_type?.includes("simulated") &&
      paymentIntent?.value?.id
      ? true
      : false;
  }
  return false;
});

const isCapturable = computed(() => {
  return paymentIntent?.value?.id ? true : false;
});

const isProcessable = computed(() => {
  return amount.value >= 100 && readerId.value ? true : false;
});
</script>

<template>
  <div class="sr-root">
    <main class="sr-main">
      <h2>Collecting Payments with Stripe Terminal</h2>
      <p>Select a reader and input an amount for the transaction.</p>
      <p>
        You can use amounts ending in the certain values to produce specific
        responses. See
        <a
          href="https://stripe.com/docs/terminal/references/testing#physical-test-cards"
          >the documentation</a
        >
        for more details.
      </p>
      <section>
        <div>
          <p>
            <strong>Payment Intent ID:</strong
            ><span v-if="paymentIntent">{{ paymentIntent.id }}</span>
          </p>
          <p>
            <strong>Payment Intent status:</strong
            ><span v-if="paymentIntent">{{ paymentIntent.status }}</span>
          </p>
        </div>
        <p>
          <strong>Reader Status:</strong>
          <span v-if="reader">{{ reader?.action?.status }}</span>
        </p>
      </section>
      <form id="confirm-form">
        <label>Select Reader: </label>
        <select
          v-model="readerId"
          name="reader"
          id="reader-select"
          class="sr-select"
        >
          <option value="none" selected disabled>Select a reader</option>
          <option v-for="r in readersList" :value="r.id">
            {{ r.label }} ({{ r.id }})
          </option>
        </select>
        <section class="sr-form-row">
          <label for="amount">Amount:</label>
          <input v-model="amount" id="amount" class="sr-input" />
        </section>
        <section class="button-row">
          <button
            type="button"
            id="capture-button"
            @click="processPayment"
            :disabled="!isProcessable"
          >
            Process
          </button>
          <button
            type="button"
            id="capture-button"
            @click="capturePayment"
            :disabled="!isCapturable"
          >
            Capture
          </button>
        </section>
        <section class="button-row">
          <button
            id="simulate-payment-button"
            @click="simulatePayment"
            type="button"
            :disabled="!isSimulateable"
          >
            Simulate Payment
          </button>
          <button @click="cancelAction" id="cancel-button" type="button">
            Cancel
          </button>
        </section>
        <sr-messages :messages="messages" />
      </form>
    </main>
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
