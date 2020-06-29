<template>
    <div class="pad10-rl">
        <router-link :to="{name: 'notes-list'}" class="btn btn-blue mar10-t">Main</router-link>
        <div class="create_note pad20-tb">
            <input type="text" v-model="note.name" class="w100 mar20-b" placeholder="Name of note" style="">
            <div class="flex mar10-b" v-for="(todo, index) in note.todos" :key="index">
                <input type="text" class="flex-grow1" placeholder="Name of todo"
                       v-focus
                       v-model="todo.description">
                <button class="btn btn-red flex-shrink0 mar10-l pad20-rl"
                        title="Delete"
                        @click="deleteTodo(index)">-
                </button>
            </div>
            <button class="btn btn-blue w100 mar10-t"
                    title="Add todo"
                    @click="addTodo">Add todo
            </button>
        </div>
        <button class="btn btn-blue save_note"
                title="Save note"
                @click="saveNote">Save
        </button>
        <!--<confirmation :confirmation="noteDeleteConfirmation"
                      :dialogText="`Are you sure to delete note #${noteDeleteId} with todos`"
                      @confirm="deleteNoteConfirm(noteDeleteId)"
                      @cancel="cancelDeleteTodo"></confirmation>-->
    </div>
</template>

<script>
	// @ is an alias to /src
	// import Confirmation from '@/components/Confirmation'

	export default {
		name: 'create-note',
		// components: {Confirmation},
		data() {
			return {
				note: {
					id: this.$store.state.notesList[this.$store.state.notesList.length - 1].id + 1,
					name: '',
					todos: [
						{
							description: '',
							completed: false
						}
					]
				}
			}
		},
		computed: {},
		methods: {
			deleteTodo(index) {
				if (this.note.todos.length > 1) {
					this.note.todos.splice(index, 1)
				}
			},
			addTodo() {
				this.note.todos.push({
					description: '',
					completed: false
				})
			},
			saveNote() {
				if (this.note.name.trim() === '') {
					return false
                }
				let todos = this.note.todos.filter((item) => {
					return item.description.trim() !== ''
				})
                this.note.todos = todos
                if (todos.length === 0) return false
				this.$store.commit('createNote', this.note)
				this.$router.push('/');
			}
		}
	}
</script>

<style lang="scss" scoped>
    .save_note {
        position: fixed;
        bottom: 30px;
        right: 30px;
        border-radius: 20px;
        line-height: 40px;
        height: 40px;
        padding: 0 20px;
        font-size: 18px;
    }
</style>
