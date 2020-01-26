const EventBus = new Vue();

const inputComponent = {
  props: ["placeholder"],
  data() {
    return {
      input: ""
    };
  },
  methods: {
    monitorEnterKey() {
      EventBus.$emit("add-note", {
        note: this.input,
        timestamp: new Date().toLocaleString()
      });
      this.input = "";
    }
  },
  template: `<input 
                :placeholder="placeholder" 
                v-model="input" 
                @keyup.enter="monitorEnterKey"
                class="input is-small" type="text"/>`
};

const noteCountComponent = {
  data() {
    return { noteCount: 0 };
  },
  created() {
    EventBus.$on("add-note", event => this.noteCount++);
  },
  template:
    '<div class="note-count">Note Count: <strong>{{noteCount}}</strong></div>'
};

new Vue({
  el: "#app",
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent
  },
  data: {
    notes: [],
    timestamps: [],
    placeholder: "Enter a note"
  },
  created() {
    EventBus.$on("add-note", event => this.addNote(event));
  },
  methods: {
    addNote(event) {
      this.notes.push(event.note);
      this.timestamps.push(event.timestamp);
    }
  }
});
