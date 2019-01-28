<template>
  <div class="calculator">
    <div class="display"> {{current || '0' }}</div>
    <div class="btn" v-on:click="clear">AC</div>
    <div class="btn" v-on:click="sign">+/-</div>
    <div class="btn" v-on:click="percent">%</div>
    <div class="btn operator" v-on:click="divide">÷</div>
    <div class="btn" v-on:click="append('7')">7</div>
    <div class="btn" v-on:click="append('8')">8</div>
    <div class="btn" v-on:click="append('9')">9</div>
    <div class="btn operator" v-on:click="times">x</div>
    <div class="btn" v-on:click="append('4')">4</div>
    <div class="btn" v-on:click="append('5')">5</div>
    <div class="btn" v-on:click="append('6')">6</div>
    <div class="btn operator" v-on:click="minus">-</div>
    <div class="btn" v-on:click="append('1')">1</div>
    <div class="btn" v-on:click="append('2')">2</div>
    <div class="btn" v-on:click="append('3')">3</div>
    <div class="btn operator" v-on:click="add">+</div>
    <div class="zero btn" v-on:click="append('0')">0</div>
    <div class="btn" v-on:click="dot">,</div>
    <div class="btn operator" v-on:click="equal">=</div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      current: '123',
    }
  },
  methods: {
    clear() {
      this.current = '';
    },
    sign() {
      this.current = this.current.charAt(0) === '-' ?
        this.current.slice(1) : `-${this.current}`;
    },
    percent(){
      this.current = `${parseFloat(this.current) / 100}`
    },
    append(number) {
      this.current = `${this.current}${number}`;
    },
    dot() {
      if(this.current.indexOf('.') === -1){
          this.append('.')
      }
    },
    divide() {
      this.operator = (a,b) => a/b;
    },
    times() {
      this.operator = (a,b) => a*b;
    },
    minus() {
      this.operator = (a,b) => a-b;
    },
    add() {
      this.operator = (a,b) => a*b;
    },
    equal() {
      
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.calculator {
  margin: 0 auto;
  width: 400px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  font-size: 40px;
  color: white;
}

.display {
  grid-column: 1/5;
  background-color: #333;
}
.zero {
  grid-column: 1/3;
}

.btn {
  background-color: gray;
  border: 1px solid #333;
}

.operator {
  background-color: orange;
  color: white;
}

</style>
