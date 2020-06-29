<template>
    <div><!--todo @keyup not working with tabindex-->
        <router-link :to="{name: 'notes-list'}" class="btn btn-blue mar10-t mar10-l">Main</router-link>
        <div class="note pad10" v-if="note">
            <span class="note-id">#{{note.id}}</span>
            <h3 class="note-name">{{note.name}}</h3>
            <ul class="notes-todos-prev mar10-t">
                <li v-for="(todo, index) in note.todos" :key="index" class="flex flex-nowrap flex-ai-center mar10-tb">
                    <div class="checkbox flex-shrink0 mar10-r">
                        <input type="checkbox" :id="`todo_${index}`" v-model="note.todos[index].completed"
                               @change="addInBuffer">
                        <label :for="`todo_${index}`"></label>
                    </div>
                    <input class="flex-grow1"
                           type="text"
                           v-focus
                           v-if="editing === index"
                           v-model="note.todos[index].description"
                           @keyup.esc="cancelEditTodo(index)"
                           @keyup.enter="$event.target.blur()"
                           @blur="doneEditTodo(index)"
                    >
                    <template v-else>
                        <span class="todo_name" @dblclick="editTodo(index)">{{todo.description}}</span>
                        <button class="btn btn-red flex-shrink0 mar10-l pad20-rl"
                                title="Delete"
                                @click="deleteTodo(index)">-
                        </button>
                    </template>
                </li>
            </ul>
            <button class="btn btn-red mar10-t" @click="deleteNote(note.id)">Delete</button>
            <button class="btn btn-red mar10-t mar10-l" @click="refreshNoteChanges">Refresh changes</button>
            <button class="btn btn-blue mar10-t mar10-l" @click="addTodo" :disabled="addTodoDisabled">Add todo</button>
            <button class="btn btn-blue mar10-t mar10-l" @click="saveNote">Save</button>
            <button class="btn btn-red mar10-t mar10-l" v-if="bufferCurrentIndex > 0" @click="prevChanges">
                Prevent changes
            </button>
            <button class="btn btn-blue mar10-t mar10-l"
                    v-if="notesChangesBuffer.length - 1 !== bufferCurrentIndex"
                    @click="nextChanges">Next changes
            </button>
        </div>
        <confirmation :confirmation="noteDeleteConfirmation"
                      :dialogText="`Are you sure to delete current note`"
                      @confirm="deleteNoteConfirm(note.id)"
                      @cancel="cancelDeleteTodo"></confirmation>
        <confirmation :confirmation="noteRefreshConfirmation"
                      :dialogText="`Are you sure to cancel note changes`"
                      @confirm="refreshNoteConfirm()"
                      @cancel="cancelRefreshNote"></confirmation>
    </div>
</template>

<script>
	// @ is an alias to /src
	import Confirmation from '@/components/Confirmation'

	export default {
		name: 'change-note',
		components: {Confirmation},
		mounted() {
			if (this.note.length === 0) {
				const note = this.$store.state.notesList.find(item => {
					return item.id === parseInt(this.$route.params.id)
				})
				// console.log(note)
				this.$store.state.notesChangesBuffer.push(note)
				this.note = note
			}
		},
		beforeDestroy() {
			this.$store.state.notesChangesBuffer = []
		},
		data() {
			return {
				noteDeleteConfirmation: false,
				noteRefreshConfirmation: false,
				beforeEditCache: '',
				editing: false,
				note: [],
				// notesChangesBuffer: [],
				bufferCurrentIndex: 0
			}
		},
		computed: {
			notesChangesBuffer() {
				return this.$store.state.notesChangesBuffer
			},
			addTodoDisabled() {
				return Object.keys(this.note).length !== 0 && this.note.todos[this.note.todos.length - 1].description.trim() === ''
			}
		},
		methods: {
			deleteNote() {
				this.noteDeleteConfirmation = true
			},
			deleteNoteConfirm(id) {
				this.noteDeleteConfirmation = false
				this.$router.push('/');
				this.$store.commit('deleteNote', id)
			},
			cancelDeleteTodo() {
				this.noteDeleteConfirmation = false
			},
			refreshNoteChanges() {
				this.noteRefreshConfirmation = true
			},
			refreshNoteConfirm() {
				this.$store.commit('refreshChanges')
				this.noteRefreshConfirmation = false
				this.bufferCurrentIndex = 0
                this.note = this.notesChangesBuffer[this.bufferCurrentIndex]
			},
			cancelRefreshNote() {
				this.noteRefreshConfirmation = false
			},
			saveNote() {
				this.$store.commit('saveNote', this.note)
				this.$router.push('/');
			},
			editTodo(index) {
				this.beforeEditCache = this.note.todos[index].description
				this.editing = index;
			},
			cancelEditTodo(index) {
				if (this.beforeEditCache === '') {
					this.deleteTodo(index)
				} else {
					this.note.todos[index].description = this.beforeEditCache
				}
				this.beforeEditCache = ''
				this.editing = false
			},
			doneEditTodo(index) {
				if (this.note.todos[index].description.trim() === '' && this.beforeEditCache === '') {
					this.deleteTodo(index)
				} else if (this.note.todos[index].description.trim() === '') {
					this.note.todos[index].description = this.beforeEditCache;
				} else {
					this.addInBuffer()
				}
				this.beforeEditCache = ''
				this.editing = false;
			},
			addInBuffer() {
				this.$store.commit('addInBuffer', {bufferCurrentIndex: this.bufferCurrentIndex, note: this.note})
				this.bufferCurrentIndex++
			},
			prevChanges() {
				if (this.bufferCurrentIndex === 0) {
					return false
				} else {
					this.note = this.notesChangesBuffer[--this.bufferCurrentIndex]
				}
			},
			nextChanges() {
				this.note = this.notesChangesBuffer[++this.bufferCurrentIndex]
			},
			addTodo() {
				this.note.todos.push({
					completed: false,
					description: ''
				})
				this.beforeEditCache = 'New todo'
				this.editTodo(this.note.todos.length - 1)
				// this.addInBuffer()
			},
			deleteTodo(index) {
				this.note.todos.splice(index, 1)
				this.addInBuffer()
			}

		}
	}
</script>

<style lang="scss" scoped>
    .todo_name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 36px;
        display: block;
        cursor: text;
    }
</style>
